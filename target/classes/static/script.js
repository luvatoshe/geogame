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

const LESSONS = [
    {
        key: "learn",
        title: "Обучение",
        icon: "📖",
        desc: "Страны подсвечены белым",
    },
    {
        key: "practice",
        title: "Практика",
        icon: "🎯",
        desc: "Без подсказок, но с заливкой",
    },
    {
        key: "exam",
        title: "Экзамен",
        icon: "🏆",
        desc: "Чистая карта без следов",
    },
];

const RANKS = [
    { min: 0, icon: "🌱", name: "Новичок" },
    { min: 500, icon: "📚", name: "Ученик" },
    { min: 2000, icon: "🎓", name: "Знаток" },
    { min: 5000, icon: "🏅", name: "Эксперт" },
    { min: 10000, icon: "👑", name: "Мастер" },
    { min: 20000, icon: "💎", name: "Легенда" },
];

let map = null;
let allLevels = [];
let progress = {};

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

const STORAGE_KEY = "geogame_progress_v2";
const RATING_KEY = "geogame_rating_v1";

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

function getLessonProgress(levelId, lessonKey) {
    return (progress[levelId] && progress[levelId][lessonKey]) || null;
}

function setLessonProgress(levelId, lessonKey, data) {
    if (!progress[levelId]) progress[levelId] = {};
    progress[levelId][lessonKey] = data;
    saveProgress();
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
    const key = `${levelId}_${lessonKey}`;
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
    for (const r of RANKS) {
        if (points >= r.min) current = r;
    }
    return current;
}

function updateRatingDisplays() {
    const points = getTotalRating();
    const rank = getRank(points);

    const welcomeIcon = document.getElementById("welcome-rank-icon");
    const welcomeName = document.getElementById("welcome-rank-name");
    const welcomeRating = document.getElementById("welcome-rating");
    if (welcomeIcon) welcomeIcon.textContent = rank.icon;
    if (welcomeName) welcomeName.textContent = rank.name;
    if (welcomeRating) welcomeRating.textContent = points;

    const mapIcon = document.getElementById("map-rank-icon");
    const mapRating = document.getElementById("map-rating");
    if (mapIcon) mapIcon.textContent = rank.icon;
    if (mapRating) mapRating.textContent = points;
}

function isLessonUnlocked(levelId, lessonIndex) {
    if (lessonIndex === 0) return true;
    const prevKey = LESSONS[lessonIndex - 1].key;
    const prev = getLessonProgress(levelId, prevKey);
    return prev && prev.passed;
}

function isLevelUnlocked(levelIndex) {
    if (levelIndex === 0) return true;
    const prevLevelId = allLevels[levelIndex - 1].id;
    const prevExam = getLessonProgress(prevLevelId, "exam");
    return prevExam && prevExam.passed;
}

function getLevelStatus(levelIndex) {
    const level = allLevels[levelIndex];
    const exam = getLessonProgress(level.id, "exam");
    if (exam && exam.passed) return "completed";
    if (isLevelUnlocked(levelIndex)) return "current";
    return "locked";
}

function countPassedLessons(levelId) {
    let n = 0;
    for (const l of LESSONS) {
        const p = getLessonProgress(levelId, l.key);
        if (p && p.passed) n++;
    }
    return n;
}

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

function getLevelPosition(idx) {
    const positions = [
        { x: 50, y: 8 },
        { x: 68, y: 14 },
        { x: 60, y: 22 },
        { x: 40, y: 28 },
        { x: 30, y: 36 },
        { x: 48, y: 42 },
        { x: 65, y: 46 },
        { x: 55, y: 54 },
        { x: 38, y: 58 },
        { x: 28, y: 66 },
        { x: 45, y: 72 },
        { x: 62, y: 76 },
        { x: 52, y: 84 },
        { x: 35, y: 88 },
        { x: 22, y: 82 },
        { x: 30, y: 74 },
        { x: 55, y: 64 },
        { x: 70, y: 58 },
        { x: 78, y: 68 },
    ];
    return positions[idx % positions.length];
}

