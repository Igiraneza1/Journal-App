"use client";

import { auth } from "../../lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EntryForm from "../components/entryForm";
import EntryList from "../components/entryList";

type Entry = {
  id: string;
  content: string;
  date: string;
};

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch user's journal entries
  const fetchEntries = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/entries?uid=${user.uid}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  // Add entry to Firebase
  const addEntry = async (content: string) => {
    if (!user) return;
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          uid: user.uid,
        }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setShowForm(false);
      }
    } catch (err) {
      console.error("Failed to add entry:", err);
    }
  };

  // Delete entry from Firebase
  const deleteEntry = async (id: string) => {
    try {
      const res = await fetch(`/api/entries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEntries(entries.filter((entry) => entry.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Journal</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-4 hover:bg-gray-500"
      >
        {showForm ? "Cancel" : "New Journal Entry"}
      </button>

      {showForm && <EntryForm user={user} onAdd={addEntry} />}
      <EntryList entries={entries} onDelete={deleteEntry} />
    </main>
  );
}
