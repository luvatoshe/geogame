const PASS_PERCENT = 80;
const TIME_LIMIT = 45;
const SCORE_MIN = 1;
const SCORE_MAX = 10;

const MEDAL_COLORS = {
    amethyst: "#9966cc",
    pearl: "#eae0c8",
    gold: "#ffd700",
    silver: "#c0c0c0",
    bronze: "#cd7f32",
};

const MEDAL_LABELS = {
    amethyst: "🟣 Аметист",
    pearl: "⚪ Жемчуг",
    gold: "🥇 Золото",
    silver: "🥈 Серебро",
    bronze: "🥉 Бронза",
};

const RANKS = [
    { min: 0, icon: "🌱", name: "Новичок" },
    { min: 500, icon: "📚", name: "Ученик" },
    { min: 2000, icon: "🎓", name: "Знаток" },
    { min: 5000, icon: "🏅", name: "Эксперт" },
    { min: 10000, icon: "👑", name: "Мастер" },
    { min: 20000, icon: "💎", name: "Легенда" },
];

const LEVEL_ICONS = {
    1: "globe",
    2: "snow",
    3: "castle",
    4: "lion",
    5: "mountain",
    6: "wave",
    7: "palm",
    8: "mosque",
    9: "horse",
    10: "desert",
    11: "giraffe",
    12: "flower",
    13: "moai",
    14: "island",
    15: "temple",
    16: "wheat",
    17: "elephant",
    18: "fish",
    19: "flag",
};

function getLevelIconSVG(key, size = 28) {
    const s = size;
    const icons = {
        globe: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>`,
        snow: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>`,
        castle: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l3-2v2l3-2v2l3-2v2l3-2v2l3-2v2l3-2v14H3z"/><path d="M9 21v-5h6v5"/></svg>`,
        lion: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7"/><path d="M12 6V3M8 7l-2-3M16 7l2-3M5 11l-3-1M19 11l3-1M5 15l-3 1M19 15l3 1"/><circle cx="10" cy="12" r="0.5" fill="currentColor"/><circle cx="14" cy="12" r="0.5" fill="currentColor"/><path d="M10 16c1 1 3 1 4 0"/></svg>`,
        mountain: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20l8-14 4 7 3-4 5 11H2z"/></svg>`,
        wave: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>`,
        palm: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V10"/><path d="M12 10c-2-4-6-3-8-1M12 10c2-4 6-3 8-1M12 10c0-4 3-6 5-6M12 10c0-4-3-6-5-6"/></svg>`,
        mosque: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V12c0-4 4-6 8-6s8 2 8 6v9"/><path d="M12 6V3"/><circle cx="12" cy="2" r="0.7" fill="currentColor"/><path d="M10 21v-4a2 2 0 1 1 4 0v4"/></svg>`,
        horse: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-3l2-3V9l3-4 3 2 3-2v4l3 3v6l2 4"/><path d="M9 5l-2-2M15 5l2-2"/></svg>`,
        desert: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20"/><path d="M4 18c2-4 5-5 8-5"/><path d="M20 18c-2-5-6-6-8-4"/><circle cx="17" cy="6" r="3"/></svg>`,
        giraffe: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8V4l2-2 2 2v3"/><path d="M9 8c-3 0-4 3-4 7v6M13 8c2 1 3 3 3 6v7M7 16h8"/></svg>`,
        flower: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 10V7a3 3 0 1 1 3 3M14 12h3a3 3 0 1 1-3 3M12 14v3a3 3 0 1 1-3-3M10 12H7a3 3 0 1 1 3-3"/></svg>`,
        moai: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21V6l2-3h6l2 3v15"/><path d="M9 8h6M9 12h1M14 12h1M9 16h6"/></svg>`,
        island: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M6 20V9l6-5 6 5v11"/><path d="M6 13h12"/></svg>`,
        temple: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M8 12h8"/></svg>`,
        wheat: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M12 8c-3 0-4-3-4-5 2 0 4 2 4 5zM12 8c3 0 4-3 4-5-2 0-4 2-4 5zM12 14c-3 0-4-3-4-5 2 0 4 2 4 5zM12 14c3 0 4-3 4-5-2 0-4 2-4 5z"/></svg>`,
        elephant: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15V9a5 5 0 0 1 10 0v6"/><path d="M15 9c3 0 5 2 5 5v6"/><path d="M5 15H2v4h4M15 15h4"/><circle cx="9" cy="10" r="0.5" fill="currentColor"/></svg>`,
        fish: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3-6 10-6 15-3l3-3-2 6 2 6-3-3c-5 3-12 3-15-3z"/><circle cx="8" cy="11" r="0.7" fill="currentColor"/></svg>`,
        flag: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V3"/><path d="M5 4h13l-3 4 3 4H5"/></svg>`,
    };
    return icons[key] || icons.globe;
}

const MEDAL_EMOJI = {
    amethyst: "🟣",
    pearl: "⚪",
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉",
};

const STORAGE_KEY = "geogame_progress_v2";
const RATING_KEY = "geogame_rating_v1";

const LESSONS_COUNTRIES = [
    {
        key: "learn",
        title: "Обучение",
        icon: "learn",
        desc: "Страны подсвечены белым",
    },
    {
        key: "practice",
        title: "Практика",
        icon: "practice",
        desc: "Без подсказок, но с заливкой",
    },
    {
        key: "exam",
        title: "Экзамен",
        icon: "exam",
        desc: "Чистая карта без следов",
    },
];

const LESSONS_FLAGS = [
    {
        key: "learn",
        title: "Обучение",
        icon: "learn",
        desc: "Тест с 4 вариантами",
    },
    {
        key: "practice",
        title: "Практика",
        icon: "practice",
        desc: "Ввод с подсказками",
    },
    { key: "exam", title: "Экзамен", icon: "exam", desc: "Ввод без подсказок" },
];

const LESSONS_CAPITALS = [
    {
        key: "learn",
        title: "Обучение",
        icon: "learn",
        desc: "Тест с 4 вариантами",
    },
    {
        key: "practice",
        title: "Практика",
        icon: "practice",
        desc: "Ввод с подсказками",
    },
    { key: "exam", title: "Экзамен", icon: "exam", desc: "Ввод без подсказок" },
];

function getLessonIconSVG(key, size = 42) {
    const s = size;
    const icons = {
        learn: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5h8a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H2V5z"/><path d="M22 5h-8a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h9V5z"/></svg>`,
        practice: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>`,
        exam: `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M5 6H3v2a3 3 0 0 0 3 3M19 6h2v2a3 3 0 0 1-3 3"/><path d="M10 14h4v3h-4zM8 20h8M12 17v3"/></svg>`,
    };
    return icons[key] || icons.learn;
}

let map = null;
let allLevels = [];
let allCountries = [];
let progress = {};
let currentSection = "countries";

const game = {
    levelId: null,
    lessonType: null,
    countries: [],
    currentIndex: 0,
    currentCountry: null,
    countryStartTime: 0,
    tickInterval: null,
    lessonStartTime: 0,
    wrongClicks: 0,
    awaitingFlash: false,
    records: [],
    totalScore: 0,
    locked: true,
    running: false,
    lastResult: null,
};

function getLessons() {
    if (currentSection === "flags") return LESSONS_FLAGS;
    if (currentSection === "capitals") return LESSONS_CAPITALS;
    return LESSONS_COUNTRIES;
}

/* ============ ПРОГРЕСС ============ */

function loadProgress() {
    try {
        progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        progress = {};
    }
    return progress;
}

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function sectionPrefix() {
    return currentSection === "countries" ? "" : currentSection + "_";
}

function setCurrentSection(section) {
    currentSection = section;
}

function getSectionProgress(levelId, lessonKey) {
    const key = sectionPrefix() + levelId;
    return (progress[key] && progress[key][lessonKey]) || null;
}

