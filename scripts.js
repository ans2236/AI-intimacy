/* ─── NAMES ──────────────────────────────────────────────────── */
const NAMES = [
  "Mara Voss", "Eliot Crane", "Sasha Lund", "Noa Ferris",
  "Jules Adler", "Cleo Marsh", "Theo Wain", "Iris Dove"
];
const shuffledNames = [...NAMES].sort((a, b) =>
  (a.charCodeAt(0) * 7 + b.charCodeAt(1) * 3) % 11 - 5
);

/* ─── PARTICIPANTS ───────────────────────────────────────────── */
const PARTICIPANTS = [
  {
    id: 0,
    interactions: ["recap of your day", "help with decision-making", "miscellaneous conversation"],
    validate: 3, better: 5,
    feelsDifferent: "Quicker, I feel it’s more ‘objective’ and less subject to bias.",
    barriers: "We don’t have enough time to talk."
  },
  {
    id: 1,
    interactions: ["recap of your day", "help with decision-making", "advice on social situations", "advice on life problems", "venting/a listening ear"],
    validate: 9, better: 8,
    feelsDifferent: "I can explain the whole situation with all the minute details in a way I can’t in person due to time constraints. AI has allegiance to no one but the database it serves.",
    barriers: "My friends are friends with people who I vent to AI about and also are liable to judge me."
  },
  {
    id: 2,
    interactions: ["help with decision-making"],
    validate: 1, better: 1,
    feelsDifferent: "I can stop whenever I feel like it.",
    barriers: "I know it doesn’t care or have actual emotional reactions because it’s literally a bot. If I open up it doesn’t feel like anyone is actually learning about me."
  },
  {
    id: 3,
    interactions: ["advice on social situations"],
    validate: 8, better: 7,
    feelsDifferent: "AI feels more encouraging, sometimes excessively. It also offers multiple different solutions or ideas in a list, which can be helpful or sometimes overwhelming.",
    barriers: "Friends are not as available, sometimes friends are part of the issue or related to the person."
  },
  {
    id: 4,
    interactions: ["help with decision-making", "advice on social situations", "advice on life problems", "venting/a listening ear"],
    validate: 9, better: 9,
    feelsDifferent: "More convenient and readily available — I don’t need to organize myself before expressing.",
    barriers: "You’re not burdening the AI like you would a friend or therapist, and you’re not bringing it down emotionally because it doesn’t have emotions."
  },
  {
    id: 5,
    interactions: ["advice on life problems"],
    validate: 8, better: 7,
    feelsDifferent: "Use it rarely and only for hyper specific scenarios where I want advice and feel awkward talking to friends. AI is nonjudgmental and quite helpful.",
    barriers: "I’m less embarrassed to admit things to AI because it’s not a person. It’s also helpful in social situations where I want a completely objective viewpoint."
  },
  {
    id: 6,
    interactions: ["help with decision-making", "miscellaneous conversation"],
    validate: 3, better: 8,
    feelsDifferent: "The real connection you miss out on.",
    barriers: "Miscommunication and tone."
  }
];

