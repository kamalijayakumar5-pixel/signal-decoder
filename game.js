let level = 0;

const baseLevels = [
  { pattern: "▲ ▲ ■ ▲ ▲ ■ ▲ ▲ ?", answer: "■" },
  { pattern: "1 2 4 8 16 ?", answer: "32" },
  { pattern: "A C F J O ?", answer: "U" },
  { pattern: "RED BLUE RED BLUE RED ?", answer: "BLUE" },
  { pattern: "1 3 5 7 9 ?", answer: "11" },
  { pattern: "1 1 2 3 5 8 ?", answer: "13" },
  { pattern: "Z X V T R ?", answer: "P" },
  { pattern: "10 20 30 50 80 ?", answer: "130" }
];

function generateLevel(n) {
  let type = n % 4;

  if (type === 0) {
    let start = Math.floor(Math.random() * 5) + 1;
    let diff = Math.floor(Math.random() * 5) + 1;
    let seq = [];

    for (let i = 0; i < 5; i++) {
      seq.push(start + i * diff);
    }

    return {
      pattern: seq.join(" ") + " ?",
      answer: String(start + 5 * diff)
    };
  }

  if (type === 1) {
    let val = 2;
    let seq = [];

    for (let i = 0; i < 5; i++) {
      seq.push(val);
      val *= 2;
    }

    return {
      pattern: seq.join(" ") + " ?",
      answer: String(val)
    };
  }

  if (type === 2) {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let step = Math.floor(Math.random() * 3) + 1;
    let start = Math.floor(Math.random() * 10);
    let seq = [];

    for (let i = 0; i < 5; i++) {
      seq.push(letters[(start + i * step) % 26]);
    }

    return {
      pattern: seq.join(" ") + " ?",
      answer: letters[(start + 5 * step) % 26]
    };
  }

  if (type === 3) {
    let colors = ["RED", "BLUE", "GREEN"];
    let a = colors[Math.floor(Math.random() * 3)];
    let b = colors[Math.floor(Math.random() * 3)];

    while (b === a) {
      b = colors[Math.floor(Math.random() * 3)];
    }

    let seq = [a, b, a, b, a];

    return {
      pattern: seq.join(" ") + " ?",
      answer: b
    };
  }
}

const levels = [...baseLevels];

while (levels.length < 20) {
  levels.push(generateLevel(levels.length));
}

function loadLevel() {
  if (level >= levels.length) {
    document.body.innerHTML = `
      <div style="text-align:center; margin-top:100px; color:#00ff88;">
        <h1>SYSTEM OVERRIDE COMPLETE</h1>
        <p>All 20 signals decoded.</p>
        <button onclick="restart()">REBOOT</button>
      </div>
    `;
    return;
  }

  let current = levels[level];

  document.getElementById("pattern").innerText = current.pattern;
  document.getElementById("feedback").innerText = "";
  document.getElementById("answer").value = "";

  document.getElementById("levelDisplay").innerText =
    "LEVEL " + (level + 1) + " / 20";

  let progress = (level / 20) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  if (level > 10) {
    document.body.classList.add("flicker");
  }
}

function checkAnswer() {
  let input = document.getElementById("answer").value.trim().toUpperCase();
  let gameBox = document.getElementById("gameBox");

  gameBox.classList.remove("glitch");

  if (input === levels[level].answer) {
    level++;

    document.getElementById("feedback").innerText = "ACCESS GRANTED";

    let progress = (level / 20) * 100;
    document.getElementById("progressBar").style.width = progress + "%";

    setTimeout(loadLevel, 500);
  } else {
    document.getElementById("feedback").innerText = "ACCESS DENIED";

    gameBox.classList.add("glitch");

    setTimeout(() => {
      gameBox.classList.remove("glitch");
    }, 200);
  }
}

function restart() {
  level = 0;
  location.reload();
}

setInterval(() => {
  if (Math.random() < 0.3 && level < 20) {
    const msgs = [
      "memory leak detected...",
      "decrypting...",
      "signal unstable...",
      "re-routing...",
      "packet loss...",
      "system integrity low..."
    ];
    document.getElementById("feedback").innerText =
      msgs[Math.floor(Math.random() * msgs.length)];
  }
}, 4000);

loadLevel();
