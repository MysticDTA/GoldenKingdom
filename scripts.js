const startBtn = document.getElementById('startBreath');
const phoenix = document.querySelector('.phoenix-image');
const mandala = document.querySelector('.mandala');
const tone = document.getElementById('phoenixTone');
const fire = document.getElementById('fireSound');
const water = document.getElementById('waterSound');
const drone = document.getElementById('droneSound');
const chime = document.getElementById('chimeSound');

startBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  // Start sound layers
  tone.play();
  fire.play();
  water.play();
  drone.play();

  function detectBreath() {
    analyser.getByteFrequencyData(data);
    const volume = data.reduce((a, b) => a + b) / data.length;

    // Animate Phoenix
    const scale = 1 + volume / 500;
    const glow = 20 + volume / 2;
    phoenix.style.transform = `translate(-50%, -50%) scale(${scale})`;
    phoenix.style.boxShadow = `0 0 ${glow}px #6cf`;

    // Animate Mandala with same pulse
    const mandalaScale = 1 + volume / 1000;
    const mandalaGlow = 10 + volume / 5;
    mandala.style.transform = `rotate(${Date.now() / 1000}deg) scale(${mandalaScale})`;
    mandala.style.filter = `drop-shadow(0 0 ${mandalaGlow}px #6cf)`;

    // Modulate Sounds
    tone.volume = Math.min(1, volume / 100);
    tone.playbackRate = 1 + volume / 500;

    fire.volume = Math.min(0.5, volume / 150);
    water.volume = Math.min(0.5, 0.2 + volume / 500);
    drone.volume = Math.min(0.8, 0.3 + volume / 600);

    // Trigger chime on deep breaths
    if (volume > 250 && chime.paused) {
      chime.currentTime = 0;
      chime.play();
    }

    requestAnimationFrame(detectBreath);
  }

  detectBreath();
});
