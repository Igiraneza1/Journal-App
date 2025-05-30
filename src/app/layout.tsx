import "./globals.css";
import { Providers } from "../app/provider";
import Link from "next/link";

export const metadata = {
  title: "My Firebase App",
  description: "Next.js + Firebase example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link href="/" className="text-xl font-bold hover:underline">
          Personal Journal
        </Link>
        <div>
          <Link
            href="/signin"
            className="px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

        <Providers>{children}</Providers>
        <footer className="fixed bottom-0 text-center left-0 w-full mb-3 text-sm text-gray-500">
          &copy; 2025 Personal Journal App
        </footer>

      </body>
    </html>
  );
}
