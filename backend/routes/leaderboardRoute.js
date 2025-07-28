const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

const seedInitialUsers = async () => {
  const existing = await Leaderboard.find();
  if (existing.length === 0) {
    const initialUsers = [
      { name: "Aarya", points: 18 },
      { name: "Rites", points: 17 },
      { name: "Nisha", points: 0 },
      { name: "Ayaan", points: 12 },
      { name: "Tanya", points: 10 },
      { name: "Kunal", points: 15 },
      { name: "Meera", points: 20 },
      { name: "Rohan", points: 5 },
      { name: "Sania", points: 8 },
      { name: "Niles", points: 9 },
    ];
    await Leaderboard.insertMany(initialUsers);
    console.log("✅ Initial leaderboard users seeded!");
  } else {
    console.log("ℹ️ Leaderboard already seeded.");
  }
};

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-points", async (req, res) => {
  const { name, points } = req.body;

  if (!name || typeof points !== "number") {
    return res
      .status(400)
      .json({ error: "Name and numeric points are required." });
  }

  try {
    const user = await Leaderboard.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.points += points;
    await user.save();

    res.json({ message: "Points updated successfully.", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  router,
  seedInitialUsers,
};
