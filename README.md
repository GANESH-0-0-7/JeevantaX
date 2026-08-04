#  Jeevanta – Your Friendly Digital Health Buddy 


> A full-stack AI-powered healthcare app built with  using the MERN stack.

Jeevanta helps users book appointments, manage health records, talk to AI, and even get Telegram reminders for their meds. It’s like having a doctor, pharmacist, therapist, and assistant — all in one tab!

---

##  Tech Stack

-  **Frontend:** React + Tailwind CSS
-  **State Management:** Zustand
-  **Backend:** Express + Node.js
-  **Database:** MongoDB
-  **Authentication:** JWT
-  **File Uploads:** Cloudinary
-  **AI:** Gemini API (symptom analysis + AI therapist)
-  **Bot Integration:** Telegram
-  **Vault:** Pinata IPFS + AES Encryption

---

##  Features

###  Multirole Signup

- Sign up as a ** Doctor** or ** Patient**
- Role-based features and dashboards — no awkward mix-ups!

###  Book Appointments

- Choose doctors **manually** _or_ let AI suggest based on your symptoms 
- View available slots & book in one click
- Doctors can **accept**, **reject**, or **mark appointments complete**

### Upload Files During Booking

- Patients can attach reports, images, and more while booking
- Doctors get immediate context = faster diagnosis
- Stored securely using **Cloudinary**

###  AI Symptom Checker

- Enter your symptoms (e.g., “stomach ache + fatigue”)
- Gemini API suggests a specialization (e.g., Gastroenterologist)
- Perfect for people who Google everything anyway 

### Jeevanta Vault (Blockchain Storage)

- A private encrypted vault to store health documents (lab reports, prescriptions, etc.)
- Files are **encrypted with a password before upload**
- Stored on **Pinata (IPFS)** — blockchain-style storage
- Only decryptable with your own password 

###  Nearby Therapist Finder (Google Maps)

- Instantly locate verified therapists near you using **Google Maps integration**
- View profiles, directions, and contact details — all within the app

###  AI Agentic Telegram Bot

- Creates **personalized healthcare plans** based on your data
- Adaptable to your changing health goals
- Answers **general wellness queries** instantly

---

##  Authentication

- Uses **JWT tokens** for protected routes and login sessions
- Doctors and patients have separate permissions

---

