const enterBtn = document.getElementById("enterButton");
const mandala = document.getElementById("mandala");
const phoenix = document.getElementById("phoenix");
const aum = document.getElementById("aum");
const sacredHum = document.getElementById("sacredHum");
const scrollChime = document.getElementById("scrollChime");

enterBtn.addEventListener("click", () => {
  // Start eternal hum
  sacredHum.volume = 0.4;
  sacredHum.play();

  const lines = document.querySelectorAll(".scroll-line");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1";
      line.style.transform = "translateY(0)";

      // Animate visuals
      aum.classList.add("highlight");
      mandala.classList.add("radiate");
      phoenix.classList.add("flare");

      // Play chime
      if (scrollChime) {
        scrollChime.currentTime = 0;
        scrollChime.volume = 0.6;
        scrollChime.play();
      }

      // Reset highlight
      setTimeout(() => {
        aum.classList.remove("highlight");
        mandala.classList.remove("radiate");
        phoenix.classList.remove("flare");
      }, 1200);
    }, index * 2000);
  });
});
