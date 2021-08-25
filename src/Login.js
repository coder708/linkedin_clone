import React from 'react'
import { auth } from './firebase';
import './Login.css'
import { useState } from 'react';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [profilePic,setProfile]=useState("");
    // const dispatch = useDispatch();
     const dispatch = useDispatch();

    const register=()=>{
        if(!name){
            return alert("Please Enter Full Name");
        }
        auth.createUserWithEmailAndPassword(email,password)
        .then((userAuth)=>{
            userAuth.user.updateProfile({
                displayName:name,
                photoURL: profilePic,
            })
            .then(()=>{
                 dispatch(login({
                     email:userAuth.user.email,
                     uid:userAuth.user.uid,
                     displayName:name,
                     photoURL:profilePic,
                    }));
            });
        }).catch((error)=>alert(error));
    };

    const logintoApp=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(userAuth=>{
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profilePic:userAuth.user.photoURL,
            }))
        }).catch((error)=>alert(error));

    };
    return (
        <div className="login">
            <img src="https://th.bing.com/th/id/OIP.ET7dA_ENIRNBE7R0WZ04pwHaFH?pid=ImgDet&rs=1" alt="" />
        
        <form>
            <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="Full name (required)" required />
            <input value={profilePic} onChange={e=>setProfile(e.target.value)} type="text" placeholder="Profile pic url (optional)"  />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email (required)" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password name (required)" required />
            <button onClick={logintoApp} type="submit">SignIn</button>
        </form>
        <p>Not a member?{" "}
            <span className="login__register" onClick={register}> Register Now</span>
        </p>
        </div>
    )
}

export default Login
