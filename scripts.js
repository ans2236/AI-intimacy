/* ─── SPLASH ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('splash-open');

  const splashEl      = document.getElementById('splash');
  const sendBtn       = document.getElementById('splash-send');
  const inputField    = document.getElementById('splash-inputfield');
  const msgsEl        = document.getElementById('splash-msgs');
  const continueArrow = document.getElementById('splash-continue-arrow');
  const captionEl     = document.getElementById('splash-caption');
  const timeEl        = document.querySelector('.phone-sbar-time');

  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = now.getMinutes().toString().padStart(2, '0');
  timeEl.textContent = `${h}:${m}`;

  const TURNS = [
    {
      user: "I feel so annoyed. Can I talk to you about it?",
      ai: "Of course you can! What's bothering you right now? Work, school, or some little hiccup in life? Feel free to say anything—I'm listening!"
    },
    {
      user: "I felt safe at that moment, but there are some issues between us—let's not get into those now. After we left, we exchanged a few messages. He asked what I was doing and I said my friend was celebrating with me before I leave. He said 'Enjoy it,' I said 'Okay,' and we never chatted again. I could see he posted on Instagram but I didn't click. Then I posted party photos and he didn't like it—he used to like every single one. I feel weird. Is this normal?",
      ai: "I understand."
    },
    {
      user: "I felt safe enough to tell him about my previous friends-with-benefits situation. But after we had sex, we barely talk. The moment I saw he didn't like my post, I got irritated. I want to turn off notifications. I don't know why.",
      ai: "Your feelings are real—it's your need for connection telling you something. Give yourself space. If you want clarity, find a comfortable moment to talk about expectations directly. Don't let small interactions define your self-worth."
    },
    {
      user: "When we met, he even offered to give me his number after I said Instagram isn't my main app. But then he just... never did.",
      ai: "That gap between words and actions is hard."
    },
    {
      user: "I have a problem with it now.",
      ai: "That's natural. Inconsistency makes people hesitate. If he doesn't take initiative, that's a signal. Don't let this weigh you down—your value doesn't depend on someone's like or reply."
    },
    {
      user: "No matter who I date, things are great in person. But when I'm alone and someone replies slowly or less than I expect, I get agitated and keep thinking about it. Is something wrong with me?",
      ai: "Nothing is wrong with you. We all want responses that make us feel secure. Try giving the relationship space and don't let their pace control your emotions. If a relationship can't meet your core needs, that's okay—what matters is finding someone whose rhythm suits you."
    },
    {
      user: "How do I know what my core needs are?",
      ai: "Core needs are the things that make you feel safe, respected, and authentic. Think back—when did you feel most grounded and understood in past relationships? The needs present in those moments are yours."
    },
    {
      user: "Ok, whatever.",
      ai: "Take care."
    }
  ];

  let turnIndex = 0;

  // Type the first message in after a brief pause
  setTimeout(() => typeIn(TURNS[0].user), 300);

  sendBtn.addEventListener('click', () => {
    if (sendBtn.classList.contains('waiting')) return;
    const turn = TURNS[turnIndex];

    sendBtn.classList.add('waiting');
    inputField.classList.add('sent');
    inputField.textContent = '';

    appendBubble('user', turn.user);

    // Snappy typing indicator
    const typing = document.createElement('div');
    typing.className = 'splash-typing';
    typing.innerHTML = '<span class="splash-typing-dot"></span><span class="splash-typing-dot"></span><span class="splash-typing-dot"></span>';
    setTimeout(() => {
      msgsEl.appendChild(typing);
      scrollToBottom();
      requestAnimationFrame(() => requestAnimationFrame(() => typing.classList.add('show')));
    }, 120);

    // AI response delay scales with length but stays snappy
    const aiDelay = 380 + Math.min(turn.ai.length * 2, 420);
    setTimeout(() => {
      typing.classList.remove('show');
      setTimeout(() => {
        typing.remove();
        appendBubble('ai', turn.ai);
        turnIndex++;

        if (turnIndex < TURNS.length) {
          // Typewriter for next user message
          setTimeout(() => typeIn(TURNS[turnIndex].user), 300);
        } else {
          setTimeout(() => {
            captionEl.classList.add('show');
            continueArrow.classList.add('show');
            splashEl.addEventListener('wheel', onScroll, { passive: true });
            splashEl.addEventListener('touchstart', onTouchStart, { passive: true });
            splashEl.addEventListener('touchmove', onTouchMove, { passive: true });
          }, 600);
        }
      }, 120);
    }, aiDelay);
  });

  function typeIn(text) {
    inputField.classList.remove('sent');
    inputField.textContent = '';
    sendBtn.classList.add('waiting');
    let i = 0;
    const charDelay = Math.max(4, Math.floor(900 / text.length));
    const iv = setInterval(() => {
      inputField.textContent += text[i++];
      scrollToBottom();
      if (i >= text.length) {
        clearInterval(iv);
        sendBtn.classList.remove('waiting');
      }
    }, charDelay);
  }

  function appendBubble(role, text) {
    const el = document.createElement('div');
    el.className = `splash-msg splash-msg-${role === 'user' ? 'user' : 'ai'}`;
    el.textContent = text;
    msgsEl.appendChild(el);
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => { msgsEl.scrollTop = msgsEl.scrollHeight; }, 20);
  }

  function dismiss() {
    splashEl.removeEventListener('wheel', onScroll);
    splashEl.removeEventListener('touchstart', onTouchStart);
    splashEl.removeEventListener('touchmove', onTouchMove);
    splashEl.classList.add('dismissed');
    document.body.classList.remove('splash-open');
  }

  function onScroll(e) { if (e.deltaY > 10) dismiss(); }
  let touchStartY = 0;
  function onTouchStart(e) { touchStartY = e.touches[0].clientY; }
  function onTouchMove(e) { if (touchStartY - e.touches[0].clientY > 30) dismiss(); }
});

/* ─── CHAT DATA ──────────────────────────────────────────────── */
const SUBJECTS = {
  rena: {
    name: "Rena",
    initials: "R",
    meta: "Sophomore · Columbia University\nNew York City",
    prompts: [
      {
        user: "I've been feeling really overwhelmed lately. Being away from family makes everything harder.",
        ai: "That makes a lot of sense. Being far from the people who know you most — especially in a place as fast-paced and competitive as New York — can create a kind of emotional static that's hard to describe to anyone around you. Everything feels heavier without that baseline anchor. What's been weighing on you most lately?"
      },
      {
        user: "There's someone I keep going back and forth about. I think I'm just overthinking it.",
        ai: "The fact that you're aware of the overthinking is actually significant — it means part of you already senses that the analysis has outpaced the feeling. When we can't stop turning something over, it's often because we're working up to a conclusion we already know. What does your gut say, underneath all the back and forth?"
      },
      {
        user: "I just wish I had someone to talk to who isn't busy. Everyone is always busy.",
        ai: "I hear that. There's something quietly exhausting about having things you need to say and no natural opening to say them — especially when the people around you are running on the same packed schedule. You don't always need advice. Sometimes you just need somewhere to put it all down. I'm here."
      }
    ]
  },
  nawal: {
    name: "Nawal",
    initials: "N",
    meta: "First Year · University of Toronto\nMississauga, Ontario",
    prompts: [
      {
        user: "I've been thinking about whether I want to stay at my university. It feels really isolating here.",
        ai: "That's a significant thing to sit with, especially in your first year. A campus that feels more academically focused than socially connected can create a kind of low-grade loneliness that's easy to dismiss but hard to ignore. Are you questioning the place, the program, or something deeper — like whether this path feels right at all?"
      },
      {
        user: "I'm scared that if I make the wrong choice I'll end up unsuccessful. By 25 I want to have a stable life.",
        ai: "That fear is completely understandable — and it's doing something sneaky: it frames every option except 'stay' as failure, which makes it impossible to think clearly. People reroute all the time and still land somewhere meaningful and stable. The question isn't 'will I ruin everything?' It's 'what do I actually need right now to move forward?' What would enough look like, even if it wasn't perfect?"
      },
      {
        user: "I just don't think my friends would understand. They'd have opinions.",
        ai: "That's one of the things that's different here. I don't have a stake in what you decide. I'm not worried about losing you, or subconsciously steering you toward what would be easiest for me. You can think out loud without managing anyone's reaction in return. What's the version of this decision you're most afraid to say out loud?"
      }
    ]
  },
  cici: {
    name: "Cici",
    initials: "C",
    meta: "Master's Student · Columbia University\nNew York City (from China)",
    prompts: [
      {
        user: "I need to vent. My friend got way more upset about my situation than I even did.",
        ai: "That's a quietly exhausting dynamic — you come to someone to process something, and suddenly you're managing their emotional reaction on top of your own. It flips the whole purpose. It sounds like you already know how you feel about what happened. Do you want to walk through it, or do you mostly just need somewhere to put it down?"
      },
      {
        user: "Honestly ChatGPT is easier. Friends are always bringing their own feelings into it.",
        ai: "There's something real in that. Not because your friends don't care — but because caring comes with its own weight, and sometimes you don't need someone else's feelings added to yours. You just need clarity. The things you're carrying don't always need to be witnessed by someone who loves you. Sometimes they just need to be said."
      },
      {
        user: "I already know what I'm going to do. I just needed to think it through.",
        ai: "Then you've done the work. The clarity you're describing — where the answer was already there but needed space to surface — that's real. You don't always need advice. Sometimes you just need a place to think without it echoing back louder than it left. You can close this now."
      }
    ]
  }
};

