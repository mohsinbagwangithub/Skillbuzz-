import Topbar from "@/components/Topbar/Topbar";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Image from "next/image";

type UserData = {
  createdAt: number;
  dislikedProblems: string[];
  likedProblems: [];
  displayName: string;
  email: string;
  solvedProblems: string[];
  starredProblems: string[];
  uid: string;
  updatedAt: number;
};

type Props = {};

export default function ProfilePage({}: Props) {
  const [user] = useAuthState(auth);

  const firestore = getFirestore(); // Get Firestore instance

  const userDocRef = doc(firestore, `users/${user?.uid}`); // Reference to the user document
  const [userData, loading, error] = useDocument(userDocRef);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userDataObject = userData?.data() as UserData;

  return (
    <main className="bg-gray-800 min-h-screen">
      <Topbar />
      <div className="flex justify-center items-center h-full">
        <div className="w-1/2 h-full p-8 bg-slate-300 rounded-lg mt-4 mr-4 pt-4">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-xl font-bold">
                {userDataObject.displayName}
              </div>
              <div className="text-gray-500">{userDataObject.email}</div>
            </div>
          </div>

          {/* render job recommendation here */}

          {/* <div className="mb-4">
            <div className="text-lg font-bold mb-2">Starred Problems:</div>
            <div>{userDataObject.starredProblems.join(', ')}</div>
          </div>
          <div className="mb-4">
            <div className="text-lg font-bold mb-2">Disliked Problems:</div>
            <div>{userDataObject.dislikedProblems.join(', ')}</div>
          </div>
          <div>
            <div className="text-lg font-bold mb-2">Solved Problems:</div>
            <ul>
              {userDataObject.solvedProblems.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </div> */}

          <iframe
            src="http://localhost:8501/"
            width="100%"
            height="400"
            title="Embedded Website"
            className="w-full h-[700px] p-8 bg-slate-300 rounded-lg mr-4 pt-4"
          ></iframe>
        </div>

        {/* right side */}
        <div className="w-1/3  bg-slate-300 mt-4 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          {/* Add your right side content here */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Liked Problems:</h3>
            <div>{userDataObject.likedProblems.join(", ")}</div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Disliked Problems:</h3>
            <div>{userDataObject.dislikedProblems.join(", ")}</div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Starred Problems:</h3>
            <div>{userDataObject.starredProblems.join(", ")}</div>
          </div>

          <a href="https://job-board-hadi-co.vercel.app" target="_blank">
            <button className="bg-gray-800 mt-10 w-full py-1.5 px-3 cursor-pointer rounded text-white hover:bg-gray-900">
              Job Board
            </button>
          </a>

          <iframe
            src="http://localhost:8502/"
            width="100%"
            height="100"
            title="Embedded Website"
            className="w-full h-[400px] p-8 bg-slate-300 rounded-lg mr-4 pt-4"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
