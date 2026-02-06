// ===================== PRELOADER =====================
const preloader = document.getElementById("preloader");
const preloaderBar = preloader.querySelector(".preloader-bar");
const preloaderPercent = preloader.querySelector(".preloader-percent");

let progress = 0;
const fakeLoad = setInterval(() => {
  progress += Math.random() * 5;
  if (progress >= 100) progress = 100;
  preloaderBar.style.width = progress + "%";
  preloaderPercent.textContent = Math.floor(progress) + "%";
  if (progress === 100) {
    clearInterval(fakeLoad);
    gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.style.display = "none" });
    initAnimations();
  }
}, 100);


// ===================== FUNÇÃO PRINCIPAL =====================
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll(".stage > section");
  
  // Inicializa todas as seções invisíveis exceto a primeira
  sections.forEach((sec, i) => {
    if(i === 0){
      sec.style.opacity = 1;
      sec.style.pointerEvents = "auto";
      sec.style.transform = "scale(1)";
    } else {
      sec.style.opacity = 0;
      sec.style.pointerEvents = "none";
      sec.style.transform = "scale(1.2)";
    }
  });

  // Timeline controlada pelo scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  sections.forEach((sec, i) => {
    if(i === 0) return; // primeira seção já visível

    const prev = sections[i-1];

    // Fade out da seção anterior + fade in da atual
    tl.to(prev, {
      scale: 0.6,
      opacity: 0,
      duration: 1,
      pointerEvents: "none"
    });

    tl.to(sec, {
      scale: 1,
      opacity: 1,
      duration: 1,
      pointerEvents: "auto"
    }, "<"); // "<" sincroniza com fade out
  });

  // Pequeno tempo extra no final para explorar conteúdo
  tl.to({}, { duration: 2 });


  // ===================== CARROSSEL CONTÍNUO =====================
  const projectTrack = document.querySelector(".project-track");
  if(projectTrack){
    const cards = Array.from(projectTrack.children);
    // duplicar cards para loop contínuo
    cards.forEach(card => projectTrack.appendChild(card.cloneNode(true)));
    let currentX = 0;
    let speed = 0.3;

    function animateCarousel() {
      currentX -= speed;
      if(currentX <= -projectTrack.scrollWidth/2) currentX = 0;
      gsap.set(projectTrack, { x: currentX });
      requestAnimationFrame(animateCarousel);
    }
    animateCarousel();

    // ===================== BOTÕES LATERAIS =====================
    const prevBtn = document.querySelector(".carousel-nav.prev");
    const nextBtn = document.querySelector(".carousel-nav.next");

    if(prevBtn){
      prevBtn.addEventListener("click", () => currentX += 300); // move 1 card
    }
    if(nextBtn){
      nextBtn.addEventListener("click", () => currentX -= 300);
    }

    // ===================== CLIQUE NOS CARDS =====================
    const allCards = projectTrack.querySelectorAll(".project-card");
    allCards.forEach(card => {
      card.addEventListener("click", () => {
        const demoUrl = card.getAttribute("data-demo"); // usar atributo data-demo no HTML
        if(demoUrl) window.open(demoUrl, "_blank");
      });
    });
  }
}
