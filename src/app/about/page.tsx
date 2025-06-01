"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className=" m-30 text-center">
      <h1 className="text-4xl font-bold mb-6">About Personal Journal</h1>
      <p className="mb-4 text-gray-700 text-lg">
        A private space for your thoughts, memories, and reflections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 p-10 gap-10 text-left text-gray-600">
        <section className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pen-line w-8 h-8 mx-auto mb-2 text-gray-600"
          >
            <path d="M12 20h9"></path>
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
          </svg>
          <h2 className="text-2xl text-gray-800 font-semibold mb-2">Write</h2>
          <p className="text-md ">
            Capture your thoughts, ideas, and memories in a clean interface.
          </p>
        </section>

        <section className="text-center">
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-book-open w-8 h-8 mx-auto mb-2 text-gray-600"
>
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
</svg>
          
          <h2 className="text-2xl text-gray-800 font-semibold mb-2">Reflect</h2>
          <p className="text-md">
            Review past entries to see how you have grown and changed over time.
          </p>
        </section>

        <section className="text-center">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-lock-keyhole w-8 h-8 mx-auto mb-2 text-gray-600"
>
  {/* Lock body */}
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
  
  {/* Lock top/shackle */}
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  
  {/* Keyhole (private/secure symbol) */}
  <circle cx="12" cy="16" r="1" />
  <path d="M12 16v2" />
</svg>
          <h2 className="text-2xl text-gray-800 font-semibold mb-2">Private</h2>
          <p className="text-md">
            Your entries are private and secure, accessible only to you.
          </p>
        </section>
      </div>

      <button
        onClick={() => router.push("/login")}
        className="mt-8 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-500 transition duration-200"
      >
        Start Journaling
      </button>
    </main>
  );
}
