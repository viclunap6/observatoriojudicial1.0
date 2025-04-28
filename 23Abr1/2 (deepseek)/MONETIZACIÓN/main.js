document.addEventListener("DOMContentLoaded", () => {
  const stripe = Stripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // Reemplaza con tu clave pública de Stripe

  // Suscripción Premium
  const subscribeBtn = document.getElementById("subscribe-btn");
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

  // Marketplace Legal
  const marketplaceItems = [
    { id: 1, name: "Contrato de Arrendamiento", price: "$19.99" },
    { id: 2, name: "Acuerdo de Confidencialidad", price: "$29.99" },
    { id: 3, name: "Testamento Simple", price: "$49.99" },
  ];

  const marketplaceList = document.getElementById("marketplace-items");
  marketplaceItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
    `;
    marketplaceList.appendChild(listItem);
  });

  const buyTemplateBtn = document.getElementById("buy-template-btn");
  buyTemplateBtn.addEventListener("click", async () => {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_YYYYYYYYYYYYYYYYYYYYYY", quantity: 1 }], // Reemplaza con tu ID de precio
      mode: "payment",
      successUrl: "https://misjueces.mx/success",
      cancelUrl: "https://misjueces.mx/cancel",
    });

    if (error) {
      console.error("Error al redirigir a Stripe:", error);
    }
  });
});