function setSectionProgress(levelId, lessonKey, data) {
    const key = sectionPrefix() + levelId;
    if (!progress[key]) progress[key] = {};

    const existing = progress[key][lessonKey];

    if (existing && existing.percent != null && data.percent != null) {
        const newPercent = data.percent;
        const oldPercent = existing.percent;

        if (newPercent < oldPercent) {
            return;
        }

        if (newPercent === oldPercent && existing.medal && data.medal) {
            const medalRank = {
                amethyst: 5,
                pearl: 4,
                gold: 3,
                silver: 2,
                bronze: 1,
            };
            const newRank = medalRank[data.medal] || 0;
            const oldRank = medalRank[existing.medal] || 0;
            if (newRank <= oldRank) {
                return;
            }
        }
    }

    progress[key][lessonKey] = { ...data, date: Date.now() };
    saveProgress();
}

function isSectionLessonUnlocked(levelId, lessonIndex) {
    if (lessonIndex === 0) return true;
    const prevKey = getLessons()[lessonIndex - 1].key;
    const prev = getSectionProgress(levelId, prevKey);
    return prev && prev.passed;
}

function isSectionLevelUnlocked(levelIndex) {
    if (levelIndex === 0) return true;
    const prevLevelId = allLevels[levelIndex - 1].id;
    const prevExam = getSectionProgress(prevLevelId, "exam");
    return prevExam && prevExam.passed;
}

function getSectionLevelStatus(levelIndex) {
    const level = allLevels[levelIndex];
    const exam = getSectionProgress(level.id, "exam");
    if (exam && exam.passed) return "completed";
    if (isSectionLevelUnlocked(levelIndex)) return "current";
    return "locked";
}

function countSectionPassedLessons(levelId) {
    let n = 0;
    for (const l of getLessons()) {
        const p = getSectionProgress(levelId, l.key);
        if (p && p.passed) n++;
    }
    return n;
}

