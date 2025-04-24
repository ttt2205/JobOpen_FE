import { useState } from "react";
import { ChatCompletionMessage } from "@/types/chat-completion-message.interface";
import {createChatCompletionAdmin} from "@/types/createChatCompletion";

const ChatAdmin = () => {
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
    const [message, setMessage] = useState("");

    const handleMessage = async () => {
        if (!message.trim()) return;

        const updatedMessages = [
            ...messages,
            {
                role: "user",
                content: message,
            },
        ];

        setMessages(updatedMessages);
        setMessage("");

        const response = (await createChatCompletionAdmin(updatedMessages)).choices[0]?.message;

        if (response) {
            setMessages([...updatedMessages, response]);
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2.5rem",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "1.5rem 1rem 0 1rem",
                // backgroundColor: "black"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "75%",
                    overflowY: "scroll",
                    width: "100%"
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: msg.role === "user" ? "flex-start" : "flex-end"
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#e5e7eb", // Tailwind's bg-gray-200
                                padding: "0.75rem 1rem",
                                borderRadius: "1rem",
                                maxWidth: "70%",
                                wordBreak: "break-word"
                            }}
                        >
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={async (event) => {
                    if (event.key === "Enter") {
                        await handleMessage();
                    }
                }}
                style={{
                    border: "1px solid black", // Tailwind's border-gray-300
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                    width: "100%",
                    margin: "1rem 0"
                }}
            />
        </div>
    );
};

export default ChatAdmin;
