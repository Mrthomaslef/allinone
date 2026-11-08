// Pokémon : À Toi de jouer ! (Play It! VF 2000) — Engine & UI Controller
// Built with 100% genuine extracted assets from PlayIt!.exe & Resources/*.pak

const DATA = window.POKEMON_PLAY_IT_DATA || { cards: [], decks: [], strings: [], tipsTitles: [], tipsBodies: [] };
const CARDS_BY_KEY = {};
DATA.cards.forEach((c) => {
  CARDS_BY_KEY[c.key] = c;
});

const VIEW_BACKGROUNDS = {
  menu: "assets/ui/main.png",
  arena: "assets/ui/arena.png",
  lessons: "assets/ui/lesson.png",
  builder: "assets/ui/build_background.png",
  collector: "assets/ui/collect_background.png",
  pokedex: "assets/ui/help_background.png"
};

const TYPE_COLORS = {
  0: "#b45309", // Combat
  1: "#dc2626", // Feu
  2: "#16a34a", // Plante
  3: "#eab308", // Électrik
  4: "#9333ea", // Psy
  5: "#2563eb", // Eau
  6: "#64748b"  // Incolore
};

const TYPE_ICONS = {
  0: "🥊",
  1: "🔥",
  2: "🌿",
  3: "⚡",
  4: "🔮",
  5: "💧",
  6: "⭐"
};

let currentView = "menu";
let selectedInspectorCard = CARDS_BY_KEY[4] || DATA.cards[0];
let bgmEnabled = false;
let currentBuilderCards = [];

// Battle State
let duel = null;

function initApp() {
  populateDeckSelectors();
  inspectCardByKey(4); // Dracaufeu Set de Base #4
  renderCollectorGrid();
  renderLessonsGrid();
  renderPokedexAndTips();

  // Default deck in builder
  const firstAdv = DATA.decks.find((d) => d.cardCount === 60) || DATA.decks[0];
  if (firstAdv) {
    loadDeckInBuilder(firstAdv.id);
  }
  startNewDuel();
}

function switchView(viewName) {
  currentView = viewName;
  document.querySelectorAll(".screen-view").forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  const screen = document.getElementById("gameScreen");
  if (screen && VIEW_BACKGROUNDS[viewName]) {
    screen.style.backgroundImage = `url('${VIEW_BACKGROUNDS[viewName]}')`;
  }

  // Update BGM suggestion if music is on
  const trackMap = {
    menu: "assets/music/Menu1.mp3",
    arena: "assets/music/Play1.mp3",
    lessons: "assets/music/Lesson1.mp3",
    builder: "assets/music/Builder.mp3",
    collector: "assets/music/Collector.mp3",
    pokedex: "assets/music/Submenu.mp3"
  };
  if (bgmEnabled && trackMap[viewName]) {
    const sel = document.getElementById("bgmSelect");
    if (sel) sel.value = trackMap[viewName];
    changeBgmTrack(trackMap[viewName]);
  }

  const julieWelcome = {
    menu: "Bienvenue sur l'écran TV principal de <b>Pokémon : À Toi de jouer !</b> Choisis une activité sur le téléviseur ou via la barre du haut.",
    arena: "C'est l'heure du duel ! Pose un Pokémon de base, attache une carte Énergie par tour et attaque pour remporter tes 4 cartes Récompense !",
    lessons: "Choisis une leçon officielle ou un défi QuickPlay de Juliette pour t'entraîner avec les decks préconstruits du jeu original.",
    builder: "Voici l'atelier de création de Deck ! Tu peux charger les 38 decks officiels de Wizards of the Coast ou composer le tien.",
    collector: "Explore l'intégralité des <b>241 cartes françaises</b> (Set de Base, Jungle, Fossile et Team Rocket) extraites de <code>Cards.pak</code>.",
    pokedex: "Retrouve ici les 40 fiches d'astuces officielles de <code>tips.bin</code> et les dialogues français de <code>pokestrings.bin</code>."
  };
  if (julieWelcome[viewName]) {
    setJulieSpeech(julieWelcome[viewName]);
  }
}

function setJulieSpeech(html) {
  const el = document.getElementById("julieSpeechText");
  if (el) el.innerHTML = html;
}

function playSfx(path) {
  const sfx = document.getElementById("sfxAudio");
  if (!sfx) return;
  sfx.src = path;
  sfx.volume = 0.75;
  sfx.play().catch(() => {});
}

function playRandomFrenchVoice() {
  const samples = [
    "assets/voices/00100.wav",
    "assets/voices/00200.wav",
    "assets/voices/05070.wav",
    "assets/voices/06000.wav",
    "assets/voices/06010.wav"
  ];
  const pick = samples[Math.floor(Math.random() * samples.length)];
  playSfx(pick);
}

function toggleBgm() {
  const bgm = document.getElementById("bgmAudio");
  const btn = document.getElementById("bgmToggleBtn");
  const sel = document.getElementById("bgmSelect");
  if (!bgm) return;
  bgmEnabled = !bgmEnabled;
  if (bgmEnabled) {
    bgm.src = sel.value || "assets/music/Menu1.mp3";
    bgm.volume = 0.45;
    bgm.play().catch(() => {});
    btn.textContent = "🔊 Musique: ON";
  } else {
    bgm.pause();
    btn.textContent = "🔇 Musique: OFF";
  }
}

function changeBgmTrack(src) {
  const bgm = document.getElementById("bgmAudio");
  const btn = document.getElementById("bgmToggleBtn");
  if (!bgm) return;
  bgm.src = src;
  bgmEnabled = true;
  bgm.volume = 0.45;
  bgm.play().catch(() => {});
  if (btn) btn.textContent = "🔊 Musique: ON";
}