function loadRatings() {
    try {
        return JSON.parse(localStorage.getItem(RATING_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveRatings(r) {
    localStorage.setItem(RATING_KEY, JSON.stringify(r));
}

function setBestLessonScore(levelId, lessonKey, score) {
    const ratings = loadRatings();
    const key = `${currentSection}_${levelId}_${lessonKey}`;
    if (!ratings[key] || score > ratings[key]) {
        ratings[key] = score;
        saveRatings(ratings);
    }
}

function getTotalRating() {
    const ratings = loadRatings();
    return Object.values(ratings).reduce((a, b) => a + b, 0);
}

function getRank(points) {
    let current = RANKS[0];
    for (const r of RANKS) if (points >= r.min) current = r;
    return current;
}

function updateRatingDisplays() {
    const points = getTotalRating();
    const rank = getRank(points);

    const wi = document.getElementById("welcome-rank-icon");
    const wn = document.getElementById("welcome-rank-name");
    const wr = document.getElementById("welcome-rating");
    if (wi) wi.textContent = rank.icon;
    if (wn) wn.textContent = rank.name;
    if (wr) wr.textContent = points;

    const mi = document.getElementById("map-rank-icon");
    const mr = document.getElementById("map-rating");
    if (mi) mi.textContent = rank.icon;
    if (mr) mr.textContent = points;

    const sIcon = document.getElementById("sections-rank-icon");
    const sName = document.getElementById("sections-rank-name");
    const sPoints = document.getElementById("sections-rank-points");
    if (sIcon) sIcon.textContent = rank.icon;
    if (sName) sName.textContent = rank.name;
    if (sPoints) sPoints.textContent = points;

    const lIcon = document.getElementById("levels-rank-icon");
    const lName = document.getElementById("levels-rank-name");
    const lPoints = document.getElementById("levels-rank-points");
    if (lIcon) lIcon.textContent = rank.icon;
    if (lName) lName.textContent = rank.name;
    if (lPoints) lPoints.textContent = points;
}

/* ============ ПРОВЕРКА ОТВЕТА ============ */

const FLAG_ALIASES = {
    US: ["сша", "америка", "соединенные штаты", "соединённые штаты"],
    GB: [
        "великобритания",
        "англия",
        "британия",
        "соединенное королевство",
        "соединённое королевство",
    ],
    AE: [
        "оаэ",
        "эмираты",
        "объединенные арабские эмираты",
        "объединённые арабские эмираты",
    ],
    ZA: ["юар", "южная африка", "южно-африканская республика"],
    KR: ["южная корея", "корея"],
    KP: ["северная корея", "кндр", "корея"],
    CN: ["китай", "кнр", "китайская народная республика"],
    RU: ["россия", "рф", "российская федерация"],
    CZ: ["чехия", "чешская республика"],
    CD: ["др конго", "демократическая республика конго", "конго"],
    CG: ["конго", "республика конго"],
    VA: ["ватикан", "святой престол"],
    PS: ["палестина", "палестинские территории"],
    MM: ["мьянма", "бирма"],
    CI: ["кот-д'ивуар", "кот д ивуар", "берег слоновой кости"],
    TL: ["восточный тимор", "тимор-лесте"],
    SZ: ["эсватини", "свазиленд"],
    CV: ["кабо-верде", "кабо верде", "острова зеленого мыса"],
    ST: ["сан-томе и принсипи", "сан томе и принсипи"],
    KN: ["сент-китс и невис", "сент китс и невис"],
    VC: ["сент-винсент и гренадины", "сент винсент и гренадины"],
    LC: ["сент-люсия", "сент люсия"],
    AG: ["антигуа и барбуда"],
    TT: ["тринидад и тобаго"],
    BA: ["босния и герцеговина", "босния"],
    MK: ["северная македония", "македония"],
    MD: ["молдова", "молдавия"],
    LA: ["лаос"],
    BN: ["бруней"],
    FM: ["микронезия"],
};

function normalizeForCompare(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/ё/g, "е")
        .replace(/\s+/g, " ")
        .replace(/-/g, " ");
}

function isFlagAnswerCorrect(input, country) {
    const normalized = normalizeForCompare(input);
    if (normalized === normalizeForCompare(country.name)) return true;
    const aliases = FLAG_ALIASES[country.isoCode] || [];
    for (const alias of aliases) {
        if (normalized === normalizeForCompare(alias)) return true;
    }
    return false;
}

/* ============ НАВИГАЦИЯ ============ */

const OVERLAY_SCREENS = ["screen-stats", "screen-reward"];

function showScreen(id) {
    if (OVERLAY_SCREENS.includes(id)) {
        document
            .querySelectorAll(".overlay-screen")
            .forEach((s) => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        return;
    }
    document
        .querySelectorAll(".overlay-screen")
        .forEach((s) => s.classList.remove("active"));
    document
        .querySelectorAll(".screen")
        .forEach((s) => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function showWelcome() {
    updateRatingDisplays();
    showScreen("screen-welcome");
}

function showSections() {
    updateRatingDisplays();
    showScreen("screen-sections");
}

async function ensureLevelsLoaded() {
    if (allLevels.length === 0) {
        try {
            const res = await fetch("/api/levels");
            allLevels = await res.json();
        } catch (e) {
            allLevels = [];
        }
    }
}

async function ensureAllCountriesLoaded() {
    if (allCountries.length > 0) return;
    await ensureLevelsLoaded();
    if (allLevels.length === 0) return;
    const lastId = allLevels[allLevels.length - 1].id;
    try {
        const res = await fetch(`/api/levels/${lastId}/countries`);
        if (res.ok) allCountries = await res.json();
    } catch (e) {}
}

async function showLevels() {
    await ensureLevelsLoaded();
    updateRatingDisplays();
    renderLevels();
    const titleEl = document.querySelector("#screen-levels .topbar h2");
    if (titleEl) {
        if (currentSection === "flags") titleEl.textContent = "Флаги";
        else if (currentSection === "capitals") titleEl.textContent = "Столицы";
        else titleEl.textContent = "Страны";
    }
    showScreen("screen-levels");
}

/* ============ СПИСОК УРОВНЕЙ ============ */

function formatJournalDate(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    const months = [
        "янв",
        "фев",
        "мар",
        "апр",
        "мая",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getLevelMedals(levelId) {
    const result = [];
    for (const l of getLessons()) {
        const p = getSectionProgress(levelId, l.key);
        if (p && p.medal) result.push(p.medal);
    }
    return result;
}

function getLevelLastDate(levelId) {
    let latest = 0;
    for (const l of getLessons()) {
        const p = getSectionProgress(levelId, l.key);
        if (p && p.passed && p.date && p.date > latest) latest = p.date;
    }
    return latest;
}

function renderLevels() {
    const grid = document.getElementById("levels-grid");
    if (!grid) return;
    grid.innerHTML = "";
    void grid.offsetWidth;

    allLevels.forEach((lvl, idx) => {
        const status = getSectionLevelStatus(idx);
        const passed = countSectionPassedLessons(lvl.id);
        const medals = getLevelMedals(lvl.id);
        const lastDate = getLevelLastDate(lvl.id);
        const iconKey = LEVEL_ICONS[idx + 1] || "globe";
        const icon = getLevelIconSVG(iconKey);

        const card = document.createElement("div");
        card.className = "journal-card";
        if (status === "completed") card.classList.add("completed");
        else if (status === "current") card.classList.add("current");
        else card.classList.add("locked");

        let dotsHtml = "";
        for (let i = 0; i < 3; i++)
            dotsHtml += `<div class="journal-dot${i < passed ? " passed" : ""}"></div>`;

        const medalsHtml = medals.length
            ? medals
                  .map(
                      (m) =>
                          `<span class="journal-medal-dot medal-${m}"></span>`,
                  )
                  .join("")
            : "";

        const lockHtml =
            status === "locked" ? '<div class="journal-lock">🔒</div>' : "";
        const completedStamp =
            status === "completed"
                ? '<div class="journal-stamp-completed">ПРОЙДЕНО</div>'
                : "";
        const dateHtml = lastDate
            ? `<div class="journal-date">${formatJournalDate(lastDate)}</div>`
            : '<div class="journal-date"></div>';

        card.innerHTML = `
            ${lockHtml}${completedStamp}
            <div class="journal-header">
                <div class="journal-stamp">${icon}</div>
                <div class="journal-title-block">
                    <div class="journal-level-num">Уровень ${idx + 1} из ${allLevels.length}</div>
                    <div class="journal-title">${lvl.title}</div>
                    <div class="journal-subtitle">${lvl.description}</div>
                </div>
            </div>
            <div class="journal-progress-row">
                <div class="journal-progress-bar">
                    <div class="journal-progress-fill" style="--progress-width:${(passed / 3) * 100}%" data-complete="${passed === 3}"></div>
                </div>
                <div class="journal-progress-label">${passed}/3</div>
            </div>
            <div class="journal-footer">
                <div class="journal-medals">${medalsHtml}</div>
                <div class="journal-lesson-dots">${dotsHtml}</div>
            </div>
            ${dateHtml}
        `;

        if (status !== "locked") card.onclick = () => openLevel(lvl);
        grid.appendChild(card);
    });
}

function openLevel(level) {
    document.getElementById("lessons-title").textContent = level.title;
    const grid = document.getElementById("lessons-grid");
    grid.innerHTML = "";
    void grid.offsetWidth;
    getLessons().forEach((lesson, idx) => {
        const unlocked = isSectionLessonUnlocked(level.id, idx);
        const prog = getSectionProgress(level.id, lesson.key);
        const card = document.createElement("div");
        card.className =
            "lesson-card lesson-card-" +
            lesson.key +
            (unlocked ? "" : " locked");

        let medalHtml = "";
        if (prog && prog.percent != null) {
            const medalClass = prog.medal
                ? `medal-${prog.medal}`
                : "medal-none";
            medalHtml = `<span class="medal-badge"><span class="medal-dot ${medalClass}"></span><span class="medal-percent">${Math.round(prog.percent)}%</span></span>`;
        }
        card.innerHTML = `
            <div class="lesson-icon lesson-icon-${lesson.icon}">${getLessonIconSVG(lesson.icon)}</div>
            <h3>${lesson.title}</h3>
            <p>${lesson.desc}</p>
            ${medalHtml}
        `;

        if (unlocked) {
            card.onclick = () => {
                if (currentSection === "flags")
                    startFlagsLesson(level, lesson.key);
                else if (currentSection === "capitals")
                    startCapitalsLesson(level, lesson.key);
                else startLesson(level, lesson.key);
            };
        }
        grid.appendChild(card);
    });
    showScreen("screen-lessons");
}

/* ============ ОБЩИЕ ============ */

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function timePenalty(seconds, bonus = 0) {
    const noPenalty = 10 + bonus;
    const maxPenaltyAt = 35 + bonus;
    if (seconds <= noPenalty) return 0;
    if (seconds > maxPenaltyAt) return 6;
    return Math.ceil((seconds - noPenalty) / 5);
}

function scoreColor(score) {
    const s = Math.max(SCORE_MIN, Math.min(SCORE_MAX, score));
    const t = (s - 1) / 9;
    return `hsl(${t * 120}, 65%, 50%)`;
}

/* ============ ИГРА «СТРАНЫ» ============ */

function initMap() {
    if (map) return;

    map = new jsVectorMap({
        selector: "#map-container",
        map: "world",
        zoomButtons: true,
        zoomOnScroll: true,
        backgroundColor: "#0d1b2a",
        regionStyle: {
            initial: {
                fill: "#3a5a80",
                fillOpacity: 1,
                stroke: "#1e1e2e",
                strokeWidth: 0.5,
            },
            hover: { fill: "#5a8ac0", cursor: "pointer" },
        },
        onRegionClick: (event, code) => onCountryClick(code),
    });

    setTimeout(() => {
        if (map && map.updateSize) map.updateSize();
    }, 100);
    setTimeout(() => {
        if (map && map.updateSize) map.updateSize();
    }, 500);
}

function getRegionEl(iso) {
    const c = document.getElementById("map-container");
    return c ? c.querySelector(`[data-code="${iso}"]`) : null;
}

function setRegionFill(iso, color) {
    const el = getRegionEl(iso);
    if (!el) return;
    el.style.fill = color;
    el.setAttribute("fill", color);
}

function paintAll(color) {
    const c = document.getElementById("map-container");
    if (!c) return;
    c.querySelectorAll("[data-code]").forEach((el) => {
        el.style.fill = color;
        el.setAttribute("fill", color);
        el.classList.remove("flash-target");
    });
}

function currentPotentialScore() {
    const elapsed = (Date.now() - game.countryStartTime) / 1000;
    const penalty = timePenalty(elapsed);
    return Math.max(SCORE_MIN, SCORE_MAX - penalty - game.wrongClicks);
}

async function startLesson(level, lessonType) {
    game.levelId = level.id;
    game.lessonType = lessonType;
    game.currentIndex = 0;
    game.records = [];
    game.totalScore = 0;
    game.running = false;
    game.locked = true;
    game.awaitingFlash = false;

    let list = [];
    try {
        const res = await fetch(
            `/api/levels/${level.id}/lessons/${lessonType}/countries`,
        );
        if (!res.ok) return;
        list = await res.json();
    } catch (e) {
        return;
    }
    game.countries = shuffle(list);

    document.getElementById("score-value").textContent = "0";
    document.getElementById("message").textContent = "";
    document.getElementById("message").className = "message";
    showScreen("screen-game");

    setTimeout(() => {
        initMap();
        setTimeout(() => beginLesson(), 300);
    }, 200);
}

function beginLesson() {
    if (!map) return;
    if (map.updateSize) map.updateSize();
    paintAll("#3a5a80");
    game.lessonStartTime = Date.now();
    game.running = true;
    startNextCountry();
}

function startNextCountry() {
    if (game.currentIndex >= game.countries.length) {
        finishLesson(true);
        return;
    }
    game.currentCountry = game.countries[game.currentIndex];
    game.countryStartTime = Date.now();
    game.wrongClicks = 0;
    game.awaitingFlash = false;
    game.locked = false;

    document.getElementById("country-name").textContent =
        game.currentCountry.name;
    document.getElementById("progress-text").textContent =
        `${game.currentIndex + 1} / ${game.countries.length}`;

    if (game.lessonType === "learn") {
        for (let i = game.currentIndex; i < game.countries.length; i++) {
            const iso = game.countries[i].isoCode;
            if (!isRegionSolved(iso)) setRegionFill(iso, "#ffffff");
        }
    }
    startTick();
}

function isRegionSolved(iso) {
    return game.records.some((r) => r.iso === iso);
}
function startTick() {
    if (game.tickInterval) clearInterval(game.tickInterval);
    game.tickInterval = setInterval(onTick, 33);
}

function onTick() {
    if (!game.running || game.awaitingFlash) return;
    const elapsed = (Date.now() - game.countryStartTime) / 1000;
    updateTimerDisplay();
    if (elapsed >= TIME_LIMIT) {
        clearInterval(game.tickInterval);
        game.tickInterval = null;
        game.running = false;
        game.locked = true;
        finishLesson(false, "timeout");
        return;
    }
    document.getElementById("live-score").textContent =
        `Потенциал: ${currentPotentialScore()}`;
}

function updateTimerDisplay() {
    const e = Date.now() - game.countryStartTime;
    const ts = Math.floor(e / 1000);
    const m = Math.floor(ts / 60);
    const s = ts % 60;
    const c = Math.floor((e % 1000) / 10);
    document.getElementById("timer").textContent =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0") +
        "," +
        String(c).padStart(2, "0");
}

function onCountryClick(iso) {
    if (!game.running || game.locked) return;
    if (!game.currentCountry) return;

    if (game.awaitingFlash) {
        if (iso === game.currentCountry.isoCode) resolveCountry(1);
        return;
    }
    if (iso === game.currentCountry.isoCode) {
        const elapsed = (Date.now() - game.countryStartTime) / 1000;
        const penalty = timePenalty(elapsed);
        const score = Math.max(
            SCORE_MIN,
            SCORE_MAX - penalty - game.wrongClicks,
        );
        resolveCountry(score);
    } else {
        game.wrongClicks++;
        flashWrong(iso);
        if (game.wrongClicks >= 3) enterFlashMode();
        else
            document.getElementById("live-score").textContent =
                `Потенциал: ${currentPotentialScore()}`;
    }
}

function flashWrong(iso) {
    const el = getRegionEl(iso);
    if (!el) return;
    const prev = el.style.fill;
    el.style.fill = "#f44336";
    el.setAttribute("fill", "#f44336");
    setTimeout(() => {
        el.style.fill = prev || "#3a5a80";
        el.setAttribute("fill", prev || "#3a5a80");
    }, 250);
}

function enterFlashMode() {
    game.awaitingFlash = true;
    const iso = game.currentCountry.isoCode;
    const el = getRegionEl(iso);
    if (el) {
        el.style.fill = "#ffffff";
        el.setAttribute("fill", "#ffffff");
        el.classList.add("flash-target");
    }
    document.getElementById("message").textContent =
        "Мигающая страна — правильный ответ";
    document.getElementById("message").className = "message info";
}

function resolveCountry(score) {
    game.locked = true;
    if (game.tickInterval) {
        clearInterval(game.tickInterval);
        game.tickInterval = null;
    }
    const elapsed = (Date.now() - game.countryStartTime) / 1000;
    const iso = game.currentCountry.isoCode;
    game.records.push({
        iso,
        name: game.currentCountry.name,
        time: elapsed,
        score,
        wrongClicks: game.wrongClicks,
    });
    game.totalScore += score;
    document.getElementById("score-value").textContent = game.totalScore;

    const el = getRegionEl(iso);
    if (el) {
        el.classList.remove("flash-target");
        if (game.lessonType !== "exam") {
            const c = scoreColor(score);
            el.style.fill = c;
            el.setAttribute("fill", c);
        } else {
            el.style.fill = "#3a5a80";
            el.setAttribute("fill", "#3a5a80");
        }
    }
    document.getElementById("message").textContent = `+${score} очков`;
    document.getElementById("message").className = "message correct";
    game.currentIndex++;
    setTimeout(() => {
        document.getElementById("message").textContent = "";
        document.getElementById("message").className = "message";
        startNextCountry();
    }, 700);
}

function finishLesson(passed, reason) {
    game.running = false;
    if (game.tickInterval) {
        clearInterval(game.tickInterval);
        game.tickInterval = null;
    }
    const maxScore = game.countries.length * SCORE_MAX;
    const percent = maxScore > 0 ? (game.totalScore / maxScore) * 100 : 0;
    const totalTime = (Date.now() - game.lessonStartTime) / 1000;
    const allUnder5 =
        game.records.length === game.countries.length &&
        game.records.every((r) => r.time < 5);
    const allUnder7 =
        game.records.length === game.countries.length &&
        game.records.every((r) => r.time < 7);
    const allUnder10 =
        game.records.length === game.countries.length &&
        game.records.every((r) => r.time < 10);

    let medal = null;
    if (reason !== "timeout") {
        if (percent >= 100 && allUnder5) medal = "amethyst";
        else if (percent >= 100 && allUnder7) medal = "pearl";
        else if (percent >= 100 && allUnder10) medal = "gold";
        else if (percent >= 90) medal = "silver";
        else if (percent >= 80) medal = "bronze";
    }
    const isPassed = reason !== "timeout" && percent >= PASS_PERCENT;
    setSectionProgress(game.levelId, game.lessonType, {
        passed: isPassed,
        medal,
        percent,
    });
    document.querySelectorAll(".journal-progress-fill").forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
    });
    if (isPassed)
        setBestLessonScore(game.levelId, game.lessonType, game.totalScore);

    renderFinalMap();
    game.lastResult = {
        percent,
        totalScore: game.totalScore,
        maxScore,
        totalTime,
        medal,
        passed: isPassed,
        reason,
        allUnder10,
        allUnder5,
        allUnder7,
    };
    renderStatsScreen(game.lastResult);
    setTimeout(() => showScreen("screen-stats"), 2800);
}

function renderFinalMap() {
    const c = document.getElementById("map-container");
    if (!c) return;
    c.querySelectorAll("[data-code]").forEach((el) => {
        el.classList.remove("flash-target");
        el.style.fill = "#3a5a80";
        el.setAttribute("fill", "#3a5a80");
    });
    game.records.forEach((r) => {
        let color;
        if (r.time < 5) color = MEDAL_COLORS.amethyst;
        else if (r.time < 7) color = MEDAL_COLORS.pearl;
        else if (r.time < 10) color = MEDAL_COLORS.gold;
        else color = scoreColor(r.score);
        setRegionFill(r.iso, color);
    });
}

/* ============ СТАТИСТИКА И НАГРАДА ============ */

function renderStatsScreen(r) {
    const titleEl = document.getElementById("stats-title");
    const subtitleEl = document.getElementById("stats-subtitle");
    if (r.reason === "timeout") {
        titleEl.textContent = "Время вышло";
        subtitleEl.textContent = "Не удалось найти вовремя";
    } else if (r.passed) {
        titleEl.textContent = "Урок пройден!";
        subtitleEl.textContent = "Порог пройден — можно посмотреть награду";
    } else {
        titleEl.textContent = "Недостаточно баллов";
        subtitleEl.textContent = `Нужно набрать не менее ${PASS_PERCENT}%`;
    }

    document.getElementById("stats-score").textContent =
        `${r.totalScore} / ${r.maxScore}`;
    document.getElementById("stats-percent").textContent =
        Math.round(r.percent) + "%";
    const m = Math.floor(r.totalTime / 60);
    const s = Math.floor(r.totalTime % 60);
    document.getElementById("stats-time").textContent =
        `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    const list = document.getElementById("detailed-stats-list");
    list.innerHTML = "";
    game.records.forEach((rec, i) => {
        const row = document.createElement("div");
        row.className = "detail-row";
        let tc = "slow";
        if (rec.time < 5) tc = "fast";
        else if (rec.time < 7) tc = "medium";
        else if (rec.time < 10) tc = "normal";
        row.innerHTML = `
            <span class="detail-row-index">${i + 1}.</span>
            <span class="detail-row-name">${rec.name}</span>
            <span class="detail-row-time ${tc}">${rec.time.toFixed(2)} с</span>
            <span class="detail-row-score">+${rec.score}</span>
        `;
        list.appendChild(row);
    });
    document.getElementById("detailed-stats").classList.remove("expanded");
    document.getElementById("btn-expand").textContent =
        "📊 Подробная статистика";
}

function toggleDetailedStats() {
    const d = document.getElementById("detailed-stats");
    const b = document.getElementById("btn-expand");
    if (d.classList.contains("expanded")) {
        d.classList.remove("expanded");
        b.textContent = "📊 Подробная статистика";
    } else {
        d.classList.add("expanded");
        b.textContent = "📊 Скрыть статистику";
    }
}

function showRewardScreen() {
    if (!game.lastResult) return;
    renderRewardScreen(game.lastResult);
    showScreen("screen-reward");
}

function renderRewardScreen(r) {
    const medal = document.getElementById("reward-medal");
    const icon = document.getElementById("reward-medal-icon");
    const title = document.getElementById("reward-title");
    const subtitle = document.getElementById("reward-subtitle");
    const rays = document.getElementById("reward-rays");

    medal.className = "reward-medal";
    title.className = "reward-title";
    icon.className = "reward-medal-icon";
    rays.classList.remove("active");

    const isBonus = currentSection !== "countries";
    const titles = {
        amethyst: "Аметист",
        pearl: "Жемчуг",
        gold: "Золото",
        silver: "Серебро",
        bronze: "Бронза",
    };
    const subs = isBonus
        ? {
              amethyst: "Идеально — все меньше 7 секунд!",
              pearl: "Великолепно — все меньше 9 секунд",
              gold: "Отлично — все меньше 12 секунд",
              silver: "Хороший результат, но можно быстрее",
              bronze: "Урок пройден — продолжайте тренироваться",
          }
        : {
              amethyst: "Идеально — все страны меньше 5 секунд!",
              pearl: "Великолепно — все страны меньше 7 секунд",
              gold: "Отлично — все страны меньше 10 секунд",
              silver: "Хороший результат, но можно быстрее",
              bronze: "Урок пройден — продолжайте тренироваться",
          };

    if (r.reason === "timeout") {
        icon.className = "reward-medal-icon icon-fail";
        title.textContent = "Время вышло";
        subtitle.textContent = "Не удалось пройти урок";
        title.classList.add("medal-fail");
        medal.classList.add("glow-fail");
    } else if (r.medal) {
        icon.className = "reward-medal-icon icon-" + r.medal;
        title.textContent = titles[r.medal];
        subtitle.textContent = subs[r.medal];
        title.classList.add("medal-" + r.medal);
        medal.classList.add("glow-" + r.medal);
        setTimeout(() => rays.classList.add("active"), 200);
    } else {
        icon.className = "reward-medal-icon icon-none";
        title.textContent = r.passed ? "Урок пройден" : "Не хватило баллов";
        subtitle.textContent = r.passed
            ? "Можно идти дальше"
            : `Нужно не менее ${PASS_PERCENT}%`;
        title.classList.add("medal-fail");
        medal.classList.add("glow-fail");
    }

    const barContainer = document.getElementById("reward-bar-container");
    barContainer.innerHTML = "";
    const aT = isBonus ? 7 : 5,
        pT = isBonus ? 9 : 7,
        gT = isBonus ? 12 : 10;
    const allUnder =
        game.records.length > 0 && game.records.every((x) => x.time < gT);
    if (allUnder) {
        const total = game.records.length;
        const a = game.records.filter((x) => x.time < aT).length;
        const p = game.records.filter(
            (x) => x.time >= aT && x.time < pT,
        ).length;
        const g = game.records.filter(
            (x) => x.time >= pT && x.time < gT,
        ).length;
        const aPct = Math.round((a / total) * 100);
        const pPct = Math.round((p / total) * 100);
        const gPct = 100 - aPct - pPct;
        barContainer.innerHTML = `
            <div class="medal-bar-label">Распределение по скоростям</div>
            <div class="medal-bar">
                ${aPct > 0 ? `<div class="medal-segment amethyst" style="width:${aPct}%">${aPct}%</div>` : ""}
                ${pPct > 0 ? `<div class="medal-segment pearl" style="width:${pPct}%">${pPct}%</div>` : ""}
                ${gPct > 0 ? `<div class="medal-segment gold" style="width:${gPct}%">${gPct}%</div>` : ""}
            </div>`;
    }
}

/* ============ НАВИГАЦИЯ ИГРЫ ============ */

function retryLesson() {
    const level = allLevels.find((l) => l.id === game.levelId);
    if (!level) return;
    if (currentSection === "flags") startFlagsLesson(level, game.lessonType);
    else if (currentSection === "capitals")
        startCapitalsLesson(level, game.lessonType);
    else startLesson(level, game.lessonType);
}

function backToLevels() {
    const level = allLevels.find((l) => l.id === game.levelId);
    if (level) openLevel(level);
    else showLevels();
}

function abortGame() {
    game.running = false;
    game.locked = true;
    if (game.tickInterval) {
        clearInterval(game.tickInterval);
        game.tickInterval = null;
    }
    const level = allLevels.find((l) => l.id === game.levelId);
    if (level) openLevel(level);
    else showLevels();
}

/* ============ ИГРА «ФЛАГИ» ============ */

const flagsGame = {
    levelId: null,
    lessonType: null,
    countries: [],
    currentIndex: 0,
    currentCountry: null,
    countryStartTime: 0,
    tickInterval: null,
    lessonStartTime: 0,
    wrongAttempts: 0,
    records: [],
    totalScore: 0,
    running: false,
    locked: true,
    lastResult: null,
};

function getFlagUrl(iso) {
    return `https://flagcdn.com/${iso.toLowerCase()}.svg`;
}

async function startFlagsLesson(level, lessonType) {
    flagsGame.levelId = level.id;
    flagsGame.lessonType = lessonType;
    flagsGame.currentIndex = 0;
    flagsGame.records = [];
    flagsGame.totalScore = 0;
    flagsGame.running = false;
    flagsGame.locked = true;

    if (lessonType === "learn" || lessonType === "practice") {
        await ensureAllCountriesLoaded();
    }

    let list = [];
    try {
        const res = await fetch(
            `/api/levels/${level.id}/lessons/${lessonType}/countries`,
        );
        if (!res.ok) return;
        list = await res.json();
    } catch (e) {
        return;
    }
    flagsGame.countries = shuffle(list);

    document.getElementById("flags-score-value").textContent = "0";
    document.getElementById("flags-message").textContent = "";
    document.getElementById("flags-message").className = "message";
    document.getElementById("flag-hints").innerHTML = "";
    document.getElementById("flag-test-options").innerHTML = "";

    showScreen("screen-flags-game");
    setTimeout(() => beginFlagsLesson(), 200);
}

function beginFlagsLesson() {
    flagsGame.lessonStartTime = Date.now();
    flagsGame.running = true;
    showNextFlag();
}

function showNextFlag() {
    if (flagsGame.currentIndex >= flagsGame.countries.length) {
        finishFlagsLesson(true);
        return;
    }
    flagsGame.currentCountry = flagsGame.countries[flagsGame.currentIndex];
    flagsGame.countryStartTime = Date.now();
    flagsGame.wrongAttempts = 0;
    flagsGame.locked = false;

    document.getElementById("flags-progress-text").textContent =
        `${flagsGame.currentIndex + 1} / ${flagsGame.countries.length}`;

    document.getElementById("flag-image").src = getFlagUrl(
        flagsGame.currentCountry.isoCode,
    );

    const inputBlock = document.querySelector(
        "#screen-flags-game .flag-input-block",
    );
    const testBox = document.getElementById("flag-test-options");
    const hintsBox = document.getElementById("flag-hints");

    inputBlock.style.display = "none";
    testBox.style.display = "none";
    hintsBox.innerHTML = "";

    if (flagsGame.lessonType === "learn") {
        testBox.style.display = "grid";
        renderTestOptions(
            testBox,
            flagsGame.currentCountry,
            (chosen, correct, btn) => {
                onTestAnswer(chosen, correct, btn, {
                    onCorrect: (score) => handleCorrectFlag(score),
                    messageId: "flags-message",
                    scoreId: "flags-score-value",
                    onFinish: () => {
                        flagsGame.totalScore = flagsGame.totalScore;
                        showNextFlagAfterTest();
                    },
                });
            },
        );
    } else {
        inputBlock.style.display = "flex";
        const input = document.getElementById("flag-input");
        input.value = "";
        input.disabled = false;
        input.className = "";
        input.focus();
        document.getElementById("flag-submit").disabled = false;
        hintsBox.innerHTML = "";
        hintsBox.classList.remove("visible");

        input.oninput = null;
        input.onkeydown = null;

        if (flagsGame.lessonType === "practice") {
            input.oninput = () =>
                onInputHints(input, hintsBox, (val) => {
                    input.value = val;
                    hintsBox.innerHTML = "";
                    hintsBox.classList.remove("visible");
                    input.focus();
                    submitFlagAnswer();
                });
        }

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                submitFlagAnswer();
            }
        };
    }
    startFlagsTick();
}

function showNextFlagAfterTest() {
    setTimeout(() => {
        document.getElementById("flags-message").textContent = "";
        document.getElementById("flags-message").className = "message";
        showNextFlag();
    }, 900);
}

function renderTestOptions(container, correct, onChoose) {
    container.innerHTML = "";
    const wrongs = shuffle(
        allCountries.filter((c) => c.id !== correct.id),
    ).slice(0, 3);
    const options = shuffle([correct, ...wrongs]);

    options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "test-option";
        btn.textContent = opt.name;
        btn.onclick = () => onChoose(opt, correct, btn);
        container.appendChild(btn);
    });
}

function onTestAnswer(chosen, correct, btn, opts) {
    if (chosen.id === correct.id) {
        btn.classList.add("correct");
        const elapsed = (Date.now() - flagsGame.countryStartTime) / 1000;
        const penalty = timePenalty(elapsed, 2);
        const score = Math.max(SCORE_MIN, SCORE_MAX - penalty);
        opts.onCorrect(score);
    } else {
        btn.classList.add("wrong");
        const btns = btn.parentElement.querySelectorAll(".test-option");
        btns.forEach((b) => {
            if (b.textContent === correct.name) b.classList.add("correct");
        });
        const msg = document.getElementById(opts.messageId);
        msg.textContent = `Правильный ответ: ${correct.name}`;
        msg.className = "message wrong";

        setTimeout(() => {
            flagsGame.records.push({
                iso: correct.isoCode,
                name: correct.name,
                time: (Date.now() - flagsGame.countryStartTime) / 1000,
                score: SCORE_MIN,
                wrongClicks: 1,
            });
            flagsGame.totalScore += SCORE_MIN;
            document.getElementById(opts.scoreId).textContent =
                flagsGame.totalScore;
            flagsGame.currentIndex++;
            if (flagsGame.tickInterval) {
                clearInterval(flagsGame.tickInterval);
                flagsGame.tickInterval = null;
            }
            opts.onFinish();
        }, 1500);
    }
}

function onInputHints(input, hintBox, onPick) {
    const value = input.value.trim().toLowerCase();
    hintBox.innerHTML = "";

    if (value.length < 2) {
        hintBox.classList.remove("visible");
        return;
    }

    const starts = allCountries.filter((c) =>
        c.name.toLowerCase().startsWith(value),
    );
    const includes = allCountries.filter(
        (c) =>
            !c.name.toLowerCase().startsWith(value) &&
            c.name.toLowerCase().includes(value),
    );
    const matches = [...starts, ...includes].slice(0, 8);

    if (matches.length === 0) {
        hintBox.classList.remove("visible");
        return;
    }

    matches.forEach((c, i) => {
        const div = document.createElement("div");
        div.className = "flag-hint-item" + (i === 0 ? " selected" : "");
        div.textContent = c.name;
        div.onmousedown = (e) => {
            e.preventDefault();
            onPick(c.name);
        };
        hintBox.appendChild(div);
    });

    hintBox.classList.add("visible");
}

function startFlagsTick() {
    if (flagsGame.tickInterval) clearInterval(flagsGame.tickInterval);
    flagsGame.tickInterval = setInterval(onFlagsTick, 33);
}

function onFlagsTick() {
    if (!flagsGame.running) return;

    const ms = Date.now() - flagsGame.countryStartTime;
    const elapsed = ms / 1000;
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const c = Math.floor((ms % 1000) / 10);

    document.getElementById("flags-timer").textContent =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0") +
        "," +
        String(c).padStart(2, "0");

    if (elapsed >= TIME_LIMIT + 2) {
        clearInterval(flagsGame.tickInterval);
        flagsGame.tickInterval = null;
        flagsGame.running = false;
        flagsGame.locked = true;
        finishFlagsLesson(false, "timeout");
        return;
    }

    const penalty = timePenalty(elapsed, 2);
    const potential = Math.max(
        SCORE_MIN,
        SCORE_MAX - penalty - flagsGame.wrongAttempts,
    );
    document.getElementById("flags-live-score").textContent =
        `Потенциал: ${potential}`;
}

function submitFlagAnswer() {
    if (!flagsGame.running || flagsGame.locked) return;
    if (!flagsGame.currentCountry) return;

    const input = document.getElementById("flag-input");
    let value = input.value.trim();
    if (value.length === 0) return;

    flagsGame.locked = true;
    input.disabled = true;
    document.getElementById("flag-submit").disabled = true;

    if (isFlagAnswerCorrect(value, flagsGame.currentCountry)) {
        const elapsed = (Date.now() - flagsGame.countryStartTime) / 1000;
        const penalty = timePenalty(elapsed, 2);
        const score = Math.max(
            SCORE_MIN,
            SCORE_MAX - penalty - flagsGame.wrongAttempts,
        );
        handleCorrectFlag(score);
    } else {
        flagsGame.wrongAttempts++;
        input.className = "wrong";
        input.disabled = false;
        input.focus();
        input.select();
        document.getElementById("flag-submit").disabled = false;
        flagsGame.locked = false;

        const msg = document.getElementById("flags-message");
        if (flagsGame.wrongAttempts >= 3) {
            msg.textContent = `Правильный ответ: ${flagsGame.currentCountry.name}`;
            msg.className = "message wrong";
            setTimeout(() => handleCorrectFlag(SCORE_MIN), 2000);
            flagsGame.locked = true;
            input.disabled = true;
            document.getElementById("flag-submit").disabled = true;
            return;
        }
        msg.textContent = "Неверно, попробуйте ещё раз";
        msg.className = "message wrong";
    }
}

function handleCorrectFlag(score) {
    if (flagsGame.tickInterval) {
        clearInterval(flagsGame.tickInterval);
        flagsGame.tickInterval = null;
    }
    const elapsed = (Date.now() - flagsGame.countryStartTime) / 1000;
    flagsGame.records.push({
        iso: flagsGame.currentCountry.isoCode,
        name: flagsGame.currentCountry.name,
        time: elapsed,
        score,
        wrongClicks: flagsGame.wrongAttempts,
    });
    flagsGame.totalScore += score;
    document.getElementById("flags-score-value").textContent =
        flagsGame.totalScore;

    const input = document.getElementById("flag-input");
    input.disabled = true;
    input.className = "correct";
    document.getElementById("flag-submit").disabled = true;

    const msg = document.getElementById("flags-message");
    msg.textContent = `+${score} очков`;
    msg.className = "message correct";

    flagsGame.currentIndex++;

    setTimeout(() => {
        msg.textContent = "";
        msg.className = "message";
        showNextFlag();
    }, 1200);
}

function finishFlagsLesson(passed, reason) {
    flagsGame.running = false;
    if (flagsGame.tickInterval) {
        clearInterval(flagsGame.tickInterval);
        flagsGame.tickInterval = null;
    }

    const maxScore = flagsGame.countries.length * SCORE_MAX;
    const percent = maxScore > 0 ? (flagsGame.totalScore / maxScore) * 100 : 0;
    const totalTime = (Date.now() - flagsGame.lessonStartTime) / 1000;

    const allUnder7 =
        flagsGame.records.length === flagsGame.countries.length &&
        flagsGame.records.every((r) => r.time < 7);
    const allUnder9 =
        flagsGame.records.length === flagsGame.countries.length &&
        flagsGame.records.every((r) => r.time < 9);
    const allUnder12 =
        flagsGame.records.length === flagsGame.countries.length &&
        flagsGame.records.every((r) => r.time < 12);

    let medal = null;
    if (reason !== "timeout") {
        if (percent >= 100 && allUnder7) medal = "amethyst";
        else if (percent >= 100 && allUnder9) medal = "pearl";
        else if (percent >= 100 && allUnder12) medal = "gold";
        else if (percent >= 90) medal = "silver";
        else if (percent >= 80) medal = "bronze";
    }
    const isPassed = reason !== "timeout" && percent >= PASS_PERCENT;
    setSectionProgress(flagsGame.levelId, flagsGame.lessonType, {
        passed: isPassed,
        medal,
        percent,
    });
    document.querySelectorAll(".journal-progress-fill").forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
    });
    if (isPassed)
        setBestLessonScore(
            flagsGame.levelId,
            flagsGame.lessonType,
            flagsGame.totalScore,
        );

    flagsGame.lastResult = {
        percent,
        totalScore: flagsGame.totalScore,
        maxScore,
        totalTime,
        medal,
        passed: isPassed,
        reason,
        allUnder10: allUnder12,
        allUnder5: allUnder7,
        allUnder7: allUnder9,
    };
    game.lastResult = flagsGame.lastResult;
    game.records = flagsGame.records;
    game.levelId = flagsGame.levelId;
    game.lessonType = flagsGame.lessonType;
    game.countries = flagsGame.countries;

    renderStatsScreen(game.lastResult);
    setTimeout(() => showScreen("screen-stats"), 800);
}

