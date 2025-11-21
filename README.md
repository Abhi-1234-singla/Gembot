# 💎 GemBot
GemBot is an intelligent AI-powered chatbot built using the **MERN Stack** and **Google Gemini API**, designed to deliver real-time, context-aware conversations through a clean and modern user interface.

---

## 🚀 Features

- 🤖 **AI-Powered Chat** using Google Gemini API  
- ⚛️ **Modern UI** built with React + Tailwind  
- ⚡ **Real-time Responses**  
- 📜 **Conversation History**  
- 🔒 **Secure Backend API** built with Node.js & Express  
- 🗄️ **MongoDB Database** for storing chats (optional)  
- 🌐 **Fully Responsive** design  

---

## 🛠️ Tech Stack

### **Frontend**
- React  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- Google Gemini API  

### **Database**
- MongoDB (Mongoose)

---

## 📁 Folder Structure

```

GemBot/
│
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/             # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
└── README.md

````

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/GemBot.git
cd GemBot
````

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4️⃣ Add Environment Variables

Create a `.env` file inside **server/**:

```
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

---

### 5️⃣ Run Backend Server

```bash
cd server
npm start
```

### 6️⃣ Run Frontend App

```bash
cd client
npm start
```

---

## 🧠 How It Works

1. User sends a message from the React UI
2. Request goes to Express backend
3. Backend sends the prompt to Google Gemini API
4. Gemini responds with a generated answer
5. UI displays the response in real time

---

## 🛡️ Environment Variables

| Variable       | Description                |
| -------------- | -------------------------- |
| GEMINI_API_KEY | Your Google Gemini API Key |
| MONGO_URI      | MongoDB connection string  |
| PORT           | Backend Port               |

---

## 📦 Build For Production

### Frontend Build

```bash
cd client
npm run build
```

### Backend Deployment (Render / Express)

* Upload the `build/` folder or
* Serve static frontend files using Express

---

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve this project.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## ⭐ Support

If you like this project, give it a **star ⭐ on GitHub!**

```

---


