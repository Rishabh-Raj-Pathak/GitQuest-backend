import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import 'dotenv/config'
import { Cookie } from "express-session";


// require(dotenv).config()
const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get("/check",(req,res)=>{
  if(req.isAuthenticated()){
    res.send({user:req.user})
  }else{
    res.send({user:null})
  }
})


router.get("/logout",(req,res) => {
  // res.clearCookie("jwt")
  req.session.destroy((err) => {
    res.json({message : "Logged Out"});
  });
  
});

export default router;
