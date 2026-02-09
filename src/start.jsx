import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

const createSession = async (tableId) => {
  const now = Timestamp.now();
  const expires = Timestamp.fromMillis(
    now.toMillis() + 30 * 60 * 1000
  );

  const docRef = await addDoc(collection(db, "qr_sessions"), {
    tableId,
    createdAt: now,
    expiresAt: expires,
    active: true
  });

  sessionStorage.setItem("sessionId", docRef.id);
};
