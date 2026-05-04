cloud_kitchen_backend/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── paymentGateway.js   # NEW: Razorpay or Stripe config
│   │
│   ├── core/
│   │   ├── globalErrorHandler.js 
│   │   ├── AppError.js
│   │   ├── catchAsync.js
│   │   └── socket.js           # 🔥 NEW: WebSocket configuration for real-time data
│   │
│   ├── features/               
│   │   │
│   │   ├── users/              # Auth, Profiles, Roles
│   │   │   └── ... (model, controller, routes)
│   │   │
│   │   ├── kitchens/           # Kitchen Details & 📍 GEO-LOCATION (Maps)
│   │   │   ├── kitchen.model.js # Uses GeoJSON for map coordinates
│   │   │   ├── kitchen.controller.js # "Find kitchens near me" logic
│   │   │   └── kitchen.routes.js
│   │   │
│   │   ├── menus/              # Food Items & Cloudinary Images
│   │   │   └── ... (model, controller, routes, upload middleware)
│   │   │
│   │   ├── orders/             # Cart to Checkout 
│   │   │   └── ... (model, controller, routes)
│   │   │
│   │   ├── payments/           # 🔥 NEW: Money Handling & Webhooks
│   │   │   ├── payment.model.js
│   │   │   ├── payment.controller.js # Creates order ID & verifies webhooks
│   │   │   └── payment.routes.js
│   │   │
│   │   ├── notifications/      # 🔥 NEW: Order Updates
│   │   │   ├── notification.model.js # Stores history of alerts
│   │   │   ├── notification.controller.js
│   │   │   └── notification.routes.js
│   │   │
│   │   └── deliveries/         # 🔥 NEW: Live Map Tracking & Riders
│   │       ├── delivery.model.js
│   │       ├── delivery.controller.js # Updates live coordinates
│   │       └── delivery.routes.js
│   │
│   ├── app.js                  
│   └── server.js               
│
├── .env                        # Added RAZORPAY_KEY, STRIPE_SECRET, etc.
├── .gitignore
└── package.json