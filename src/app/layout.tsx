import "./globals.css";
import { Providers } from "../app/provider";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
