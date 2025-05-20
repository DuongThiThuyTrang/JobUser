import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./chatbot.css";

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chatMessages");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [thinking, setThinking] = useState(false);

    const messageEndRef = useRef(null);
    const textareaRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(prev => {
            const nextState = !prev;
            if (nextState && messages.length === 0) {
                setMessages([{ role: "bot", text: "Xin chào, tôi có thể giúp gì cho bạn?" }]);
            }
            return nextState;
        });
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            role: "user",
            text: input,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setThinking(true);

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBmeU2Wt2IwRld793XvW0YBrG3qDw9FX4s",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    {
                                        text: `Bạn là một trợ lý ảo chuyên về tuyển dụng và tìm kiếm việc làm. Bạn phải nắm rõ các thông tin sau:
- Thông tin về các vị trí tuyển dụng hiện có
- Các công ty đang có bạn vui lòng bấm vào biểu tượng công ty bên trên để truy cập
- Các công việc đang có bạn vui lòng bấm vào biểu tượng công việc bên trên để truy cập
- Hướng dẫn cách ứng tuyển và chuẩn bị hồ sơ
- Các yêu cầu về kỹ năng và kinh nghiệm cho từng vị trí
- Thông tin về quy trình phỏng vấn
- Hỗ trợ giải đáp thắc mắc liên quan đến chính sách lương thưởng, chế độ đãi ngộ
- Hỗ trợ tìm kiếm việc làm theo ngành nghề, địa điểm, mức lương
- Cung cấp thông tin về các công ty đang tuyển dụng
- Hướng dẫn cách tạo và cập nhật hồ sơ cá nhân trên hệ thống
- Hỗ trợ số điện thoại liên hệ: 0123 456 789
- Địa chỉ văn phòng tuyển dụng tại Đường Z115, Quyết Thắng, TP. Thái Nguyên

Nếu câu hỏi không liên quan đến chủ đề tuyển dụng và tìm kiếm việc làm, hãy nhẹ nhàng đề nghị người dùng hỏi về nội dung liên quan.

Luôn trả lời bằng tiếng Việt rõ ràng, ngắn gọn và thân thiện.


Câu hỏi: ${input}`
                                    }
                                ],
                            },
                        ]
                    }),
                }
            );

            const data = await response.json();
            let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";
            rawText = rawText.replace(/\*{1,2}/g, "");

            setMessages(prev => [...prev, { role: "bot", text: rawText }]);
        } catch (err) {
            console.error("API Error:", err);
            setMessages(prev => [...prev, { role: "bot", text: "Lỗi kết nối API. Vui lòng thử lại sau." }]);
        } finally {
            setThinking(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleQuickReply = (text) => {
        if (text === "Danh sách công việc") {
            navigate("/job");
        } else if (text === "Danh sách công ty") {
            navigate("/company");
        } else {
            setInput(text);
        }
    };

    const clearChatHistory = () => {
        setMessages([]);
        localStorage.removeItem("chatMessages");
    };

    return (
        <>
            <button id="chatbot-toggler" onClick={toggleChat}>
                <span>{isOpen ? "×" : "💬"}</span>
            </button>

            <div className={`chatbot-popup ${isOpen ? "show" : ""}`}>
                <div className="chat-header">
                    <div className="header-info">
                        <div className="chatbot">
                            <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                viewBox="0 0 1024 1024">
                                <path
                                    d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                                </path>
                            </svg>
                        </div>
                        <div className="logo-text">ChatBot</div>
                    </div>
                    <button id="clear-history" onClick={clearChatHistory} title="Xoá lịch sử">🗑️</button>
                    <button id="close-chatbot" onClick={toggleChat}>×</button>
                </div>

                <div className="quick-replies">
                    <button onClick={() => handleQuickReply("Danh sách công ty")}>📅 Công ty</button>
                    <button onClick={() => handleQuickReply("Danh sách công việc")}>📋 Công việc</button>
                    <button onClick={() => handleQuickReply("Địa chỉ?")}>🏠 Địa chỉ</button>

                </div>

                <div className="chat-body">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.role}-message`}>
                            {msg.role === "bot" && <div className="bot">
                                <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                    viewBox="0 0 1024 1024">
                                    <path
                                        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                                    </path>
                                </svg>
                            </div>}
                            <div className="message-text">{msg.text}</div>
                        </div>
                    ))}

                    {thinking && (
                        <div className="bot-message thinking">
                            <div className="bot">
                                <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                    viewBox="0 0 1024 1024">
                                    <path
                                        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                                    </path>
                                </svg>
                            </div>
                            <div className="thinking-indicator">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messageEndRef} />
                </div>

                <div className="chat-footer">
                    <form className="chat-form" onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}>
                        <textarea
                            ref={textareaRef}
                            className="message-input"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="chat-controls">
                            <button type="submit" id="send-message">➤</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
