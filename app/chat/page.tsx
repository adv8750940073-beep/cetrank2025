"use client";

import { limit } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

type Message = {
  id?: string;
  name: string;
  text: string;
  time: any;
};

export default function ChatPage() {
  const ADMIN_EMAIL = "admin@gmail.com";
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState("active");
  const [lastSent, setLastSent] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (u) => {
    if (u) {
      setUser(u);

      await setDoc(
        doc(db, "users", u.uid),
        {
          name: u.displayName,
          email: u.email,
          photo: u.photoURL,
          provider: u.providerData[0]?.providerId,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
    }
  });

  return () => unsub();
}, []);

  useEffect(() => {
    const q = query(
  collection(db, "groupChat"),
  orderBy("time", "desc"),
  limit(100)
);

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Message))
          .reverse()
      );
   });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

const signupWithEmail = async () => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const loginWithEmail = async () => {
  await signInWithEmailAndPassword(auth, email, password);
};

  const deleteMessage = async (id: string) => {
  if (!user) return;

  if (user.email !== ADMIN_EMAIL) {
    alert("You are not admin");
    return;
  }

  await deleteDoc(doc(db, "groupChat", id));
};

  const sendMessage = async () => {
  // 🔒 LOGIN REQUIRED
  if (!user) {
    alert("Please login first (Google / Email)");
    return;
  }

  if (!text.trim()) return;

  await addDoc(collection(db, "groupChat"), {
    name: user.displayName || user.email,
    uid: user.uid,
    text,
    time: serverTimestamp(),
  });

  setText("");
};

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col">
      <header className="p-4 text-center font-semibold border-b border-slate-800">
                CET Rankers Group Chat
                {role === "admin" && (
          <a
            href="/admin"
            className="text-sm text-blue-400 underline"
          >
            Admin Dashboard
          </a>
        )}

      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
            <div key={m.id} className="bg-slate-800 p-3 rounded-xl relative">
              <div className="text-xs text-blue-400">{m.name}</div>
              <div>{m.text}</div>
          
              {/* 🔥 ADMIN DELETE BUTTON */}
              {user?.email === ADMIN_EMAIL && (
                <button
                  onClick={() => deleteMessage(m.id!)}
                  className="absolute top-2 right-2 text-red-400 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

      </main>

      <footer className="p-3 flex gap-2 border-t border-slate-800">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl bg-slate-900 px-4 py-2 outline-none"
          placeholder="Message likho..."
        />
        <button
          onClick={sendMessage}
          disabled={!user}
          className={`px-5 rounded-xl ${
            user ? "bg-blue-600" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Send
        </button>

      </footer>
    </div>
  );
}
