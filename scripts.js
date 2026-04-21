/* ─── RANDOM NAMES ──────────────────────────────────────────── */
const NAMES = [
  "Mara Voss", "Eliot Crane", "Sasha Lund", "Noa Ferris",
  "Jules Adler", "Cleo Marsh", "Theo Wain", "Iris Dove"
];
// Shuffle deterministically so names are stable on reload
const shuffledNames = [...NAMES].sort((a, b) =>
  (a.charCodeAt(0) * 7 + b.charCodeAt(1) * 3) % 11 - 5
);

/* ─── DATA ──────────────────────────────────────────────────── */
const PARTICIPANTS = [
  {
    id: 0,
    interactions: ["recap of your day", "help with decision-making", "miscellaneous conversation"],
    validate: 3, better: 5,
    feelsDifferent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel nisl ac libero facilisis imperdiet non vel velit.",
    barriers: "Lorem ipsum dolor sit amet. Cras ultricies ligula sed magna dictum porta."
  },
  {
    id: 1,
    interactions: ["recap of your day", "help with decision-making", "advice on social situations", "advice on life problems", "venting/a listening ear"],
    validate: 9, better: 8,
    feelsDifferent: "Lorem ipsum dolor sit amet, adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    barriers: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
  },
  {
    id: 2,
    interactions: ["help with decision-making"],
    validate: 1, better: 1,
    feelsDifferent: "Lorem ipsum dolor sit amet. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    barriers: "Lorem ipsum consectetur adipiscing. Excepteur sint occaecat cupidatat non proident."
  },
  {
    id: 3,
    interactions: ["advice on social situations"],
    validate: 8, better: 7,
    feelsDifferent: "Lorem ipsum dolor sit amet, consectetur. Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    barriers: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
  },
  {
    id: 4,
    interactions: ["help with decision-making", "advice on social situations", "advice on life problems", "venting/a listening ear"],
    validate: 9, better: 9,
    feelsDifferent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est qui dolorem ipsum.",
    barriers: "Lorem ipsum dolor sit amet. Ut labore et dolore magnam aliquam quaerat voluptatem."
  },
  {
    id: 5,
    interactions: ["advice on life problems"],
    validate: 8, better: 7,
    feelsDifferent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea.",
    barriers: "Lorem ipsum dolor sit amet. At vero eos et accusamus et iusto odio dignissimos ducimus."
  },
  {
    id: 6,
    interactions: ["help with decision-making", "miscellaneous conversation"],
    validate: 3, better: 8,
    feelsDifferent: "Lorem ipsum dolor sit amet, consectetur. Nam libero tempore cum soluta nobis eligendi optio cumque.",
    barriers: "Lorem ipsum dolor sit amet, adipiscing elit. Temporibus autem quibusdam aut officiis debitis rerum."
  }
];

