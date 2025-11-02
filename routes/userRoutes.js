import express from "express";
// Removed: import User from '../models/User.js';

const router = express.Router();

// Register user (Mock success)
router.post("/register", (req, res) => {
  // Mock a new user being created
  const mockUser = {
    _id: "mock-user-" + Date.now(),
    name: req.body.name || "Mock User",
    email: req.body.email || "mock@example.com",
    role: "volunteer",
    joinedEvents: [],
  };
  res.status(201).json(mockUser);
});

// Get all users (Mock list)
router.get("/", (req, res) => {
  const mockUsers = [
    { _id: "mock-user-1", name: "Alice", email: "alice@mock.com" },
    { _id: "mock-user-2", name: "Bob", email: "bob@mock.com" }
  ];
  res.json(mockUsers);
});

export default router;
