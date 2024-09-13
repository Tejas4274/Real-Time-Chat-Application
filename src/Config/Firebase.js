import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBagyXEn8vSxw-ucyNFo5-hqol-s0s3yMk",
  authDomain: "chat-application-tk.firebaseapp.com",
  projectId: "chat-application-tk",
  storageBucket: "chat-application-tk.appspot.com",
  messagingSenderId: "489476906143",
  appId: "1:489476906143:web:29161b8adb51ec465256aa",
  measurementId: "G-ZWVBBEJ163",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey I am Using Chat App",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
  }catch (error) {
    console.log(error);
    const errorMessage = error?.code 
      ? error.code.split("/")[1].split("-").join(" ")
      : "An unexpected error occurred";
    toast.error(errorMessage);
  }
    
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const resetPass = async (email) => {
  if (!email) {
    toast.error("Enter Your Email");
    return null;
  }

  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDoc(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Email Send");
    } else {
      toast.error("Email Does Not Exists");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export { signup, login, logout, auth, db, resetPass };
