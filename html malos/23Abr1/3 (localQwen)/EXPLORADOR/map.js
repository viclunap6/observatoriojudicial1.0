document.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("#map");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  // Datos ficticios de jurisdicciones judiciales
  const data = [
    { name: "Tribunal 1", lat: 25.64, lng: -102.34 },
    { name: "Tribunal 2", lat: 28.97, lng: -111.94 },
    { name: "Tribunal 3", lat: 34.05, lng: -118.24 },
    // Agrega más jurisdicciones
  ];

  const projection = d3
    .geoMercator()
    .center([longitude, latitude]) // Cambia los valores según tus datos
    .scale(150)
    .translate([width / 2, height / 2]);

  svg
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", d3.geoPath(projection))
    .style("fill", "lightgray")
    .on("click", handleMapClick);

  function handleMapClick(event, datum) {
    // Mostrar detalles del tribunal en el mapa
    svg.selectAll(".tooltip").remove();

    const tooltip = svg
      .append("text")
      .attr("class", "tooltip")
      .attr("x", event.x)
      .attr("y", event.y + 10)
      .style("font-size", "1.2em")
      .style("fill", "black")
      .text(datum.name);

    // Ocultar tooltip después de un segundo
    setTimeout(() => {
      tooltip.remove();
    }, 1000);
  }
});
