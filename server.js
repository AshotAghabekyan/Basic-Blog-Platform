import express from "express";
import { connectToDB } from "./database.js";
import blogRouter from "./routes/blogs.js";
import userRouter from "./routes/users.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
export const db = await connectToDB();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/blogs", blogRouter);
app.use("/auth", userRouter);


app.get("/", async function(request, response) {
    response.redirect("/blogs");
})

app.use(function(request, response) {
    response.status(404).json({message : "Wooops, the page not found"});
})

app.listen(3000, function() {
    console.log("server running...")
})

