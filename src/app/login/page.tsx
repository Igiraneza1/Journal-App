"use client";

import { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();

  // Email/password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMsg("Google login failed. Please try again.");
    }
  };

  // Email/password login handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Email login failed:", error);
      if (error instanceof Error) {
        setErrorMsg(error.message || "Email login failed. Please try again.");
      } else {
        setErrorMsg("Email login failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow-sm shadow-black">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
      <p className="text-center mb-6 text-gray-400">Enter your email and password to access your journal</p>

      {errorMsg && (
        <p
          role="alert"
          className="mb-4 text-red-600 font-semibold text-center"
        >
          {errorMsg}
        </p>
      )}

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-500 hover:bg-blue-600 transition text-white p-3 rounded-xl mb-6"
        aria-label="Sign in with Google"
      >
        Sign in with Google
      </button>
      <h1 className="text-center text-2xl font-bold">or</h1>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <label  className="text-gray-400">Email</label>
        <input
          type="email"
          placeholder="your.email@.example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Email address"
        />
        <label className="text-gray-400">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Password"
        />
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-600 transition text-white p-3 rounded"
          aria-label="Login with Email"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
