import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

const COLLECTION = "qr_sessions";
const SESSION_TIME = 30 * 60 * 1000; // 30 dəq

export const createSession = async (tableId) => {
  const docRef = doc(db, COLLECTION, tableId);
  await setDoc(docRef, {
    active: true,
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(new Date(Date.now() + SESSION_TIME)),
    tableId,
  });

  sessionStorage.setItem("sessionId", docRef.id);
  sessionStorage.setItem("tableId", tableId);
  return docRef.id;
};

export const checkSession = async () => {
  const sessionId = sessionStorage.getItem("sessionId");
  const tableId = sessionStorage.getItem("tableId");
  if (!sessionId || !tableId) return false;

  const ref = doc(db, COLLECTION, tableId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  const data = snap.data();
  if (!data.active) return false;

  if (data.expiresAt.toDate() < new Date()) {
    await updateDoc(ref, { active: false });
    return false;
  }

  return true;
};

export const setTableId = async (tableId) => {
  const ref = doc(db, COLLECTION, tableId);
  await updateDoc(ref, { tableId });
};
