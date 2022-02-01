// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  where,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCANKrut9VEYA6j9Erq9KEtCgekuNM8Cbs",
  authDomain: "movieapp-903cc.firebaseapp.com",
  projectId: "movieapp-903cc",
  storageBucket: "movieapp-903cc.appspot.com",
  messagingSenderId: "658249651052",
  appId: "1:658249651052:web:b2e8e233e3e95753025949",
  measurementId: "G-C4KJBS2XJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();

const UserColl = collection(db, "Users");
// const SessionColl = collection(db, "Participants");

export async function addUser(name) {
  const data = {
    username: name,
  };
  await addDoc(UserColl, data);
}

export async function checkIfUserExists(user) {
  const q = query(UserColl, where("username", "==", user));
  const a = await getDocs(q);
  return a.size != 0;
}

export async function addSession(name, sessionID, nmbMovies) {
  const data = {
    [name]: {},
  };
  const movies = {
    amount: nmbMovies,
  };
  await setDoc(doc(db, "Participants", sessionID), data);
  await setDoc(doc(db, "Movies", sessionID), movies);
}

export async function addParticipant(username, sessionID) {
  const data = {
    [username]: {},
  };
  await setDoc(doc(db, "Participants", sessionID), data, { merge: true });
}

export async function getNmbOfMovies(sessionID, handleResponse) {
  const a = doc(db, "Movies", sessionID);

  let movies;
  await getDoc(a).then((doc) => {
    movies = doc.data();
  });
  await handleResponse(movies);
}

export async function updateRatings(username, ratings, sessionID) {
  const data = {
    [username]: ratings,
  };
  await setDoc(doc(db, "Participants", sessionID), data, { merge: true });
}

export async function getRatings(sessionID, handleResponse) {
  const a = doc(db, "Participants", sessionID);
  let ratings;
  await getDoc(a).then((doc) => {
    ratings = doc.data();
  });
  await handleResponse(ratings);
}

// export async function checkIfUserExists() {
//   const docRef = doc(db, "Users", "");
//   const a = await getDoc();
//   console.log(a);
//   a.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }
