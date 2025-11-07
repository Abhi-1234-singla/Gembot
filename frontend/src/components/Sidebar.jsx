import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from '../context/chatContext';
import {MdDelete} from "react-icons/md";
import { LoadingSpinner } from './Loading';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


function Sidebar({isOpen, toggleSidebar}) {
  const {chats, createChat, creatLod, setSelected, deleteChat, selected } = ChatData();
  const { setIsAuth } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };
  return (
    <>
      <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform md:relative md:translate-x-0 md:w-1/4 md:block z-30 ${isOpen? "translate-x-0": "-translate-x-full"}`}>
        <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl' onClick={toggleSidebar}> 
         <IoIosCloseCircle/> 
        </button>

        <div className='text-2xl font-semibold mb-6'>GemBot</div>
        <div className='mb-4'>
            <button onClick={createChat} className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded" >
              {creatLod? <LoadingSpinner/> : " New Chat"}
              </button>

        </div>
        <div>
          <p className='text-sm text-gray-400 mb-2 '>Recent</p>

          <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 .thin-scrolling'>
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <div key={chat._id} className='flex items-center gap-2 mt-2'>
                  <button 
                    onClick={() => {
                      setSelected(chat._id);
                      toggleSidebar();
                    }}
                    className={`flex-1 text-left py-2 px-2 rounded truncate ${
                      selected === chat._id 
                        ? 'bg-gray-600 hover:bg-gray-500' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title={chat.latestMessage || `Chat ${chat._id.slice(-6)}`}
                  >
                    {chat.latestMessage || `Chat ${chat._id.slice(-6)}`}
                  </button>
                  <button
                    onClick={() => deleteChat(chat._id)}
                    className='p-2 bg-gray-700 hover:bg-red-600 rounded text-xl'
                  >
                    <MdDelete />
                  </button>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-sm mt-2'>No chats yet</p>
            )}
          </div>
        </div>

        <div className='absolute bottom-0 mb-6 w-full'>
            <button 
              onClick={handleLogout}
              className='bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 mx-auto block'
            >
              Logout
            </button>
        </div>


      </div>


    </>
  )
}

export default Sidebar
