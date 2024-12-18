import express from "express";
import db from "./Config/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import Mainroute from "./routes/mainRoutes.js";

configDotenv();
const app = express();

async function startServer() {
  try {
    const result = await db.raw(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("Database connected successfully...");
    console.log("Tables in the database:", result.rows);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
}

startServer();

// Middlewares
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Car Rental API .... !");
});

app.use("/v0/api", Mainroute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at port Number ${PORT}`);
});
