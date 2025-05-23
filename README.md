# 🎓 Assignment Backend - User Management System with Face Recognition & AI

This is the backend service for a role-based educational platform featuring user registration via email and simulated face recognition. Admins and teachers can post documents (PDFs/Images), while students can access shared content. The system also integrates AI-generated descriptions using Cohere API.

---

## 🚀 Tech Stack

- **Node.js** with **Express.js** (REST API)
- **TypeScript** for static typing
- **MongoDB Atlas** with **Mongoose**
- **JWT** for authentication
- **Nodemailer** for email verification
- **Cohere-AI** for AI-generated text
- **Multer** for file uploads
- **Helmet** & **CORS** for security

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-backend-repo.git
   cd your-backend-repo

   ```

2. **Install dependencies**
   npm install

3. **Configure environment**
   Create a .env file in the root with:

PORT=3000
MONGO_URI=your_mongo_db_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

4. **Run in development**
   npm run dev

5. **Build for production**

   npm run build
   npm start

🔄 User Flow Explanation

1. Registration via Email

> User fills out the registration form.

> A verification code is sent to their email.

> On entering the correct code, the user is registered.

2. Face Recognition Registration (Simulation)

> User uploads an image and clicks register.

> The image name must match during face login.

3. Login

> Via email/password.

> Or via image-based face login (by re-uploading the same image).

4. Roles & Permissions

> > Admin:

> Can post PDFs or images.

> Can delete posts made by Admin/Teacher.

> Can view all posts.

> > Teacher:

> Can view Admin posts.

> Can create posts (PDF/Image).

> > Child:

> Can view posts created by Teachers.

> > Extra Features

> Admin/Teacher can generate descriptions using Cohere AI.

> Users can filter posts by type (image or PDF).

> Logout functionality provided.

📦 Deployment Instructions
⚠️ This project has not been deployed yet. To deploy in future:

> Set up a cloud server (e.g., Render, Heroku, or VPS).

> Configure environment variables in the dashboard.

> Connect GitHub repo and enable build & start commands:

> Build: npm run build

> Start: npm start

👤 Author
Sakriya Khadka
MSc Computer Science

📁 Project Structure (Backend)

├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── server.ts
│ └── config/db.ts
├── dist/ (compiled files)
├── package.json
└── tsconfig.json
