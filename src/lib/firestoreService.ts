// src/lib/firestoreService.ts
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {app} from "./firebaseConfig";

const db = getFirestore(app);

export const addUserToFirestore = (userData: { name: string; email: string }) => {
  return addDoc(collection(db, "users"), userData);
};
