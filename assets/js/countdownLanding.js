const weddingDate = new Date("2026-05-14T00:00:00");
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = `
    <div class="count-box">
      <div class="count-number">14</div>
    </div>
    <div class="count-box">
      <div class="count-number">Mei</div>
    </div>
    <div class="count-box">
      <div class="count-number">2026</div>
    </div>
    `;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownElement.innerHTML = `
    <div class="count-box">
      <div class="count-number">${days}</div>
      <div class="count-label">Hari</div>
    </div>
    <div class="count-box">
      <div class="count-number">${hours}</div>
      <div class="count-label">Jam</div>
    </div>
    <div class="count-box">
      <div class="count-number">${minutes}</div>
      <div class="count-label">Menit</div>
    </div>
    <div class="count-box">
      <div class="count-number">${seconds}</div>
      <div class="count-label">Detik</div>
    </div>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Music & Landing
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("landing").classList.remove("hidden");
  }, 2000);
});

function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("flower");
  flower.innerHTML = "🍂"; // daun gugur (lebih natural)
  flower.style.left = Math.random() * 100 + "vw";
  flower.style.animationDuration = Math.random() * 3 + 3 + "s";
  flower.style.fontSize = Math.random() * 10 + 20 + "px";
  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 6000);
}

document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("invitation").classList.remove("hidden");
  music.volume = 0.4;
  music.play().catch(() => console.warn("Autoplay diblokir browser"));
  musicBtn.classList.remove("hidden");
  setInterval(createFlower, 400);
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.innerHTML = '<i class="fa-solid fa-pause text-pink-100"></i>';
  } else {
    music.pause();
    musicBtn.innerHTML = '<i class="fa-solid fa-play text-pink-600"></i>';
  }
});

// AOS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('aos-animate');
    else entry.target.classList.remove('aos-animate');
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Guest name from URL
const params = new URLSearchParams(window.location.search);
const guestName = params.get("to");
const guestElement = document.getElementById("guestName");

if (guestName) {
  const formatted = decodeURIComponent(guestName).replace(/\b\w/g, c => c.toUpperCase());
  guestElement.textContent = formatted;
} else {
  guestElement.textContent = "Tamu Undangan";
}
