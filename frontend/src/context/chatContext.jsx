import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../main";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [selected, setSelected] = useState(null);
    const [creatLod, setCreateLod] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchResponse() {
        if (prompt === "") return toast.error("Write prompt");
        if (!selected) return toast.error("Please select or create a chat");

        const currentPrompt = prompt; // Save prompt before clearing
        setNewRequestLoading(true);
        setPrompt("")
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA-kmwi3VlurII3TU50Y7grS5zwvvPcMlQ",
                method: "post",
                data: {
                    contents: [{ parts: [{ text: currentPrompt }] }],
                },
            });

            const message = {
                question: currentPrompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }

            setMessages((prev) => [...prev, message])
            setNewRequestLoading(false);

            await axios.post(`${server}/api/chat/${selected}`, {
                question: currentPrompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"] 
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            
            // Refresh chats to update the title
            await fetchChats();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
            setNewRequestLoading(false);
        }
    }


    async function fetchChats() {
        try {
            const { data } = await axios.get(`${server}/api/chat/all`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });

            setChats(data);
            if (data && data.length > 0) {
                setSelected(data[0]._id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function createChat() {
        setCreateLod(true)
        try {
            const { data } = await axios.post(
                `${server}/api/chat/new`,
                {},
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    }
                }
            )

            await fetchChats();
            // Set the newly created chat as selected and clear messages
            if (data && data._id) {
                setSelected(data._id);
                setMessages([]);
            }
            setCreateLod(false);
        } catch (error) {
            toast.error("Something went wrong");
            setCreateLod(false);
        }
    }

    async function fetchMessages(){
        if (!selected) return;
        setLoading(true);
        try{
            const {data} = await axios.get(`${server}/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMessages(data);
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    async function deleteChat(id){
        try{
            const {data} = await axios.delete(`${server}/api/chat/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            toast.success(data.message);
            // If deleted chat was selected, clear selection and messages
            if (selected === id) {
                setSelected(null);
                setMessages([]);
            }
            await fetchChats(); // Refresh chats list after deletion
        } catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchChats();
        }
    }, [])

    useEffect(() => {
        fetchMessages();
    }, [selected])

    return (
        <>
            <ChatContext.Provider value={{ fetchResponse, messages, prompt, setPrompt, newRequestLoading, chats, createChat, creatLod, selected, setSelected, loading, setLoading, deleteChat }}>{children}</ChatContext.Provider>
        </>
    );
}

export const ChatData = () => useContext(ChatContext);