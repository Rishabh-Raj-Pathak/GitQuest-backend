import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path"
import "./passport/github.auth.js"

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
// import authRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;
const __dirname = path.resolve();

app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`server started on local host:${PORT}`);
  connectMongoDB();
});
