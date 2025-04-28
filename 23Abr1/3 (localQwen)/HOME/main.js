document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".logo", {
    duration: 2,
    scale: 1,
    opacity: 1,
    ease: "power4.out",
    delay: 0.3,
  });

  document.querySelectorAll("[data-animation]").forEach((element) => {
    const animation = element.dataset.animation;
    gsap.to(element, {
      duration: 1,
      opacity: 1,
      ease: "power4.out",
      delay: 1.5,
    });
  });

  gsap.to(".btn", {
    duration: 0.3,
    scale: 1.02,
    ease: "power4.inOut",
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
  });
});