function inspectCardByKey(key) {
  const card = CARDS_BY_KEY[key];
  if (!card) return;
  selectedInspectorCard = card;

  const img = document.getElementById("zoomCardImg");
  const meta = document.getElementById("zoomCardMeta");
  if (img) img.src = card.imageLarge;

  if (!meta) return;
  let html = `
    <h4>
      <span>${card.name}</span>
      <span class="badge">${card.setName} #${card.cardNumber}</span>
    </h4>
    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
      <span class="badge">${card.rarityName || ""}</span>
  `;

  if (card.kind === "pokemon") {
    const icon = TYPE_ICONS[card.energyType] || "⭐";
    const stageLabel = card.stage === 0 ? "Pokémon de Base" : `Niveau ${card.stage}`;
    html += `
      <span class="badge" style="background:${TYPE_COLORS[card.energyType] || '#334155'}">${icon} ${card.energyTypeName}</span>
      <span class="badge">❤️ ${card.hp} PV</span>
      <span class="badge">${stageLabel}</span>
      <span class="badge">N° Pokédex #${String(card.pokedex).padStart(3, "0")}</span>
    </div>
    <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px;">
      Faiblesse : <b>${card.weaknessName}</b> • Résistance : <b>${card.resistanceName}${card.resistanceAmount ? ` (-${card.resistanceAmount})` : ""}</b> • Coût Retraite : <b>${card.retreatCost}</b>
    </div>
    `;
    if (card.attacks && card.attacks.length > 0) {
      html += `<div style="font-weight:700; color:#e2e8f0; margin-top:4px;">Attaques :</div>`;
      card.attacks.forEach((atk) => {
        const flipBadge = atk.coinFlips > 0 ? ` 🪙x${atk.coinFlips}` : "";
        html += `
          <div class="atk-row">
            <div>
              <b>${atk.name}</b>${flipBadge}
              <div style="font-size:0.7rem; color:#94a3b8;">Coût : ${atk.coloredCost} ${icon} + ${atk.colorlessCost} ⭐ (${atk.totalCost} Énergies)</div>
            </div>
            <strong style="color:var(--gold); font-size:0.9rem;">${atk.damage > 0 ? atk.damage + " dég." : "Effet"}</strong>
          </div>
        `;
      });
    }
    html += `<div style="margin-top:8px;"><button class="btn-secondary" style="width:100%;" onclick="playCurrentCardCry()">🔊 Écouter le cri original (#${String(card.pokedex).padStart(3, "0")}.wav)</button></div>`;
  } else if (card.kind === "trainer") {
    html += `<span class="badge" style="background:#0284c7;">Carte Dresseur</span></div>`;
    html += `<p style="font-size:0.76rem; color:#cbd5e1; margin:4px 0;">Carte Dresseur officielle de l'extension <b>${card.setName}</b>. Jouable pendant ton tour avant d'attaquer.</p>`;
  } else if (card.kind === "energy") {
    const icon = TYPE_ICONS[card.energyType] || "⭐";
    html += `<span class="badge" style="background:${TYPE_COLORS[card.energyType] || '#334155'}">${icon} Fournit ${card.energyAmount}x Énergie ${card.energyTypeName}</span></div>`;
  }

  meta.innerHTML = html;
}

function playCurrentCardCry() {
  if (!selectedInspectorCard || selectedInspectorCard.kind !== "pokemon") return;
  const dex = Math.min(151, Math.max(1, selectedInspectorCard.pokedex || 1));
  const wav = `assets/battle/${String(dex).padStart(3, "0")}.wav`;
  playSfx(wav);
}

// ==========================================
// COLLECTOR VIEW (241 Cards)
// ==========================================
function renderCollectorGrid() {
  const q = (document.getElementById("collectorSearch")?.value || "").trim().toLowerCase();
  const setFilter = document.getElementById("collectorSetFilter")?.value || "all";
  const typeFilter = document.getElementById("collectorTypeFilter")?.value || "all";
  const grid = document.getElementById("collectorGrid");
  const badge = document.getElementById("collectorCountBadge");
  if (!grid) return;

  const filtered = DATA.cards.filter((c) => {
    if (q && !c.name.toLowerCase().includes(q)) return false;
    if (setFilter !== "all" && String(c.setId) !== setFilter) return false;
    if (typeFilter === "pokemon" && c.kind !== "pokemon") return false;
    if (typeFilter === "trainer" && c.kind !== "trainer") return false;
    if (typeFilter === "energy" && c.kind !== "energy") return false;
    if (typeFilter.startsWith("type_")) {
      const t = Number(typeFilter.split("_")[1]);
      if (c.energyType !== t) return false;
    }
    return true;
  });

  if (badge) badge.textContent = `${filtered.length} carte${filtered.length > 1 ? "s" : ""}`;

  grid.innerHTML = filtered
    .map((c) => {
      const sub = c.kind === "pokemon" ? `${TYPE_ICONS[c.energyType] || ""} ${c.hp} PV` : c.setName;
      return `
        <div class="grid-card-item" onclick="inspectCardByKey(${c.key})">
          <img src="${c.imageSmall}" alt="${c.name}" loading="lazy" />
          <div class="cname">${c.name}</div>
          <div style="font-size:0.65rem; color:#94a3b8;">${sub}</div>
        </div>
      `;
    })
    .join("");
}

