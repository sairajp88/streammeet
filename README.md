# 🌲 StreamMeet

> Communication. Reimagined.  
> A refined, peer-to-peer collaboration experience built with WebRTC.

<p align="center">
  <a href="https://stream-meet-two.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20App-Visit%20Now-10B981?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://github.com/sairajp88/streammeet">
    <img src="https://img.shields.io/badge/GitHub-Repository-000000?style=for-the-badge&logo=github" />
  </a>
</p>

---

## 🌍 Live Experience

👉 **Launch StreamMeet:**  
https://stream-meet-two.vercel.app/

Open in two browsers or two devices to experience real-time communication.

---

# ✨ Product Overview

StreamMeet is a production-ready WebRTC communication platform built with a modern React + Node.js architecture.

It delivers:

- 🎥 Real-time video & audio calling  
- 💬 Instant chat messaging  
- 📁 File sharing  
- 🌿 Premium Forest Luxe UI system  
- 📱 Fully responsive mobile experience  
- ⚡ Smooth animated page transitions  
- 🚀 Deployed full-stack architecture  

This is not a demo.  
This is a deployable, scalable foundation.

---

# 🧠 Architecture

```
Browser (React + WebRTC)
        ↓
Socket.io Client
        ↓
Node + Express Signaling Server
        ↓
Room-Based Event Broadcasting
        ↓
Peer-to-Peer Media Flow (WebRTC)
```

### Important Notes

- Server handles signaling only  
- Media flows directly between peers  
- No media stored on server  
- STUN-based connectivity  
- Clean disconnect handling  

---

# 🛠 Tech Stack

## Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-black)
![Socket.io](https://img.shields.io/badge/Socket.io-Client-010101?logo=socketdotio)
![WebRTC](https://img.shields.io/badge/WebRTC-Peer--to--Peer-10B981)

## Backend

![Node.js](https://img.shields.io/badge/Node.js-Server-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101?logo=socketdotio)
![CORS](https://img.shields.io/badge/CORS-Configured-orange)

## Deployment

![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-7E3AF2)

---

# 🔥 Core Features

## 🎥 Real-Time Video

- STUN server configuration  
- Offer / Answer signaling flow  
- ICE candidate exchange  
- Media track toggling  
- Clean leave handling (camera stops instantly)  

## 💬 Real-Time Chat

- Room-scoped messaging  
- Instant broadcast via Socket.io  
- Executive-style chat UI  

## 📁 File Sharing

- Base64 transfer  
- Automatic download on receiver  
- Lightweight architecture  

## 🌿 Premium UI System

- Forest Luxe theme  
- Glassmorphism components  
- Ambient radial background  
- Apple-inspired typography  
- Motion transitions  
- Mobile-first responsiveness  

---

# 📱 Mobile Experience

StreamMeet is fully responsive:

- Adaptive control dock  
- Chat panel optimized for small screens  
- Touch-friendly interactions  
- Scalable video layout  

---

# 🚀 Production Deployment

## Backend → Render

- Root Directory: `server`  
- Build Command: `npm install`  
- Start Command: `node server.js`  
- Environment Variable:
  ```
  CLIENT_URL=https://your-vercel-domain.vercel.app
  ```

## Frontend → Vercel

- Root Directory: `client`  
- Build Command: `npm run build`  
- Output Directory: `dist`  
- Environment Variable:
  ```
  VITE_SOCKET_URL=https://your-render-url.onrender.com
  ```

---

# 🧪 Local Development

## Clone Repository

```
git clone https://github.com/sairajp88/streammeet.git
cd streammeet
```

## Backend Setup

```
cd server
npm install
npm run dev
```

Create `/server/.env`:

```
CLIENT_URL=http://localhost:5173
PORT=5000
```

## Frontend Setup

```
cd client
npm install
npm run dev
```

Create `/client/.env`:

```
VITE_SOCKET_URL=http://localhost:5000
```

---

# ⚠️ Production Note

Currently uses public STUN server:

```
stun:stun.l.google.com:19302
```

For enterprise-grade reliability behind strict NAT/firewalls,  
a TURN server would be required.

This implementation focuses on:

- Clean WebRTC architecture  
- Proper signaling design  
- Media lifecycle control  
- Production deployment readiness  
- Strong portfolio value  

---

# 📂 Project Structure

```
streammeet/
│
├── client/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   └── ...
│
├── server/
│   └── server.js
│
└── README.md
```

---

# 🎯 Why This Project Stands Out

This project demonstrates:

- Real-time system architecture  
- WebRTC implementation from scratch  
- Socket-based signaling design  
- Clean React hook engineering  
- Media stream lifecycle management  
- Production deployment workflow  
- Modern UI/UX design principles  

It reflects engineering clarity — not tutorial copying.

---

# 👤 Author

**Sairaj Patil**

GitHub: https://github.com/sairajp88  
Live App: https://stream-meet-two.vercel.app/

---
<img width="1896" height="969" alt="Screenshot 2026-02-12 001645" src="https://github.com/user-attachments/assets/29034e1b-7970-4d87-bcc6-3410b900c86a" />

<img width="979" height="546" alt="Screenshot 2026-02-12 001704" src="https://github.com/user-attachments/assets/8400ef21-6d6f-49d4-9210-59e6818f16ae" />


# 🌲 StreamMeet

Minimal. Secure. Beautiful.  
Built with precision.
