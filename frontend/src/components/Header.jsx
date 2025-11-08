import React from 'react'
import { ChatData } from '../context/chatContext'

function Header() {
  const {chats} = ChatData();
  return (
    <>
      <p className='text-lg mb-6'>Hello, how can i help you today?</p>
      {chats && chats.length === 0 && (
        <p className='text-lg mb-6'>Create new Chat to Continue</p>
      )}
    </>
  )
}

export default Header

