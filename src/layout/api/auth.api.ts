import axiosClient from "../../api/axiosClient"
import type { LoginRequest, RegisterRequest } from "../models/auth.model"

export async function Login(request: LoginRequest){
    const {data} = await axiosClient.post("/auth/login", request)
    return data
}

export async function Register(request: RegisterRequest){
    const {data} = await axiosClient.post("/register", request)
    return data;
}