/* ─── ICONS ──────────────────────────────────────────────────── */
const ICONS = {

  "recap of your day": {
    label: "Day Recap",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 55 Q40 50 58 55 L56 68 Q40 64 24 68 Z"/>
      <line x1="40" y1="50" x2="40" y2="68"/>
      <line x1="40" y1="38" x2="40" y2="52"/>
      <path d="M40 52 Q34 57 22 57"/>
      <path d="M40 52 Q46 57 58 57"/>
      <path d="M40 42 Q32 47 26 54"/>
      <path d="M40 42 Q48 47 54 54"/>
      <circle cx="40" cy="31" r="7"/>
      <path d="M37 35 Q40 37 43 35"/>
    </svg>`
  },

  "help with decision-making": {
    label: "Decision",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 68 L40 52"/>
      <path d="M40 52 Q28 46 16 38"/>
      <path d="M40 52 Q52 46 64 38"/>
      <line x1="40" y1="38" x2="40" y2="52"/>
      <path d="M40 42 L24 36"/>
      <path d="M22 34 L26 38 L28 33"/>
      <path d="M40 42 L56 36"/>
      <path d="M58 34 L54 38 L52 33"/>
      <circle cx="40" cy="31" r="7"/>
      <path d="M37 29 Q40 28 43 29"/>
      <path d="M40 20 Q44 16 44 13 Q44 10 40 10 Q36 10 36 13"/>
      <circle cx="40" cy="22" r="1" fill="currentColor" stroke="none"/>
    </svg>`
  },

  "miscellaneous conversation": {
    label: "Conversation",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="16" r="10"/>
      <circle cx="40" cy="16" r="6" stroke-opacity="0.35"/>
      <line x1="40" y1="4"  x2="40" y2="1"/>
      <line x1="50" y1="7"  x2="52" y2="5"/>
      <line x1="30" y1="7"  x2="28" y2="5"/>
      <circle cx="40" cy="44" r="7"/>
      <path d="M37 41 Q40 39 43 41"/>
      <line x1="40" y1="51" x2="40" y2="65"/>
      <path d="M40 54 Q32 50 28 44"/>
      <path d="M40 54 Q48 50 52 44"/>
      <path d="M40 65 Q36 70 32 74"/>
      <path d="M40 65 Q44 70 48 74"/>
    </svg>`
  },

  "advice on social situations": {
    label: "Social Advice",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="28" r="6"/>
      <line x1="20" y1="34" x2="20" y2="52"/>
      <path d="M20 38 L12 44"/>
      <path d="M20 38 L28 42"/>
      <path d="M20 52 L16 62"/>
      <path d="M20 52 L24 62"/>
      <circle cx="56" cy="28" r="6"/>
      <line x1="56" y1="34" x2="56" y2="52"/>
      <path d="M56 38 L64 44"/>
      <path d="M56 38 L48 42"/>
      <path d="M56 52 L52 62"/>
      <path d="M56 52 L60 62"/>
      <path d="M26 36 Q38 30 50 36" stroke-dasharray="3 3"/>
      <circle cx="40" cy="60" r="4.5"/>
      <line x1="40" y1="64.5" x2="40" y2="74"/>
      <path d="M40 67 L36 71"/>
      <path d="M40 67 L44 71"/>
    </svg>`
  },

  "advice on life problems": {
    label: "Life Problems",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="24" rx="18" ry="13"/>
      <path d="M33 18 L36 24 L32 28" stroke-opacity="0.5"/>
      <path d="M46 20 L43 25 L47 29" stroke-opacity="0.5"/>
      <circle cx="40" cy="45" r="6"/>
      <path d="M40 40 L28 34"/>
      <path d="M40 40 L52 34"/>
      <path d="M40 51 L40 58"/>
      <path d="M40 58 Q34 63 28 68"/>
      <path d="M40 58 Q46 63 52 68"/>
    </svg>`
  },

  "venting/a listening ear": {
    label: "Venting",
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="12" x2="40" y2="5"  stroke-opacity="0.5"/>
      <line x1="56" y1="17" x2="62" y2="11" stroke-opacity="0.5"/>
      <line x1="63" y1="33" x2="70" y2="30" stroke-opacity="0.5"/>
      <line x1="24" y1="17" x2="18" y2="11" stroke-opacity="0.5"/>
      <line x1="17" y1="33" x2="10" y2="30" stroke-opacity="0.5"/>
      <circle cx="40" cy="24" r="7"/>
      <path d="M37 27 Q40 31 43 27"/>
      <line x1="40" y1="31" x2="40" y2="50"/>
      <path d="M40 36 Q28 28 18 30"/>
      <path d="M40 36 Q52 28 62 30"/>
      <path d="M18 30 L15 27 M18 30 L14 31 M18 30 L15 33"/>
      <path d="M62 30 L65 27 M62 30 L66 31 M62 30 L65 33"/>
      <path d="M40 50 Q34 58 28 66"/>
      <path d="M40 50 Q46 58 52 66"/>
    </svg>`
  }
};

/* ─── DOM BUILDERS ───────────────────────────────────────────── */
function buildIconItem(type) {
  const def = ICONS[type];
  if (!def) return '';
  return `
    <div class="icon-item">
      <div class="icon-svg-wrap">${def.svg}</div>
      <span class="icon-label">${def.label}</span>
    </div>`;
}

function buildScoreBar(label, value) {
  const pct = (value / 10) * 100;
  return `
    <div class="score-pill">
      <span class="score-label">${label}</span>
      <div class="score-bar-wrap">
        <div class="score-bar" style="width:${pct}%"></div>
      </div>
      <span class="score-num">${value}<span>/10</span></span>
    </div>`;
}

function buildTooltip(p) {
  return `
    <div class="cluster-tooltip">
      <div class="tooltip-scores">
        ${buildScoreBar("Validates feelings", p.validate)}
        ${buildScoreBar("Makes feel better", p.better)}
      </div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-field">
        <div class="tooltip-field-label">What feels different with AI?</div>
        <div class="tooltip-field-text">“${p.feelsDifferent}”</div>
      </div>
      <div class="tooltip-field">
        <div class="tooltip-field-label">Barriers AI doesn’t have</div>
        <div class="tooltip-field-text">“${p.barriers}”</div>
      </div>
    </div>`;
}

