## 🛠 Setup

## 🔗 Download

👉 **Download the full source code**:  
[🔻 GitHub Repository](https://github.com/HKukreti4/project_management)

## 🛠️ Tech Stack

| Layer    | Tech Stack                   |
| -------- | ---------------------------- |
| Frontend | React, TypeScript, Vite      |
| Backend  | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose)           |
| Auth     | JWT, bcryptjs                |
| Styling  | Tailwind                     |

---

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed    # seed data
npm run dev     # run development
npm run build   # run build
npm start       # for production
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## Axios base URL setup

Step 1 - Select frontend

Step 2 - Select src/services/api.ts

Step 3 - Now change to url of backend if needed

```
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",   // update to backend url if needed
});

```
## CORS error

### From frontend

Step 1 - Select frontend

Step 2 - Select vite.config.ts

Step 3 - Now change to base url of backend if needed

```ts
server: {
  proxy: {
    '/api': 'http://localhost:5000', // update this to match your backend url
  },
},
```

### From backend

Step 1 - Select backend

Step 2 - Select src/index.ts

Step 3 - Now change to url of frontend if needed

```ts
app.use(
  cors({
    origin: ["http://localhost:5173"], // update to your frontend url
  })
);
```

# Features

User registration & login (JWT)

Create, update, delete Projects

Search Projects by title

Create, update, delete Tasks (linked to Projects)

Filter tasks by status

TypeScript on both backend & frontend

# Known Issues / To-Do

No role-based access (admin/user)

No file uploads

No unit tests yet

Pagination not implemented yet 

Not deployed yet but provide link on deployment in readme file
