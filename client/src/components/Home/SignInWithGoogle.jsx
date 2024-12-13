import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";

import { setDoc, doc } from "firebase/firestore";



const SignInWithGoogle = () => {

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
          console.log(result);
          const user = result.user;
          if (result.user) {
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              firstName: user.displayName,
              photo: user.photoURL,
              lastName: "",
            });
            
            window.location.href = "/profile";
          }
        });
      }



  return (
    <div>
        <button
              className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-red-600 text-white hover:bg-red-500 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" 
              onClick={googleLogin}
            >
              Sign in with Google
            </button>
    </div>
  )
}

export default SignInWithGoogle