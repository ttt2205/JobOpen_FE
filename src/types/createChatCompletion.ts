"use server";

import { ChatCompletionMessage } from "./chat-completion-message.interface";

export async function createChatCompletionUser(
  messages: ChatCompletionMessage[]
) {
  const response = await fetch(`${process.env.API_URL}/openai/chatCompletion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });
  return response.json();
}

export async function createChatCompletionAdmin(
  messages: ChatCompletionMessage[]
) {
  const response = await fetch(`${process.env.API_URL}/openai/chatCompletion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });
  return response.json();
}
