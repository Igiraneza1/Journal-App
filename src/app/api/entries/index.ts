// /pages/api/entries/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { uid } = req.query;

      const q = uid
        ? query(collection(db, "journalEntries"), where("uid", "==", uid), orderBy("date", "desc"))
        : query(collection(db, "journalEntries"), orderBy("date", "desc"));

      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(entries);
    } catch (error) {
        console.error("Error fetching entries:", error);
      res.status(500).json({ error: "Failed to fetch entries" });
    }
  } else if (req.method === "POST") {
    try {
      const { content, uid } = req.body;

      if (!content || !uid) {
        return res.status(400).json({ error: "Missing content or uid" });
      }

      const newEntry = {
        content,
        uid,
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "journalEntries"), newEntry);
      res.status(201).json({ id: docRef.id, ...newEntry });
    } catch (error) {
        console.error("Error adding entry:", error);
      res.status(500).json({ error: "Failed to add entry" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
