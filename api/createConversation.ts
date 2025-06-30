import { IConversation } from "@/types";
import { settingsAtom } from "@/store/settings";
import { getDefaultStore } from "jotai";

export const createConversation = async (
  token?: string,
): Promise<IConversation> => {
  // Use provided token or get from environment
  const apiToken = token || process.env.NEXT_PUBLIC_TAVUS_API_KEY;
  
  if (!apiToken) {
    throw new Error("Tavus API key is required. Please set NEXT_PUBLIC_TAVUS_API_KEY in your environment variables.");
  }

  const settings = getDefaultStore().get(settingsAtom);
  let contextString = "";
  if (settings.name) {
    contextString = `You are talking with the user, ${settings.name}. Additional context: `;
  }
  contextString += settings.context || "";
  
  const payload = {
    persona_id: settings.persona || "pd43ffef",
    custom_greeting: settings.greeting !== undefined && settings.greeting !== null && settings.greeting.trim() !== ""
      ? settings.greeting 
      : "Hey there! I'm your AI mental health companion. I'm here to listen, support, and help you through whatever you're experiencing. How are you feeling today?",
    conversational_context: contextString || "You are a compassionate AI mental health companion. Provide supportive, empathetic responses while maintaining professional boundaries. If the user expresses thoughts of self-harm, gently guide them to seek professional help. Do not provide medical advice or diagnoses. Do not negate the user's feelings, but instead validate their emotions and encourage them to share more about their experiences.",
  };

  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  const data = await response.json();
  return data;
};