function abortFlagsGame() {
    flagsGame.running = false;
    flagsGame.locked = true;
    if (flagsGame.tickInterval) {
        clearInterval(flagsGame.tickInterval);
        flagsGame.tickInterval = null;
    }
    const level = allLevels.find((l) => l.id === flagsGame.levelId);
    if (level) openLevel(level);
    else showLevels();
}

/* ============ ИГРА «СТОЛИЦЫ» ============ */

const capitalsGame = {
    levelId: null,
    lessonType: null,
    countries: [],
    currentIndex: 0,
    currentCountry: null,
    countryStartTime: 0,
    tickInterval: null,
    lessonStartTime: 0,
    wrongAttempts: 0,
    records: [],
    totalScore: 0,
    running: false,
    locked: true,
    lastResult: null,
};

async function startCapitalsLesson(level, lessonType) {
    capitalsGame.levelId = level.id;
    capitalsGame.lessonType = lessonType;
    capitalsGame.currentIndex = 0;
    capitalsGame.records = [];
    capitalsGame.totalScore = 0;
    capitalsGame.running = false;
    capitalsGame.locked = true;

    if (lessonType === "learn" || lessonType === "practice") {
        await ensureAllCountriesLoaded();
    }

    let list = [];
    try {
        const res = await fetch(
            `/api/levels/${level.id}/lessons/${lessonType}/countries`,
        );
        if (!res.ok) return;
        list = await res.json();
    } catch (e) {
        return;
    }
    capitalsGame.countries = shuffle(list);

    document.getElementById("capitals-score-value").textContent = "0";
    document.getElementById("capitals-message").textContent = "";
    document.getElementById("capitals-message").className = "message";
    document.getElementById("capital-hints").innerHTML = "";
    document.getElementById("capital-test-options").innerHTML = "";

    showScreen("screen-capitals-game");
    setTimeout(() => beginCapitalsLesson(), 200);
}

