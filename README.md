# Digital Asset & License Management System

## 📌 Overview

The **Digital Asset & License Management System** is a full-stack enterprise-grade application designed to help organizations manage digital assets such as software licenses, SaaS subscriptions, domain names, cloud services, and hardware resources.

The system ensures secure storage, renewal tracking, cost monitoring, vendor management, and role-based access control to prevent license expiry penalties and improve operational efficiency.

---

## 🎯 Use Cases

- IT departments managing company-wide software licenses  
- Startups tracking SaaS subscriptions  
- Enterprises avoiding license expiry penalties  
- Finance teams monitoring renewal budgets  

---

## 🚀 Key Features

### 🔹 Asset Management
- Asset categorization (Software, Domain, Cloud, Hardware)
- Secure encrypted license key storage
- Expiry date tracking
- Renewal history logs
- Soft delete support

### 🔹 Vendor Management
- Vendor CRUD operations
- Vendor-asset linking
- Dedicated vendor dashboard

### 🔹 Renewal & Budget Tracking
- Separate renewal logs per asset
- Cost tracking per renewal
- Monthly & annual cost analytics

### 🔹 File Upload
- Upload and attach contracts/invoices
- Secure storage using Multer
- File validation support

### 🔹 Reports & Analytics
- Dashboard with asset statistics
- Monthly cost charts
- CSV export
- PDF export

### 🔹 Authentication & Security
- JWT Authentication (Access + Refresh Tokens)
- Token rotation with token versioning
- Role-Based Access Control (Admin / Manager / Viewer)
- Encrypted sensitive data storage
- Rate limiting middleware
- Global error handling
- API validation using Zod

---

## 🏗 Architecture

### Backend (Node.js + Express + TypeScript)
- Clean separation of controllers, services, models, middleware
- Service-based business logic
- Centralized error middleware
- Cron-based expiry reminder service
- Indexed database fields for performance

### Frontend (React + TypeScript + Vite)
- RTK Query for API handling
- Automatic refresh token handling
- React Hook Form + Zod validation
- Protected & role-based routes
- Global Error Boundary
- Reusable UI components
- Search & pagination
- Toast notifications

---

## 🗂 Project Structure

### Backend
```
controllers/
services/
models/
routes/
middleware/
utils/
validations/
```

### Frontend
```
components/
layouts/
pages/
router/
services/
store/
utils/
```

---

## 🔐 Role-Based Permissions

| Role     | Create | Delete | Renew | View |
|----------|--------|--------|-------|------|
| Admin    | ✔      | ✔      | ✔     | ✔    |
| Manager  | ✔      | ✖      | ✔     | ✔    |
| Viewer   | ✖      | ✖      | ✖     | ✔    |

---

## ⚙️ Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT
- Multer
- Zod
- json2csv
- pdfkit
- node-cron

### Frontend
- React (Vite)
- TypeScript
- Redux Toolkit
- RTK Query
- React Hook Form
- Zod
- Tailwind CSS
- React Router v7

---

## 🔧 Installation & Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=
MONGO_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRES=
REFRESH_TOKEN_EXPIRES=
ENCRYPTION_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Production Best Practices Implemented

- No use of `any`
- Proper indexing in database
- No mixed controller-service responsibilities
- No duplicated validation logic
- No inline styling
- Centralized API interceptor
- Rate limiting applied
- Refresh token implementation
- Clean folder structure
- Strict TypeScript typing

---

## 📈 Project Highlights

- Enterprise-ready architecture
- Secure authentication with refresh token flow
- Full RBAC implementation
- Automated expiry reminders
- Exportable reports
- Clean and scalable codebase

---

## 🔗 GitHub Repository

https://github.com/kkartikey75way-blip/Digital-Asset-Management

---

## 👤 Author

**Kartikeya Srivastava**  
Full-Stack Developer  
Email: kartikeyasrivastava3182@gmail.com  
Phone: 6388256003  

---

## 📌 Conclusion

This project demonstrates strong full-stack development skills, secure authentication practices, clean architecture implementation, and production-level coding standards suitable for enterprise applications.

