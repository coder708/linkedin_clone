import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import {login, selectUser} from "./features/userSlice"
import {logout} from "./features/userSlice"
import {useSelector} from "react-redux";
import Login from './Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import Widgets from './Widgets'

function App() {
  const user=useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(userAuth=>{

      if (userAuth){
        dispatch(login({
          email:userAuth.email,
          uid:userAuth.uid,
          displayName:userAuth.displayName,
          photoURL:userAuth.photoURL,
        }))
      }

      else{
        dispatch(logout());
      }


    })
  },[])

  return (
    <div className="App">

     {/* {header} */}
      <Header />
      {!user ? (
        <Login />
      ):(
          <div className="app_body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
      )}
     
    </div>
  );
}

export default App;
