import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from "react-icons/fi"

const Logout = () => {
    const [signOut, setsignOut] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
    }
  return (
    <button className="bg-gray-300 py-1.5 px-3 rounded text-gray-900" onClick={handleLogout}>
        <FiLogOut />
    </button>
  )
}

export default Logout
