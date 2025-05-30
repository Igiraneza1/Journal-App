"use client";

import { auth } from "../../lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EntryForm from "../components/entryForm";
import EntryList from "../components/entryList";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  type Entry = { id: string; content: string; date: string };
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const addEntry = (content: string) => {
    const newEntry = {
      id: Date.now().toString(),
      content,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  if (!user) return <p>Loading...</p>;

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
