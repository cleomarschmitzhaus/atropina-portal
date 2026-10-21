import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function getImageUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

export async function listGalleryImages(): Promise<string[]> {
  const listRef = ref(storage, 'gallery');
  const result = await listAll(listRef);
  const urls = await Promise.all(
    result.items.map((item) => getDownloadURL(item))
  );
  return urls;
}
