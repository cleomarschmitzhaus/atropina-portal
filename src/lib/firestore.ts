import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Post, UserProfile } from '@/types';

// ===== POSTS =====

export async function getPublishedPosts(maxPosts = 20): Promise<Post[]> {
  const q = query(
    collection(db, 'posts'),
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc'),
    limit(maxPosts)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, 'posts'),
    where('slug', '==', slug),
    where('status', '==', 'published'),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as Post;
}

export async function getUserPosts(authorUid: string): Promise<Post[]> {
  const q = query(
    collection(db, 'posts'),
    where('authorUid', '==', authorUid),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = Timestamp.now();
  return addDoc(collection(db, 'posts'), {
    ...post,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updatePost(postId: string, data: Partial<Post>) {
  const ref = doc(db, 'posts', postId);
  return updateDoc(ref, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// ===== USERS =====

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as UserProfile;
}

export async function getAllMembers(): Promise<UserProfile[]> {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((doc) => doc.data() as UserProfile);
}
