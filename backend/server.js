const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  router: leaderboardRoute,
  seedInitialUsers,
} = require("./routes/leaderboardRoute");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://leaderboard-frontend-eta-five.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");

app.use("/api/users", userRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/leaderboard", leaderboardRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    await seedInitialUsers();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
