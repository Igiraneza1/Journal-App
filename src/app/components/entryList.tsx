"use client";

type Entry = {
  id: string;
  content: string;
  date: string;
};

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: EntryListProps) {
  if (entries.length === 0) {
    return <p className="text-gray-600">No entries yet. Start journaling!</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
        >
          <p className="text-gray-800 whitespace-pre-line">{entry.content}</p>
          <p className="text-sm text-gray-500 mt-2">{entry.date}</p>
          <button
            onClick={() => onDelete(entry.id)}
            className="mt-2 text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
