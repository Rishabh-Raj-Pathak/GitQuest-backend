import dotenv from "dotenv";
import "dotenv/config";
import User from "../models/user.model.js";

export const getUserProfileandRepos = async (req, res) => {
  // res.send("User routes");
  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = await userRes.json();

    const reposRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await reposRes.json();

    res.status(200).json({ userProfile, repos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    console.log("auth user", user);

    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res.status(404).json({ error: "user is not a member" });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "User already liked" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: date.now(),

    });
    user.likedProfiles.push(userToLike.username);

    // await userToLike.save();
    // await user.save();
    await Promise.all([userToLike.save(), user.save()]);
     
    res.status(200).json({message : "User liked "});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLikes = async (req,res) => {
  try{
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({likedBy: user.likedBy})

  }catch(err){
    res.status(500).json({error: err.message})
  }
}