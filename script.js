// ====== PRÉLOADER FUNCIONAL ======
const preloader = document.getElementById("preloader");
const preloaderBar = document.querySelector(".preloader-bar");

// Criar elemento de porcentagem dentro do preloader (se ainda não existir no HTML)
let preloaderPercent = preloader.querySelector(".preloader-percent");
if (!preloaderPercent) {
    preloaderPercent = document.createElement("div");
    preloaderPercent.classList.add("preloader-percent");
    preloaderPercent.style.position = "absolute";
    preloaderPercent.style.top = "65%";
    preloaderPercent.style.width = "100%";
    preloaderPercent.style.textAlign = "center";
    preloaderPercent.style.fontSize = "18px";
    preloaderPercent.style.color = "#38bdf8";
    preloaderPercent.style.fontFamily = "'Inter', sans-serif";
    preloader.appendChild(preloaderPercent);
}

// Simulação de carregamento
let progress = 0;
const fakeLoad = setInterval(() => {
    progress += Math.random() * 5; // aumenta de forma irregular
    if (progress >= 100) progress = 100;

    // Atualiza barra e porcentagem
    gsap.to(preloaderBar, { width: progress + "%", duration: 0.3, ease: "power1.out" });
    preloaderPercent.textContent = Math.floor(progress) + "%";

    // Quando chega em 100%
    if (progress === 100) {
        clearInterval(fakeLoad);
        gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.style.display = "none" });
        initAnimations(); // inicia as animações da página após o preloader
    }
}, 100);

// ====== FUNÇÃO PARA ANIMAÇÕES DA PÁGINA ======
function initAnimations() {
    // ====== FOTO GIRANDO ESTILO DISCO ======
    const photo = document.querySelector(".about-photo");
    if (photo) {
        photo.addEventListener("mouseenter", () => {
            gsap.to(photo, { rotationY: 180, duration: 1, ease: "power2.out" });
        });
        photo.addEventListener("mouseleave", () => {
            gsap.to(photo, { rotationY: 0, duration: 1, ease: "power2.out" });
        });
    }

    // ====== ANIMAÇÕES DE SCROLL COM GSAP ======
    gsap.registerPlugin(ScrollTrigger);

    // Animar cards de projeto
    gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.6,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animar texto do About
    gsap.utils.toArray(".about-text p, .about-text h3").forEach((elem) => {
        gsap.from(elem, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: elem,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
}
