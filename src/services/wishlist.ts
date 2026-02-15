import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/* ---------------- ADD TO WISHLIST ---------------- */
export const addToWishlist = async (jobId: string) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('wishlist')
        .doc(jobId)
        .set({
            jobId,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

    return true;
};

/* ---------------- REMOVE FROM WISHLIST ---------------- */
export const removeFromWishlist = async (jobId: string) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('wishlist')
        .doc(jobId)
        .delete();

    return true;
};

/* ---------------- FETCH WISHLIST IDS ---------------- */
export const fetchWishlistIds = async (): Promise<string[]> => {
    const user = auth().currentUser;
    if (!user) return [];

    const snap = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('wishlist')
        .get();

    return snap.docs.map(doc => doc.id);
};
