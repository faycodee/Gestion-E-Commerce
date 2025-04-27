export const sendWhatsAppNotification = async (
  orderId,
  customerName,
  phone,
  address
) => {
  
  try {
    const formattedAddress = String(address).replace(/\n/g, " ").trim();

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${(import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID).trim()}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: import.meta.env.VITE_ADMIN_PHONE_NUMBER,
          type: "template",
          template: {
            name: import.meta.env.VITE_WHATSAPP_TEMPLATE_NAME,
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: String(orderId) },
                  { type: "text", text: String(customerName) },
                  { type: "text", text: String(phone) },
                  { type: "text", text: formattedAddress },
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
