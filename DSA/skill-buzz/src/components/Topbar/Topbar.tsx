import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
    problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    const handleProblemChange = (isForward: boolean) => {
        // console.log(router.query) 
        // console.log(problems[router.query.pid]);

        const { order } = problems[router.query.pid as string] as Problem;
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = order + direction; // 1 + 1 = 2 , 2 - 1 = 1
        const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
        // console.log(nextProblemKey)

        if (isForward && !nextProblemKey) {
            const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
            router.push(`/problems/${firstProblemKey}`);
        } else if (!isForward && !nextProblemKey) {
            const lastProblemKey = Object.keys(problems).find(
                (key) => problems[key].order === Object.keys(problems).length
            );
            router.push(`/problems/${lastProblemKey}`);
        } else {
            router.push(`/problems/${nextProblemKey}`);
        }
    };

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-400 text-dark-gray-7'>
            <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
                <Link href='/' className='h-[22px] flex-1'>
                    <Image src='/skillbuzz-logo.png' alt='Logo' height={100} width={100} />
                </Link>

                {problemPage && (
                    <div className='flex items-center gap-4 flex-1 justify-center'>
                        <div
                            className='flex items-center justify-center rounded bg-gray-900 hover:bg-gray-600 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(false)}
                        >
                            <FaChevronLeft />
                        </div>
                        <Link
                            href='/'
                            className='flex items-center gap-2 font-medium max-w-[170px] text-gray-800 cursor-pointer'
                        >
                            <div>
                                <BsList />
                            </div>
                            <p>Problem List</p>
                        </Link>
                        <div
                            className='flex items-center justify-center rounded bg-gray-900 hover:bg-gray-600 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(true)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                )}

                <div className='flex items-center space-x-4 flex-1 justify-end'>
                    {/* <div>
                        <a
                            href='/'
                            target='_blank'
                            rel='noreferrer'
                            className="bg-gray-800 py-1.5 px-3 cursor-pointer rounded text-white hover:bg-gray-900"
                        >
                            Coming Soon
                        </a>

                    </div> */}

                    <Link 
                        href="/profile"
                        className="bg-gray-800 py-1.5 px-3 cursor-pointer rounded text-white hover:bg-gray-900"
                    >
                        Profile
                    </Link>

                    {!user && (
                        <Link
                            href='/auth'
                            onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
                        >
                            <button className='bg-gray-200 py-1 px-2 cursor-pointer rounded text-gray-900'>Sign In</button>
                        </Link>
                    )}
                    {user && problemPage && <Timer />}
                    {user && (
                        <div className='cursor-pointer group relative'>
                            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                            <div
                                className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-gray-200 p-2 rounded shadow-lg 
                                z-40 group-hover:scale-100 scale-0 
                                transition-all duration-300 ease-in-out'
                            >
                                <p className='text-sm'>{user.email}</p>
                            </div>
                        </div>
                    )}
                    {user && <Logout />}
                </div>
            </div>
        </nav>

    );
};
export default Topbar;