// ==========================================
// LESSONS & QUICKPLAY CHALLENGES
// ==========================================
function renderLessonsGrid() {
  const grid = document.getElementById("lessonsGrid");
  if (!grid) return;

  grid.innerHTML = DATA.decks
    .map((d) => {
      const sampleKeys = [...new Set(d.cards)].slice(0, 4);
      const previews = sampleKeys
        .map((k) => {
          const c = CARDS_BY_KEY[k];
          return c ? `<img src="${c.imageSmall}" style="width:38px; height:52px; border-radius:3px;" title="${c.name}" />` : "";
        })
        .join("");

      return `
        <div class="grid-card-item" style="align-items:flex-start; padding:10px; gap:6px;" onclick="launchLessonDeck('${d.id}')">
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
            <strong style="color:var(--gold); font-size:0.86rem;">${d.name}</strong>
            <span class="badge">${d.cardCount} cartes</span>
          </div>
          <div style="font-size:0.72rem; color:#94a3b8;">Catégorie : ${d.category}</div>
          <div style="display:flex; gap:4px; margin-top:4px;">${previews}</div>
          <button class="btn-action" style="width:100%; margin-top:4px;">⚔️ Lancer ce match contre Juliette</button>
        </div>
      `;
    })
    .join("");
}

function launchLessonDeck(deckId) {
  const sel = document.getElementById("arenaDeckSelect");
  if (sel) sel.value = deckId;
  switchView("arena");
  startNewDuel();
}

// ==========================================
// DECK BUILDER
// ==========================================
function populateDeckSelectors() {
  const arenaSel = document.getElementById("arenaDeckSelect");
  const builderSel = document.getElementById("builderDeckSelect");

  // Prioritize full playable decks first
  const sortedDecks = [...DATA.decks].sort((a, b) => b.cardCount - a.cardCount);
  const optionsHtml = sortedDecks
    .map((d) => `<option value="${d.id}">${d.name} (${d.category} — ${d.cardCount} cartes)</option>`)
    .join("");

  if (arenaSel) arenaSel.innerHTML = optionsHtml;
  if (builderSel) builderSel.innerHTML = optionsHtml;
}

function loadDeckInBuilder(deckId) {
  const deck = DATA.decks.find((d) => d.id === deckId) || DATA.decks[0];
  if (!deck) return;
  currentBuilderCards = [...deck.cards];
  renderBuilderDeckList();
  renderBuilderCatalog();
}

