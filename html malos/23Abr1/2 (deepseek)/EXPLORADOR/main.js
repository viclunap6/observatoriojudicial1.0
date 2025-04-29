document.addEventListener("DOMContentLoaded", () => {
  const width = 800;
  const height = 600;

  // Crear SVG del mapa
  const svg = d3
    .select("#map")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("background-color", "white");

  // Datos de ejemplo (jurisdicciones judiciales)
  const data = [
    {
      name: "Tribunal Civil 1",
      x: 200,
      y: 200,
      rating: 8,
      specialty: "Derecho Civil",
    },
    {
      name: "Tribunal Penal 1",
      x: 400,
      y: 300,
      rating: 7,
      specialty: "Derecho Penal",
    },
    {
      name: "Tribunal Familiar 1",
      x: 600,
      y: 400,
      rating: 9,
      specialty: "Derecho Familiar",
    },
  ];

  // Dibujar puntos en el mapa
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 10)
    .attr("fill", "var(--secondary)")
    .on("click", (event, d) => showDetails(d));

  // Filtros
  const tribunalFilter = document.getElementById("tribunal");
  const specialtyFilter = document.getElementById("specialty");
  const ratingFilter = document.getElementById("rating");
  const ratingOutput = document.getElementById("rating-output");

  ratingFilter.addEventListener("input", () => {
    ratingOutput.textContent = ratingFilter.value;
  });

  // Mostrar detalles del tribunal
  function showDetails(tribunal) {
    const detailsPanel = document.getElementById("details-panel");
    document.getElementById("tribunal-name").textContent = tribunal.name;
    document.getElementById("rating-value").textContent = tribunal.rating;
    document.getElementById("specialty-value").textContent = tribunal.specialty;
    detailsPanel.style.display = "block";
  }

  // Cerrar detalles
  document.getElementById("close-details").addEventListener("click", () => {
    document.getElementById("details-panel").style.display = "none";
  });
});