/* ─── MAP + CHAT INIT ────────────────────────────────────────── */
(function initMapAndChat() {
  const modal    = document.getElementById('chat-modal');
  const backBtn  = document.getElementById('chat-back');
  const messagesEl = document.getElementById('chat-messages');
  const inputArea  = document.getElementById('chat-input-area');
  const avatarEl   = document.getElementById('chat-avatar');
  const nameEl     = document.getElementById('chat-name');
  const metaEl     = document.getElementById('chat-meta');

  let currentSubject = null;
  let promptIndex = 0;

  /* Open modal */
  function openChat(subjectKey) {
    const s = SUBJECTS[subjectKey];
    currentSubject = subjectKey;
    promptIndex = 0;
    messagesEl.innerHTML = '';
    avatarEl.textContent = s.initials;
    nameEl.textContent   = s.name;
    metaEl.textContent   = s.meta;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderPrompts(s);
  }

  /* Close modal */
  function closeChat() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentSubject = null;
  }

  /* Render available prompt chips */
  function renderPrompts(s) {
    if (promptIndex >= s.prompts.length) {
      inputArea.innerHTML = '<p class="chat-done-note">End of conversation. Press ← Back to return.</p>';
      return;
    }
    const chip = document.createElement('div');
    chip.className = 'chat-prompts';

    const label = document.createElement('div');
    label.className = 'chat-input-label';
    label.textContent = 'Send a message';

    const btn = document.createElement('button');
    btn.className = 'prompt-chip';
    btn.textContent = s.prompts[promptIndex].user;
    btn.addEventListener('click', () => sendMessage(s, promptIndex));

    chip.appendChild(label);
    chip.appendChild(btn);
    inputArea.innerHTML = '';
    inputArea.appendChild(chip);
  }

  /* Send a message and show AI response */
  function sendMessage(s, idx) {
    const turn = s.prompts[idx];

    /* Disable chips immediately */
    inputArea.querySelectorAll('.prompt-chip').forEach(c => c.classList.add('sent'));

    /* User bubble */
    appendMessage('user', s.name, turn.user);

    /* Typing indicator */
    const typingRow = document.createElement('div');
    typingRow.className = 'msg-row';
    typingRow.innerHTML = `
      <div class="msg-avatar ai-av">AI</div>
      <div class="msg-body">
        <div class="msg-sender">ChatGPT</div>
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>`;
    messagesEl.appendChild(typingRow);
    scrollMessages();

    /* AI response after delay */
    const delay = 1200 + turn.ai.length * 6;
    setTimeout(() => {
      typingRow.remove();
      appendMessage('ai', 'ChatGPT', turn.ai);
      promptIndex = idx + 1;
      renderPrompts(s);
      scrollMessages();
    }, Math.min(delay, 4000));
  }

  function appendMessage(role, sender, text) {
    const row = document.createElement('div');
    row.className = `msg-row ${role === 'user' ? 'user-row' : ''}`;
    row.innerHTML = `
      <div class="msg-avatar ${role === 'user' ? 'user-av' : 'ai-av'}">${role === 'user' ? SUBJECTS[currentSubject].initials : 'AI'}</div>
      <div class="msg-body">
        <div class="msg-sender">${sender}</div>
        <div class="msg-text">${text}</div>
      </div>`;
    messagesEl.appendChild(row);
  }

  function scrollMessages() {
    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
  }

  /* Wire map dots */
  document.querySelectorAll('.map-dot-group').forEach(dot => {
    dot.addEventListener('click', () => openChat(dot.dataset.subject));
  });

  /* Back button */
  backBtn.addEventListener('click', closeChat);

  /* Esc key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeChat();
  });

  /* Star field on map canvas */
  function drawStars() {
    const wrap = document.querySelector('.map-canvas-wrap');
    const canvas = document.getElementById('map-stars');
    if (!wrap || !canvas) return;
    const w = wrap.offsetWidth;
    const h = wrap.offsetHeight;
    canvas.width  = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.2;
      const alpha = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${alpha})`;
      ctx.fill();
    }
  }

  window.addEventListener('load', drawStars);
  window.addEventListener('resize', drawStars);
})();

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
    feelsDifferent: "Quicker, I feel it's more 'objective' and less subject to bias.",
    barriers: "We don't have enough time to talk."
  },
  {
    id: 1,
    interactions: ["recap of your day", "help with decision-making", "advice on social situations", "advice on life problems", "venting/a listening ear"],
    validate: 9, better: 8,
    feelsDifferent: "I can explain the whole situation with all the minute details in a way I can't in person due to time constraints. AI has allegiance to no one but the database it serves.",
    barriers: "My friends are friends with people who I vent to AI about and also are liable to judge me."
  },
  {
    id: 2,
    interactions: ["help with decision-making"],
    validate: 1, better: 1,
    feelsDifferent: "I can stop whenever I feel like it.",
    barriers: "I know it doesn't care or have actual emotional reactions because it's literally a bot. If I open up it doesn't feel like anyone is actually learning about me."
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
    feelsDifferent: "More convenient and readily available — I don't need to organize myself before expressing.",
    barriers: "You're not burdening the AI like you would a friend or therapist, and you're not bringing it down emotionally because it doesn't have emotions."
  },
  {
    id: 5,
    interactions: ["advice on life problems"],
    validate: 8, better: 7,
    feelsDifferent: "Use it rarely and only for hyper specific scenarios where I want advice and feel awkward talking to friends. AI is nonjudgmental and quite helpful.",
    barriers: "I'm less embarrassed to admit things to AI because it's not a person. It's also helpful in social situations where I want a completely objective viewpoint."
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
      <div class="legend-icon">${def.svg}</div>
      <span>${def.label}</span>
    </div>`).join('');
}

