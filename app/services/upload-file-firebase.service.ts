import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/firebase";

export const uploadFileFirebase = async (file: File, path: string) => {
    if (!file) return;
    const prefix = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_PREFIX;
    const storageRef = ref(storage, `${prefix}/${path}`);
    const fileRef = await uploadBytes(storageRef, file);
    return getDownloadURL(fileRef.ref);
};
