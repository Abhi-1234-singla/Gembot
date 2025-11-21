import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ChatProvider } from './context/chatContext.jsx'

const fallbackServer = 'http://localhost:5000'
export const server = import.meta.env.VITE_BACKEND_URL?.trim() || fallbackServer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
      <App />
      </ChatProvider>
    </UserProvider>
  </StrictMode>,
)
