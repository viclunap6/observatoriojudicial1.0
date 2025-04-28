document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evaluate-form");
  const ratingInput = document.getElementById("rating");
  const ratingOutput = document.getElementById("rating-output");
  const commentsInput = document.getElementById("comments");
  const commentsError = document.getElementById("comments-error");
  const submitBtn = document.getElementById("submit-btn");

  // Gráfico Radial
  const ctx = document.getElementById("radialChart").getContext("2d");
  let radialChart = new Chart(ctx, {
    type: "radialBar",
    data: {
      labels: ["Calificación"],
      datasets: [
        {
          label: "Calificación",
          data: [5],
          backgroundColor: [var(--secondary)],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 1,
          max: 10,
          ticks: { stepSize: 1 },
        },
      },
    },
  });

  // Actualizar valor del slider
  ratingInput.addEventListener("input", () => {
    const value = ratingInput.value;
    ratingOutput.textContent = value;
    radialChart.data.datasets[0].data = [value];
    radialChart.update();

    // Animación GSAP
    gsap.to(ratingOutput, { scale: 1.2, duration: 0.2, ease: "power1.out" });
    gsap.to(ratingOutput, { scale: 1, duration: 0.2, delay: 0.2 });
  });

  // Validación de comentarios
  commentsInput.addEventListener("input", () => {
    const value = commentsInput.value.trim();
    if (value.length < 50 || value.length > 500) {
      commentsError.textContent =
        "El comentario debe tener entre 50 y 500 caracteres.";
      commentsError.style.display = "block";
    } else {
      commentsError.style.display = "none";
    }
  });

  // Autoguardado en LocalStorage + IndexedDB
  function saveToStorage() {
    const rating = ratingInput.value;
    const comments = commentsInput.value;

    // Guardar en LocalStorage
    localStorage.setItem("evaluation", JSON.stringify({ rating, comments }));

    // Guardar en IndexedDB
    if (window.indexedDB) {
      const request = indexedDB.open("EvaluationDB", 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("evaluations")) {
          db.createObjectStore("evaluations", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("evaluations", "readwrite");
        const store = transaction.objectStore("evaluations");
        store.put({ rating, comments, timestamp: Date.now() });
      };
    }
  }

  setInterval(saveToStorage, 5000); // Autoguardado cada 5 segundos

  // Manejo del envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const rating = ratingInput.value;
    const comments = commentsInput.value.trim();

    if (comments.length < 50 || comments.length > 500) {
      alert("Por favor, verifica los campos.");
      return;
    }

    alert("Evaluación enviada exitosamente.");
    localStorage.removeItem("evaluation"); // Limpiar LocalStorage
  });
});
