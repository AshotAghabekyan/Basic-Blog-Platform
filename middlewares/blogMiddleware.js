import { ObjectId } from "mongodb";
import { db } from "../server.js";


export async function checkBlogOwner(request, response, next) {
    let blogID = request.params.blogId;
    let user = request.user;

    let blogsCollection = db.collection("blogs");
    let targetBlog = await blogsCollection.findOne({_id : new ObjectId(blogID)});
    if (targetBlog.author.email == user.email) {
        return next();
    }

    return response.status(403).json({message : "access denied!"});
}