function buildCluster(p, index) {
  const name = shuffledNames[index % shuffledNames.length];
  const icons = p.interactions.map(buildIconItem).join('');
  const tooltip = buildTooltip(p);
  return `
    <div class="cluster-row" data-index="${index}">
      <span class="participant-label">${name}</span>
      <div class="icon-cluster" role="button" aria-label="Hover to learn about ${name}">
        ${icons}
        ${tooltip}
      </div>
    </div>`;
}

function buildLegend() {
  return Object.entries(ICONS).map(([, def]) => `
    <div class="legend-item">
      <div class="legend-icon">${def.svg}</div>
      <span>${def.label}</span>
    </div>`).join('');
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Legend */
  document.getElementById('legend-container').innerHTML = buildLegend();

  /* Stage */
  const stage = document.getElementById('stage');
  PARTICIPANTS.forEach((p, i) => {
    if (i > 0 && i % 3 === 0) {
      stage.insertAdjacentHTML('beforeend',
        `<div class="chapter-divider"><span>· · ·</span></div>`);
    }
    stage.insertAdjacentHTML('beforeend', buildCluster(p, i));
  });

  /* Mobile tap tooltip */
  document.querySelectorAll('.icon-cluster').forEach(cluster => {
    cluster.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        const isOpen = cluster.classList.contains('tooltip-visible');
        document.querySelectorAll('.icon-cluster').forEach(c => c.classList.remove('tooltip-visible'));
        if (!isOpen) cluster.classList.add('tooltip-visible');
      }
    });
  });

  /* Scroll reveal — figures and cluster rows */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .cluster-row').forEach(el => revealObs.observe(el));

  /* Prose text — fade in as you reach it, fade out as you scroll past.
     rootMargin creates a reading window in the middle of the viewport
     so only ~1-2 paragraphs are visible at once. */
  const textObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '-16% 0px -32% 0px' });

  document.querySelectorAll('.prose p, .prose .section-hed').forEach(el => {
    el.classList.add('reveal-text');
    textObs.observe(el);
  });

  /* ── typeChart ─────────────────────────────────────────────── */
  new Chart(document.getElementById('typeChart'), {
    type: 'bar',
    data: {
      labels: ['Decision-making', 'Social advice', 'Personal problems', 'Venting', 'Casual chat', 'Day recap', 'Other'],
      datasets: [{
        label: 'Respondents',
        data: [10, 6, 5, 4, 4, 3, 3],
        backgroundColor: [
          '#7F77DD', '#5DCAA5', '#5DCAA5', '#EF9F27', '#378ADD', '#D4537E', '#888780'
        ],
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw} respondents (${((ctx.raw / 14) * 100).toFixed(1)}%)`
          }
        }
      },
      scales: {
        x: {
          max: 14,
          ticks: { stepSize: 2, color: '#9ab4cc', font: { family: 'DM Sans', size: 12 } },
          grid: { color: 'rgba(240,247,255,0.06)' },
          border: { display: false }
        },
        y: {
          ticks: { color: '#cfe5f7', font: { family: 'DM Sans', size: 13 } },
          grid: { display: false },
          border: { display: false }
        }
      }
    }
  });

  /* ── reasonsChart ──────────────────────────────────────────── */
  new Chart(document.getElementById('reasonsChart'), {
    type: 'bar',
    data: {
      labels: [
        'Non-judgmental †',
        'Always available †',
        'Won’t burden emotionally',
        'Less subject to bias',
        'Private / no social risk'
      ],
      datasets: [{
        label: '% of respondents',
        data: [35.7, 28.6, 21.4, 14.3, 14.3],
        backgroundColor: ['#7F77DD', '#5DCAA5', '#AFA9EC', '#EF9F27', '#D4537E'],
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw}% of respondents`
          }
        }
      },
      scales: {
        x: {
          max: 50,
          ticks: {
            callback: v => v + '%',
            color: '#9ab4cc',
            font: { family: 'DM Sans', size: 12 }
          },
          grid: { color: 'rgba(240,247,255,0.06)' },
          border: { display: false }
        },
        y: {
          ticks: { color: '#cfe5f7', font: { family: 'DM Sans', size: 13 } },
          grid: { display: false },
          border: { display: false }
        }
      }
    }
  });

  /* ── JAMA doughnuts ────────────────────────────────────────── */
  const pewOpts = {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '62%',
      animation: { duration: 300 },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  };

  const pd1def = { labels: ['Used AI', 'Did not'], datasets: [{ data: [13.1, 86.9], backgroundColor: ['#7F77DD', 'rgba(240,247,255,0.08)'], borderWidth: 0 }] };
  const pd1exp = { labels: ['Helpful', 'Not helpful'], datasets: [{ data: [92.7, 7.3], backgroundColor: ['#7F77DD', '#D4537E'], borderWidth: 0 }] };
  const pd2def = { labels: ['Used AI', 'Did not'], datasets: [{ data: [22.2, 77.8], backgroundColor: ['#5DCAA5', 'rgba(240,247,255,0.08)'], borderWidth: 0 }] };
  const pd2exp = { labels: ['Helpful', 'Not helpful'], datasets: [{ data: [92.7, 7.3], backgroundColor: ['#5DCAA5', '#D4537E'], borderWidth: 0 }] };

  const pl1def = [{ c: '#7F77DD', label: 'Used AI for mental health', val: '13.1%' }, { c: 'rgba(240,247,255,0.15)', label: 'Did not', val: '86.9%' }];
  const pl1exp = [{ c: '#7F77DD', label: 'Found it helpful', val: '92.7%' }, { c: '#D4537E', label: 'Not helpful', val: '7.3%' }];
  const pl2def = [{ c: '#5DCAA5', label: 'Used AI for mental health', val: '22.2%' }, { c: 'rgba(240,247,255,0.15)', label: 'Did not', val: '77.8%' }];
  const pl2exp = [{ c: '#5DCAA5', label: 'Found it helpful', val: '92.7%' }, { c: '#D4537E', label: 'Not helpful', val: '7.3%' }];

  function buildJamaLeg(id, rows) {
    document.getElementById(id).innerHTML = rows.map(r =>
      `<div class="jama-leg-row"><span class="jama-leg-dot" style="background:${r.c};"></span><span class="jama-leg-text">${r.label}: <strong>${r.val}</strong></span></div>`
    ).join('');
  }

  const pc1 = new Chart(document.getElementById('pie1'), { ...pewOpts, data: JSON.parse(JSON.stringify(pd1def)) });
  const pc2 = new Chart(document.getElementById('pie2'), { ...pewOpts, data: JSON.parse(JSON.stringify(pd2def)) });
  buildJamaLeg('leg1', pl1def);
  buildJamaLeg('leg2', pl2def);

  function attachJamaHover(wrapId, chart, dDef, dExp, lDef, lExp, legId) {
    const wrap = document.getElementById(wrapId);
    wrap.addEventListener('mouseenter', () => {
      wrap.classList.add('hov');
      chart.data = JSON.parse(JSON.stringify(dExp));
      chart.update();
      buildJamaLeg(legId, lExp);
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.classList.remove('hov');
      chart.data = JSON.parse(JSON.stringify(dDef));
      chart.update();
      buildJamaLeg(legId, lDef);
    });
  }

  attachJamaHover('wrap1', pc1, pd1def, pd1exp, pl1def, pl1exp, 'leg1');
  attachJamaHover('wrap2', pc2, pd2def, pd2exp, pl2def, pl2exp, 'leg2');

  /* ── Scale score bars ──────────────────────────────────────── */
  const scaleScores = [
    { label: "AI validates feelings",       val: 5.6, color: '#5DCAA5' },
    { label: "AI offers advice",            val: 4.9, color: '#7F77DD' },
    { label: "Advice: feel heard",          val: 3.0, color: '#AFA9EC' },
    { label: "Advice: emotional feeling",   val: 2.7, color: '#EF9F27' },
    { label: "AI remembers past convos",    val: 3.8, color: '#888780' },
    { label: "AI mirrors your speech",      val: 4.5, color: '#D4537E' },
    { label: "Likely to continue using AI", val: 5.3, color: '#5DCAA5' },
    { label: "AI makes you feel better",    val: 4.7, color: '#378ADD' }
  ];

  const scaleContainer = document.getElementById('scaleRows');
  scaleScores.forEach(d => {
    const pct = Math.min(100, (d.val / 10) * 100).toFixed(1);
    const row = document.createElement('div');
    row.className = 'scale-row';
    row.innerHTML = `
      <div class="scale-label">${d.label}</div>
      <div class="scale-track">
        <div class="scale-fill" style="width:0%;background:${d.color};" data-target="${pct}"></div>
      </div>
      <div class="scale-val">${d.val.toFixed(1)}</div>`;
    scaleContainer.appendChild(row);
  });

  /* Animate bars when fig-scales enters viewport */
  const scaleObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.scale-fill').forEach((el, i) => {
          setTimeout(() => { el.style.width = el.dataset.target + '%'; }, i * 80);
        });
        scaleObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const scalesFig = document.getElementById('fig-scales');
  if (scalesFig) scaleObs.observe(scalesFig);
});
