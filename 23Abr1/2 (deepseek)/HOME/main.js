// Animaciones GSAP
document.addEventListener("DOMContentLoaded", () => {
  // Animación del Título
  gsap.from(".hero-title", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  // Animación del Subtítulo
  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1,
    ease: "power3.out",
  });

  // Animación Morphing SVG
  const morphingSvg = document.querySelector("#morphing-svg path");
  gsap.to(morphingSvg, {
    attr: {
      d: "M50,20 C65,20 80,40 80,60 C80,80 65,100 50,100 C35,100 20,80 20,60 C20,40 35,20 50,20 Z",
    },
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
});
