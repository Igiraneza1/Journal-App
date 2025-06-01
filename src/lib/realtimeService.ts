import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "../lib/firebaseConfig"; // Adjust the import path as necessary

const db = getDatabase(app);

export const writeUserData = (userId: string, name: string, email: string) => {
  return set(ref(db, 'users/' + userId), { username: name, email });
};

export const readUserData = async (userId: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users/${userId}`));
  return snapshot.exists() ? snapshot.val() : null;
};
