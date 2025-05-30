import axios from "axios";
import { useEffect, useState } from "react";

export default function JournalEntries({ uid }: { uid: string }) {
  interface Entry {
    id: string;
    content: string;
    // Add other fields if needed, for example:
    // createdAt?: string;
    // updatedAt?: string;
  }

  const [entries, setEntries] = useState<Entry[]>([]);

  // GET entries
  useEffect(() => {
    axios.get(`/api/entries?uid=${uid}`).then(res => {
      setEntries(res.data);
    });
  }, [uid]);

  // POST entry
  const addEntry = async (content: string) => {
    const res = await axios.post("/api/entries", {
      content,
      uid,
    });
    setEntries([res.data, ...entries]);
  };

  // DELETE entry
  const deleteEntry = async (id: string) => {
    await axios.delete(`/api/entries/${id}`);
    setEntries(entries.filter(e => e.id !== id));
  };

  const [newEntry, setNewEntry] = useState("");

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (newEntry.trim()) {
            addEntry(newEntry);
            setNewEntry("");
          }
        }}
      >
        <input
          type="text"
          value={newEntry}
          onChange={e => setNewEntry(e.target.value)}
          placeholder="Add new entry"
        />
        <button type="submit">Add Entry</button>
      </form>
      {entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.content}</p>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
