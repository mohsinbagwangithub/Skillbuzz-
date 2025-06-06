import { authModalState } from '@/atoms/authModalAtom';
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: "login" }));
    };

    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
    const router = useRouter();

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all the fields");
        try {
            toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;

            // Add a document
            const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};
            await setDoc(doc(firestore, "users", newUser.user.uid), userData);

            router.push('/');

        } catch (error: any) {
            toast.error(error.message, {position:"top-center"})
        }finally{
            toast.dismiss("loadingToast")
        }
    };

    useEffect(() => {
        if (error) alert(error.message);
    }, [error])

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
            <h3 className="text-xl font-medium text-gray-900">Register to Skill Buzz</h3>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-white">
                    Email
                </label>
                <input
                    onChange={handleChangeInput}
                    type="email"
                    name='email'
                    id='email'
                    className="border-2 outline-none sm:text-sm rounded-lg focus:right-blue focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                    placeholder='youremail@gmail.com' />
            </div>
            <div>
                <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-white">
                    Display Name
                </label>
                <input
                    onChange={handleChangeInput}
                    type="displayName"
                    name='displayName'
                    id='displayName'
                    className="border-2 outline-none sm:text-sm rounded-lg focus:right-blue focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                    placeholder='Cristiano Ronaldo' />
            </div>
            <div>
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-white">
                    Password
                </label>
                <input
                    onChange={handleChangeInput}
                    type="password"
                    name='password'
                    id='password'
                    className="border-2 outline-none sm:text-sm rounded-lg focus:right-blue focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white" placeholder='**********' />
            </div>

            <button
                type='submit'
                className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800 hover:bg-gray-900">
                {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-sm font-medium text-gray-300" >
                Already have an account? {" "}
                <a href='#' className="text-blue-700 border:underline" onClick={handleClick}
                >
                    Log in
                </a>
            </div>
        </form>
    )
}

export default Signup
