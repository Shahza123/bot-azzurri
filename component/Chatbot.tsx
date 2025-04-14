"use client"
import { useEffect, useRef, useState } from "react";

import { useChat } from "ai/react";

import { Message as PreviewMessage } from "@/component/Message";

import ModelInput from "@/component/ModalInput";




import MultiModel from "@/component/Multimodel";
import ChatNavbar from "@/component/ChatNavbar";

interface Message {
    role: 'user' | 'assistant';
    content: string;


}
interface OpenChatProps {
    setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenChat: boolean
}


export default function ChatModel({ setIsOpenChat }: OpenChatProps) {
    const [conversation, setConversation] = useState<Message[]>([]);

    const { messages, input, setInput, isLoading, stop } = useChat();
    const [isSending, setIsSending] = useState(false);
    const [botMessage, setBotMessage] = useState("");

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("chatReceived.mp3");
    }, []);


    const generateId = () => Math.random().toString(36).substring(2, 10);


    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setIsSending(true);
        setBotMessage("");

        const userMessage = { id: generateId(), role: 'user', content: input };
        const staticBotResponse = "Hello! I'm your virtual assistant. How can I help you today?";

        try {
            // Add user message to the conversation
            setConversation((prev) => [...prev, userMessage]);

            setInput("");

            // Simulate assistant response without API call
            const assistantMessage = {
                id: generateId(),
                role: 'assistant',
                content: staticBotResponse,
            };

            // Optional: Simulate delay to mimic real interaction
            await new Promise((res) => setTimeout(res, 1000));

            setConversation((prev) => [...prev, assistantMessage]);

            if (audioRef.current) {
                audioRef.current.play().catch((err) => console.log("Audio error:", err));
            }

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };





    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = (e: any) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        handleSendMessage();
    };



    return (

        <div
            className="p-[2px] rounded-[10px] bg-gradient-to-b from-red-600 via-green-500 to-pink-600 w-[380px] h-[85vh] flex items-center justify-center"
        >
            <div className="bg-gradient-to-b from-black to-[#201A32] rounded-[8px] w-full h-full flex flex-col space-y-4">

                <div className="flex-1 flex flex-col w-full h-full text-white rounded-[5px]">
                    <ChatNavbar title="Ai Agent" setIsOpenChat={setIsOpenChat} />

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none scrollbar-hidden">
                        {conversation.length === 0 && !botMessage ? (
                            <div className="flex md:max-w-2xl mx-auto flex-col min-w-0 gap-6 flex-1">
                                <MultiModel />
                            </div>
                        ) : (
                            <>
                                {conversation.map((message) => (
                                    <PreviewMessage
                                        key={message.id}
                                        role={message.role}
                                        content={message.content}
                                    />
                                ))}
                                {botMessage && (
                                    <PreviewMessage key="streamedBotMessage" role="assistant" content={botMessage} />
                                )}
                            </>
                        )}
                    </div>

                    <ModelInput
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleFormSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        messages={messages}
                    />
                </div>
            </div>
        </div >


    );
}
