"use client";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "groupChat"),
      orderBy("time", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message))
      );
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "groupChat"), {
      name: "CET Aspirant",
      text,
      time: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col">
      <header className="p-4 text-center font-semibold border-b border-slate-800">
        CET Rankers Group Chat
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="bg-slate-800 p-3 rounded-xl">
            <div className="text-xs text-blue-400">{m.name}</div>
            {m.text}
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
          className="bg-blue-600 px-5 rounded-xl"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
