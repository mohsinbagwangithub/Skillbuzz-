import { authModalState } from '@/atoms/authModalAtom';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSetRecoilState } from 'recoil';

const Navbar = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen: true}));
    }
    return (
        <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
            <Link href="/f" className="flex items-center justify-center h-20">
                <Image
                    src="/skillbuzz-logo.png"
                    alt="logo"
                    // className="h-full"
                    height={100}
                    width={200}
                />
            </Link>
            <div className="flex items-center">
                <button 
                    className="bg-gray-800 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                    hover:text-white hover:bg-gray-500 hover:border-2 hover:border-gray-300 border-2 border-transparent
                    transition duration-300 ease-in-out"
                    onClick={handleClick}
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Navbar


// done