document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".login-section", {
    duration: 2,
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

function validateForm() {
  const cedulaProfesional = document.getElementById("cedulaProfesional").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Validar Cédula Profesional con regex
  if (!/^\d{1,}$/.test(cedulaProfesional)) {
    errorMessage.textContent = "La cédula debe contener solo números.";
    errorMessage.style.display = "block";
    return false;
  }

  // Validar Contraseña
  if (password.length < 8) {
    errorMessage.textContent =
      "La contraseña debe tener al menos 8 caracteres.";
    errorMessage.style.display = "block";
    return false;
  }
  if (password.length > 50) {
    errorMessage.textContent =
      "La contraseña no puede superar los 50 caracteres.";
    errorMessage.style.display = "block";
    return false;
  }

  // Ocultar mensaje de error si las validaciones son correctas
  errorMessage.style.display = "none";

  // Simular carga durante 1 segundo
  const loader = document.createElement("div");
  loader.className = "loader";
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    alert("Inicio de sesión exitoso.");
  }, 1000);

  return true;
}
