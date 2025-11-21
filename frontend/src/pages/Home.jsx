import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/chatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa6";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

// Function to format answer text into paragraphs
const formatAnswer = (text) => {
    if (!text) return "";
    
    // Remove markdown bold syntax (**text** or __text__)
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1');
    
    // Split by double newlines to create paragraphs
    const parts = formatted.split(/\n\n+/);
    const result = [];
    
    parts.forEach((part, partIndex) => {
        const trimmed = part.trim();
        if (!trimmed) return;
        
        // Check if this part contains list items
        const lines = trimmed.split('\n');
        const isList = lines.some(line => /^[\*\-\•]\s/.test(line.trim()));
        
        if (isList) {
            // Process as list
            const listItems = lines
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => line.replace(/^[\*\-\•]\s/, ''));
            
            listItems.forEach((item, itemIndex) => {
                result.push(
                    <p key={`${partIndex}-${itemIndex}`} className="mb-2 ml-4">
                        • {item}
                    </p>
                );
            });
        } else {
            // Regular paragraph - split by single newlines and join with spaces
            const paragraph = trimmed.split('\n').join(' ').trim();
            if (paragraph) {
                result.push(
                    <p key={partIndex} className="mb-3 leading-relaxed">
                        {paragraph}
                    </p>
                );
            }
        }
    });
    
    return result.length > 0 ? result : <p className="mb-3 leading-relaxed">{formatted}</p>;
};

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const { fetchResponse, messages, prompt, setPrompt, newRequestLoading, loading } = ChatData();

    // Auto-scroll to bottom when messages change or when loading state changes
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            } else if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        };

        // Small delay to ensure DOM is updated
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
    }, [messages, newRequestLoading, loading]);

    const submitHandler = (e) => {
        e.preventDefault();
        fetchResponse();
    }
    return (
        <>
            <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

                <div className='flex flex-1 flex-col overflow-hidden md:ml-0'>
                    <button onClick={toggleSidebar} className='md:hidden p-4 bg-gray-800 z-10'>
                        <GiHamburgerMenu />
                    </button>

                    <div className='flex-1 flex flex-col overflow-hidden'>
                        <div className='p-6 pb-4'>
                            <Header />
                            {
                                loading ? <LoadingBig /> : null
                            }
                        </div>

                        <div 
                            ref={messagesContainerRef}
                            className="flex-1 p-6 pt-0 overflow-y-auto thin-scrollbar pb-24"
                        >
                            {
                                messages && messages.length > 0 ? messages.map((e, i) => (
                                    <div key={i} className="mb-6">
                                        {/* User Message - Right aligned */}
                                        <div className="mb-3 flex justify-end">
                                            <div className="max-w-[80%] md:max-w-[70%] p-4 rounded-lg bg-blue-700 text-white flex gap-3 items-start">
                                                <div className="text-sm break-words flex-1">{e.question}</div>
                                                <div className="bg-white p-2 rounded-full text-black text-xl h-8 w-8 flex-shrink-0 flex items-center justify-center">
                                                    <CgProfile />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bot Message - Left aligned */}
                                        <div className="mb-3 flex justify-start">
                                            <div className="max-w-[80%] md:max-w-[70%] p-4 rounded-lg bg-gray-700 text-white flex gap-3 items-start">
                                                <div className="bg-white p-2 rounded-full text-black text-xl h-8 w-8 flex-shrink-0 flex items-center justify-center">
                                                    <FaRobot />
                                                </div>
                                                <div className="text-sm break-words flex-1 whitespace-pre-wrap">
                                                    {formatAnswer(e.answer)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-400 text-center mt-8">No messages yet. Start a conversation!</p>
                                )
                            }

                            {newRequestLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] md:max-w-[70%] p-4">
                                        <LoadingSmall />
                                    </div>
                                </div>
                            )}
                            
                            {/* Invisible element at the bottom to scroll to */}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Input Form at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 md:left-1/4 p-4 bg-gray-900 border-t border-gray-800 z-20">
                <form onSubmit={submitHandler} className="flex gap-2 max-w-7xl mx-auto">
                    <input
                        className="flex-grow p-4 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter a prompt here"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-2xl text-white transition-colors flex items-center justify-center min-w-[56px]"
                    >
                        <IoMdSend />
                    </button>
                </form>
            </div>
        </>
    )
};

export default Home;
