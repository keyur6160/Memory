import mongoose from "mongoose";
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
    console.log('Received post:', post);
    const newPost = new PostMessage({ ...post, createdAt: new Date().toISOString() });
    try{
        await newPost.save();
        console.log("Post created successfully");
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updatePost=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
}