function beginCapitalsLesson() {
    capitalsGame.lessonStartTime = Date.now();
    capitalsGame.running = true;
    showNextCapital();
}

async function showNextCapital() {
    if (capitalsGame.currentIndex >= capitalsGame.countries.length) {
        finishCapitalsLesson(true);
        return;
    }
    capitalsGame.currentCountry =
        capitalsGame.countries[capitalsGame.currentIndex];
    capitalsGame.countryStartTime = Date.now();
    capitalsGame.wrongAttempts = 0;
    capitalsGame.locked = false;

    document.getElementById("capitals-progress-text").textContent =
        `${capitalsGame.currentIndex + 1} / ${capitalsGame.countries.length}`;
    document.getElementById("capitals-question").textContent =
        capitalsGame.currentCountry.capital + " — столица какой страны?";

    const img = document.getElementById("capital-image");
    const loader = document.getElementById("capital-image-loader");
    img.classList.remove("loaded");
    loader.classList.remove("hidden");
    img.src = "";

    loadCityImage(capitalsGame.currentCountry.capital).then((url) => {
        if (url) {
            img.onload = () => {
                img.classList.add("loaded");
                loader.classList.add("hidden");
            };
            img.onerror = () => {
                loader.innerHTML =
                    '<span style="color:#a0a0b8;font-size:14px;">Фото недоступно</span>';
            };
            img.src = url;
        } else {
            loader.innerHTML =
                '<span style="color:#a0a0b8;font-size:14px;">Фото недоступно</span>';
        }
    });

    const inputBlock = document.querySelector(
        "#screen-capitals-game .flag-input-block",
    );
    const testBox = document.getElementById("capital-test-options");
    const hintsBox = document.getElementById("capital-hints");

    inputBlock.style.display = "none";
    testBox.style.display = "none";
    hintsBox.innerHTML = "";

    if (capitalsGame.lessonType === "learn") {
        testBox.style.display = "grid";
        renderTestOptions(
            testBox,
            capitalsGame.currentCountry,
            (chosen, correct, btn) => {
                if (chosen.id === correct.id) {
                    btn.classList.add("correct");
                    const elapsed =
                        (Date.now() - capitalsGame.countryStartTime) / 1000;
                    const penalty = timePenalty(elapsed, 2);
                    const score = Math.max(SCORE_MIN, SCORE_MAX - penalty);
                    handleCorrectCapital(score);
                } else {
                    btn.classList.add("wrong");
                    const btns =
                        btn.parentElement.querySelectorAll(".test-option");
                    btns.forEach((b) => {
                        if (b.textContent === correct.name)
                            b.classList.add("correct");
                    });
                    const msg = document.getElementById("capitals-message");
                    msg.textContent = `Правильный ответ: ${correct.name}`;
                    msg.className = "message wrong";
                    setTimeout(() => {
                        capitalsGame.records.push({
                            iso: correct.isoCode,
                            name: correct.name,
                            time:
                                (Date.now() - capitalsGame.countryStartTime) /
                                1000,
                            score: SCORE_MIN,
                            wrongClicks: 1,
                        });
                        capitalsGame.totalScore += SCORE_MIN;
                        document.getElementById(
                            "capitals-score-value",
                        ).textContent = capitalsGame.totalScore;
                        capitalsGame.currentIndex++;
                        if (capitalsGame.tickInterval) {
                            clearInterval(capitalsGame.tickInterval);
                            capitalsGame.tickInterval = null;
                        }
                        setTimeout(() => {
                            msg.textContent = "";
                            msg.className = "message";
                            showNextCapital();
                        }, 900);
                    }, 1500);
                }
            },
        );
    } else {
        inputBlock.style.display = "flex";
        const input = document.getElementById("capital-input");
        input.value = "";
        input.disabled = false;
        input.className = "";
        input.focus();
        document.getElementById("capital-submit").disabled = false;
        hintsBox.innerHTML = "";
        hintsBox.classList.remove("visible");

        input.oninput = null;
        input.onkeydown = null;

        if (capitalsGame.lessonType === "practice") {
            input.oninput = () =>
                onInputHints(input, hintsBox, (val) => {
                    input.value = val;
                    hintsBox.innerHTML = "";
                    hintsBox.classList.remove("visible");
                    input.focus();
                    submitCapitalAnswer();
                });
        }

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                submitCapitalAnswer();
            }
        };
    }
    startCapitalsTick();
}

