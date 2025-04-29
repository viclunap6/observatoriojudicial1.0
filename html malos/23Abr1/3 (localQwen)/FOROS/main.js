document
  .getElementById("new-question-form")
  .addEventListener("submit", handleNewQuestion);

function handleNewQuestion(event) {
  event.preventDefault();
  const questionInput = document.getElementById("question-input");
  const questionText = questionInput.value;

  // Simular la validación de la pregunta (por ejemplo, longitud mínima)
  if (questionText.length < 50) {
    alert("La pregunta debe tener al menos 50 caracteres.");
    return;
  }

  // Aquí debes implementar la lógica para guardar la pregunta en tu base de datos
  console.log("Pregunta publicada:", questionText);

  // Limpiar el formulario después de enviar
  questionInput.value = "";
}

// Funcionalidades adicionales (como moderación) deben ser desarrolladas separadamente

document.getElementById("show-admin").addEventListener("click", () => {
  const adminPanel = document.querySelector(".admin-panel");
  if (adminPanel.style.display === "none") {
    adminPanel.style.display = "block";
  } else {
    adminPanel.style.display = "none";
  }
});
