export const endConversation = async (
  conversationId: string,
  token?: string,
) => {
  // Use provided token or get from environment
  const apiToken = token || process.env.NEXT_PUBLIC_TAVUS_API_KEY;
  
  if (!apiToken) {
    throw new Error("Tavus API key is required. Please set NEXT_PUBLIC_TAVUS_API_KEY in your environment variables.");
  }

  try {
    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: "POST",
        headers: {
          "x-api-key": apiToken,
        },
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to end conversation: ${response.status} - ${errorText}`);
    }
    return null;
  } catch (error) {
    console.error("Error ending conversation:", error);
    throw error;
  }
};