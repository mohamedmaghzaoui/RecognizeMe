# Smart Attendance System

A system that replaces **EduSign** by using a **camera-based check-in** for students, integrated with **a web app, a mobile app, and IoT (ESP32)**.

---

## 🚀 Features

✅ **Face verification** (DeepFace) instead of manual sign-in  
✅ **Web Dashboard** (React + Django) for managing attendance  
✅ **Mobile App** (React Native + Expo) for students & teachers  
✅ **ESP32 IoT Integration** to trigger camera and upload photos  

---

## 📂 Project Structure

/Design/        - UI/UX designs, wireframes, Figma files  
/Docs/          - Documentation (API docs, setup guides, architecture diagrams)  
/Iot/           - ESP32 firmware, camera module code  
/MobileApp/     - React Native (Expo) app for students & teachers  
/PythonScripts/ - Utility scripts (DeepFace processing, data migration, automation)  
/WebApp/        - React web dashboard (Vite)  
/README.md      - Project overview and setup instructions  

## 🌐 Start web app
cd WebApp
npm install
npm run dev
✅ Open in browser: http://localhost:5173/


## 📱 Start mobile app

cd MobileApp
npm install
npx expo start --tunnel
✅ Scan the QR Code with Expo Go on your phone

## 📡 IoT Setup (ESP32)
1️⃣ Flash the ESP32 firmware
2️⃣ Configure the camera module
3️⃣ Connect it to the Django API

