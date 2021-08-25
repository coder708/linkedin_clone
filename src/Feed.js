import React,{useState} from 'react'
import Post from './Post';
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import './Feed.css';
import InputOption from './InputOption';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { useEffect } from 'react';
import { db } from './firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';


function Feed() {
    const user=useSelector(selectUser);
    const [input,setInput]=useState("");
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        db.collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>(
            setPosts(snapshot.docs.map(doc=>(
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    },[])

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            name:user.displayName,
            description:user.email,
            message: input,
            photoURL:user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={e=>setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>

                    <div className="feed__inputOption">
                        <InputOption Icon={ImageIcon} title="Photo" color="#7085F9"/>
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write Article" color="#7FC1SE" />

                    </div>

            </div>

        
                {posts.map(({id,data:{name,description,message,photoURL}})=>(
                    <Post 
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoURL={photoURL}
                    />
                    ))}
                  
        </div>
    )
}

export default Feed
