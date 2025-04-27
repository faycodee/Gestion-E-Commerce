export const sendWhatsAppNotification = async (
  orderId,
  customerName,
  phone,
  address
) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/607822679087527/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer EAASz3t7NFsoBO4oh3wZCj6B8q29kIkLGrVBekrINCA6a10Lf8ZAifvVuidAEZCZAe9V0AMzCaghgLgX9ZAUxg9uqMSy5jRZCZBFVrbJLIlLi9SSUevb1PTC8gBP66KjH9n3T3FcrjRGLBrzrFxZBd2BOrF4BJ63yZBdCwh3uVyiWKesWVQFTaBT099dXTR3mDLrfukarHnC6ZBIZCuqVW6nT10Y1BN4Pk7m`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "212690626544",
          type: "template",
          template: {
            name: "orders",
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: "12345" },
                  { type: "text", text: "John Doe" },
                  { type: "text", text: "+212690626544" },
                  { type: "text", text: "123 Main St, Casablanca" },
                ],
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }
    return data;
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    throw error;
  }
};
