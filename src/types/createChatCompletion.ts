"use server";
import axios from 'config/axios-customize';

import { ChatCompletionMessage } from "./chat-completion-message.interface";
export async function createChatCompletionUser(
  message: String
) {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/open-ai/chat-public`, {message});
  console.log("response chat public: ", response)
  return response;
}

export async function createChatCompletionAdmin(
  message: String
) {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/open-ai/chat-admin`, {message});
  console.log("response chat admin: ", response)
  return response;
}