function openLevel(level) {
    document.getElementById("lessons-title").textContent = level.title;
    const grid = document.getElementById("lessons-grid");
    grid.innerHTML = "";
    LESSONS.forEach((lesson, idx) => {
        const unlocked = isLessonUnlocked(level.id, idx);
        const prog = getLessonProgress(level.id, lesson.key);
        const card = document.createElement("div");
        card.className = "lesson-card" + (unlocked ? "" : " locked");

        let medalHtml = "";
        if (prog && prog.percent != null) {
            const icon = prog.medal
                ? MEDAL_LABELS[prog.medal]?.split(" ")[0] || ""
                : "";
            medalHtml = `<span class="medal-badge"><span class="medal-emoji">${icon}</span><span class="medal-percent">${Math.round(prog.percent)}%</span></span>`;
        }
        card.innerHTML = `
            <div class="lesson-icon">${lesson.icon}</div>
            <h3>${lesson.title}</h3>
            <p>${lesson.desc}</p>
            ${medalHtml}
        `;

        if (unlocked) card.onclick = () => startLesson(level, lesson.key);
        grid.appendChild(card);
    });
    showScreen("screen-lessons");
}

function initMap() {
    if (map) return;
    const container = document.getElementById("map-container");
    const w = container.clientWidth || 1200;
    const h = 600;

    map = new jsVectorMap({
        selector: "#map-container",
        map: "world",
        width: w,
        height: h,
        zoomButtons: true,
        zoomOnScroll: false,
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
    const container = document.getElementById("map-container");
    if (!container) return null;
    return container.querySelector(`[data-code="${iso}"]`);
}

function setRegionFill(iso, color) {
    const el = getRegionEl(iso);
    if (!el) return;
    el.style.fill = color;
    el.setAttribute("fill", color);
}

function paintAll(color) {
    const container = document.getElementById("map-container");
    if (!container) return;
    container.querySelectorAll("[data-code]").forEach((el) => {
        el.style.fill = color;
        el.setAttribute("fill", color);
        el.classList.remove("flash-target");
    });
}

function scoreColor(score) {
    const s = Math.max(SCORE_MIN, Math.min(SCORE_MAX, score));
    const t = (s - 1) / 9;
    return `hsl(${t * 120}, 65%, 50%)`;
}

function timePenalty(seconds) {
    if (seconds <= 10) return 0;
    if (seconds > 35) return 6;
    return Math.ceil((seconds - 10) / 5);
}

function currentPotentialScore() {
    const elapsed = (Date.now() - game.countryStartTime) / 1000;
    const penalty = timePenalty(elapsed);
    const raw = SCORE_MAX - penalty - game.wrongClicks;
    return Math.max(SCORE_MIN, raw);
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

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
        `Страна ${game.currentIndex + 1} из ${game.countries.length}`;

    if (game.lessonType === "learn") {
        for (let i = game.currentIndex; i < game.countries.length; i++) {
            const iso = game.countries[i].isoCode;
            if (!isRegionSolved(iso)) {
                setRegionFill(iso, "#ffffff");
            }
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
    const elapsed = Date.now() - game.countryStartTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centi = Math.floor((elapsed % 1000) / 10);
    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "," +
        String(centi).padStart(2, "0");
}

function onCountryClick(iso) {
    if (!game.running || game.locked) return;
    if (!game.currentCountry) return;

    if (game.awaitingFlash) {
        if (iso === game.currentCountry.isoCode) {
            resolveCountry(1);
        }
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
        if (game.wrongClicks >= 3) {
            enterFlashMode();
        } else {
            document.getElementById("live-score").textContent =
                `Потенциал: ${currentPotentialScore()}`;
        }
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
        iso: iso,
        name: game.currentCountry.name,
        time: elapsed,
        score: score,
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
    setLessonProgress(game.levelId, game.lessonType, {
        passed: isPassed,
        medal: medal,
        percent: percent,
    });

    if (isPassed) {
        setBestLessonScore(game.levelId, game.lessonType, game.totalScore);
    }

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
    const container = document.getElementById("map-container");
    if (!container) return;
    container.querySelectorAll("[data-code]").forEach((el) => {
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

function renderStatsScreen(r) {
    const titleEl = document.getElementById("stats-title");
    const subtitleEl = document.getElementById("stats-subtitle");

    if (r.reason === "timeout") {
        titleEl.textContent = "Время вышло";
        subtitleEl.textContent = "Одна из стран не была найдена вовремя";
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

    const mins = Math.floor(r.totalTime / 60);
    const secs = Math.floor(r.totalTime % 60);
    document.getElementById("stats-time").textContent =
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    const list = document.getElementById("detailed-stats-list");
    list.innerHTML = "";
    game.records.forEach((rec, i) => {
        const row = document.createElement("div");
        row.className = "detail-row";
        let timeClass = "slow";
        if (rec.time < 5) timeClass = "fast";
        else if (rec.time < 7) timeClass = "medium";
        else if (rec.time < 10) timeClass = "normal";
        row.innerHTML = `
            <span class="detail-row-index">${i + 1}.</span>
            <span class="detail-row-name">${rec.name}</span>
            <span class="detail-row-time ${timeClass}">${rec.time.toFixed(2)} с</span>
            <span class="detail-row-score">+${rec.score}</span>
        `;
        list.appendChild(row);
    });

    const details = document.getElementById("detailed-stats");
    details.classList.remove("expanded");
    document.getElementById("btn-expand").textContent =
        "📊 Подробная статистика";
}

function toggleDetailedStats() {
    const details = document.getElementById("detailed-stats");
    const btn = document.getElementById("btn-expand");
    if (details.classList.contains("expanded")) {
        details.classList.remove("expanded");
        btn.textContent = "📊 Подробная статистика";
    } else {
        details.classList.add("expanded");
        btn.textContent = "📊 Скрыть статистику";
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
    rays.classList.remove("active");

    const icons = {
        amethyst: "🟣",
        pearl: "⚪",
        gold: "🥇",
        silver: "🥈",
        bronze: "🥉",
        fail: "⏱️",
        none: "—",
    };
    const titles = {
        amethyst: "Аметист",
        pearl: "Жемчуг",
        gold: "Золото",
        silver: "Серебро",
        bronze: "Бронза",
    };
    const subs = {
        amethyst: "Идеально — все страны меньше 5 секунд!",
        pearl: "Великолепно — все страны меньше 7 секунд",
        gold: "Отлично — все страны меньше 10 секунд",
        silver: "Хороший результат, но можно быстрее",
        bronze: "Урок пройден — продолжайте тренироваться",
    };

    if (r.reason === "timeout") {
        icon.textContent = icons.fail;
        title.textContent = "Время вышло";
        subtitle.textContent = "Не удалось пройти урок";
        title.classList.add("medal-fail");
        medal.classList.add("glow-fail");
    } else if (r.medal) {
        icon.textContent = icons[r.medal];
        title.textContent = titles[r.medal];
        subtitle.textContent = subs[r.medal];
        title.classList.add("medal-" + r.medal);
        medal.classList.add("glow-" + r.medal);
        setTimeout(() => rays.classList.add("active"), 200);
    } else {
        icon.textContent = icons.none;
        title.textContent = r.passed ? "Урок пройден" : "Не хватило баллов";
        subtitle.textContent = r.passed
            ? "Можно идти дальше"
            : `Нужно не менее ${PASS_PERCENT}%`;
        title.classList.add("medal-fail");
        medal.classList.add("glow-fail");
    }

    const barContainer = document.getElementById("reward-bar-container");
    barContainer.innerHTML = "";
    if (r.allUnder10 && game.records.length > 0) {
        const total = game.records.length;
        const a = game.records.filter((x) => x.time < 5).length;
        const p = game.records.filter((x) => x.time >= 5 && x.time < 7).length;
        const g = game.records.filter((x) => x.time >= 7 && x.time < 10).length;
        const aPct = Math.round((a / total) * 100);
        const pPct = Math.round((p / total) * 100);
        const gPct = 100 - aPct - pPct;
        barContainer.innerHTML = `
            <div class="medal-bar-label">Распределение по скоростям</div>
            <div class="medal-bar">
                ${aPct > 0 ? `<div class="medal-segment amethyst" style="width:${aPct}%">🟣 ${aPct}%</div>` : ""}
                ${pPct > 0 ? `<div class="medal-segment pearl" style="width:${pPct}%">⚪ ${pPct}%</div>` : ""}
                ${gPct > 0 ? `<div class="medal-segment gold" style="width:${gPct}%">🥇 ${gPct}%</div>` : ""}
            </div>
        `;
    }
}

function retryLesson() {
    const level = allLevels.find((l) => l.id === game.levelId);
    if (!level) return;
    startLesson(level, game.lessonType);
}

function backToLevels() {
    showLevels();
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

document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    updateRatingDisplays();
    showScreen("screen-welcome");
});

const LEVEL_ICONS = {
    1: "🌍",
    2: "❄️",
    3: "🏰",
    4: "🦁",
    5: "🏔️",
    6: "🌊",
    7: "🌴",
    8: "🕌",
    9: "🐎",
    10: "🏜️",
    11: "🦒",
    12: "🌺",
    13: "🗿",
    14: "🏝️",
    15: "🏛️",
    16: "🌾",
    17: "🐘",
    18: "🐠",
    19: "🏁",
};

const MEDAL_EMOJI = {
    amethyst: "🟣",
    pearl: "⚪",
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉",
};

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
    for (const l of LESSONS) {
        const p = getLessonProgress(levelId, l.key);
        if (p && p.medal) result.push(MEDAL_EMOJI[p.medal]);
    }
    return result;
}

function getLevelLastDate(levelId) {
    let latest = 0;
    for (const l of LESSONS) {
        const p = getLessonProgress(levelId, l.key);
        if (p && p.passed && p.date && p.date > latest) {
            latest = p.date;
        }
    }
    return latest;
}

async function showLevels() {
    await ensureLevelsLoaded();
    updateRatingDisplays();
    renderLevels();
    showScreen("screen-levels");
}

function renderLevels() {
    const grid = document.getElementById("levels-grid");
    if (!grid) return;
    grid.innerHTML = "";

    allLevels.forEach((lvl, idx) => {
        const status = getLevelStatus(idx);
        const passed = countPassedLessons(lvl.id);
        const medals = getLevelMedals(lvl.id);
        const lastDate = getLevelLastDate(lvl.id);
        const icon = LEVEL_ICONS[idx + 1] || "🌍";

        const card = document.createElement("div");
        card.className = "journal-card";
        if (status === "completed") card.classList.add("completed");
        else if (status === "current") card.classList.add("current");
        else card.classList.add("locked");

        let dotsHtml = "";
        for (let i = 0; i < 3; i++) {
            dotsHtml += `<div class="journal-dot${i < passed ? " passed" : ""}"></div>`;
        }

        const medalsHtml = medals.length
            ? medals
                  .map((m) => `<span class="journal-medal">${m}</span>`)
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
            ${lockHtml}
            ${completedStamp}
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
                    <div class="journal-progress-fill" style="width:${(passed / 3) * 100}%"></div>
                </div>
                <div class="journal-progress-label">${passed}/3</div>
            </div>
            <div class="journal-footer">
                <div class="journal-medals">${medalsHtml}</div>
                <div class="journal-lesson-dots">${dotsHtml}</div>
            </div>
            ${dateHtml}
        `;

        if (status !== "locked") {
            card.onclick = () => openLevel(lvl);
        }

        grid.appendChild(card);
    });
}

function backToLevels() {
    showLevels();
}
