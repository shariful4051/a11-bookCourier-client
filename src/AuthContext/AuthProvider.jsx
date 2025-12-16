import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState('')
    const [loding,setLoding] =useState(true)
    //create-user
    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //---------signIn
    const loginUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    //------googleLogin
    const googleUser = ()=>{
        return signInWithPopup(auth,googleProvider)
    }

    //-------signOut------
    const logOutUser = ()=>{
        return signOut(auth)
    }

    // --------profile update
    const updateUser = (updatedData)=>{
        return updateProfile(auth.currentUser,{updatedData})
    }

    //-----get current user----
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoding(false)
        })
        return ()=>{unsubscribe()}
    },[])


    const authInfo={
        createUser,
        loginUser,
        googleUser,
        logOutUser,
        updateUser,
        user,
        setUser,
        loding,
        setLoding
    }
    return (
        <div>
            <AuthContext value={authInfo}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;