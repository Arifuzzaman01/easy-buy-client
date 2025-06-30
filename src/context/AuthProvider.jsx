import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "./../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,

  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (profileInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profileInfo);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const userInfo = {
    user,
    loading,
    logOut,
    googleLogin,
    singInUser,
    createUser,
    updateUserProfile
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
