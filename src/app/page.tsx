"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-4xl font-bold">Your Personal Journal</h1>
      <p className=" text-lg p-10 text-gray-600">
        A simple space to capture your thoughts, memories, and reflections.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-200"
        >
          Get Started
        </button>

        <button
          onClick={() => router.push("/about")}
          className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-200 transition duration-200"
        >
          Learn More
        </button>
        
      </div>
    </main>
  );
}
