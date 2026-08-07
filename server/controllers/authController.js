const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                message: "User already exists."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            message: "Registration Successful",

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        const token = jwt.sign(

            {
                id:user._id,
name:user.name
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.getProfile = async (req,res)=>{

    try{

        const user=await User
        .findById(req.user.id)
        .select("-password");

        res.json(user);

    }

    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};
exports.updateProfile = async(req,res)=>{

    try{

        const{

            name,
            college,
            branch,
            year,
            phone,
            bio,
            profileImage

        }=req.body;

        const user=await User.findById(req.user.id);

        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }

        if (name) user.name = name;
if (college) user.college = college;
if (branch) user.branch = branch;
if (year) user.year = year;
if (phone) user.phone = phone;
if (bio) user.bio = bio;
if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.json(user);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};