async function loadCityImage(cityName) {
    const sources = [
        `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}?redirect=true`,
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}?redirect=true`,
    ];

    for (const url of sources) {
        try {
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            if (data.originalimage && data.originalimage.source) {
                return data.originalimage.source;
            }
            if (data.thumbnail && data.thumbnail.source) {
                return data.thumbnail.source;
            }
        } catch (e) {
            /* пробуем следующий источник */
        }
    }
    return null;
}

function startCapitalsTick() {
    if (capitalsGame.tickInterval) clearInterval(capitalsGame.tickInterval);
    capitalsGame.tickInterval = setInterval(onCapitalsTick, 33);
}

function onCapitalsTick() {
    if (!capitalsGame.running) return;

    const ms = Date.now() - capitalsGame.countryStartTime;
    const elapsed = ms / 1000;
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const c = Math.floor((ms % 1000) / 10);

    document.getElementById("capitals-timer").textContent =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0") +
        "," +
        String(c).padStart(2, "0");

    if (elapsed >= TIME_LIMIT + 2) {
        clearInterval(capitalsGame.tickInterval);
        capitalsGame.tickInterval = null;
        capitalsGame.running = false;
        capitalsGame.locked = true;
        finishCapitalsLesson(false, "timeout");
        return;
    }

    const penalty = timePenalty(elapsed, 2);
    const potential = Math.max(
        SCORE_MIN,
        SCORE_MAX - penalty - capitalsGame.wrongAttempts,
    );
    document.getElementById("capitals-live-score").textContent =
        `Потенциал: ${potential}`;
}

function submitCapitalAnswer() {
    if (!capitalsGame.running || capitalsGame.locked) return;
    if (!capitalsGame.currentCountry) return;

    const input = document.getElementById("capital-input");
    let value = input.value.trim();
    if (value.length === 0) return;

    capitalsGame.locked = true;
    input.disabled = true;
    document.getElementById("capital-submit").disabled = true;

    if (isFlagAnswerCorrect(value, capitalsGame.currentCountry)) {
        const elapsed = (Date.now() - capitalsGame.countryStartTime) / 1000;
        const penalty = timePenalty(elapsed, 2);
        const score = Math.max(
            SCORE_MIN,
            SCORE_MAX - penalty - capitalsGame.wrongAttempts,
        );
        handleCorrectCapital(score);
    } else {
        capitalsGame.wrongAttempts++;
        input.className = "wrong";
        input.disabled = false;
        input.focus();
        input.select();
        document.getElementById("capital-submit").disabled = false;
        capitalsGame.locked = false;

        const msg = document.getElementById("capitals-message");
        if (capitalsGame.wrongAttempts >= 3) {
            msg.textContent = `Правильный ответ: ${capitalsGame.currentCountry.name}`;
            msg.className = "message wrong";
            setTimeout(() => handleCorrectCapital(SCORE_MIN), 2000);
            capitalsGame.locked = true;
            input.disabled = true;
            document.getElementById("capital-submit").disabled = true;
            return;
        }
        msg.textContent = "Неверно, попробуйте ещё раз";
        msg.className = "message wrong";
    }
}

function handleCorrectCapital(score) {
    if (capitalsGame.tickInterval) {
        clearInterval(capitalsGame.tickInterval);
        capitalsGame.tickInterval = null;
    }
    const elapsed = (Date.now() - capitalsGame.countryStartTime) / 1000;
    capitalsGame.records.push({
        iso: capitalsGame.currentCountry.isoCode,
        name: capitalsGame.currentCountry.name,
        time: elapsed,
        score,
        wrongClicks: capitalsGame.wrongAttempts,
    });
    capitalsGame.totalScore += score;
    document.getElementById("capitals-score-value").textContent =
        capitalsGame.totalScore;

    const input = document.getElementById("capital-input");
    input.disabled = true;
    input.className = "correct";
    document.getElementById("capital-submit").disabled = true;

    const msg = document.getElementById("capitals-message");
    msg.textContent = `+${score} очков`;
    msg.className = "message correct";

    capitalsGame.currentIndex++;

    setTimeout(() => {
        msg.textContent = "";
        msg.className = "message";
        showNextCapital();
    }, 1200);
}

function finishCapitalsLesson(passed, reason) {
    capitalsGame.running = false;
    if (capitalsGame.tickInterval) {
        clearInterval(capitalsGame.tickInterval);
        capitalsGame.tickInterval = null;
    }

    const maxScore = capitalsGame.countries.length * SCORE_MAX;
    const percent =
        maxScore > 0 ? (capitalsGame.totalScore / maxScore) * 100 : 0;
    const totalTime = (Date.now() - capitalsGame.lessonStartTime) / 1000;

    const allUnder7 =
        capitalsGame.records.length === capitalsGame.countries.length &&
        capitalsGame.records.every((r) => r.time < 7);
    const allUnder9 =
        capitalsGame.records.length === capitalsGame.countries.length &&
        capitalsGame.records.every((r) => r.time < 9);
    const allUnder12 =
        capitalsGame.records.length === capitalsGame.countries.length &&
        capitalsGame.records.every((r) => r.time < 12);

    let medal = null;
    if (reason !== "timeout") {
        if (percent >= 100 && allUnder7) medal = "amethyst";
        else if (percent >= 100 && allUnder9) medal = "pearl";
        else if (percent >= 100 && allUnder12) medal = "gold";
        else if (percent >= 90) medal = "silver";
        else if (percent >= 80) medal = "bronze";
    }
    const isPassed = reason !== "timeout" && percent >= PASS_PERCENT;
    setSectionProgress(capitalsGame.levelId, capitalsGame.lessonType, {
        passed: isPassed,
        medal,
        percent,
    });
    document.querySelectorAll(".journal-progress-fill").forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
    });
    if (isPassed)
        setBestLessonScore(
            capitalsGame.levelId,
            capitalsGame.lessonType,
            capitalsGame.totalScore,
        );

    capitalsGame.lastResult = {
        percent,
        totalScore: capitalsGame.totalScore,
        maxScore,
        totalTime,
        medal,
        passed: isPassed,
        reason,
        allUnder10: allUnder12,
        allUnder5: allUnder7,
        allUnder7: allUnder9,
    };
    game.lastResult = capitalsGame.lastResult;
    game.records = capitalsGame.records;
    game.levelId = capitalsGame.levelId;
    game.lessonType = capitalsGame.lessonType;
    game.countries = capitalsGame.countries;

    renderStatsScreen(game.lastResult);
    setTimeout(() => showScreen("screen-stats"), 800);
}

function abortCapitalsGame() {
    capitalsGame.running = false;
    capitalsGame.locked = true;
    if (capitalsGame.tickInterval) {
        clearInterval(capitalsGame.tickInterval);
        capitalsGame.tickInterval = null;
    }
    const level = allLevels.find((l) => l.id === capitalsGame.levelId);
    if (level) openLevel(level);
    else showLevels();
}

/* ============ ENTER ============ */

document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (
        e.target &&
        (e.target.id === "flag-input" || e.target.id === "capital-input")
    ) {
        return;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    updateRatingDisplays();
    showScreen("screen-welcome");
});
