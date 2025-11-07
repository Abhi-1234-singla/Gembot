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

// AIzaSyA-kmwi3VlurII3TU50Y7grS5zwvvPcMlQ


/*
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyA-kmwi3VlurII3TU50Y7grS5zwvvPcMlQ' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
*/
