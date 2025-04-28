document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const cedulaInput = document.getElementById("cedula");
  const passwordInput = document.getElementById("password");
  const cedulaError = document.getElementById("cedula-error");
  const passwordError = document.getElementById("password-error");
  const loginBtn = document.getElementById("login-btn");
  const loadingSkeleton = document.getElementById("loading-skeleton");
  const loginText = document.getElementById("login-text");

  // Regex para validar cédula profesional
  const cedulaRegex = /^[0-9]{7,10}$/;

  // Validación en tiempo real
  cedulaInput.addEventListener("input", () => {
    if (!cedulaRegex.test(cedulaInput.value)) {
      cedulaError.textContent = "La cédula debe tener entre 7 y 10 dígitos.";
      cedulaError.style.display = "block";
    } else {
      cedulaError.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length < 8) {
      passwordError.textContent =
        "La contraseña debe tener al menos 8 caracteres.";
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });

  // Manejo del envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Mostrar animación de carga
    loginText.style.display = "none";
    loadingSkeleton.style.display = "block";

    // Simular validación
    setTimeout(() => {
      loadingSkeleton.style.display = "none";
      loginText.style.display = "inline";

      if (
        cedulaRegex.test(cedulaInput.value) &&
        passwordInput.value.length >= 8
      ) {
        alert("Inicio de sesión exitoso.");
      } else {
        alert("Por favor, verifica los campos.");
      }
    }, 2000);
  });
});
