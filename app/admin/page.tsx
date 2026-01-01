"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

type UserRow = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 ADMIN CHECK
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        window.location.href = "/chat";
        return;
      }
      setUser(u);
          if (u.email !== "adv8750940073@gmail.com") {
      alert("Access denied");
      window.location.href = "/chat";
    }

    });
    return () => unsub();
  }, []);

  // 📋 LOAD USERS
  useEffect(() => {
    const loadUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list: UserRow[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...d.data() });
      });
      setUsers(list);
      setLoading(false);
    };
    loadUsers();
  }, []);

  // 🔄 UPDATE ROLE / STATUS
  const updateUser = async (
    uid: string,
    data: Partial<UserRow>
  ) => {
    await updateDoc(doc(db, "users", uid), data);
    setUsers((prev) =>
      prev.map((u) => (u.id === uid ? { ...u, ...data } : u))
    );
  };

  if (loading) {
    return <div className="p-6">Loading admin panel...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-800 text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800">
                <td className="p-2 border">
                  {u.name || "-"}
                </td>
                <td className="p-2 border">
                  {u.email || "-"}
                </td>
                <td className="p-2 border">
                  {u.role || "user"}
                </td>
                <td className="p-2 border">
                  {u.status || "active"}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() =>
                      updateUser(u.id, { role: "admin" })
                    }
                    className="text-blue-400"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() =>
                      updateUser(u.id, { status: "muted" })
                    }
                    className="text-yellow-400"
                  >
                    Mute
                  </button>
                  <button
                    onClick={() =>
                      updateUser(u.id, { status: "banned" })
                    }
                    className="text-red-400"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
