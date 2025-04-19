import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { toast } from "react-toastify";

const Login = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type: "login" | "register" | "forgotPassowrd") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const [inputs, setInputs] = useState({ email: "", password: "" });

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password) return alert("Please fill all fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser) return;
            router.push("/");
        } catch(error: any) {
            toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "light" });
        }
    }
    // console.log(user, "user");

    useEffect(() => {
        if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "light" });
    }, [error])

    return (
        <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
            <h3 className="text-xl font-medium text-gray-900">Sign in to Skill Buzz</h3>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-white">
                    Your Email
                </label>
                <input
                    onChange={handleInputChange}
                    type="email" name='email' id='email' className="border-2 outline-none sm:text-sm rounded-lg focus:right-blue focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white" placeholder='youremail@gmail.com' />
            </div>
            <div>
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-white">
                    Your Password
                </label>
                <input
                    onChange={handleInputChange}
                    type="password" name='password' id='password' className="border-2 outline-none sm:text-sm rounded-lg focus:right-blue focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white" placeholder='**********' />
            </div>

            <button type='submit' className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800 hover:bg-gray-900">
                {loading ? "Loading..." : "Log in"}
            </button>
            <button className="flex w-full justify-end" onClick={() => handleClick("forgotPassowrd")}>
                <a href='#' className="text-sm block text-white border:underline w-full text-right" >
                    Forgot Password
                </a>
            </button>
            <div className="text-sm font-medium text-gray-300" >
                Not Registered? {" "}
                <a href='#' className="text-blue-600 border:underline" onClick={() => handleClick("register")}>
                    Create Account Now!
                </a>
            </div>
        </form>
    )
}

export default Login
