import './App.css';
import React from 'react';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    // config for project
    apiKey: "AIzaSyBYBTbE4Aks8M91dD2DDnfe2dy0HX0jXFY",
    authDomain: "chat-app-9e60e.firebaseapp.com",
    projectId: "chat-app-9e60e",
    storageBucket: "chat-app-9e60e.appspot.com",
    messagingSenderId: "24605765766",
    appId: "1:24605765766:web:45170a5ae10332c3a1e107",
    measurementId: "G-BQPY6ZNVYR"
})

const auth = firebase.auth(); // authentication
const firestore = firebase.firestore(); // database

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header >
        { user && <SignOut /> }
      </header>
      <section >
        { user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign In</button>
  )
}

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  // now listen to updates in real time by using this query
  const [messages] = useCollectionData(query, {idField : "id"});
  console.log(messages);

  return (
    <>
        <div>
          { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
        </div>
        <div>

        </div>
    </>
  )
}

const ChatMessage = ({ key, message}) => {

  const { text, uid } = message;

  return (
    <p id={uid} >{text}</p>
  )
}

export default App;