function renderBuilderDeckList() {
  const container = document.getElementById("builderCurrentList");
  const stats = document.getElementById("builderDeckStats");
  if (!container) return;

  if (stats) {
    stats.textContent = `Cartes dans le deck : ${currentBuilderCards.length} / 60`;
  }

  const counts = {};
  currentBuilderCards.forEach((k) => {
    counts[k] = (counts[k] || 0) + 1;
  });

  const uniqueKeys = Object.keys(counts).map(Number);
  container.innerHTML = uniqueKeys
    .map((k) => {
      const c = CARDS_BY_KEY[k];
      if (!c) return "";
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px; border-bottom:1px solid #1e293b; cursor:pointer;"
             onclick="removeCardFromBuilder(${k})"
             onmouseenter="inspectCardByKey(${k})">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge" style="background:#2563eb;">${counts[k]}x</span>
            <span style="font-size:0.78rem; font-weight:700;">${c.name}</span>
          </div>
          <span style="font-size:0.7rem; color:#f87171;">Retirer −</span>
        </div>
      `;
    })
    .join("");
}

function renderBuilderCatalog() {
  const q = (document.getElementById("builderSearchInput")?.value || "").trim().toLowerCase();
  const grid = document.getElementById("builderCatalogGrid");
  if (!grid) return;

  const list = DATA.cards.filter((c) => !q || c.name.toLowerCase().includes(q));
  grid.innerHTML = list
    .map(
      (c) => `
      <div class="grid-card-item" onclick="addCardToBuilder(${c.key})" onmouseenter="inspectCardByKey(${c.key})">
        <img src="${c.imageSmall}" alt="${c.name}" loading="lazy" style="width:62px; height:86px;" />
        <div class="cname">${c.name}</div>
      </div>
    `
    )
    .join("");
}

function addCardToBuilder(key) {
  const c = CARDS_BY_KEY[key];
  if (!c) return;
  if (currentBuilderCards.length >= 60) {
    setJulieSpeech("Ton deck contient déjà <b>60 cartes</b> ! Retire une carte avant d'en ajouter une nouvelle.");
    return;
  }
  const existingCount = currentBuilderCards.filter((k) => k === key).length;
  if (!c.isBasicEnergy && existingCount >= 4) {
    setJulieSpeech(`La règle du JCC Pokémon limite <b>${c.name}</b> à 4 exemplaires maximum par deck !`);
    return;
  }
  currentBuilderCards.push(key);
  renderBuilderDeckList();
}

function removeCardFromBuilder(key) {
  const idx = currentBuilderCards.indexOf(key);
  if (idx !== -1) {
    currentBuilderCards.splice(idx, 1);
    renderBuilderDeckList();
  }
}

function clearCustomDeck() {
  currentBuilderCards = [];
  renderBuilderDeckList();
}

function playCurrentBuilderDeck() {
  if (currentBuilderCards.length < 15) {
    setJulieSpeech("Ajoute au moins 15 cartes (avec des Pokémon de Base et des Énergies) pour lancer une partie !");
    return;
  }
  let custom = DATA.decks.find((d) => d.id === "custom_builder");
  if (!custom) {
    custom = {
      id: "custom_builder",
      name: "Mon Deck Personnalisé",
      category: "Personnalisé",
      cardCount: currentBuilderCards.length,
      cards: [...currentBuilderCards]
    };
    DATA.decks.unshift(custom);
    populateDeckSelectors();
  } else {
    custom.cards = [...currentBuilderCards];
    custom.cardCount = currentBuilderCards.length;
  }
  const sel = document.getElementById("arenaDeckSelect");
  if (sel) sel.value = "custom_builder";
  switchView("arena");
  startNewDuel();
}

// ==========================================
// POKEDEX & TIPS VIEW
// ==========================================
function renderPokedexAndTips() {
  const tipsBox = document.getElementById("tipsListContainer");
  const strBox = document.getElementById("stringsListContainer");

  if (tipsBox) {
    const bodyMap = {};
    (DATA.tipsBodies || []).forEach((b) => {
      bodyMap[b.id] = b.body;
    });
    tipsBox.innerHTML = `<h4 style="margin:4px 0 8px; color:var(--gold);">💡 Les 40 Astuces du Professeur & Juliette (tips.bin)</h4>` +
      DATA.tipsTitles
        .map((t) => {
          const body = bodyMap[t.id] || "";
          return `
            <div style="background:rgba(30,41,59,0.75); border-left:3px solid var(--gold); padding:8px; margin-bottom:8px; border-radius:4px;">
              <div style="font-weight:800; font-size:0.82rem; color:#fef08a;">#${t.id + 1} — ${t.title}</div>
              <div style="font-size:0.76rem; color:#e2e8f0; margin-top:4px; line-height:1.35;">${body}</div>
            </div>
          `;
        })
        .join("");
  }

  if (strBox) {
    strBox.innerHTML = `<h4 style="margin:4px 0 8px; color:var(--gold);">💬 Dialogues Officiels VF de Juliette (pokestrings.bin)</h4>` +
      DATA.strings
        .slice(0, 120)
        .map(
          (s) => `
          <div style="padding:5px 6px; border-bottom:1px solid #1e293b; font-size:0.75rem;">
            <span class="badge" style="margin-right:6px;">ID ${s.id}</span>
            <span style="color:#cbd5e1;">${s.text}</span>
          </div>
        `
        )
        .join("");
  }
}

// ==========================================
// ARENA DUEL ENGINE (Player vs Juliette AI)
// ==========================================
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeBattlePokemon(card) {
  return {
    cardKey: card.key,
    card: card,
    hp: card.hp,
    maxHp: card.hp,
    energies: [], // array of energyType numbers
    status: null  // "Endormi", "Paralysé", "Confus", "Empoisonné"
  };
}

function drawHandWithBasic(deckKeys) {
  for (let attempt = 0; attempt < 25; attempt++) {
    const shuffled = shuffleArray(deckKeys);
    const hand = shuffled.slice(0, 7);
    const hasBasic = hand.some((k) => {
      const c = CARDS_BY_KEY[k];
      return c && c.kind === "pokemon" && c.stage === 0;
    });
    if (hasBasic) {
      return { hand, deck: shuffled.slice(7) };
    }
  }
  const shuffled = shuffleArray(deckKeys);
  return { hand: shuffled.slice(0, 7), deck: shuffled.slice(7) };
}

function startNewDuel() {
  const sel = document.getElementById("arenaDeckSelect");
  const chosenId = sel?.value;
  const playerDeckObj = DATA.decks.find((d) => d.id === chosenId) || DATA.decks.find((d) => d.cardCount >= 40) || DATA.decks[0];

  // Pick a balanced opponent deck for Juliette
  const aiDecks = DATA.decks.filter((d) => d.cardCount >= 40 && d.id !== playerDeckObj.id);
  const aiDeckObj = aiDecks[Math.floor(Math.random() * aiDecks.length)] || playerDeckObj;

  const pInit = drawHandWithBasic(playerDeckObj.cards);
  const aiInit = drawHandWithBasic(aiDeckObj.cards);

  const prizeCount = Math.min(4, Math.max(1, Math.floor(pInit.deck.length / 6)));

  duel = {
    turn: 1,
    activePlayer: "player",
    energyPlayedThisTurn: false,
    gameOver: false,
    player: {
      deckName: playerDeckObj.name,
      hand: pInit.hand,
      deck: pInit.deck.slice(prizeCount),
      prizes: pInit.deck.slice(0, prizeCount),
      active: null,
      bench: []
    },
    ai: {
      deckName: aiDeckObj.name,
      hand: aiInit.hand,
      deck: aiInit.deck.slice(prizeCount),
      prizes: aiInit.deck.slice(0, prizeCount),
      active: null,
      bench: []
    }
  };

  // Auto-place first basic Pokémon for both sides so duel starts immediately in action
  autoDeployOpeningPokemon(duel.player);
  autoDeployOpeningPokemon(duel.ai);

  playSfx("assets/sfx/anim_shuffle.wav");
  setJulieSpeech(
    `Nouvelle partie lancée ! Tu joues <b>${duel.player.deckName}</b> contre mon deck <b>${duel.ai.deckName}</b>. ` +
    `Clique sur une carte de ta main pour poser un Pokémon sur le Banc, attacher une Énergie ou jouer un Dresseur.`
  );
  renderArena();
}

function autoDeployOpeningPokemon(side) {
  const basicIdx = side.hand.findIndex((k) => {
    const c = CARDS_BY_KEY[k];
    return c && c.kind === "pokemon" && c.stage === 0;
  });
  if (basicIdx !== -1) {
    const key = side.hand.splice(basicIdx, 1)[0];
    side.active = makeBattlePokemon(CARDS_BY_KEY[key]);
  }
  // Put up to 2 extra basics on bench for AI
  if (side === duel?.ai) {
    for (let i = 0; i < 2; i++) {
      const bIdx = side.hand.findIndex((k) => {
        const c = CARDS_BY_KEY[k];
        return c && c.kind === "pokemon" && c.stage === 0;
      });
      if (bIdx !== -1 && side.bench.length < 5) {
        const k = side.hand.splice(bIdx, 1)[0];
        side.bench.push(makeBattlePokemon(CARDS_BY_KEY[k]));
      }
    }
  }
}

function renderPokemonSlotHtml(bp, isEmptyLabel = "Vide") {
  if (!bp) {
    return `<span style="font-size:0.65rem; color:#64748b;">${isEmptyLabel}</span>`;
  }
  const dots = bp.energies
    .map((et) => `<span class="energy-dot" style="background:${TYPE_COLORS[et] || '#64748b'}">${TYPE_ICONS[et] || "⭐"}</span>`)
    .join("");
  const statusHtml = bp.status ? `<span class="status-badge">${bp.status}</span>` : "";
  return `
    ${statusHtml}
    <span class="hp-pill">${bp.hp}/${bp.maxHp}</span>
    <img src="${bp.card.imageSmall}" class="slot-card-img" alt="${bp.card.name}" />
    <div class="energy-badges">${dots}</div>
  `;
}

function renderArena() {
  if (!duel) return;

  document.getElementById("playerPrizesCount").textContent = duel.player.prizes.length;
  document.getElementById("aiPrizesCount").textContent = duel.ai.prizes.length;
  document.getElementById("playerDeckCount").textContent = duel.player.deck.length;
  document.getElementById("aiDeckCount").textContent = duel.ai.deck.length;
  document.getElementById("aiHandCount").textContent = duel.ai.hand.length;

  const banner = document.getElementById("turnBanner");
  if (banner) {
    banner.textContent = duel.gameOver
      ? "🏆 Partie Terminée !"
      : duel.activePlayer === "player"
      ? `Tour ${duel.turn} — À toi de jouer !`
      : `Tour ${duel.turn} — Tour de Juliette...`;
  }

  const hint = document.getElementById("turnRulesHint");
  if (hint) {
    hint.textContent = `Énergie jouée ce tour : ${duel.energyPlayedThisTurn ? "1/1 (Max atteint)" : "0/1 (Disponible)"}`;
  }

  // Active slots
  const pActiveEl = document.getElementById("playerActiveSlot");
  const aiActiveEl = document.getElementById("aiActiveSlot");
  if (pActiveEl) pActiveEl.innerHTML = renderPokemonSlotHtml(duel.player.active, "Aucun Actif");
  if (aiActiveEl) aiActiveEl.innerHTML = renderPokemonSlotHtml(duel.ai.active, "Aucun Actif");

  // Bench rows (5 slots)
  const pBenchEl = document.getElementById("playerBenchRow");
  const aiBenchEl = document.getElementById("aiBenchRow");
  if (pBenchEl) {
    let html = "";
    for (let i = 0; i < 5; i++) {
      const bp = duel.player.bench[i];
      html += `<div class="card-slot" onclick="onPlayerBenchClick(${i})" title="Banc #${i + 1}">${renderPokemonSlotHtml(bp, `Banc ${i + 1}`)}</div>`;
    }
    pBenchEl.innerHTML = html;
  }
  if (aiBenchEl) {
    let html = "";
    for (let i = 0; i < 5; i++) {
      const bp = duel.ai.bench[i];
      html += `<div class="card-slot" onclick="onAiBenchClick(${i})" title="Banc Juliette #${i + 1}">${renderPokemonSlotHtml(bp, `Banc ${i + 1}`)}</div>`;
    }
    aiBenchEl.innerHTML = html;
  }

  // Attack Buttons for Player Active Pokémon
  const atkBox = document.getElementById("attackButtonsBox");
  if (atkBox) {
    const active = duel.player.active;
    if (!active || !active.card.attacks || active.card.attacks.length === 0) {
      atkBox.innerHTML = `<span style="font-size:0.72rem; color:#94a3b8; text-align:center;">Pose un Pokémon Actif pour attaquer</span>`;
    } else {
      atkBox.innerHTML = active.card.attacks
        .map((atk, idx) => {
          const canUse = canAffordAttack(active, atk) && duel.activePlayer === "player" && !duel.gameOver;
          const dmgLabel = atk.damage > 0 ? `${atk.damage} dég.` : "Effet";
          return `
            <button class="btn-action" ${canUse ? "" : "disabled"} onclick="executePlayerAttack(${idx})">
              ⚡ ${atk.name} (${dmgLabel}) [${atk.energiesNeeded || atk.totalCost} Én.]
            </button>
          `;
        })
        .join("");
    }
  }

  // Player Hand
  const handEl = document.getElementById("playerHandStrip");
  if (handEl) {
    handEl.innerHTML = duel.player.hand
      .map((k, idx) => {
        const c = CARDS_BY_KEY[k];
        if (!c) return "";
        return `
          <div class="hand-card" onclick="playCardFromPlayerHand(${idx})" onmouseenter="inspectCardByKey(${k})" title="${c.name}">
            <img src="${c.imageSmall}" alt="${c.name}" />
          </div>
        `;
      })
      .join("");
  }
}

function canAffordAttack(bp, atk) {
  if (!bp) return false;
  if (bp.status === "Endormi" || bp.status === "Paralysé") return false;
  const total = bp.energies.length;
  if (total < atk.totalCost) return false;
  if (atk.coloredCost > 0) {
    const matching = bp.energies.filter((e) => e === bp.card.energyType).length;
    if (matching < atk.coloredCost) return false;
  }
  return true;
}

function inspectActive(who) {
  if (!duel) return;
  const target = who === "player" ? duel.player.active : duel.ai.active;
  if (target) {
    inspectCardByKey(target.cardKey);
    playCurrentCardCry();
  }
}

function onPlayerBenchClick(index) {
  if (!duel) return;
  const bp = duel.player.bench[index];
  if (!bp) return;
  inspectCardByKey(bp.cardKey);
  if (!duel.player.active) {
    duel.player.active = duel.player.bench.splice(index, 1)[0];
    setJulieSpeech(`<b>${duel.player.active.card.name}</b> monte au front comme Pokémon Actif !`);
    renderArena();
  }
}

function onAiBenchClick(index) {
  if (!duel) return;
  const bp = duel.ai.bench[index];
  if (bp) inspectCardByKey(bp.cardKey);
}

function playCardFromPlayerHand(handIndex) {
  if (!duel || duel.gameOver || duel.activePlayer !== "player") return;
  const key = duel.player.hand[handIndex];
  const card = CARDS_BY_KEY[key];
  if (!card) return;
  inspectCardByKey(key);

  // 1. Basic Pokémon
  if (card.kind === "pokemon" && card.stage === 0) {
    if (!duel.player.active) {
      duel.player.hand.splice(handIndex, 1);
      duel.player.active = makeBattlePokemon(card);
      playCurrentCardCry();
      setJulieSpeech(`Tu envoies <b>${card.name}</b> comme Pokémon Actif !`);
      renderArena();
      return;
    }
    if (duel.player.bench.length < 5) {
      duel.player.hand.splice(handIndex, 1);
      duel.player.bench.push(makeBattlePokemon(card));
      playCurrentCardCry();
      setJulieSpeech(`Tu places <b>${card.name}</b> sur ton Banc (${duel.player.bench.length}/5).`);
      renderArena();
      return;
    } else {
      setJulieSpeech("Ton Banc est déjà plein (5 Pokémon maximum) !");
      return;
    }
  }

  // 2. Evolution Pokémon (Stage 1 or Stage 2)
  if (card.kind === "pokemon" && card.stage > 0) {
    const canEvolveBp = (bp) =>
      bp &&
      ((card.evolvesFrom && card.evolvesFrom.includes(bp.cardKey)) ||
        (bp.card.stage === card.stage - 1 && bp.card.energyType === card.energyType));

    if (canEvolveBp(duel.player.active)) {
      duel.player.hand.splice(handIndex, 1);
      const oldName = duel.player.active.card.name;
      const dmgTaken = duel.player.active.maxHp - duel.player.active.hp;
      duel.player.active.cardKey = card.key;
      duel.player.active.card = card;
      duel.player.active.maxHp = card.hp;
      duel.player.active.hp = Math.max(10, card.hp - dmgTaken);
      duel.player.active.status = null;
      playSfx("assets/sfx/anim_evolve.wav");
      setJulieSpeech(`✨ Évolution ! Ton <b>${oldName}</b> évolue en <b>${card.name}</b> (${duel.player.active.hp} PV) !`);
      renderArena();
      return;
    }

    const benchIdx = duel.player.bench.findIndex(canEvolveBp);
    if (benchIdx !== -1) {
      duel.player.hand.splice(handIndex, 1);
      const target = duel.player.bench[benchIdx];
      const oldName = target.card.name;
      const dmgTaken = target.maxHp - target.hp;
      target.cardKey = card.key;
      target.card = card;
      target.maxHp = card.hp;
      target.hp = Math.max(10, card.hp - dmgTaken);
      playSfx("assets/sfx/anim_evolve.wav");
      setJulieSpeech(`✨ Ton <b>${oldName}</b> sur le Banc évolue en <b>${card.name}</b> !`);
      renderArena();
      return;
    }

    setJulieSpeech(`Pour jouer <b>${card.name}</b> (Niveau ${card.stage}), tu dois d'abord avoir sa pré-évolution en jeu !`);
    return;
  }

  // 3. Energy Card
  if (card.kind === "energy") {
    if (duel.energyPlayedThisTurn) {
      setJulieSpeech("Rappelle-toi la règle d'or : tu ne peux attacher qu'<b>une seule carte Énergie par tour</b> !");
      return;
    }
    const target = duel.player.active || duel.player.bench[0];
    if (!target) {
      setJulieSpeech("Pose d'abord un Pokémon avant d'attacher une carte Énergie !");
      return;
    }
    duel.player.hand.splice(handIndex, 1);
    const count = card.energyAmount || 1;
    for (let i = 0; i < count; i++) {
      target.energies.push(card.energyType);
    }
    duel.energyPlayedThisTurn = true;
    setJulieSpeech(`Tu attaches <b>${card.name}</b> à <b>${target.card.name}</b> (${target.energies.length} Énergies attachées).`);
    renderArena();
    return;
  }

  // 4. Trainer Card
  if (card.kind === "trainer") {
    duel.player.hand.splice(handIndex, 1);
    executeTrainerCardEffect(card, duel.player, duel.ai);
    renderArena();
  }
}

function executeTrainerCardEffect(card, userSide, oppSide) {
  const cname = card.name.toLowerCase();
  if (cname.includes("léo")) {
    const drawn = userSide.deck.splice(0, 2);
    userSide.hand.push(...drawn);
    setJulieSpeech(` Carte Dresseur <b>Léo</b> : tu pioches 2 cartes supplémentaires !`);
  } else if (cname.includes("potion")) {
    if (userSide.active) {
      const heal = cname.includes("super") ? 40 : 20;
      userSide.active.hp = Math.min(userSide.active.maxHp, userSide.active.hp + heal);
      setJulieSpeech(`💊 <b>${card.name}</b> soigne <b>${userSide.active.card.name}</b> de ${heal} PV !`);
    }
  } else if (cname.includes("guérison")) {
    if (userSide.active) {
      userSide.active.status = null;
      setJulieSpeech(`✨ <b>Guérison Totale</b> : ${userSide.active.card.name} n'a plus d'état spécial !`);
    }
  } else if (cname.includes("suppression")) {
    if (oppSide.active && oppSide.active.energies.length > 0) {
      oppSide.active.energies.pop();
      setJulieSpeech(`⚡ <b>${card.name}</b> retire une carte Énergie au <b>${oppSide.active.card.name}</b> adverse !`);
    } else {
      setJulieSpeech(`Tu joues <b>${card.name}</b>.`);
    }
  } else if (cname.includes("rafale")) {
    if (oppSide.bench.length > 0 && oppSide.active) {
      const swapped = oppSide.bench.shift();
      oppSide.bench.push(oppSide.active);
      oppSide.active = swapped;
      setJulieSpeech(`🌪️ <b>Rafale de vent</b> ! Tu forces <b>${swapped.card.name}</b> à passer Pokémon Actif !`);
    } else {
      setJulieSpeech(`Tu joues <b>${card.name}</b>.`);
    }
  } else if (cname.includes("chen")) {
    const drawn = userSide.deck.splice(0, 3);
    userSide.hand.push(...drawn);
    setJulieSpeech(`👨‍🔬 <b>${card.name}</b> : tu renouvelles ta main avec ${drawn.length} cartes !`);
  } else {
    const drawn = userSide.deck.splice(0, 1);
    userSide.hand.push(...drawn);
    setJulieSpeech(`Tu joues la carte Dresseur <b>${card.name}</b> et pioches 1 carte bonus.`);
  }
}

function calculateDamage(attacker, defender, atk) {
  let dmg = atk.damage || 20;
  let notes = [];

  if (atk.coinFlips > 0) {
    let heads = 0;
    for (let i = 0; i < atk.coinFlips; i++) {
      if (Math.random() < 0.5) heads++;
    }
    if (atk.coinFlips === 1) {
      notes.push(`Pièce : ${heads === 1 ? "FACE" : "PILE"}`);
      if (heads === 0 && dmg === 0) dmg = 0;
    } else {
      dmg = (dmg || 10) * heads;
      notes.push(`${heads}/${atk.coinFlips} Face`);
    }
    const coinLabel = document.getElementById("lastCoinLabel");
    if (coinLabel) coinLabel.textContent = `Pièce: ${heads > 0 ? "FACE" : "PILE"}`;
  }

  if (dmg > 0 && defender) {
    if (defender.card.weakness === attacker.card.energyType) {
      dmg *= 2;
      notes.push("Faiblesse x2 !");
      playSfx("assets/sfx/anim_weakness.wav");
    }
    if (defender.card.resistance === attacker.card.energyType) {
      dmg = Math.max(0, dmg - (defender.card.resistanceAmount || 30));
      notes.push(`Résistance -${defender.card.resistanceAmount || 30}`);
      playSfx("assets/sfx/anim_resistance.wav");
    }
  }
  return { dmg, notes };
}

function executePlayerAttack(atkIndex) {
  if (!duel || duel.gameOver || duel.activePlayer !== "player") return;
  const attacker = duel.player.active;
  const defender = duel.ai.active;
  if (!attacker || !defender) return;

  const atk = attacker.card.attacks[atkIndex];
  if (!atk) return;

  const { dmg, notes } = calculateDamage(attacker, defender, atk);
  defender.hp = Math.max(0, defender.hp - dmg);

  // Status effect
  const statusMap = { 1: "Endormi", 2: "Confus", 4: "Paralysé", 8: "Empoisonné" };
  if (atk.statusEffect && statusMap[atk.statusEffect] && defender.hp > 0) {
    defender.status = statusMap[atk.statusEffect];
    notes.push(`${defender.card.name} est ${defender.status} !`);
  }

  if (atk.discardEnergy > 0) {
    for (let i = 0; i < atk.discardEnergy && attacker.energies.length > 0; i++) {
      attacker.energies.pop();
    }
  }

  let msg = `⚔️ Ton <b>${attacker.card.name}</b> utilise <b>${atk.name}</b> et inflige <b>${dmg} dégâts</b> à ${defender.card.name} !`;
  if (notes.length) msg += ` <i>(${notes.join(", ")})</i>`;

  if (defender.hp <= 0) {
    playSfx("assets/sfx/anim_knockout.wav");
    msg += `<br>💥 <b>${defender.card.name} de Juliette est K.O. !</b> Tu remportes 1 carte Récompense !`;
    if (duel.player.prizes.length > 0) {
      const prizeKey = duel.player.prizes.pop();
      duel.player.hand.push(prizeKey);
    }
    duel.ai.active = duel.ai.bench.shift() || null;
    if (duel.player.prizes.length === 0 || !duel.ai.active) {
      duel.gameOver = true;
      setJulieSpeech(msg + `<br>🏆 <b>FÉLICITATIONS ! Tu as remporté le match contre Juliette !</b>`);
      renderArena();
      return;
    }
  }

  setJulieSpeech(msg);
  renderArena();
  setTimeout(() => endPlayerTurn(), 900);
}

function retreatActivePokemon() {
  if (!duel || duel.gameOver || duel.activePlayer !== "player") return;
  const active = duel.player.active;
  if (!active || duel.player.bench.length === 0) {
    setJulieSpeech("Tu dois avoir au moins un Pokémon sur ton Banc pour battre en retraite !");
    return;
  }
  const cost = active.card.retreatCost || 0;
  if (active.energies.length < cost) {
    setJulieSpeech(`Il te faut <b>${cost} Énergie(s)</b> attachée(s) à ${active.card.name} pour battre en retraite !`);
    return;
  }
  for (let i = 0; i < cost; i++) active.energies.pop();
  active.status = null;
  const replacement = duel.player.bench.shift();
  duel.player.bench.push(active);
  duel.player.active = replacement;
  setJulieSpeech(`🏃 <b>${active.card.name}</b> bat en retraite ! <b>${replacement.card.name}</b> passe Pokémon Actif.`);
  renderArena();
}

function playerDrawCardClick() {
  setJulieSpeech(`Il reste <b>${duel?.player.deck.length || 0} cartes</b> dans ton deck. Tu pioches automatiquement au début de chacun de tes tours.`);
}

function manualCoinFlip() {
  const res = Math.random() < 0.5 ? "FACE (Pikachu)" : "PILE";
  const lbl = document.getElementById("lastCoinLabel");
  if (lbl) lbl.textContent = `Pièce: ${res}`;
  setJulieSpeech(`🪙 Lancer de pièce : <b>${res}</b> !`);
}

function endPlayerTurn() {
  if (!duel || duel.gameOver) return;
  duel.activePlayer = "ai";
  renderArena();

  setTimeout(() => runJulietteAiTurn(), 750);
}

function runJulietteAiTurn() {
  if (!duel || duel.gameOver) return;

  // 1. AI draws 1 card
  if (duel.ai.deck.length > 0) {
    duel.ai.hand.push(duel.ai.deck.shift());
  }

  // 2. Clear temporary paralysis/sleep at turn start
  if (duel.ai.active && (duel.ai.active.status === "Paralysé" || duel.ai.active.status === "Endormi")) {
    duel.ai.active.status = null;
  }

  // 3. Put a basic Pokémon on bench if space
  const bIdx = duel.ai.hand.findIndex((k) => {
    const c = CARDS_BY_KEY[k];
    return c && c.kind === "pokemon" && c.stage === 0;
  });
  if (bIdx !== -1 && duel.ai.bench.length < 5) {
    const k = duel.ai.hand.splice(bIdx, 1)[0];
    duel.ai.bench.push(makeBattlePokemon(CARDS_BY_KEY[k]));
  }

  // 4. Attach energy to AI active Pokémon
  if (duel.ai.active) {
    const eIdx = duel.ai.hand.findIndex((k) => CARDS_BY_KEY[k]?.kind === "energy");
    if (eIdx !== -1) {
      const ek = duel.ai.hand.splice(eIdx, 1)[0];
      const ec = CARDS_BY_KEY[ek];
      duel.ai.active.energies.push(ec.energyType);
    } else {
      // Give AI 1 energy matching its active Pokémon so duel stays dynamic
      duel.ai.active.energies.push(duel.ai.active.card.energyType);
    }
  }

  // 5. AI Attacks if possible
  let aiLog = `🤖 <b>Tour de Juliette :</b> `;
  const aiActive = duel.ai.active;
  const pActive = duel.player.active;

  if (aiActive && pActive && aiActive.card.attacks && aiActive.card.attacks.length > 0) {
    const affordable = aiActive.card.attacks.filter((a) => canAffordAttack(aiActive, a));
    const chosenAtk = affordable[affordable.length - 1] || aiActive.card.attacks[0];
    const { dmg, notes } = calculateDamage(aiActive, pActive, chosenAtk);
    pActive.hp = Math.max(0, pActive.hp - dmg);
    aiLog += `Mon <b>${aiActive.card.name}</b> attaque avec <b>${chosenAtk.name}</b> et inflige <b>${dmg} dégâts</b> à ton ${pActive.card.name} !`;
    if (notes.length) aiLog += ` <i>(${notes.join(", ")})</i>`;

    if (pActive.hp <= 0) {
      playSfx("assets/sfx/anim_knockout.wav");
      aiLog += `<br>💥 Ton <b>${pActive.card.name}</b> est K.O. ! Juliette prend 1 carte Récompense.`;
      if (duel.ai.prizes.length > 0) duel.ai.prizes.pop();
      duel.player.active = duel.player.bench.shift() || null;

      if (duel.ai.prizes.length === 0 || !duel.player.active) {
        duel.gameOver = true;
        setJulieSpeech(aiLog + `<br>🏁 <b>Juliette remporte la manche !</b> Clique sur « Nouvelle Partie » pour prendre ta revanche.`);
        renderArena();
        return;
      }
    }
  } else {
    aiLog += `Je prépare mon banc et termine mon tour.`;
  }

  // 6. Start Player's next turn
  duel.turn += 1;
  duel.activePlayer = "player";
  duel.energyPlayedThisTurn = false;
  if (duel.player.deck.length > 0) {
    const drawnKey = duel.player.deck.shift();
    duel.player.hand.push(drawnKey);
    const drawnCard = CARDS_BY_KEY[drawnKey];
    if (drawnCard) {
      aiLog += `<br>👉 <b>Tour ${duel.turn} :</b> Tu pioches <b>${drawnCard.name}</b>. À toi de jouer !`;
    }
  }

  setJulieSpeech(aiLog);
  renderArena();
}

window.addEventListener("DOMContentLoaded", initApp);
