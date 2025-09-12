const startBtn = document.getElementById('startBreath');
const phoenix = document.querySelector('.phoenix-image');
const mandala = document.querySelector('.mandala-background');
const tone = document.getElementById('phoenixTone');
const fire = document.getElementById('fireSound');
const water = document.getElementById('waterSound');
const drone = document.getElementById('droneSound');
const chime = document.getElementById('chimeSound');

startBtn.addEventListener('click', async () => {
  // 🎤 Microphone input
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  // 🎶 Start layered sounds
  tone.play();
  fire.play();
  water.play();
  drone.play();

  function detectBreath() {
    analyser.getByteFrequencyData(data);
    const volume = data.reduce((a, b) => a + b) / data.length;

    // 🔥 Animate Phoenix
    const scale = 1 + volume / 500;
    const glow = 20 + volume / 2;
    phoenix.style.transform = `scale(${scale})`;
    phoenix.style.boxShadow = `0 0 ${glow}px #6cf`;

    // 🔮 Animate Mandala in sync
    const mandalaScale = 1 + volume / 1000;
    mandala.style.transform = `scale(${mandalaScale}) rotate(${Date.now() / 50}deg)`;
    mandala.style.opacity = 0.7 + Math.min(0.3, volume / 300);

    // 🎵 Modulate tone
    tone.volume = Math.min(1, volume / 100);
    tone.playbackRate = 1 + volume / 500;

    // ✨ Trigger chime on stronger breaths
    if (volume > 120 && chime.paused) {
      chime.currentTime = 0;
      chime.play();
    }

    requestAnimationFrame(detectBreath);
  }

  detectBreath();
});
