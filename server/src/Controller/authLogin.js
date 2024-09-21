import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
// const SK = process.env.SECRET_KEY
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const registerUser = async (req, res) => {
    try {
        const { password, ...otherData } = req.body; // Extract password from request body
        const saltRounds = 10; // Define the salt rounds for bcrypt

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add the hashed password back into the data
        const Data = {
            ...otherData,
            password: hashedPassword, // Use hashed password
        };

        // Create user with the hashed password
        const createuser = await prisma.userM.create({
            data: Data,
        });

        // Send success response
        res.status(200).send({ msg: "User added successfully", createuser });
    } catch (error) {
        // Handle errors
        res.status(500).send({ msg: "User registration failed", error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).send({ msg: "Please enter all credentials" });
    }

    try {
        // Fetch user by email
        const userLogin = await prisma.userM.findUnique({
            where: {
                email: email
            }
        });
        console.log(userLogin)

        // Check if user exists
        if (!userLogin) {
            return res.status(404).send({ msg: "User not found" });
        }

        if (userLogin) {
            // Compare entered password with hashed password from database
            const isPasswordMatch = await bcrypt.compare(password, userLogin.password);
            console.log(userLogin.password, password, isPasswordMatch)
            if (isPasswordMatch) {
                // If password matches, send success response

                let token = jwt.sign({ id: userLogin.id }, process.env.SECRET_KEY)
                console.log("token", token)
                const addtoken = await prisma.userM.update({
                    where: {
                        email: email
                    },
                    data: {
                        token: token
                    }
                })

                return res.status(200).send({ msg: "Login successful", token });
            }
            else {

                return res.status(400).send({ msg: "Invalid credentials" });
            }
        }
    }
    catch (error) {
        // Handle errors
        res.status(500).send({ msg: "User login failed", error });
    }
}

const logoutUser = async (req, res) => {
    const uid = req.body
    const logout = await prisma.userM.update({
        where: {
            id: id
        },
        data: {
            token: null
        }
    })
}

export { registerUser, loginUser, logoutUser }