"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const sendNotification = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("/api/send-notification", { method: "POST" });
      const data = await res.json();
      setStatus(JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setStatus("Error sending notification");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hello World Dashboard (App Router)</h1>
      <p>This is public, no login required.</p>
      <button onClick={sendNotification}>Send Notification</button>
      <p>Status: {status}</p>
    </div>
  );
}
