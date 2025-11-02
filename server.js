    import express from "express";
    import dotenv from "dotenv";
    import cors from "cors";
    import bodyParser from "body-parser";

    import userRoutes from "./routes/userRoutes.js";
    import eventRoutes from "./routes/eventRoutes.js";

    dotenv.config();
    const app = express();

    // Middlewares
    app.use(cors({ credentials: true, origin: true }));
    app.use(bodyParser.json());

    // Static files
    app.use(express.static("public"));
    app.use(express.static("images")); // <-- This MUST be here and functional

    // Routes
    app.use("/api/users", userRoutes);
    app.use("/api/events", eventRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running with MOCK DATA on http://localhost:${PORT}`)
    );
    
