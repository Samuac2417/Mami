/**
 * PAN-AMERICAN LIFE (PALIG) - APLICACIÓN WEB DE PRESENTACIÓN INTERACTIVA
 * Desarrollado para Elena Castañeda Castañeda — Corredora de Seguros
 * Optimizado para presentaciones a Médicos Especialistas y Cirujanos en Colombia
 */

const DeckApp = (() => {
  // Application State
  const state = {
    currentSlide: 1,
    totalSlides: 9,
    soundEnabled: true,
    audioCtx: null,
    pensionChart: null,
    currentIncome: 18000000,
    yearsToRetire: 15,
    slidesMeta: [
      {
        num: 1,
        title: "Portada Institucional",
        subtitle: "Personal de Salud y Administrativo - Hospital San Juan de Dios",
        notes: "🎯 OBJETIVO: Conectar empáticamente con el personal del hospital.\n\n🗣️ QUÉ DECIR: 'Buenos días a todo el equipo médico, asistencial y administrativo del Hospital San Juan de Dios de Sonsón. Ambas consultoras estamos hoy aquí porque ustedes cuidan la salud y la vida de nuestra comunidad todos los días. Pero hoy queremos hacerles una pregunta muy sincera: ¿Quién está cuidando el futuro financiero y patrimonial de ustedes y de sus familias?'\n\n💡 FRASE DE IMPACTO: Su mayor activo financiero no es un inmueble ni un consultorio: es su propia capacidad de generar ingresos cada día."
      },
      {
        num: 2,
        title: "Video Institucional",
        subtitle: "La Realidad del Retiro y la Protección Médica",
        notes: "🎯 OBJETIVO: Sensibilizar visualmente a través del video testimonial y de contexto sobre los retos que enfrenta el personal hospitalario ante la nueva reforma pensional y la necesidad de anticiparse."
      },
      {
        num: 3,
        title: "La Paradoja del Profesional",
        subtitle: "Altos Ingresos vs. Extrema Fragilidad",
        notes: "🎯 OBJETIVO: Mostrar la fragilidad de depender 100% de la presencia física.\n\n🗣️ QUÉ DECIR: 'Como profesionales de la salud, tenemos ingresos altos pero atados a contratos de prestación de servicios, honorarios o turnos. Si un problema médico o accidente detiene nuestra labor, la facturación cae a $0 de inmediato. Y el sistema público tradicional no nos devolverá ni una cuarta parte de lo que hoy ganamos.'\n\n💡 FRASE DE IMPACTO: En el hospital, si no estamos físicamente presentes, el ingreso se apaga."
      },
      {
        num: 4,
        title: "La Nueva Reforma Pensional",
        subtitle: "Tope de 2.3 SMLMV y Pérdida de Subsidios",
        notes: "🎯 OBJETIVO: Aclarar la confusión del tope de 2.3 SMLMV.\n\n🗣️ QUÉ DECIR: 'Muchos creen que en 2027 Colpensiones les pagará $4 millones. ¡Eso es un mito! 2.3 SMLMV (~$4M) es solo la base máxima que el Estado subsidia. Al aplicarle la tasa de reemplazo máxima del 65%, la pensión real del Estado será de solo ~$2.6M a $2.8M. Y todo peso que gane por encima va al fondo privado sin garantía de rendimiento y con 100% de riesgo bursátil.'\n\n💡 FRASE DE IMPACTO: Quien gane más de $10M sufrirá una pérdida del 75% al 85% de sus ingresos al pensionarse."
      },
      {
        num: 5,
        title: "Calculadora de Brecha Pensional",
        subtitle: "Simulador Financiero en Tiempo Real",
        notes: "🎯 OBJETIVO: Mostrar el impacto real con un voluntario de la audiencia.\n\n🗣️ QUÉ DECIR: 'Invitemos a un médico del público. Si hoy su hogar vive con $18 millones y el sistema público le pagará solo ~$4.1 millones combinados, la brecha es de -$13.8 millones cada mes. En 20 años de jubilación, faltarán más de $3.300 millones en su cuenta familiar.'\n\n💡 PREGUNTA DE REFLEXIÓN: ¿Cómo sostendrán la universidad de sus hijos, la medicina prepagada y sus deudas con solo el 25% de lo que ganan hoy?"
      },
      {
        num: 6,
        title: "¿Y si la Salud Falla Antes?",
        subtitle: "Límites de Invalidez y Epidemiología en Colombia",
        notes: "🎯 OBJETIVO: Explicar por qué nadie puede confiar ciegamente en la pensión de invalidez pública.\n\n🗣️ QUÉ DECIR:\n• 1. Estadísticas reales: +70.000 infartos/ACV y +81.600 diagnósticos de cáncer al año en Colombia. El estrés de turnos y guardias eleva el riesgo antes de los 55 años. Un tratamiento exige pausar 1 año: cero turnos = cero honorarios.\n• 2. La trampa del 50%: Para dar pensión de invalidez, la ley exige perder más del 50% de TODO el cuerpo. Si un médico pierde la precisión en sus manos o sufre temblor, no puede operar ni diagnosticar; pero la junta le dictamina 30%: ¡Dictamen legal: CERO pensión!\n• 3. Y aunque califique, el tope máximo es del 75% de lo cotizado y el trámite tarda hasta 2 años.\n\n💡 FRASE DE IMPACTO: Si una enfermedad le exige parar 1 año, ¿el hospital o la EPS pagarán las cuentas de su casa?"
      },
      {
        num: 7,
        title: "Respaldo Pan-American Life",
        subtitle: "Más de 115 Años y Calificación 'A'",
        notes: "🎯 OBJETIVO: Transmitir total seguridad y solidez internacional.\n\n🗣️ QUÉ DECIR: 'Pan-American Life fue fundada en 1911 en Nueva Orleans. Llevamos más de 115 años continuos pagando siniestros a través de dos guerras mundiales, la crisis del 29 y el COVID. Administramos más de $7.500 millones USD en activos y contamos con calificación A (Excelente / Sólida) de Fitch Ratings y AM Best. Y en Colombia operamos bajo la vigilancia de la Superintendencia Financiera.'\n\n💡 FRASE DE IMPACTO: La tranquilidad de confiar su retiro a una institución centenaria que nunca ha fallado."
      },
      {
        num: 8,
        title: "Póliza Multipropósito PALIG",
        subtitle: "Vida Universal Indexada (Vida en Vida)",
        notes: "🎯 OBJETIVO: Derribar el mito de 'un seguro solo sirve si muero'.\n\n🗣️ QUÉ DECIR: 'Esta solución de Pan-American Life está diseñada para disfrutarse 100% EN VIDA:\n1. Ahorro Indexado S&P 500 con Piso 0%: Opciones de ahorro tanto en pesos colombianos como en dólares (a elección de cada profesional), con rentabilidad ligada a los mercados de EE.UU. pero con piso 0% garantizado (nunca pierde capital).\n2. Anticipo hasta del 100% en Vida por Enfermedades Graves: Si diagnostican cáncer, infarto o ACV, recibe el dinero en vida para tratarse sin angustia económica.\n3. Liquidez con Valores de Rescate: Retiros o préstamos sobre su fondo para consultorio o proyectos.\n4. Patrimonio 100% Inembargable y sin Juicio de Sucesión.'\n\n💡 FRASE DE IMPACTO: El único plan que le cuida la salud en vida y le garantiza su retiro en pesos o en dólares a su elección."
      },
      {
        num: 9,
        title: "Cierre y Diagnóstico de 15 Min",
        subtitle: "Agendamiento con Elena Castañeda",
        notes: "🎯 OBJETIVO: Cierre suave y reserva del diagnóstico de 15 minutos.\n\n🗣️ QUÉ DECIR: 'Así como ustedes no recetan medicamentos sin hacer primero un diagnóstico clínico, no dejen su retiro al azar legislativo. Hoy, junto con mi colega corredora de seguros Olga Martínez, les ofrecemos una sesión de diagnóstico pensional individual de 15 minutos, totalmente gratuita y sin compromiso. Escaneen el código QR en pantalla o hagan clic en el botón de WhatsApp y agendamos su cita.'\n\n💡 FRASE DE IMPACTO: 15 minutos de diagnóstico hoy pueden garantizar la tranquilidad de los próximos 30 años de su familia."
      }
    ]
  };

  // Sound Synthesizer (Web Audio API)
  const playSound = (freq = 440, type = 'sine', duration = 0.08) => {
    if (!state.soundEnabled) return;
    try {
      if (!state.audioCtx) {
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(state.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context not supported or allowed yet.");
    }
  };

  // Currency Formatter COP
  const formatCOP = (num) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Update Top Progress Bar & Counter
  const updateProgress = () => {
    const progressBar = document.getElementById('progressBar');
    const slideCounter = document.getElementById('slideCounter');
    
    const percentage = ((state.currentSlide - 1) / (state.totalSlides - 1)) * 100;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (slideCounter) slideCounter.textContent = `0${state.currentSlide} / 0${state.totalSlides}`;

    // Update Bottom Dots
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      if (index + 1 === state.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update Speaker Notes if drawer is open
    updateSpeakerNotes();
  };

  // Navigate to Slide
  const goToSlide = (slideIndex) => {
    if (slideIndex < 1 || slideIndex > state.totalSlides) return;
    
    // Pause video if leaving slide 2
    const video = document.getElementById('introVideo');
    if (video && !video.paused) {
      video.pause();
    }

    // Deactivate current slide
    const currentEl = document.querySelector(`.slide-section[data-slide="${state.currentSlide}"]`);
    if (currentEl) currentEl.classList.remove('active');

    // Activate target slide
    state.currentSlide = slideIndex;
    const targetEl = document.querySelector(`.slide-section[data-slide="${state.currentSlide}"]`);
    if (targetEl) {
      targetEl.classList.add('active');
      targetEl.scrollTop = 0; // Reset scroll position
    }

    // Play subtle audio click
    playSound(520, 'sine', 0.05);

    // Update UI elements
    updateProgress();

    // Trigger Chart Resize if entering Slide 5 (Calculadora)
    if (state.currentSlide === 5 && state.pensionChart) {
      setTimeout(() => {
        state.pensionChart.resize();
        state.pensionChart.update();
      }, 150);
    }
  };

  const nextSlide = () => {
    if (state.currentSlide < state.totalSlides) {
      goToSlide(state.currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (state.currentSlide > 1) {
      goToSlide(state.currentSlide - 1);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
      const icon = document.getElementById('fullscreenIcon');
      if (icon) icon.setAttribute('data-lucide', 'minimize');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      const icon = document.getElementById('fullscreenIcon');
      if (icon) icon.setAttribute('data-lucide', 'maximize');
    }
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 100);
  };

  // Sound Toggle
  const toggleSound = () => {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('soundIcon');
    if (icon) {
      icon.setAttribute('data-lucide', state.soundEnabled ? 'volume-2' : 'volume-x');
      if (window.lucide) lucide.createIcons();
    }
    if (state.soundEnabled) playSound(600, 'sine', 0.1);
  };

  // Speaker Notes Management
  const toggleSpeakerNotes = () => {
    const drawer = document.getElementById('speakerNotesDrawer');
    if (!drawer) return;
    const isHidden = drawer.classList.contains('hidden');
    if (isHidden) {
      drawer.classList.remove('hidden');
      drawer.classList.add('flex');
      updateSpeakerNotes();
    } else {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
    }
  };

  const updateSpeakerNotes = () => {
    const content = document.getElementById('speakerNotesContent');
    if (!content) return;
    const meta = state.slidesMeta.find(s => s.num === state.currentSlide);
    if (meta) {
      content.innerHTML = `
        <div class="space-y-3">
          <div class="font-bold text-palig-navy text-xs pb-1.5 border-b border-slate-100 flex items-center justify-between">
            <span>Diapositiva 0${meta.num}: ${meta.title}</span>
            <span class="text-[10px] bg-sky-50 text-palig-blue border border-sky-200 px-2 py-0.5 rounded font-mono font-bold">Guía para Elena</span>
          </div>
          <div class="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200 font-sans">
            ${meta.notes}
          </div>
        </div>
      `;
    }
  };

  // Slide Sorter / Overview Modal
  const toggleOverviewModal = () => {
    const modal = document.getElementById('overviewModal');
    if (!modal) return;
    const isHidden = modal.classList.contains('hidden');
    if (isHidden) {
      renderOverviewGrid();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  const renderOverviewGrid = () => {
    const grid = document.getElementById('overviewGrid');
    if (!grid) return;
    grid.innerHTML = '';

    state.slidesMeta.forEach(slide => {
      const isCurrent = slide.num === state.currentSlide;
      const card = document.createElement('div');
      card.className = `p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
        isCurrent
          ? 'bg-sky-50 border-palig-blue shadow-inst-sm'
          : 'bg-white border-slate-200 hover:border-palig-blue hover:bg-slate-50'
      }`;
      card.onclick = () => {
        goToSlide(slide.num);
        toggleOverviewModal();
      };

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isCurrent ? 'bg-palig-navy text-white' : 'bg-slate-100 text-slate-600'} font-bold">
              0${slide.num}
            </span>
            ${isCurrent ? '<span class="w-2 h-2 rounded-full bg-palig-blue animate-pulse"></span>' : ''}
          </div>
          <h4 class="text-sm font-bold text-palig-navy mt-2">${slide.title}</h4>
        </div>
        <p class="text-[10px] text-slate-500 truncate">${slide.subtitle}</p>
      `;
      grid.appendChild(card);
    });
  };

  // Keyboard Navigation & Shortcuts
  const initKeyboardNav = () => {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is interacting with an input or slider
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(state.totalSlides);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          toggleOverviewModal();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          toggleSpeakerNotes();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          toggleSound();
          break;
        case '?':
          e.preventDefault();
          toggleHelpModal();
          break;
        case 'Escape':
          // Close open modals
          const help = document.getElementById('helpModal');
          const overview = document.getElementById('overviewModal');
          const notes = document.getElementById('speakerNotesDrawer');
          if (help && !help.classList.contains('hidden')) help.classList.add('hidden');
          if (overview && !overview.classList.contains('hidden')) overview.classList.add('hidden');
          if (notes && !notes.classList.contains('hidden')) notes.classList.add('hidden');
          break;
      }
    });
  };

  // Help Modal Toggle
  const toggleHelpModal = () => {
    const modal = document.getElementById('helpModal');
    if (!modal) return;
    const isHidden = modal.classList.contains('hidden');
    if (isHidden) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // Mobile / Touch Swipe Navigation
  const initTouchNav = () => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const deckContainer = document.getElementById('deckContainer');
    if (!deckContainer) return;

    deckContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    deckContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      
      // Horizontal swipe threshold: 50px, vertical tolerance: 60px
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide(); // Swipe left -> Next
        } else {
          prevSlide(); // Swipe right -> Prev
        }
      }
    };
  };

  // Build Bottom Navigation Dots
  const initNavDots = () => {
    const container = document.getElementById('slideDotsContainer');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 1; i <= state.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `nav-dot ${i === 1 ? 'active' : ''}`;
      dot.title = `Ir a diapositiva ${i}`;
      dot.onclick = () => goToSlide(i);
      container.appendChild(dot);
    }
  };

  // =========================================================================
  // CALCULADORA DE BRECHA PENSIONAL (SLIDE 4)
  // =========================================================================
  const calculatePensionMetrics = (income, years) => {
    // Parámetros Reforma 2026-2027:
    // Salario Mínimo Legal Mensual Vigente (SMLMV Colombia): $1.423.500 COP
    const SMLMV_ACTUAL = 1423500;
    // Tope Colpensiones 2.3 SMLMV: $4.027.082 COP
    const UMBRAL_COLPENSIONES = 4027082;
    
    // Tasa de reemplazo pública sobre lo cotizado en Colpensiones (promedio 62%)
    const TASA_REEMPLAZO_PUBLICA = 0.62;
    
    let pensionPublicaBase = 0;
    let pensionAhorroPrivado = 0;

    if (income <= UMBRAL_COLPENSIONES) {
      // Dentro del umbral público de Colpensiones:
      pensionPublicaBase = income * TASA_REEMPLAZO_PUBLICA;
      // Mandato Constitucional (Art. 48 CN): Ninguna pensión puede ser inferior a 1 SMLMV
      if (pensionPublicaBase < SMLMV_ACTUAL) {
        pensionPublicaBase = Math.min(SMLMV_ACTUAL, income);
      }
    } else {
      // Por encima del umbral de 2.3 SMLMV:
      pensionPublicaBase = UMBRAL_COLPENSIONES * TASA_REEMPLAZO_PUBLICA; // ~$2.496.790
      const excedente = income - UMBRAL_COLPENSIONES;
      // Una anualidad conservadora en ahorro individual suele generar entre un 9% y 12% del excedente
      pensionAhorroPrivado = excedente * 0.105;
    }

    // Pensión Total Estimada del Sistema
    let totalPension = pensionPublicaBase + pensionAhorroPrivado;
    
    // Techo práctico del sistema combinado
    if (totalPension > 4800000) totalPension = 4800000;

    // Brecha Mensual (Déficit)
    const gap = Math.max(0, income - totalPension);

    // Porcentaje de pérdida de nivel de vida
    const dropPercentage = income > 0 ? (gap / income) * 100 : 0;

    // Brecha acumulada en 20 años de retiro (240 meses)
    const cumulativeGap20Years = gap * 12 * 20;

    return {
      income,
      totalPension,
      gap,
      dropPercentage,
      cumulativeGap20Years
    };
  };

  const updatePensionUI = () => {
    const metrics = calculatePensionMetrics(state.currentIncome, state.yearsToRetire);

    // Update Text Displays
    const incomeDisplay = document.getElementById('incomeDisplay');
    const calloutIncome = document.getElementById('calloutIncome');
    const calloutPension = document.getElementById('calloutPension');
    const statPension = document.getElementById('statPension');
    const statGap = document.getElementById('statGap');
    const statDropPercent = document.getElementById('statDropPercent');
    const statCumulativeGap = document.getElementById('statCumulativeGap');

    if (incomeDisplay) incomeDisplay.textContent = formatCOP(metrics.income) + ' COP';
    if (calloutIncome) calloutIncome.textContent = formatCOP(metrics.income);
    if (calloutPension) calloutPension.textContent = formatCOP(metrics.totalPension);
    if (statPension) statPension.textContent = formatCOP(metrics.totalPension);
    if (statGap) statGap.textContent = metrics.gap > 0 ? '-' + formatCOP(metrics.gap) : '$0 COP';
    if (statDropPercent) statDropPercent.textContent = metrics.dropPercentage > 0 ? `-${metrics.dropPercentage.toFixed(1)}%` : '0.0%';
    if (statCumulativeGap) statCumulativeGap.textContent = metrics.cumulativeGap20Years > 0 ? '-' + formatCOP(metrics.cumulativeGap20Years) + ' COP' : '$0 COP';

    // Update Chart.js Instance
    if (state.pensionChart) {
      state.pensionChart.data.datasets[0].data = [
        metrics.income,
        metrics.totalPension,
        metrics.gap
      ];
      state.pensionChart.update('none'); // Update without full redraw glitch
    }
  };

  const initPensionChart = () => {
    const canvas = document.getElementById('pensionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const metrics = calculatePensionMetrics(state.currentIncome, state.yearsToRetire);

    state.pensionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingreso Actual', 'Pensión Sistema', 'Brecha Mensual (Déficit)'],
        datasets: [{
          label: 'Monto Mensual en COP',
          data: [metrics.income, metrics.totalPension, metrics.gap],
          backgroundColor: [
            'rgba(0, 114, 206, 0.9)',   // PALIG Blue
            'rgba(5, 150, 105, 0.9)',   // Emerald
            'rgba(220, 38, 38, 0.9)'    // Red Alert
          ],
          borderColor: [
            '#0072CE',
            '#059669',
            '#DC2626'
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#002B49',
            borderColor: '#0072CE',
            borderWidth: 1,
            titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans' },
            callbacks: {
              label: function(context) {
                return ' ' + formatCOP(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
              color: '#64748b',
              font: { family: 'Plus Jakarta Sans', size: 10 },
              callback: function(val) {
                return '$' + (val / 1000000).toFixed(0) + 'M';
              }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#334155',
              font: { family: 'Plus Jakarta Sans', weight: '600', size: 11 }
            }
          }
        }
      }
    });
  };

  const setIncome = (amount) => {
    state.currentIncome = amount;
    const slider = document.getElementById('incomeSlider');
    if (slider) slider.value = amount;
    updatePensionUI();
    playSound(440, 'sine', 0.03);
  };

  // Setup Event Listeners
  const initListeners = () => {
    // Prev / Next Controls
    const btnPrev = document.getElementById('btnPrevSlide');
    const btnNext = document.getElementById('btnNextSlide');
    if (btnPrev) btnPrev.onclick = prevSlide;
    if (btnNext) btnNext.onclick = nextSlide;

    // Header Controls
    const btnFullscreen = document.getElementById('btnFullscreen');
    const btnOverview = document.getElementById('btnOverview');
    const btnCloseOverview = document.getElementById('btnCloseOverview');
    const btnNotes = document.getElementById('btnSpeakerNotes');
    const btnCloseNotes = document.getElementById('btnCloseNotes');
    const btnSound = document.getElementById('btnSoundToggle');
    const btnHelp = document.getElementById('btnHelp');
    const btnCloseHelp = document.getElementById('btnCloseHelp');
    const btnAckHelp = document.getElementById('btnAcknowledgeHelp');

    if (btnFullscreen) btnFullscreen.onclick = toggleFullscreen;
    if (btnOverview) btnOverview.onclick = toggleOverviewModal;
    if (btnCloseOverview) btnCloseOverview.onclick = toggleOverviewModal;
    if (btnNotes) btnNotes.onclick = toggleSpeakerNotes;
    if (btnCloseNotes) btnCloseNotes.onclick = toggleSpeakerNotes;
    if (btnSound) btnSound.onclick = toggleSound;
    if (btnHelp) btnHelp.onclick = toggleHelpModal;
    if (btnCloseHelp) btnCloseHelp.onclick = toggleHelpModal;
    if (btnAckHelp) btnAckHelp.onclick = toggleHelpModal;

    // Sliders
    const incomeSlider = document.getElementById('incomeSlider');
    const yearsSlider = document.getElementById('yearsSlider');

    if (incomeSlider) {
      incomeSlider.addEventListener('input', (e) => {
        state.currentIncome = parseInt(e.target.value, 10);
        updatePensionUI();
      });
    }

    if (yearsSlider) {
      yearsSlider.addEventListener('input', (e) => {
        state.yearsToRetire = parseInt(e.target.value, 10);
        const yearsDisplay = document.getElementById('yearsDisplay');
        if (yearsDisplay) yearsDisplay.textContent = `${state.yearsToRetire} años`;
        updatePensionUI();
      });
    }
  };

  // Initialization
  const init = () => {
    initNavDots();
    initKeyboardNav();
    initTouchNav();
    initListeners();
    initPensionChart();
    updateProgress();
    updatePensionUI();

    // Lucide Icons initialization
    if (window.lucide) {
      lucide.createIcons();
    }
  };

  // Public API
  return {
    init,
    nextSlide,
    prevSlide,
    goToSlide,
    setIncome,
    toggleFullscreen,
    toggleOverviewModal,
    toggleSpeakerNotes,
    toggleSound
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  DeckApp.init();
});
