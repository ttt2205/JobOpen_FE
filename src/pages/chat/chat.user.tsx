import { useState } from "react";
import { ChatCompletionMessage } from "@/types/chat-completion-message.interface";
import { createChatCompletionUser } from "@/types/createChatCompletion";

const ChatUser = () => {
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleMessage = async () => {
        if (!message.trim() || isLoading) return;

        const updatedMessages = [
            ...messages,
            {
                role: "user",
                content: message,
            },
        ];

        setMessages(updatedMessages);
        setMessage("");
        setIsLoading(true);

        try {
            const response = await createChatCompletionUser(message);
            if (response) {
                setMessages([...updatedMessages, response]);
            }
        } catch (err) {
            setMessages([
                ...updatedMessages,
                {
                    role: "system",
                    content: "Đã xảy ra lỗi khi phản hồi từ AI.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "1.5rem 1rem 0 1rem",
            }}
        >
            {/* Header */}
            <h2
                style={{
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Chat With AI
            </h2>

            {/* Message list */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "60%",
                    overflowY: "scroll",
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor:
                                    msg.role === "user" ? "#e5e7eb" : "#d1fae5",
                                padding: "0.75rem 1rem",
                                borderRadius: "1rem",
                                maxWidth: "70%",
                                wordBreak: "break-word",
                            }}
                        >
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}

                {/* Loading message */}
                {isLoading && (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div
                            style={{
                                backgroundColor: "#fef3c7", // Màu vàng nhẹ
                                padding: "0.75rem 1rem",
                                borderRadius: "1rem",
                                maxWidth: "70%",
                                fontStyle: "italic",
                            }}
                        >
                            <p>AI đang trả lời...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input + Send button */}
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    width: "100%",
                }}
            >
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
                    disabled={isLoading}
                    style={{
                        flex: 1,
                        border: "1px solid black",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                        opacity: isLoading ? 0.5 : 1,
                    }}
                />
                <button
                    onClick={handleMessage}
                    disabled={isLoading}
                    style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.5 : 1,
                    }}
                >
                    {isLoading ? "Đang gửi..." : "Gửi"}
                </button>
            </div>
        </div>
    );
};

export default ChatUser;
