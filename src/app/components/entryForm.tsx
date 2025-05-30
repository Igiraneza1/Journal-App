"use client";

import React, { useState } from "react";
import { User } from "firebase/auth";
import { db } from "../../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface EntryFormProps {
  user: User;
}

export default function EntryForm({ user }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "journalEntries"), {
        userId: user.uid,
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setTitle("");
      setContent("");
      router.refresh();
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSave} className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>

      <label className="mb-2 font-semibold text-gray-500">Title</label>
      <input
        type="text"
        placeholder="Give your entry a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        required
      />

      <label className="mb-2 font-semibold text-gray-500">Content</label>
      <textarea
        placeholder="Write your thoughts here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 h-40"
        required
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </div>
    </form>
  );
}
