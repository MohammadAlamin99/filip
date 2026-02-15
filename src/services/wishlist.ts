import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// wishlist create
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

// delete wishlist
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

// fetchwishlist
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
