// /pages/api/entries/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Invalid entry ID" });
      }

      await deleteDoc(doc(db, "journalEntries", id));
      res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting entry:", error);
      res.status(500).json({ error: "Failed to delete entry" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
