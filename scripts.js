const startBtn = document.getElementById('startBreath');
const phoenix = document.querySelector('.phoenix-image');

// Original Phoenix Tone
const tone = document.getElementById('phoenixTone');

// New elemental layers
const fire = document.getElementById('fireSound');
const water = document.getElementById('waterSound');
const chime = document.getElementById('chimeSound');
const drone = document.getElementById('droneSound');

let isRitualRunning = false;
let idleInterval;

// 🌌 Idle floating glow (before ritual starts)
function startIdleAnimation() {
  let t = 0;
  idleInterval = setInterval(() => {
    t += 0.05;
    const floatY = Math.sin(t) * 8;
    const glow = 20 + Math.cos(t) * 5;
    phoenix.style.transform = `translateY(${floatY}px) scale(1)`;
    phoenix.style.boxShadow = `0 0 ${glow}px #6cf`;
  }, 50);
}

function stopIdleAnimation() {
  clearInterval(idleInterval);
}

// 🚀 Ritual Start
startBtn.addEventListener('click', async () => {
  if (isRitualRunning) return;
  isRitualRunning = true;

  stopIdleAnimation();

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    // 🎶 Start elemental layers softly
    fire.volume = 0.0;
    water.volume = 0.0;
    drone.volume = 0.0;
    tone.volume = 0.0;

    fire.play();
    water.play();
    drone.play();
    tone.play();

    // Gradual fade-in
    let fade = setInterval(() => {
      fire.volume = Math.min(0.3, fire.volume + 0.01);
      water.volume = Math.min(0.3, water.volume + 0.01);
      drone.volume = Math.min(0.5, drone.volume + 0.01);
      tone.volume = Math.min(0.4, tone.volume + 0.01);
      if (
        fire.volume >= 0.3 &&
        water.volume >= 0.3 &&
        drone.volume >= 0.5 &&
        tone.volume >= 0.4
      ) {
        clearInterval(fade);
      }
    }, 200);

    // 🔮 Breath detection loop
    function detectBreath() {
      analyser.getByteFrequencyData(data);
      const volume = data.reduce((a, b) => a + b, 0) / data.length;

      // Animate Phoenix
      const scale = 1 + volume / 500;
      const glow = 20 + volume / 2;
      phoenix.style.transform = `scale(${scale})`;
      phoenix.style.boxShadow = `0 0 ${glow}px #6cf`;

      // Modulate Phoenix Tone (original)
      tone.volume = Math.min(1, volume / 100);
      tone.playbackRate = 1 + volume / 500;

      // Modulate Fire + Water
      fire.volume = Math.min(1, volume / 200);
      water.volume = Math.min(0.8, 0.4 + volume / 400);

      // Cosmic Chime on deep breath
      if (volume > 120) {
        if (chime.paused) {
          chime.currentTime = 0;
          chime.play();
        }
      }

      requestAnimationFrame(detectBreath);
    }

    detectBreath();
  } catch (err) {
    console.error("Microphone access denied:", err);
    alert("Microphone access is required for the Breath Ritual.");
  }
});

// 🌌 Start idle glow immediately
startIdleAnimation();
