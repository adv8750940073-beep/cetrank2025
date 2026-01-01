import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CET Ranker",
  description: "CET Ranker Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body>
        {/* 🔽 Firebase Auth SDK – BODY ke start me */}
        <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>

        {children}
      </body>
    </html>
  );
}