function buildStickFigure(p, index) {
  const name = shuffledNames[index % shuffledNames.length];
  const tags = p.interactions.map(i => `<span class="sf-tag">${i}</span>`).join('');
  const tooltip = `
    <div class="cluster-tooltip">
      <div class="tooltip-tags">${tags}</div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-scores">
        ${buildScoreBar('Validates feelings', p.validate)}
        ${buildScoreBar('Makes feel better', p.better)}
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
  return `
    <div class="stick-figure-item">
      <div class="stick-figure-wrap" role="button" tabindex="0" aria-label="Hover to see ${name}'s responses">
        <svg class="stick-svg" viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2">
          <circle cx="20" cy="11" r="8"/>
          <line x1="20" y1="19" x2="20" y2="50"/>
          <line x1="20" y1="30" x2="7"  y2="43"/>
          <line x1="20" y1="30" x2="33" y2="43"/>
          <line x1="20" y1="50" x2="10" y2="70"/>
          <line x1="20" y1="50" x2="30" y2="70"/>
        </svg>
        <span class="stick-name">${name.split(' ')[0]}</span>
        ${tooltip}
      </div>
    </div>`;
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Legend + Stage (portrait section removed from HTML; guards kept for safety) */
  const legendContainer = document.getElementById('legend-container');
  if (legendContainer) legendContainer.innerHTML = buildLegend();

  const stage = document.getElementById('stage');
  if (stage) {
    PARTICIPANTS.forEach((p, i) => {
      if (i > 0 && i % 3 === 0) {
        stage.insertAdjacentHTML('beforeend',
          `<div class="chapter-divider"><span>· · ·</span></div>`);
      }
      stage.insertAdjacentHTML('beforeend', buildCluster(p, i));
    });
  }

  document.querySelectorAll('.icon-cluster').forEach(cluster => {
    cluster.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        const isOpen = cluster.classList.contains('tooltip-visible');
        document.querySelectorAll('.icon-cluster').forEach(c => c.classList.remove('tooltip-visible'));
        if (!isOpen) cluster.classList.add('tooltip-visible');
      }
    });
  });

  /* Stick figure portraits */
  const stickGrid = document.getElementById('stick-grid');
  if (stickGrid) {
    PARTICIPANTS.forEach((p, i) => {
      stickGrid.insertAdjacentHTML('beforeend', buildStickFigure(p, i));
    });
  }

  document.querySelectorAll('.stick-figure-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        const isOpen = wrap.classList.contains('tooltip-visible');
        document.querySelectorAll('.stick-figure-wrap').forEach(w => w.classList.remove('tooltip-visible'));
        if (!isOpen) wrap.classList.add('tooltip-visible');
      }
    });
  });

  /* ── Chart initializers — called lazily when figure enters viewport ── */
  const chartInited = {};

  function initTypeChart() {
    if (chartInited.typeChart) return;
    chartInited.typeChart = true;
    new Chart(document.getElementById('typeChart'), {
      type: 'bar',
      data: {
        labels: ['Decision-making', 'Social advice', 'Personal problems', 'Venting', 'Casual chat', 'Day recap', 'Other'],
        datasets: [{
          label: 'Respondents',
          data: [16, 10, 8, 7, 7, 5, 5],
          backgroundColor: ['#7F77DD', '#4a8fc0', '#4a8fc0', '#4a8fc0', '#4a8fc0', '#4a8fc0', '#6b7280'],
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
          tooltip: { callbacks: { label: ctx => ` ${ctx.raw} out of 23 respondents` } }
        },
        scales: {
          x: {
            max: 23,
            ticks: { stepSize: 5, color: '#9ab4cc', font: { family: 'DM Sans', size: 12 } },
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
  }

  function initReasonsChart() {
    if (chartInited.reasonsChart) return;
    chartInited.reasonsChart = true;
    new Chart(document.getElementById('reasonsChart'), {
      type: 'bar',
      data: {
        labels: ['Non-judgmental', 'Always available', "Won't burden emotionally", 'Less subject to bias', 'Private / no social risk'],
        datasets: [{
          label: 'Respondents',
          data: [8, 7, 5, 3, 3],
          backgroundColor: ['#7F77DD', '#4a8fc0', '#4a8fc0', '#4a8fc0', '#4a8fc0'],
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
          tooltip: { callbacks: { label: ctx => ` ${ctx.raw} out of 23 respondents` } }
        },
        scales: {
          x: {
            max: 23,
            ticks: { stepSize: 5, color: '#9ab4cc', font: { family: 'DM Sans', size: 12 } },
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
  }

  /* Scroll reveal — figures and cluster rows; init charts on entry */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'fig-types')   initTypeChart();
        if (entry.target.id === 'fig-reasons') initReasonsChart();
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .cluster-row').forEach(el => revealObs.observe(el));

  /* Prose text — fade in once as you scroll to it (one-way, no flicker).
     Only targets direct <p> children of .prose so nested figure content
     (e.g. chat bubbles) isn't hidden and doesn't need scrolling to appear. */
  const textObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        textObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.prose > p, .prose .section-hed').forEach(el => {
    el.classList.add('reveal-text');
    textObs.observe(el);
  });

  /* ── Scale score bars ──────────────────────────────────────── */
  const scaleScores = [
    { label: "Likely to continue using AI",      val: 5.3, color: '#5DCAA5' },
    { label: "Validates feelings / uplifts mood", val: 5.2, color: '#7F77DD' },
    { label: "AI offers useful advice",           val: 4.9, color: '#4a8fc0' },
    { label: "AI mirrors your speech",            val: 4.5, color: '#D4537E' },
    { label: "AI remembers past conversations",   val: 3.8, color: '#888780' },
    { label: "Feels emotionally heard",           val: 2.9, color: '#EF9F27' }
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
