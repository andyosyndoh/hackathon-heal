import { IConversation } from "@/types";
import { settingsAtom } from "@/store/settings";
import { getDefaultStore } from "jotai";

export const createConversation = async (
  token: string,
): Promise<IConversation> => {
  const settings = getDefaultStore().get(settingsAtom);
  let contextString = "";
  if (settings.name) {
    contextString = `You are talking with the user, Andy. Additional context: `;
  }
  contextString += settings.context || "";
  const payload = {
    persona_id: settings.persona || "pd43ffef",
    custom_greeting: settings.greeting !== undefined && settings.greeting !== null 
      ? settings.greeting 
      : "Hey there! I'm your technical co-pilot! Let's get get started building with Tavus.",
    conversational_context: contextString
  };
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token ?? "",
    },
    body: JSON.stringify(payload),
  });
  if (!response?.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