/* ─── ICONS — expressive, narrative SVG figures ─────────────── */
// All drawn on a 80×80 viewBox so figures feel substantial
const ICONS = {

  "recap of your day": {
    label: "Day Recap",
    // Person sitting, head tilted back slightly, reflecting — journal open on lap
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- journal / book open on lap -->
        <path d="M22 55 Q40 50 58 55 L56 68 Q40 64 24 68 Z"/>
        <line x1="40" y1="50" x2="40" y2="68"/>
        <!-- sitting figure body -->
        <line x1="40" y1="38" x2="40" y2="52"/>
        <!-- legs bent, sitting -->
        <path d="M40 52 Q34 57 22 57"/>
        <path d="M40 52 Q46 57 58 57"/>
        <!-- arms resting on book -->
        <path d="M40 42 Q32 47 26 54"/>
        <path d="M40 42 Q48 47 54 54"/>
        <!-- head -->
        <circle cx="40" cy="31" r="7"/>
        <!-- slight chin-down, thoughtful tilt -->
        <path d="M37 35 Q40 37 43 35"/>
      </svg>`
  },

  "help with decision-making": {
    label: "Decision",
    // Figure at a crossroads: two paths branch from feet, hands out weighing options
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- branching paths -->
        <path d="M40 68 L40 52"/>
        <path d="M40 52 Q28 46 16 38"/>
        <path d="M40 52 Q52 46 64 38"/>
        <!-- body -->
        <line x1="40" y1="38" x2="40" y2="52"/>
        <!-- left arm out, palm up — weighing -->
        <path d="M40 42 L24 36"/>
        <path d="M22 34 L26 38 L28 33"/>
        <!-- right arm out, palm up -->
        <path d="M40 42 L56 36"/>
        <path d="M58 34 L54 38 L52 33"/>
        <!-- head, slightly tilted as if uncertain -->
        <circle cx="40" cy="31" r="7"/>
        <path d="M37 29 Q40 28 43 29"/>
        <!-- question mark above -->
        <path d="M40 20 Q44 16 44 13 Q44 10 40 10 Q36 10 36 13"/>
        <circle cx="40" cy="22" r="1" fill="currentColor" stroke="none"/>
      </svg>`
  },

  "miscellaneous conversation": {
    label: "Conversation",
    // Two speech bubbles above a solitary figure looking up at a glowing screen/orb
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- glowing orb / screen -->
        <circle cx="40" cy="16" r="10"/>
        <circle cx="40" cy="16" r="6" stroke-opacity="0.35"/>
        <!-- light rays -->
        <line x1="40" y1="4"  x2="40" y2="1"/>
        <line x1="50" y1="7"  x2="52" y2="5"/>
        <line x1="30" y1="7"  x2="28" y2="5"/>
        <!-- figure looking up -->
        <circle cx="40" cy="44" r="7"/>
        <path d="M37 41 Q40 39 43 41"/>
        <!-- body -->
        <line x1="40" y1="51" x2="40" y2="65"/>
        <!-- arms raised slightly toward screen -->
        <path d="M40 54 Q32 50 28 44"/>
        <path d="M40 54 Q48 50 52 44"/>
        <!-- legs -->
        <path d="M40 65 Q36 70 32 74"/>
        <path d="M40 65 Q44 70 48 74"/>
      </svg>`
  },

  "advice on social situations": {
    label: "Social Advice",
    // Three figures — two facing each other in tension, one smaller figure off to the side watching
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- left figure -->
        <circle cx="20" cy="28" r="6"/>
        <line x1="20" y1="34" x2="20" y2="52"/>
        <path d="M20 38 L12 44"/>
        <path d="M20 38 L28 42"/>
        <path d="M20 52 L16 62"/>
        <path d="M20 52 L24 62"/>
        <!-- right figure mirrored -->
        <circle cx="56" cy="28" r="6"/>
        <line x1="56" y1="34" x2="56" y2="52"/>
        <path d="M56 38 L64 44"/>
        <path d="M56 38 L48 42"/>
        <path d="M56 52 L52 62"/>
        <path d="M56 52 L60 62"/>
        <!-- tension line between them -->
        <path d="M26 36 Q38 30 50 36" stroke-dasharray="3 3"/>
        <!-- small observer figure (the participant, apart) -->
        <circle cx="40" cy="60" r="4.5"/>
        <line x1="40" y1="64.5" x2="40" y2="74"/>
        <path d="M40 67 L36 71"/>
        <path d="M40 67 L44 71"/>
      </svg>`
  },

  "advice on life problems": {
    label: "Life Problems",
    // Figure slumped under a heavy weight/boulder they're barely holding up
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- heavy boulder / weight -->
        <ellipse cx="40" cy="24" rx="18" ry="13"/>
        <!-- pressure cracks in boulder -->
        <path d="M33 18 L36 24 L32 28" stroke-opacity="0.5"/>
        <path d="M46 20 L43 25 L47 29" stroke-opacity="0.5"/>
        <!-- figure straining beneath, knees bent -->
        <circle cx="40" cy="45" r="6"/>
        <!-- arms pushed up supporting weight -->
        <path d="M40 40 L28 34"/>
        <path d="M40 40 L52 34"/>
        <!-- body compressed, bent knees -->
        <path d="M40 51 L40 58"/>
        <path d="M40 58 Q34 63 28 68"/>
        <path d="M40 58 Q46 63 52 68"/>
      </svg>`
  },

  "venting/a listening ear": {
    label: "Venting",
    // Distressed figure, arms flung wide, head thrown back or forward, jagged emotion lines radiating out
    svg: `
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
        <!-- emotion burst lines radiating out -->
        <line x1="40" y1="12" x2="40" y2="5"  stroke-opacity="0.5"/>
        <line x1="56" y1="17" x2="62" y2="11" stroke-opacity="0.5"/>
        <line x1="63" y1="33" x2="70" y2="30" stroke-opacity="0.5"/>
        <line x1="24" y1="17" x2="18" y2="11" stroke-opacity="0.5"/>
        <line x1="17" y1="33" x2="10" y2="30" stroke-opacity="0.5"/>
        <!-- head thrown back / up in anguish -->
        <circle cx="40" cy="24" r="7"/>
        <!-- open mouth, distressed -->
        <path d="M37 27 Q40 31 43 27"/>
        <!-- body -->
        <line x1="40" y1="31" x2="40" y2="50"/>
        <!-- arms flung wide and up — distressed posture -->
        <path d="M40 36 Q28 28 18 30"/>
        <path d="M40 36 Q52 28 62 30"/>
        <!-- hands splayed open -->
        <path d="M18 30 L15 27 M18 30 L14 31 M18 30 L15 33"/>
        <path d="M62 30 L65 27 M62 30 L66 31 M62 30 L65 33"/>
        <!-- legs slightly apart, unstable stance -->
        <path d="M40 50 Q34 58 28 66"/>
        <path d="M40 50 Q46 58 52 66"/>
      </svg>`
  }
};

/* ─── DOM BUILDERS ──────────────────────────────────────────── */
function buildIconItem(type) {
  const def = ICONS[type];
  if (!def) return '';
  return `
    <div class="icon-item">
      <div class="icon-svg-wrap">
        ${def.svg}
      </div>
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
        <div class="tooltip-field-text">"${p.feelsDifferent}"</div>
      </div>
      <div class="tooltip-field">
        <div class="tooltip-field-label">Barriers AI doesn't have</div>
        <div class="tooltip-field-text">"${p.barriers}"</div>
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
      <div class="legend-icon" style="color:var(--ice-3);">${def.svg}</div>
      <span>${def.label}</span>
    </div>`).join('');
}

/* ─── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Legend
  document.getElementById('legend-container').innerHTML = buildLegend();

  // Stage
  const stage = document.getElementById('stage');
  PARTICIPANTS.forEach((p, i) => {
    if (i > 0 && i % 3 === 0) {
      stage.insertAdjacentHTML('beforeend',
        `<div class="chapter-divider"><span>· · ·</span></div>`);
    }
    stage.insertAdjacentHTML('beforeend', buildCluster(p, i));
  });

  // Mobile tap to toggle tooltip
  document.querySelectorAll('.icon-cluster').forEach(cluster => {
    cluster.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        const isOpen = cluster.classList.contains('tooltip-visible');
        document.querySelectorAll('.icon-cluster').forEach(c => c.classList.remove('tooltip-visible'));
        if (!isOpen) cluster.classList.add('tooltip-visible');
      }
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.cluster-row').forEach(row => observer.observe(row));
});
