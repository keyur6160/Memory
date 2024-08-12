import PostMessage from "../models/postMessage.js";

export const getPosts=async(req,res)=>{
    try{
        const postMessages=await PostMessage.find();
        res.status(200).json(postMessages);
        console.log("Posts fetched successfully");
    }catch(error){
        res.status(404).josn({message:error.message});
    }
}

export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post);
    try{
        await newPost.save();
        console.log("Post created successfully");
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}