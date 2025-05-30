"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">About Personal Journal</h1>
      <p className="mb-4 text-gray-700 text-lg">
        A private space for your thoughts, memories, and reflections.
      </p>

      <div className="space-y-6 text-left text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Write</h2>
          <p>Capture your thoughts, ideas, and memories in a clean interface.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Reflect</h2>
          <p>Review past entries to see how you have grown and changed over time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Private</h2>
          <p>Your entries are private and secure, accessible only to you.</p>
        </section>
      </div>

      <button
        onClick={() => router.push("/login")}  // Navigate to Sign In page
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200"
      >
        Start Journaling
      </button>

      <footer className="mt-12 text-sm text-gray-400">
        &copy; 2025 Personal Journal App
      </footer>
    </main>
  );
}
