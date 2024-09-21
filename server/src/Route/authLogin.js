import express from "express"
import { loginUser, registerUser,logoutUser } from "../Controller/authLogin.js"

const auth_route = express()
auth_route.use(express.json())

// register new user route
auth_route.post("/register-user", registerUser)

// uers login route
auth_route.post("/login-user", loginUser)

// user log Out route 
auth_route.post("logout-user", logoutUser)

export { auth_route }

