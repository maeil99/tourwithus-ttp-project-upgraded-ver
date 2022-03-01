import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { IFirebaseConfigProps } from "../shared/interface/firebaseConfig.interface";

const firebaseConfig: IFirebaseConfigProps = {
  apiKey: "AIzaSyB8nrZYfnweOrjGlB_uwi_ffdMHUel7oHo",
  authDomain: "tourwithus-1832b.firebaseapp.com",
  projectId: "tourwithus-1832b",
  storageBucket: "tourwithus-1832b.appspot.com",
  messagingSenderId: "260925102001",
  appId: "1:260925102001:web:b5d453b8f09c1b93194f90",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, timestamp };
