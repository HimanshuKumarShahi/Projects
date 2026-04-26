```
Cloud_Kitchen/
├── backend/
│   ├── config/             # DB and Cloudinary config
│   ├── middleware/         # Auth & Role checks
│   ├── models/             # Kitchen, User, Menu, Order
│   ├── routes/             # Auth, Order, Menu routes
│   └── server.js           # Entry point with Socket.io
├── frontend/
│   ├── src/
│   │   ├── components/     # KanbanBoard, KanbanCard, Navbar
│   │   ├── context/        # AuthContext, SocketContext
│   │   ├── hooks/          # useSocket
│   │   ├── pages/          # Login, Dashboard, Menu
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── index.css           # Global glassmorphism styles
└── .env
```