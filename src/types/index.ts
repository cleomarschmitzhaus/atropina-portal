import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  role: 'author' | 'admin';
  instrument: string;
  bio: string;
  photoURL?: string;
  createdAt: Timestamp;
}

export interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorUid: string;
  authorName: string;
  coverImageURL?: string;
  status: 'draft' | 'published';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  src: string;
  duration?: number;
  coverUrl?: string;
}

export interface Album {
  id?: string;
  title: string;
  year?: string;
  type?: string;
  coverUrl?: string;
  tracks?: Track[];
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageURL: string;
  status: 'draft' | 'published';
}
