import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseConfig"; // adjust if your path is different
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid or missing ID" });
    }

    try {
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
