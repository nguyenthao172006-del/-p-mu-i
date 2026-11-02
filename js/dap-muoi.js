(() => {
  const STARS_SRC = "img/stars.png";
  // every picture used by the game, loaded from the img/ folder
  const SRC = {
    hair_long: "img/hair_long.png",
    hair_long_red: "img/hair_long_red.png",
    hair: "img/hair.png",
    hair_red: "img/hair_red.png",
    body: "img/body.png",
    front: "img/front.png",
    head: "img/head.png",
    head_red: "img/head_red.png",
    rib: "img/rib.png",
    mq_body: "img/mq_body.png",
    mq_wing: "img/mq_wing.png",
    neck: "img/neck.png",
    neck_red: "img/neck_red.png",
    neck_m: "img/neck_m.png",
    neck_m_red: "img/neck_m_red.png",
    sb_curly_l: "img/sb_curly_l.webp",
    sb_curly_l_m: "img/sb_curly_l_m.png",
    sb_curly_s: "img/sb_curly_s.webp",
    sb_curly_s_m: "img/sb_curly_s_m.png",
    sb_part_l: "img/sb_part_l.webp",
    sb_part_l_m: "img/sb_part_l_m.png",
    sb_part_s: "img/sb_part_s.webp",
    sb_part_s_m: "img/sb_part_s_m.png",
    sb_spiky_l: "img/sb_spiky_l.webp",
    sb_spiky_l_m: "img/sb_spiky_l_m.png",
    sb_spiky_s: "img/sb_spiky_s.webp",
    sb_spiky_s_m: "img/sb_spiky_s_m.png",
    sb_twoblock_l: "img/sb_twoblock_l.webp",
    sb_twoblock_l_m: "img/sb_twoblock_l_m.png",
    sb_twoblock_s: "img/sb_twoblock_s.webp",
    sb_twoblock_s_m: "img/sb_twoblock_s_m.png",
    sg_curly_l: "img/sg_curly_l.webp",
    sg_curly_s: "img/sg_curly_s.webp",
    sg_straight_l: "img/sg_straight_l.webp",
    sg_straight_s: "img/sg_straight_s.webp",
    sg_wavy_l: "img/sg_wavy_l.webp",
    sg_wavy_s: "img/sg_wavy_s.webp",
  };

  const cvs = document.getElementById("c"),
    ctx = cvs.getContext("2d");
  const $ = (id) => document.getElementById(id);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v ? JSON.parse(v) : d;
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    },
  };

  /* ---------- data ---------- */
  const SAMPLE = [
    "Nguyễn Quỳnh Hoa",
    "Cao Minh Trí",
    "Lương Hoàng Phương Dung",
    "Thanh Hải",
    "Bùi Gia Huy",
    "Khánh Quỳnh",
    "Minh Huy",
    "Đình Trọng",
    "Quốc Tuấn An",
    "Thị Mỹ Linh",
    "Nguyễn Khang",
    "Nguyễn Anh Khoa",
    "Thị Mai Anh",
    "Bảo Đông An",
    "Ngô Thảo Hiền",
    "Nguyễn Bảo Châu",
    "Đức Mạnh",
    "Thành Đạt",
    "Hà Phương Linh",
    "Trúc Mai",
    "Thuỳ Trang",
    "Ngọc Minh",
    "Gia Anh Đức",
    "Huy Khánh",
    "Ngân Hà",
    "Nhật Minh",
    "Thành Phát",
    "Vũ Văn Khánh",
    "Ngọc Thanh Thảo",
    "Nguyễn Phương Anh",
  ];
  let names = store.get("dapmuoi.names", SAMPLE);
  let caught = new Set();

  const SHIRTS = [
    ["#fff1d6", "Kem"],
    ["#ffd23f", "Vàng"],
    ["#f78fa7", "Hồng"],
    ["#7ed6a5", "Bạc hà"],
    ["#b9a6f5", "Tím"],
    ["#2f3e5c", "Xanh navy"],
  ];
  const HAIRS = [
    ["short", "Ngắn"],
    ["long", "Dài"],
  ];
  const STYLES_F = [
    ["curly", "Xoăn lọn"],
    ["straight", "Thẳng mái"],
    ["wavy", "Gợn sóng"],
  ];
  const STYLES_M = [
    ["curly", "Xoăn"],
    ["twoblock", "Two-block"],
    ["part", "Rẽ ngôi"],
    ["spiky", "Dựng / Wolf"],
  ];
  const GENDERS = [
    ["f", "Nữ"],
    ["m", "Nam"],
  ];
  const HAIRCOLS = [
    ["", "Nâu caramel (gốc)", "#a35d2a"],
    ["#2b211d", "Đen", "#2b211d"],
    ["#5a3420", "Nâu đậm", "#5a3420"],
    ["#d9a54e", "Vàng", "#e0b062"],
    ["#e07fa6", "Hồng", "#e98bb0"],
    ["#8e6fd8", "Tím", "#9b7be0"],
    ["#4aa3dc", "Xanh", "#5fb3e6"],
  ];
  const BGS = [
    ["#53a8fb|#3a8de6", "Xanh dương"],
    ["#ffa6c6|#f06a9a", "Hồng"],
    ["#c0aaff|#8a6ee6", "Tím"],
    ["#86e3bd|#38b887", "Bạc hà"],
    ["#ffcf8a|#f59a3c", "Cam"],
    ["#3b4a7a|#1c2440", "Đêm"],
  ];
  const DECOS = [
    ["sky", "Nền đầy sao"],
    ["none", "Không"],
  ];
  const ACCS = [
    ["none", "Không"],
    ["bunny", "Tai thỏ"],
    ["bow", "Nơ"],
    ["crown", "Vương miện"],
    ["witch", "Mũ phù thủy"],
  ];
  let look = Object.assign(
    {
      shirt: "#fff1d6",
      hair: "short",
      hairColor: "",
      bg: "#53a8fb|#3a8de6",
      acc: "none",
      deco: "none",
      gender: "f",
      styleF: "curly",
      styleM: "curly",
    },
    store.get("dapmuoi.look6", {}),
  );
  const SKIN = "#eda57f",
    ANGRY = "#e5322a";

  /* ---------- sizing ---------- */
  let W,
    H,
    u,
    S,
    L,
    T,
    TOPY = 90; // S = on-screen size of the 640px head sprite, L/T = its top-left
  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    cvs.width = Math.round(W * dpr);
    cvs.height = Math.round(H * dpr);
    cvs.style.width = W + "px";
    cvs.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    u = Math.min(W / 6.2, H / 7.4);
    S = Math.min(W * 0.92, H * 0.6);
    TOPY = W < 560 ? 132 : 90;
    L = W / 2 - S / 2;
    T = H - (S * 1000) / 640; // the 640x1000 character sheet is anchored to the bottom of the screen
  }
  addEventListener("resize", resize);
  resize();

  /* ---------- mosquitoes ---------- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  let bugs = [];
  // "Lan (nữ)", "Minh - nam" ... a tag at the end sets the gender; otherwise "Thị" / "Văn" in the name gives a guess
  function parseName(raw) {
    return { disp: raw, g: "" };
  }
  function parseNameOld(raw) {
    const m = raw.match(/\s*(?:\(|\[|-|–)\s*(nam|nữ|nu|boy|girl)\s*[\)\]]?\s*$/i);
    let disp = raw,
      g = "";
    if (m) {
      disp = raw.slice(0, m.index).trim();
      g = /^(nam|boy)$/i.test(m[1]) ? "m" : "f";
    } else if (/(^|\s)thị(\s|$)/i.test(raw)) g = "f";
    else if (/(^|\s)văn(\s|$)/i.test(raw)) g = "m";
    return { disp: disp || raw, g };
  }
  // mosquito kinds: [key, label on the card, weight, size, speed]
  const KINDS = [
    ["normal", "", 62, 1, 1],
    ["baby", "Muỗi con lanh chanh", 16, 0.72, 1.55],
    ["king", "Muỗi chúa!", 13, 1.45, 0.7],
    ["gold", "Muỗi vàng siêu hiếm!", 9, 1.05, 1.2],
  ];
  function pickKind() {
    let r = Math.random() * KINDS.reduce((s, k) => s + k[2], 0);
    for (const k of KINDS) {
      if ((r -= k[2]) < 0) return k;
    }
    return KINDS[0];
  }
  function makeBug(name) {
    const p = parseName(name),
      kd = pickKind();
    return {
      name,
      disp: p.disp,
      g: p.g,
      kind: kd[0],
      kindLabel: kd[1],
      size: kd[3],
      x: rnd(20, W - 20),
      y: rnd(TOPY, H * 0.85),
      h: rnd(0, Math.PI * 2),
      sp: rnd(0.55, 1.15) * kd[4],
      ph: rnd(0, 6.28),
      tilt: rnd(-0.18, 0.18),
      wob: rnd(1.5, 3),
      dead: false,
      deadAt: 0,
      deadRot: rnd(-0.5, 0.5),
    };
  }
  function rebuildBugs() {
    bugs = names.filter((n) => !caught.has(n)).map(makeBug);
    updateCount();
  }
  function updateCount() {
    const left = names.filter((n) => !caught.has(n)).length;
    $("count").textContent = `Còn ${left}/${names.length} con muỗi`;
  }

  /* ---------- character geometry ---------- */
  function geo() {
    const k = S / 640;
    return { k, cx: L + 310 * k };
  }

  /* ---------- state ---------- */
  const COUNT = 3;
  let idle = false;
  let state = "count",
    stT = 0,
    clock = 0,
    paused = false;
  let target = null,
    ext = 0,
    anger = 0,
    flash = 0,
    shake = 0,
    burstT = -1,
    clapAt = null;
  let gazeBug = null,
    gazeT = 0,
    lastTick = 0,
    caughtStamp = 0;

  function startCountdown() {
    state = "count";
    stT = 0;
    lastTick = COUNT + 1;
  }
  function strike() {
    const alive = bugs.filter((b) => !b.dead);
    if (!alive.length) return;
    target = alive[Math.floor(Math.random() * alive.length)];
    gazeBug = target;
    state = "strike";
    stT = 0;
    burstT = -1;
    say("strike");
  }
  function clap() {
    target.dead = true;
    clapAt = { x: target.x, y: target.y };
    caught.add(target.name);
    target.deadAt = clock;
    flash = 1;
    shake = reduceMotion ? 0 : 1;
    burstT = 0;
    sfx.slap();
    updateCount();
  }
  function showCard() {
    state = "card";
    $("caughtName").textContent = target.disp;
    $("caughtKind").textContent = target.kindLabel;
    $("caughtKind").hidden = !target.kindLabel;
    const left = names.filter((n) => !caught.has(n)).length;
    $("nextBtn").hidden = left === 0;
    $("emptyNote").hidden = left !== 0;
    $("cardwrap").hidden = false;
    $("hint").hidden = true;
    setTimeout(
      () => ($("nextBtn").hidden ? $("replayBtn") : $("nextBtn")).focus({ preventScroll: true }),
      50,
    );
  }
  function hideCard() {
    $("cardwrap").hidden = true;
    $("hint").hidden = false;
  }
  function next() {
    if (state !== "card") return;
    hideCard();
    state = "retract";
    stT = 0;
  }
  function replay() {
    hideCard();
    caught.clear();
    rebuildBugs();
    target = null;
    ext = 0;
    startCountdown();
  }

  /* ---------- update ---------- */
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeBack = (t) => {
    const c = 1.9;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const modalOpen = () => !$("listVeil").hidden || !$("lookVeil").hidden;

  function update(dt) {
    clock += dt;
    for (const b of bugs) {
      if (b.dead) continue;
      b.h += (Math.sin(clock * b.wob + b.ph) * 1.6 + rnd(-1, 1)) * dt;
      const s = b.sp * u;
      b.x += Math.cos(b.h) * s * dt;
      b.y += Math.sin(b.h) * s * dt + Math.sin(clock * 7 + b.ph) * 0.15;
      const m = 14;
      if (b.x < m) {
        b.x = m;
        b.h = Math.PI - b.h;
      }
      if (b.x > W - m) {
        b.x = W - m;
        b.h = Math.PI - b.h;
      }
      if (b.y < TOPY) {
        b.y = TOPY;
        b.h = -b.h;
      }
      if (b.y > H - m) {
        b.y = H - m;
        b.h = -b.h;
      }
    }
    if (idle) {
      anger = Math.max(0, anger - dt * 3);
      flash = Math.max(0, flash - dt * 2.6);
      shake = 0;
      burstT = -1;
      gazeBug = null;
      return;
    }
    gazeT -= dt;
    if (state !== "strike" && (gazeT <= 0 || !gazeBug || gazeBug.dead)) {
      const alive = bugs.filter((b) => !b.dead);
      gazeBug = alive.length ? alive[Math.floor(Math.random() * alive.length)] : null;
      gazeT = rnd(0.8, 1.8);
    }

    if (state === "count" && !modalOpen()) {
      stT += dt;
      const n = COUNT - Math.floor(stT);
      if (n !== lastTick && n > 0) {
        lastTick = n;
        sfx.tick();
      }
      if (stT >= COUNT) strike();
    } else if (state === "strike") {
      stT += dt;
      anger = clamp(stT / 0.15, 0, 1);
      ext =
        stT < 0.14
          ? -0.12 * Math.sin((stT / 0.14) * Math.PI)
          : easeBack(clamp((stT - 0.14) / 0.36, 0, 1));
      if (stT >= 0.5 && !target.dead) clap();
      if (stT > 0.9) anger = clamp(1 - (stT - 0.9) / 0.5, 0, 1);
      if (stT >= 1.35) showCard();
    } else if (state === "card") {
      anger = Math.max(0, anger - dt * 2);
    } else if (state === "retract") {
      stT += dt;
      ext = 1 - ease(clamp(stT / 0.35, 0, 1));
      if (stT >= 0.35) {
        bugs = bugs.filter((b) => !b.dead);
        target = null;
        ext = 0;
        startCountdown();
      }
    }
    flash = Math.max(0, flash - dt * 2.6);
    shake = Math.max(0, shake - dt * 3.5);
    if (burstT >= 0) {
      burstT += dt;
      if (burstT > 0.5) burstT = -1;
    }
  }

  /* ---------- drawing ---------- */
  const mix = (a, b, t) => {
    const pa = parseInt(a.slice(1), 16),
      pb = parseInt(b.slice(1), 16);
    const r = Math.round(((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t);
    const g = Math.round(((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t);
    const bl = Math.round((pa & 255) * (1 - t) + (pb & 255) * t);
    return `rgb(${r},${g},${bl})`;
  };
  const FONT = '"Baloo 2", "Arial Rounded MT Bold", system-ui, sans-serif';

  function drawBg() {
    const g = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.75);
    const [c0, c1] = look.bg.split("|");
    g.addColorStop(0, c0);
    g.addColorStop(1, c1);
    ctx.fillStyle = g;
    ctx.fillRect(-20, -20, W + 40, H + 40);
    if (look.deco === "sky" || look.deco === "both") drawSky();
  }
  function drawNumber() {
    if (state !== "count") return;
    const n = COUNT - Math.floor(stT);
    const f = stT % 1;
    const s = 1 + 0.12 * (1 - ease(clamp(f / 0.25, 0, 1)));
    ctx.save();
    const size = Math.round(Math.min(W, H) * 0.3);
    ctx.translate(W / 2, Math.max(TOPY + size * 0.45, T + (40 * S) / 640));
    ctx.scale(s, s);
    ctx.font = `800 ${size}px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.32)";
    ctx.fillText(String(n), 0, 0);
    ctx.restore();
  }

  /* sprites */
  const IM = {};
  let starsImg = new Image();
  const tintCache = {};
  function tinted(name) {
    const key = name + look.shirt;
    if (tintCache[key]) return tintCache[key];
    const im = IM[name];
    const c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    const p = parseInt(look.shirt.slice(1), 16),
      base = [255, 241, 214];
    const m = [(p >> 16) & 255, (p >> 8) & 255, p & 255].map((v, i) =>
      Math.min(255, Math.round((v / base[i]) * 255)),
    );
    x.globalCompositeOperation = "multiply";
    x.fillStyle = `rgb(${m[0]},${m[1]},${m[2]})`;
    x.fillRect(0, 0, c.width, c.height);
    x.globalCompositeOperation = "destination-in";
    x.drawImage(im, 0, 0);
    return (tintCache[key] = c);
  }
  // recolour only the hair pixels (warm, saturated browns); the face, glasses, clips and earrings stay as drawn
  const hairCache = {};
  function hairTint(name) {
    const col = look.hairColor,
      im = IM[name];
    if (!col) return im;
    const key = name + col;
    if (hairCache[key]) return hairCache[key];
    const c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    let d;
    try {
      d = x.getImageData(0, 0, c.width, c.height);
    } catch (e) {
      return (hairCache[key] = im);
    }
    const px = d.data;
    const p = parseInt(col.slice(1), 16),
      tr = (p >> 16) & 255,
      tg = (p >> 8) & 255,
      tb = p & 255;
    for (let i = 0; i < px.length; i += 4) {
      if (px[i + 3] === 0) continue;
      const r = px[i] / 255,
        g = px[i + 1] / 255,
        b = px[i + 2] / 255;
      const mx = Math.max(r, g, b),
        mn = Math.min(r, g, b),
        dd = mx - mn;
      if (mx < 0.24 || dd <= 0) continue;
      const s = dd / mx;
      let h = mx === r ? ((g - b) / dd + 6) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4;
      h *= 60;
      if (h <= 12 || h >= 42) continue;
      const w = Math.min(1, Math.max(0, (s - 0.5) / 0.08)) * Math.min(1, (mx - 0.24) / 0.06);
      if (w <= 0) continue;
      const sh = (0.299 * r + 0.587 * g + 0.114 * b) / 0.356;
      px[i] = px[i] * (1 - w) + Math.min(255, tr * sh) * w;
      px[i + 1] = px[i + 1] * (1 - w) + Math.min(255, tg * sh) * w;
      px[i + 2] = px[i + 2] * (1 - w) + Math.min(255, tb * sh) * w;
    }
    x.putImageData(d, 0, 0);
    return (hairCache[key] = c);
  }
  function accBehind() {
    if (look.acc !== "bunny") return;
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(310 + s * 62, 150);
      ctx.rotate(s * 0.22);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#d8c3bb";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 82, 0, 0, 7);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f7a9bd";
      ctx.beginPath();
      ctx.ellipse(0, 6, 14, 58, 0, 0, 7);
      ctx.fill();
      ctx.restore();
    }
  }
  function accFront() {
    const a = look.acc;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (a === "bow") {
      ctx.save();
      ctx.translate(408, 262);
      ctx.rotate(0.35);
      ctx.fillStyle = "#ef4a6a";
      ctx.strokeStyle = "#a8233d";
      ctx.lineWidth = 5;
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(s * 40, -46, s * 66, -20);
        ctx.quadraticCurveTo(s * 74, 10, s * 62, 30);
        ctx.quadraticCurveTo(s * 34, 40, 0, 0);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.35;
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(s * 40, -14, 10, 5, s * -0.5, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ef4a6a";
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 17, 0, 0, 7);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (a === "crown") {
      ctx.save();
      const pts = [
        [236, 236],
        [226, 160],
        [268, 196],
        [290, 140],
        [310, 182],
        [330, 140],
        [352, 196],
        [394, 160],
        [384, 236],
      ];
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      const gr = ctx.createLinearGradient(0, 140, 0, 236);
      gr.addColorStop(0, "#ffe27a");
      gr.addColorStop(1, "#f2b11c");
      ctx.fillStyle = gr;
      ctx.strokeStyle = "#a8700a";
      ctx.lineWidth = 6;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#e8475f";
      ctx.beginPath();
      ctx.arc(310, 214, 11, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#4aa3dc";
      ctx.beginPath();
      ctx.arc(266, 218, 8, 0, 7);
      ctx.arc(354, 218, 8, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#fff";
      [
        [226, 160],
        [290, 140],
        [330, 140],
        [394, 160],
      ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 7);
        ctx.fill();
      });
      ctx.restore();
    } else if (a === "witch") {
      ctx.save();
      ctx.fillStyle = "#3d2b63";
      ctx.strokeStyle = "#21163a";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(312, 236, 176, 30, -0.04, 0, 7);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(228, 232);
      ctx.quadraticCurveTo(268, 120, 300, 70);
      ctx.quadraticCurveTo(330, 24, 404, 40);
      ctx.quadraticCurveTo(352, 60, 340, 110);
      ctx.quadraticCurveTo(372, 180, 396, 230);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f08a1c";
      ctx.beginPath();
      ctx.moveTo(240, 206);
      ctx.quadraticCurveTo(316, 182, 386, 204);
      ctx.lineTo(392, 226);
      ctx.quadraticCurveTo(316, 206, 234, 228);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffd23f";
      ctx.beginPath();
      ctx.arc(318, 140, 9, 0, 7);
      ctx.fill();
      ctx.restore();
    }
  }
  // a sky full of stars in the same yellow / white style as the art
  let SKY = null;
  function makeSky() {
    let s = 7;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    SKY = Array.from({ length: 75 }, () => {
      const big = r() < 0.32;
      return {
        x: r(),
        y: r(),
        size: big ? 0.6 + r() * 0.8 : 0.22 + r() * 0.3,
        yellow: big ? r() < 0.8 : r() < 0.25,
        rot: r() * 1.2,
        tw: r() * 6.28,
        sp: 0.8 + r() * 1.6,
        pts: big ? 5 : r() < 0.5 ? 5 : 4,
      };
    });
  }
  function starPath(n, R1, R2) {
    ctx.beginPath();
    for (let i = 0; i < n * 2; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / n,
        rr = i % 2 ? R2 : R1;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
  }
  function drawSky() {
    if (!SKY) makeSky();
    const base = Math.min(W, H) / 24;
    ctx.save();
    ctx.lineJoin = "round";
    for (const st of SKY) {
      const tw = reduceMotion ? 1 : 0.82 + 0.18 * Math.sin(clock * st.sp + st.tw);
      const R1 = base * st.size * tw;
      ctx.save();
      ctx.translate(st.x * W, st.y * H);
      ctx.rotate(st.rot * 0.3);
      starPath(st.pts, R1, R1 * (st.pts === 4 ? 0.36 : 0.42));
      ctx.fillStyle = st.yellow ? "#ffe414" : "#ffffff";
      ctx.globalAlpha = st.yellow ? 0.7 : 0.75;
      ctx.fill();
      ctx.lineWidth = Math.max(1.5, R1 * 0.12);
      ctx.strokeStyle = st.yellow ? "#ffe414" : "#ffffff";
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
  function drawStars() {
    if (!starsImg.complete) return;
    if (look.deco === "sky" || look.deco === "none") return;
    const pulse = 1 + 0.015 * Math.sin(clock * 2.1),
      rot = 0.012 * Math.sin(clock * 1.3);
    ctx.save();
    ctx.translate(L + S * 0.5, T + S * 0.5);
    ctx.rotate(rot);
    ctx.scale(pulse, pulse);
    ctx.drawImage(starsImg, -S / 2, -S / 2, S, S);
    ctx.restore();
  }
  const layer = (img, a) => {
    if (a !== undefined) ctx.globalAlpha = a;
    ctx.drawImage(img, 0, 0, 640, 1000);
    ctx.globalAlpha = 1;
  };
  function toSprite() {
    ctx.translate(L, T);
    ctx.scale(S / 640, S / 640);
  }

  // one head pose per frame, shared by the head and every hair layer so the long hair sways with it
  let POSE = { lean: 0, bob: 0, jit: 0 };
  // which head art is on: the girl's own art, or one of the hairstyle sets (each style has a short and a long version)
  function headKey() {
    if (look.deco === "halo") look.deco = "none";
    else if (look.deco === "both") look.deco = "sky";
    if (look.styleF === "orig" || look.styleF === "afro" || !look.styleF) look.styleF = "curly"; // older saves used the original art
    const boy = look.gender === "m",
      st = boy ? look.styleM : look.styleF,
      len = look.hair === "long" ? "l" : "s";
    if (!boy && st === "orig") return null;
    return (boy ? "sb_" : "sg_") + st + "_" + len;
  }
  const redCache = {};
  function redOf(key) {
    if (redCache[key]) return redCache[key];
    const im = IM[key],
      c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "source-atop";
    x.fillStyle = "rgba(230,40,34,0.62)";
    x.fillRect(0, 0, c.width, c.height);
    return (redCache[key] = c);
  }
  const inkCache = {};
  function inkHair(key) {
    // boys: flat black hair, recoloured through its mask
    const col = look.hairColor,
      k2 = key + col;
    if (inkCache[k2]) return inkCache[k2];
    const im = IM[key + "_m"],
      c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "source-in";
    x.fillStyle = mix(col, "#000000", 0.25);
    x.fillRect(0, 0, c.width, c.height);
    return (inkCache[k2] = c);
  }
  function angryFace(a) {
    // cross brows + gritted teeth painted on top of any face
    ctx.save();
    ctx.globalAlpha = a;
    const sk = "rgba(233,92,74,1)";
    patch(252, 438, 54, 17, sk);
    patch(366, 436, 46, 15, sk);
    patch(310, 558, 42, 17, sk);
    ctx.strokeStyle = "#3b1a0c";
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(196, 420);
    ctx.lineTo(294, 453);
    ctx.moveTo(432, 416);
    ctx.lineTo(338, 449);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#3b1a0c";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(272, 545, 76, 29, 8);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(272, 559.5);
    ctx.lineTo(348, 559.5);
    for (let i = 1; i < 5; i++) {
      ctx.moveTo(272 + i * 15.2, 545);
      ctx.lineTo(272 + i * 15.2, 574);
    }
    ctx.stroke();
    ctx.restore();
  }
  function patch(x, y, rx, ry, col) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx, ry);
    const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    gr.addColorStop(0, col);
    gr.addColorStop(0.65, col);
    gr.addColorStop(1, col.replace(/[\d.]+\)$/, "0)"));
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, 7);
    ctx.fill();
    ctx.restore();
  }
  let leanNow = 0,
    leanClock = 0;
  function headPose(g) {
    let lean = Math.sin(clock * 0.7) * 0.03 + Math.sin(clock * 0.31) * 0.015; // gentle continuous sway
    if (!idle && gazeBug) lean += clamp((gazeBug.x - g.cx) / W, -0.5, 0.5) * 0.06; // plus a look toward the watched mosquito
    const dt = Math.min(0.1, Math.max(0, clock - leanClock));
    leanClock = clock;
    leanNow += (lean - leanNow) * (1 - Math.exp(-dt * 3.5));
    POSE = {
      lean: leanNow,
      bob: Math.sin(clock * 2.2) * 1.6,
      jit: anger > 0.3 && !reduceMotion ? rnd(-1, 1) * 2.4 * anger : 0,
    };
  }
  function headXf() {
    ctx.translate(310 + POSE.jit, 598 + POSE.bob * 0.6);
    ctx.rotate(POSE.lean);
    ctx.translate(-310, -598);
  }
  function drawBody() {
    headPose(geo());
    ctx.save();
    toSprite();
    ctx.save();
    headXf();
    if (!headKey()) {
      if (look.hair === "long") {
        layer(hairTint("hair_long"));
        if (anger > 0.01) layer(IM.hair_long_red, anger);
      }
      layer(hairTint("hair"));
      if (anger > 0.01) layer(IM.hair_red, anger);
    }
    ctx.restore();
    if (headKey()) {
      ctx.save();
      headXf();
      headArt(headKey());
      ctx.restore();
    } // long hair hangs BEHIND the shirt and neck
    layer(tinted("body"));
    // neck + collar belong to the body: they never come apart from the shirt
    const boy = look.gender === "m";
    layer(neckFor());
    if (headKey()) {
      ctx.save();
      headXf();
      const sk = mix(faceSkin()[0], "#ea5b4a", anger);
      const gr = ctx.createLinearGradient(0, 560, 0, 640);
      gr.addColorStop(0, sk);
      gr.addColorStop(0.62, sk);
      gr.addColorStop(1, sk.replace("rgb(", "rgba(").replace(")", ",0)"));
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.roundRect(279, 540, 62, 100, 18);
      ctx.fill();
      const sh = ctx.createRadialGradient(310, 598, 0, 310, 598, 44); // soft shadow right under the chin
      sh.addColorStop(0, "rgba(150,70,50,0.22)");
      sh.addColorStop(1, "rgba(150,70,50,0)");
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.ellipse(310, 600, 40, 16, 0, 0, 7);
      ctx.fill();
      ctx.restore();
    }
    if (anger > 0.01) layer(boy ? IM.neck_m_red : IM.neck_red, anger);
    layer(tinted("rib"));
    ctx.restore();
  }
  function headArt(key) {
    const boy = look.gender === "m";
    layer(boy ? IM[key] : hairTint(key));
    if (boy && look.hairColor) layer(inkHair(key));
    if (anger > 0.01) layer(redOf(key), anger);
  }
  function drawHead(g) {
    if (!IM.head) return;
    ctx.save();
    toSprite();
    // front pass stops at the chin: hair below it was already drawn behind the shirt
    if (headKey()) {
      ctx.beginPath();
      ctx.rect(-600, -600, 1840, 1206);
      ctx.clip();
    }
    headXf();
    accBehind();
    const key = headKey(),
      boy = look.gender === "m";
    if (!key) {
      layer(hairTint("head"));
      if (anger > 0.01) layer(IM.head_red, anger);
    } else {
      headArt(key);
      if (anger > 0.01) angryFace(clamp((anger - 0.25) / 0.5, 0, 1));
    }
    accFront();
    ctx.restore();
  }

  const goldCache = {};
  function goldBody() {
    if (goldCache.c) return goldCache.c;
    const im = IM.mq_body,
      c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "color";
    x.fillStyle = "#e8b21a";
    x.fillRect(0, 0, c.width, c.height);
    x.globalCompositeOperation = "screen";
    x.fillStyle = "rgba(120,80,0,0.55)";
    x.fillRect(0, 0, c.width, c.height);
    x.globalCompositeOperation = "destination-in";
    x.drawImage(im, 0, 0);
    return (goldCache.c = c);
  }
  function bow(x, y, s, col, dark, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.scale(s, s);
    ctx.fillStyle = col;
    ctx.strokeStyle = dark;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    for (const sg of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(sg * 16, -20, sg * 28, -8);
      ctx.quadraticCurveTo(sg * 32, 8, sg * 26, 14);
      ctx.quadraticCurveTo(sg * 12, 16, 0, 0);
      ctx.fill();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, 7);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  function bugBody(b) {
    // wings, body, then the little extras (gender bow, crown, sparkle)
    const flap = 0.55 + 0.45 * Math.abs(Math.sin(clock * (b.kind === "baby" ? 75 : 55) + b.ph));
    for (const sgn of [-1, 1]) {
      ctx.save();
      ctx.translate(0, -4);
      ctx.scale(sgn * flap, 1);
      ctx.drawImage(IM.mq_wing, -80, -40, 70, 150);
      ctx.restore();
    }
    ctx.drawImage(b.kind === "gold" ? goldBody() : IM.mq_body, -110, -122, 220, 230);
    if (b.kind === "king") {
      ctx.save();
      ctx.translate(0, -84);
      ctx.fillStyle = "#ffd23f";
      ctx.strokeStyle = "#a8700a";
      ctx.lineWidth = 3.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-20, 10);
      ctx.lineTo(-24, -14);
      ctx.lineTo(-10, -2);
      ctx.lineTo(0, -20);
      ctx.lineTo(10, -2);
      ctx.lineTo(24, -14);
      ctx.lineTo(20, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#e8475f";
      ctx.beginPath();
      ctx.arc(0, 2, 4, 0, 7);
      ctx.fill();
      ctx.restore();
    }
  }
  function sparkle(x, y, r, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = a;
    ctx.fillStyle = "#fff6b0";
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.fill();
    ctx.restore();
  }
  function drawBug(b) {
    const k = (u / 150) * 0.42 * b.size;
    ctx.save();
    ctx.translate(b.x, b.y);
    if (b.dead) {
      // splat + the squashed mosquito, flattened under the slap
      const t = clamp((clock - b.deadAt) / 0.18, 0, 1);
      const kk = (u / 110) * b.size;
      ctx.fillStyle = "#c4161c";
      [
        [0, 0, 11],
        [10, 6, 5],
        [-9, 7, 6],
        [6, -10, 4.5],
        [-12, -5, 3.5],
        [15, -2, 3],
        [-4, 13, 3],
      ].forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x * kk * 1.3 * t, y * kk * 1.3 * t, r * kk * 1.3 * (0.4 + 0.6 * t), 0, 7);
        ctx.fill();
      });
      ctx.rotate(b.deadRot);
      ctx.scale(k * lerp(1, 1.45, t), k * lerp(1, 0.34, t));
      ctx.globalAlpha = 0.95;
      bugBody({ ...b, ph: 0 });
      ctx.globalAlpha = 1;
      ctx.restore();
      // comic "BẸP!"
      const tt = clamp((clock - b.deadAt) / 0.3, 0, 1);
      if (tt > 0) {
        ctx.save();
        ctx.translate(b.x + 30 * kk, b.y + 30 * kk);
        ctx.rotate(-0.18);
        const sc = 0.5 + 0.5 * easeBack(tt);
        ctx.scale(sc, sc);
        ctx.font = `800 ${Math.max(18, (30 * u) / 110)}px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineJoin = "round";
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#3a2408";
        ctx.strokeText("BẸP!", 0, 0);
        ctx.fillStyle = "#fff";
        ctx.fillText("BẸP!", 0, 0);
        ctx.restore();
      }
      return;
    }
    if (b.kind === "gold") {
      for (let i = 0; i < 3; i++) {
        const ph = clock * 2.2 + i * 2.1 + b.ph,
          rr = ((26 * u) / 110) * b.size;
        sparkle(
          Math.cos(ph) * rr,
          Math.sin(ph * 1.3) * rr * 0.8,
          5 + 3 * Math.sin(clock * 6 + i),
          0.6 + 0.4 * Math.sin(clock * 5 + i * 2),
        );
      }
    }
    ctx.rotate(Math.atan2(Math.sin(b.h), Math.cos(b.h)) + Math.PI / 2);
    ctx.scale(k, k);
    bugBody(b);
    ctx.restore();
  }
  function drawLabel(b, big) {
    const k = u / 110;
    ctx.save();
    if (big) {
      const t = clamp((clock - big) / 0.25, 0, 1);
      const s = 0.6 + 0.4 * easeBack(t);
      ctx.translate(b.x, b.y - 30 * k);
      ctx.scale(s, s);
      ctx.font = `800 ${Math.max(16, 26 * k)}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.lineJoin = "round";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#3a2408";
      ctx.strokeText(b.disp, 0, 0);
      ctx.fillStyle = "#ffc928";
      ctx.fillText(b.disp, 0, 0);
    } else {
      ctx.translate(b.x + 6 * k, b.y + 12 * k * b.size);
      ctx.rotate(b.tilt);
      ctx.font = `700 ${Math.max(11, 14 * k * (b.kind === "king" ? 1.2 : 1))}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = "rgba(22,42,70,0.85)";
      ctx.strokeText(b.disp, 0, 0);
      ctx.fillStyle = b.kind === "gold" ? "#ffe27a" : "#fff";
      ctx.fillText(b.disp, 0, 0);
    }
    ctx.restore();
  }

  const lerp = (a, b, t) => a + (b - a) * t;
  // hands swell on the slap, then settle a little bigger while the card is up
  function handScale() {
    if (state === "strike") {
      if (stT < 0.38) return 1;
      if (stT < 0.5) return lerp(1, 1.8, ease((stT - 0.38) / 0.12));
      return lerp(1.8, 1.35, ease(clamp((stT - 0.5) / 0.3, 0, 1)));
    }
    if (state === "card") return 1.35;
    if (state === "retract") return lerp(1, 1.35, ext);
    return 1;
  }
  const skinCache = {};
  const hex = (c) =>
    "#" +
    c
      .map((v) =>
        Math.round(Math.max(0, Math.min(255, v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");
  function faceSkin() {
    const key = headKey() || "head";
    if (skinCache[key]) return skinCache[key];
    const im = IM[key],
      c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    const s = c.width / 640;
    let d;
    try {
      d = x.getImageData(
        Math.round(262 * s),
        Math.round(572 * s),
        Math.round(96 * s),
        Math.round(22 * s),
      ).data;
    } catch (e) {
      d = [];
    } // cheeks/chin under the mouth
    const px = [];
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 230) continue;
      const r = d[i],
        g = d[i + 1],
        b = d[i + 2],
        mx = Math.max(r, g, b),
        mn = Math.min(r, g, b);
      if (mx < 180 || (mx - mn) / mx > 0.5 || (mx - mn) / mx < 0.12) continue; // skin only, no blush/lines
      if (r - g > 95) continue; // skip blush
      px.push([r, g, b]);
    }
    if (px.length < 20)
      return (skinCache[key] =
        look.gender === "m" ? ["#e9c0b9", "#c99189"] : ["#f2b08d", "#cf8660"]);
    const med = [0, 1, 2].map((j) => px.map((p) => p[j]).sort((a, b) => a - b)[px.length >> 1]);
    return (skinCache[key] = [hex(med), hex([med[0] * 0.84, med[1] * 0.74, med[2] * 0.68])]);
  }
  function skinCol() {
    const [s, d] = faceSkin();
    return [mix(s, "#ea5b4a", anger * 0.85), mix(d, "#b8392c", anger * 0.85)];
  }
  // neck art recoloured to the face skin (keeps its soft chin shadow)
  const neckCache = {};
  function neckFor() {
    const boy = look.gender === "m",
      base = boy ? [233, 192, 185] : [242, 176, 141],
      im = boy ? IM.neck_m : IM.neck;
    const [s] = faceSkin(),
      key = s + boy;
    if (neckCache[key]) return neckCache[key];
    const t = [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
    const c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    let d;
    try {
      d = x.getImageData(0, 0, c.width, c.height);
    } catch (e) {
      return (neckCache[key] = im);
    }
    const p = d.data;
    for (let i = 0; i < p.length; i += 4) {
      if (!p[i + 3]) continue;
      for (let j = 0; j < 3; j++) p[i + j] = Math.min(255, (p[i + j] * t[j]) / base[j]);
    }
    x.putImageData(d, 0, 0);
    return (neckCache[key] = c);
  }
  // the boy's hair is flat black ink, so a new colour is simply painted through his hair mask
  const boyHairCache = {};
  function boyHair() {
    const col = look.hairColor;
    if (boyHairCache[col]) return boyHairCache[col];
    const im = IM.head_m_hair,
      c = document.createElement("canvas");
    c.width = im.naturalWidth;
    c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "source-in";
    x.fillStyle = mix(col, "#000000", 0.25);
    x.fillRect(0, 0, c.width, c.height);
    return (boyHairCache[col] = c);
  }
  const FING = [
    [44, -17, 84, -23, 19],
    [46, -3, 92, -3, 20],
    [46, 11, 88, 16, 19],
    [42, 24, 72, 32, 17],
  ];
  const THUMB = new Path2D("M16,-22 Q32,-40 54,-48");
  const PALM = new Path2D(
    "M-8,-15 C0,-24 16,-32 36,-32 C58,-32 70,-18 70,0 C70,20 58,36 36,36 C16,36 0,28 -8,15 Z",
  );
  function handLayer(col, ee) {
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 21 + ee;
    ctx.stroke(THUMB);
    for (const [x1, y1, x2, y2, w] of FING) {
      ctx.lineWidth = w + ee;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.lineWidth = ee;
    ctx.fill(PALM);
    if (ee) ctx.stroke(PALM);
  }
  // idle left arm: shoulder -> rounded elbow -> hand on the chest. The elbow never moves; only the forearm reaches.
  const SHO = [126, 798],
    ELB = [162, 884];
  let PARTS = [];
  function armsCalc() {
    const parts = [];
    for (const side of [-1, 1]) {
      const bob = Math.sin(clock * 3.2 + side) * 3;
      let far = false,
        hx = 240,
        hy = 806 + bob,
        rot = -64,
        phi = 0,
        cubic = false,
        c1x,
        c1y,
        c2x,
        c2y;
      let tx = 0,
        ty = 0;
      if (target && ext !== 0) {
        const k = S / 640;
        tx = (target.x - L) / k;
        ty = (target.y - T) / k - 18;
        if (side > 0) tx = 620 - tx;
        // target on the far side of the body: swing the whole arm over from the shoulder
        far = tx > 330;
      }
      const cs = Math.cos(phi),
        sn = Math.sin(phi);
      const R = (x, y) => [
        SHO[0] + (x - SHO[0]) * cs - (y - SHO[1]) * sn,
        SHO[1] + (x - SHO[0]) * sn + (y - SHO[1]) * cs,
      ];
      const qq = target && ext !== 0 ? Math.min(1, ext * 3) : 0;
      const E = R(lerp(ELB[0], 146, qq), lerp(ELB[1], 892, qq));
      const U1 = R(lerp(103.3, 100, qq), lerp(879.3, 900, qq)),
        U2 = R(lerp(115.3, 146, qq), lerp(908, 925, qq));
      if (target && ext !== 0) {
        const gap = (state === "strike" && stT < 0.5 ? 84 : 46) * handScale() * (target.size || 1);
        const px = tx - gap,
          py = ty + 34;
        hx = lerp(240, px, ext);
        hy = lerp(806, py, ext);
        const dx = hx - E[0],
          dy = hy - E[1],
          len = Math.hypot(dx, dy) || 1;
        c1x = E[0] + (E[0] - U2[0]) * 1.5;
        c1y = E[1] + (E[1] - U2[1]) * 1.5;
        c2x = hx - dx * 0.22;
        c2y = hy - dy * 0.22;
        rot = lerp(-64, -84, clamp(ext * 1.4, 0, 1)); // palms face each other, fingers up, like a clap
        cubic = true;
      } else {
        c1x = 214;
        c1y = 858 + bob * 0.5;
      }
      parts.push({ far, side, hx, hy, rot, cubic, c1x, c1y, c2x, c2y, E, U1, U2 });
    }
    PARTS = parts;
  }
  const sideT = (pt, fn) => {
    ctx.save();
    toSprite();
    if (pt.side > 0) {
      ctx.translate(620, 0);
      ctx.scale(-1, 1);
    }
    ctx.translate(0, 18);
    fn();
    ctx.restore();
  };
  function upperArm(pt) {
    sideT(pt, () => {
      const [skin, line] = skinCol();
      const up = new Path2D();
      up.moveTo(SHO[0], SHO[1]);
      up.bezierCurveTo(pt.U1[0], pt.U1[1], pt.U2[0], pt.U2[1], pt.E[0], pt.E[1]);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = line;
      ctx.lineWidth = 41;
      ctx.stroke(up);
      ctx.strokeStyle = skin;
      ctx.lineWidth = 34;
      ctx.stroke(up);
    });
  }
  function foreArm(pt) {
    sideT(pt, () => {
      const [skin, line] = skinCol();
      const fa = new Path2D();
      fa.moveTo(pt.E[0], pt.E[1]);
      if (pt.cubic) fa.bezierCurveTo(pt.c1x, pt.c1y, pt.c2x, pt.c2y, pt.hx, pt.hy);
      else fa.quadraticCurveTo(pt.c1x, pt.c1y, pt.hx, pt.hy);
      ctx.lineJoin = "round";
      ctx.lineCap = "butt";
      ctx.strokeStyle = line;
      ctx.lineWidth = 41;
      ctx.stroke(fa);
      ctx.save();
      ctx.translate(pt.hx, pt.hy);
      ctx.rotate((pt.rot * Math.PI) / 180);
      ctx.scale(handScale(), handScale());
      handLayer(line, 7 / handScale());
      ctx.restore();
      ctx.strokeStyle = skin;
      ctx.lineWidth = 34;
      ctx.stroke(fa);
      ctx.save();
      ctx.translate(pt.hx, pt.hy);
      ctx.rotate((pt.rot * Math.PI) / 180);
      ctx.scale(handScale(), handScale());
      handLayer(skin, 0);
      ctx.strokeStyle = line;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      for (const d of ["M58,-10 L70,-12", "M60,4 L72,5", "M52,18 L64,22", "M22,-4 Q32,2 34,14"])
        ctx.stroke(new Path2D(d));
      ctx.restore();
    });
  }
  // back group: upper arms tucked under the shirt, then the far arm reaching across (it passes BEHIND the head)
  function armsBack() {
    armsCalc();
    for (const pt of PARTS) if (!pt.far && !pt.cubic) upperArm(pt);
    ctx.save();
    toSprite();
    ctx.save();
    ctx.translate(0, 18);
    ctx.beginPath();
    for (const sg of [1, -1]) {
      const P = [
        [124, 688],
        [88, 716],
        [76, 764],
        [90, 799],
        [183, 813],
        [192, 784],
        [194, 690],
      ].map(([x, y]) => [sg > 0 ? x : 620 - x, y]);
      P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
    }
    ctx.translate(0, -18);
    ctx.clip();
    layer(tinted("body"));
    ctx.restore();
    layer(tinted("front"));
    ctx.restore();
  }
  // the far arm is one straight cartoon arm that leaves its own sleeve opening and lies on top of the shirt, neck and hair
  function farArm(pt) {
    sideT(pt, () => {
      const [skin, line] = skinCol();
      // two-bone arm (upper arm + forearm) coming out of the sleeve opening; stretches like rubber when the mosquito is far
      const P0 = [136, 780],
        O = [138, 816],
        H = [pt.hx, pt.hy];
      const LU = 105,
        LF = 115;
      const dx = H[0] - O[0],
        dy = H[1] - O[1],
        d = Math.max(1, Math.hypot(dx, dy));
      const sc = Math.max(1, d / ((LU + LF) * 0.94));
      const a = LU * sc,
        b = LF * sc;
      const th = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
      const base = Math.atan2(dy, dx);
      // pick the bend that keeps the elbow low and outside (elbows hang down)
      const e1 = [O[0] + Math.cos(base + th) * a, O[1] + Math.sin(base + th) * a];
      const e2 = [O[0] + Math.cos(base - th) * a, O[1] + Math.sin(base - th) * a];
      let E = e1[1] - e1[0] * 0.25 > e2[1] - e2[0] * 0.25 ? e1 : e2;
      // the elbow always hangs below the sleeve so the U-bend is visible
      const minY = O[1] + 88;
      if (E[1] < minY) {
        const k2 = clamp((minY - E[1]) / 80, 0, 1);
        E = [lerp(E[0], O[0] + Math.sign(dx || 1) * 34, k2), minY];
      }
      E = [O[0] + 6, O[1] + 96]; // the elbow hangs straight below the sleeve for both arms (clean V)
      const at = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
      const r = Math.min(
        0.45,
        46 / Math.max(Math.hypot(E[0] - O[0], E[1] - O[1]), Math.hypot(H[0] - E[0], H[1] - E[1])),
      );
      const A1 = at(E, O, r),
        A2 = at(E, H, r);
      const fa = new Path2D();
      fa.moveTo(P0[0], P0[1]);
      fa.lineTo(O[0], O[1]);
      fa.lineTo(A1[0], A1[1]);
      fa.quadraticCurveTo(E[0], E[1], A2[0], A2[1]);
      fa.lineTo(H[0], H[1]);
      // the top of the arm lives INSIDE the sleeve: it is hidden by everything above the hem; from the elbow on it's free
      const rest = new Path2D();
      rest.moveTo(A1[0], A1[1]);
      rest.quadraticCurveTo(E[0], E[1], A2[0], A2[1]);
      rest.lineTo(H[0], H[1]);
      const outsideSleeve = () => {
        ctx.beginPath();
        ctx.rect(-3000, -3000, 7000, 7000);
        ctx.moveTo(118, 690);
        ctx.lineTo(88, 716);
        ctx.lineTo(78, 764);
        ctx.lineTo(90, 799);
        ctx.lineTo(183, 813);
        ctx.lineTo(192, 784);
        ctx.lineTo(190, 696);
        ctx.closePath();
        ctx.clip("evenodd");
      };
      const both = (w) => {
        ctx.lineWidth = w;
        ctx.save();
        outsideSleeve();
        ctx.stroke(fa);
        ctx.restore();
        ctx.lineCap = "butt";
        ctx.stroke(rest);
        ctx.lineCap = "round";
      };
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = line;
      both(41);
      ctx.save();
      ctx.translate(pt.hx, pt.hy);
      ctx.rotate((pt.rot * Math.PI) / 180);
      ctx.scale(handScale(), handScale());
      handLayer(line, 7 / handScale());
      ctx.restore();
      ctx.strokeStyle = skin;
      both(34);
      ctx.save();
      ctx.translate(pt.hx, pt.hy);
      ctx.rotate((pt.rot * Math.PI) / 180);
      ctx.scale(handScale(), handScale());
      handLayer(skin, 0);
      ctx.strokeStyle = line;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 2.6;
      for (const d of ["M58,-10 L70,-12", "M60,4 L72,5", "M52,18 L64,22", "M22,-4 Q32,2 34,14"])
        ctx.stroke(new Path2D(d));
      ctx.restore();
    });
  }
  function armsFront() {
    const reaching = PARTS.some((pt) => pt.cubic);
    if (!reaching) {
      for (const pt of PARTS) foreArm(pt);
      return;
    }
    for (const pt of PARTS) if (!pt.far) farArm(pt); // near arm first, far arm lies over it
    for (const pt of PARTS) if (pt.far) farArm(pt);
  }
  function burst() {
    if (burstT < 0 || !clapAt) return;
    const t = burstT / 0.5,
      k = u / 110;
    ctx.save();
    ctx.translate(clapAt.x, clapAt.y);
    ctx.strokeStyle = `rgba(255,255,255,${1 - t})`;
    ctx.lineWidth = 4 * k;
    ctx.lineCap = "round";
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.3;
      const r1 = (24 + 40 * ease(t)) * k,
        r2 = r1 + 18 * k * (1 - t);
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    ctx.save();
    if (shake > 0) {
      ctx.translate(rnd(-1, 1) * 10 * shake, rnd(-1, 1) * 10 * shake);
    }
    drawBg();
    if (!idle) drawNumber();
    const g = geo();
    drawStars();
    drawBody();
    armsBack();
    drawHead(g);
    armsFront();
    for (const b of bugs) if (!b.dead) drawBug(b);
    for (const b of bugs) if (!b.dead) drawLabel(b);
    if (!idle) for (const b of bugs) if (b.dead) drawBug(b);
    if (!idle) for (const b of bugs) if (b.dead) drawLabel(b, caughtStamp);
    burst();
    drawBubble();
    ctx.restore();
    if (flash > 0) {
      ctx.fillStyle = `rgba(232,40,40,${0.55 * flash})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* ---------- sound ---------- */
  let soundOn = store.get("dapmuoi.sound", true),
    ac = null;
  function audio() {
    if (!ac) {
      try {
        ac = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    if (ac && ac.state === "suspended") ac.resume();
    return ac;
  }
  const sfx = {
    tick() {
      if (!soundOn || !ac) return;
      const o = ac.createOscillator(),
        gn = ac.createGain();
      o.type = "triangle";
      o.frequency.value = 880;
      gn.gain.setValueAtTime(0.12, ac.currentTime);
      gn.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12);
      o.connect(gn).connect(ac.destination);
      o.start();
      o.stop(ac.currentTime + 0.13);
    },
    slap() {
      if (!soundOn || !ac) return;
      const len = 0.22,
        buf = ac.createBuffer(1, ac.sampleRate * len, ac.sampleRate),
        d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
      const src = ac.createBufferSource();
      src.buffer = buf;
      const f = ac.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 2200;
      const gn = ac.createGain();
      gn.gain.value = 0.9;
      src.connect(f).connect(gn).connect(ac.destination);
      src.start();
    },
  };

  /* ---------- speech bubbles ---------- */
  const LINES = {
    idle: [
      "Cay ghê á 😤",
      "Vo ve hoài, cay thật sự!",
      "Muỗi gì mà lì thế?",
      "Ồn quá đi trời ơi!",
      "Ai cho bay vậy hả?",
      "Ngứa quá trời luôn 😩",
      "Đứng im đó cho tui!",
      "Từng con một nha…",
      "Đừng để tui bắt được!",
      "Hết chịu nổi rồi!",
    ],
    strike: [
      "BẮT ĐƯỢC RỒI!",
      "Chạy đâu cho thoát!",
      "Chừa nha!",
      "Bẹp dí luôn!",
      "Cho chừa cái tật!",
      "Hết bay nhé 😤",
    ],
    halIdle: [
      "Ma cà rồng cũng không tha!",
      "Muỗi Dracula hả? Cay!",
      "Đêm Halloween mà cũng không yên 😤",
      "Hút máu ai đó, hả?",
      "Trick or… BẸP!",
    ],
    halStrike: ["Trick or BẸP!", "Về lại quan tài đi!", "Hết hút máu nhé!", "Bẹp luôn Bá tước!"],
  };
  let bubble = null,
    bubbleNext = 2.5;
  const isHal = () => typeof HAL === "function" && HAL();
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function say(kind) {
    const pool = isHal()
      ? LINES[kind === "strike" ? "halStrike" : "halIdle"].concat(
          kind === "strike" ? [] : LINES.idle,
        )
      : LINES[kind];
    let txt = pick(pool);
    if (bubble && bubble.text === txt) txt = pick(pool);
    bubble = { text: txt, t0: clock, dur: kind === "strike" ? 1.3 : 2.4, loud: kind === "strike" };
  }
  function bubbleUpdate() {
    if (bubble && clock - bubble.t0 > bubble.dur) bubble = null;
    if ((state === "count" || idle) && !bubble && clock > bubbleNext) {
      say("idle");
      bubbleNext = clock + rnd(4.5, 8);
    }
  }
  function drawBubble() {
    if (!bubble) return;
    const age = clock - bubble.t0,
      k = S / 640;
    const pop = age < 0.25 ? easeBack(age / 0.25) : 1,
      fade = clamp((bubble.dur - age) / 0.25, 0, 1);
    const fs = Math.max(14, Math.round((bubble.loud ? 30 : 24) * k * 1.6));
    ctx.save();
    ctx.font = `800 ${fs}px ${FONT}`;
    const maxW = Math.min(W * 0.42, 300 * k * 1.6);
    // wrap
    const words = bubble.text.split(" "),
      lines = [];
    let cur = "";
    for (const w of words) {
      const tst = cur ? cur + " " + w : w;
      if (ctx.measureText(tst).width > maxW && cur) {
        lines.push(cur);
        cur = w;
      } else cur = tst;
    }
    lines.push(cur);
    const tw = Math.max(...lines.map((l) => ctx.measureText(l).width)),
      pad = fs * 0.6,
      lh = fs * 1.15;
    const bw = tw + pad * 2,
      bh = lines.length * lh + pad * 1.1;
    // beside the head, on whichever side has room
    const hx = L + 310 * k,
      hy = T + 330 * k;
    let side = hx + 190 * k + bw < W - 8 ? 1 : -1;
    let bx = side > 0 ? hx + 175 * k : hx - 175 * k - bw;
    bx = clamp(bx, 8, W - bw - 8);
    let by = clamp(hy - 150 * k - bh, TOPY + 8, H - bh - 8);
    const ox = side > 0 ? bx : bx + bw,
      oy = by + bh;
    ctx.globalAlpha = fade;
    ctx.translate(ox, oy);
    ctx.scale(pop, pop);
    ctx.translate(-ox, -oy);
    ctx.fillStyle = bubble.loud ? "#ffe14d" : "#ffffff";
    ctx.strokeStyle = "#2a2420";
    ctx.lineWidth = Math.max(1.6, 2 * k * 1.6);
    ctx.lineJoin = "round";
    const rr = Math.min(20, bh / 2),
      bot = by + bh;
    const tx = side > 0 ? bx + Math.max(rr + 14, 30) : bx + bw - Math.max(rr + 14, 30); // tail sits on the straight part of the bottom edge
    const tw2 = 11,
      tip = [tx - 26 * side, bot + 20];
    ctx.beginPath();
    ctx.moveTo(bx + rr, by);
    ctx.lineTo(bx + bw - rr, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + rr, rr);
    ctx.lineTo(bx + bw, bot - rr);
    ctx.arcTo(bx + bw, bot, bx + bw - rr, bot, rr);
    // bottom edge right -> left, with the tail folded into it
    ctx.lineTo(tx + tw2, bot);
    ctx.quadraticCurveTo(tx + tw2 * 0.2, bot + 6, tip[0], tip[1]);
    ctx.quadraticCurveTo(tx - tw2 * 0.6, bot + 4, tx - tw2, bot);
    ctx.lineTo(bx + rr, bot);
    ctx.arcTo(bx, bot, bx, bot - rr, rr);
    ctx.lineTo(bx, by + rr);
    ctx.arcTo(bx, by, bx + rr, by, rr);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2a2420";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    lines.forEach((l, i) => ctx.fillText(l, bx + bw / 2, by + pad * 0.55 + lh * (i + 0.5)));
    ctx.restore();
  }

  /* ---------- mosquito buzz ---------- */
  let buzz = null;
  function buzzUpdate() {
    if (!ac) return;
    if (!buzz) {
      try {
        const out = ac.createGain();
        out.gain.value = 0;
        const f = ac.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = 900;
        f.Q.value = 1.2;
        f.connect(out).connect(ac.destination);
        const voices = [560, 610, 655].map((hz, i) => {
          const o = ac.createOscillator();
          o.type = "sawtooth";
          o.frequency.value = hz;
          const lfo = ac.createOscillator();
          lfo.frequency.value = 5 + i * 1.7;
          const depth = ac.createGain();
          depth.gain.value = 18 + i * 6;
          lfo.connect(depth).connect(o.frequency);
          const g = ac.createGain();
          g.gain.value = 0.33;
          o.connect(g).connect(f);
          o.start();
          lfo.start();
          return o;
        });
        // slow swell so the whine seems to come and go as they fly past
        const sw = ac.createOscillator();
        sw.frequency.value = 0.23;
        const swd = ac.createGain();
        swd.gain.value = 0.35;
        const swOut = ac.createGain();
        swOut.gain.value = 1;
        sw.connect(swd).connect(swOut.gain);
        sw.start();
        f.disconnect();
        f.connect(swOut).connect(out);
        buzz = { out, voices };
      } catch (e) {
        buzz = { out: null };
      }
    }
    if (!buzz.out) return;
    const alive = bugs.filter((b) => !b.dead).length;
    const want =
      !soundOn || paused || alive === 0 || state === "card"
        ? 0
        : Math.min(0.05, 0.016 + alive * 0.0012);
    buzz.out.gain.setTargetAtTime(want, ac.currentTime, 0.25);
  }

  /* ---------- loop ---------- */
  let last = performance.now();
  function frame(now) {
    let dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (paused) dt = 0;
    const wasDead = target && target.dead;
    update(dt);
    if (target && target.dead && !wasDead) caughtStamp = clock;
    buzzUpdate();
    bubbleUpdate();
    draw();
    requestAnimationFrame(frame);
  }

  /* ---------- UI ---------- */
  function setSoundLabel() {
    $("soundBtn").textContent = soundOn ? "Âm thanh: bật" : "Âm thanh: tắt";
  }
  setSoundLabel();
  addEventListener("pointerdown", audio, { passive: true });
  addEventListener("keydown", audio);

  cvs.addEventListener("pointerdown", () => {
    if (state === "count" && !paused && !idle) strike();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVeils();
      return;
    }
    if (modalOpen()) return;
    if (e.code === "Space") {
      if (document.activeElement && document.activeElement.tagName === "BUTTON") return;
      e.preventDefault();
      if (idle) return;
      if (state === "count" && !paused) strike();
      else if (state === "card" && !$("nextBtn").hidden) next();
    }
  });
  $("pauseBtn").onclick = () => {
    paused = !paused;
    $("pauseBtn").textContent = paused ? "Tiếp tục" : "Tạm dừng";
  };
  $("soundBtn").onclick = () => {
    soundOn = !soundOn;
    store.set("dapmuoi.sound", soundOn);
    setSoundLabel();
  };
  $("idleBtn").onclick = () => {
    if (state === "strike" || state === "retract") return; // let the slap finish first
    idle = !idle;
    const bt = $("idleBtn");
    bt.blur();
    bt.textContent = idle ? "Chơi tiếp" : "Ngồi chờ";
    bt.setAttribute("aria-pressed", String(idle));
    document.querySelector(".tag").style.visibility = idle ? "hidden" : "";
    $("pauseBtn").hidden = idle;
    $("listBtn").hidden = idle;
    if (idle) {
      $("hint").hidden = true;
      if (state === "card") $("cardwrap").hidden = true;
    } else if (state === "card") {
      $("cardwrap").hidden = false;
    } else {
      $("hint").hidden = false;
      startCountdown();
    }
  };
  $("nextBtn").onclick = next;
  $("replayBtn").onclick = replay;

  function closeVeils() {
    $("listVeil").hidden = true;
    $("lookVeil").hidden = true;
  }
  function openList() {
    $("namesInput").value = names.join("\n");
    $("listVeil").hidden = false;
    $("namesInput").focus();
  }
  $("listBtn").onclick = openList;
  $("editBtn").onclick = openList;
  $("listCancel").onclick = closeVeils;
  $("listSave").onclick = () => {
    const list = $("namesInput")
      .value.split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const uniq = [...new Set(list)];
    if (!uniq.length) {
      $("namesInput").placeholder = "Cần ít nhất 1 tên nha";
      $("namesInput").focus();
      return;
    }
    names = uniq;
    store.set("dapmuoi.names", names);
    closeVeils();
    replay();
  };

  function renderLook() {
    const sets = {
      gender: GENDERS.map(([v, l]) => ({ v, l })),
      hair: HAIRS.map(([v, l]) => ({ v, l })),
      style: (look.gender === "m" ? STYLES_M : STYLES_F).map(([v, l]) => ({ v, l })),
      hairColor: HAIRCOLS.map(([v, l, c]) => ({ v, l, c })),
      shirt: SHIRTS.map(([v, l]) => ({ v, l, c: v })),
      bg: BGS.map(([v, l]) => ({
        v,
        l,
        c: `linear-gradient(${v.split("|")[0]}, ${v.split("|")[1]})`,
      })),
      acc: ACCS.map(([v, l]) => ({ v, l })),
      deco: DECOS.map(([v, l]) => ({ v, l })),
    };
    document.querySelectorAll("#lookVeil .sw").forEach((box) => {
      const k = box.dataset.k;
      box.innerHTML = "";
      sets[k].forEach((o) => {
        const bt = document.createElement("button");
        bt.type = "button";
        if (o.c) {
          bt.className = "dot";
          bt.style.background = o.c;
          bt.title = o.l;
          bt.setAttribute("aria-label", o.l);
        } else bt.textContent = o.l;
        const cur = k === "style" ? (look.gender === "m" ? look.styleM : look.styleF) : look[k];
        bt.setAttribute("aria-pressed", String(cur === o.v));
        bt.onclick = () => {
          if (k === "style") {
            look[look.gender === "m" ? "styleM" : "styleF"] = o.v;
          } else look[k] = o.v;
          store.set("dapmuoi.look6", look);
          applyBg();
          renderLook();
        };
        box.appendChild(bt);
      });
    });
  }
  function applyBg() {
    document.body.style.background = look.bg.split("|")[1];
  }
  applyBg();
  $("lookBtn").onclick = () => {
    renderLook();
    $("lookVeil").hidden = false;
  };
  $("lookDone").onclick = closeVeils;
  [$("listVeil"), $("lookVeil")].forEach((v) =>
    v.addEventListener("pointerdown", (e) => {
      if (e.target === v) closeVeils();
    }),
  );

  /* ---------- boot ---------- */
  rebuildBugs();
  startCountdown();
  const load = (img, src) =>
    new Promise((res) => {
      img.onload = res;
      img.onerror = res;
      img.src = src;
    });
  const loadAll = Promise.all(
    Object.keys(SRC).map((k) => {
      IM[k] = new Image();
      return load(IM[k], SRC[k]);
    }),
  );
  const fontP =
    document.fonts && document.fonts.load
      ? document.fonts.load('700 16px "Baloo 2"').catch(() => {})
      : Promise.resolve();
  Promise.all([loadAll, load(starsImg, STARS_SRC), fontP]).then(() => {
    requestAnimationFrame((t) => {
      last = t;
      frame(t);
    });
  });
})();
