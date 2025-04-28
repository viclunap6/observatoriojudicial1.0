document.addEventListener("DOMContentLoaded", () => {
  const questionsList = document.getElementById("questions-list");
  const adminPosts = document.getElementById("admin-posts");
  const questionForm = document.getElementById("question-form");
  const subscribeBtn = document.getElementById("subscribe-btn");

  // Datos simulados
  let questions = [];
  let adminQueue = [];

  // Publicar pregunta
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const questionInput = document.getElementById("question");
    const questionText = questionInput.value.trim();

    if (questionText) {
      const newQuestion = {
        id: Date.now(),
        text: questionText,
        answered: false,
      };
      questions.push(newQuestion);
      renderQuestions();
      questionInput.value = "";
      adminQueue.push(newQuestion);
      renderAdminQueue();
    }
  });

  // Renderizar preguntas
  function renderQuestions() {
    questionsList.innerHTML = "";
    questions.forEach((q) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `
        <p>${q.text}</p>
        <small>${q.answered ? "Respondida" : "Sin responder"}</small>
      `;
      questionsList.appendChild(questionDiv);
    });
  }

  // Renderizar cola de administración
  function renderAdminQueue() {
    adminPosts.innerHTML = "";
    adminQueue.forEach((q) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p>${q.text}</p>
        <button onclick="approvePost(${q.id})">Aprobar</button>
        <button onclick="rejectPost(${q.id})">Rechazar</button>
      `;
      adminPosts.appendChild(listItem);
    });
  }

  // Aprobar publicación
  window.approvePost = (id) => {
    const index = adminQueue.findIndex((q) => q.id === id);
    if (index !== -1) {
      adminQueue.splice(index, 1);
      renderAdminQueue();
    }
  };

  // Rechazar publicación
  window.rejectPost = (id) => {
    const index = adminQueue.findIndex((q) => q.id === id);
    if (index !== -1) {
      adminQueue.splice(index, 1);
      renderAdminQueue();
    }
  };

  // Suscripción Premium con Stripe
  const stripe = Stripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // Reemplaza con tu clave pública de Stripe
  subscribeBtn.addEventListener("click", async () => {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_XXXXXXXXXXXXXXXXXXXXXX", quantity: 1 }], // Reemplaza con tu ID de precio
      mode: "subscription",
      successUrl: "https://misjueces.mx/success",
      cancelUrl: "https://misjueces.mx/cancel",
    });

    if (error) {
      console.error("Error al redirigir a Stripe:", error);
    }
  });
});
