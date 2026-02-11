import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const uploadProfilePhoto = async (localUri: string) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const ref = storage().ref(`users/${user.uid}/profile.jpg`);

    await ref.putFile(localUri);

    const downloadURL = await ref.getDownloadURL();
    return downloadURL;
};


// upload banner seasonal job

export const uploadJobBanner = async (localUri: string) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const fileName = `job_banner_${user.uid}_${Date.now()}.jpg`;
    const ref = storage().ref(`jobBanners/${fileName}`);

    await ref.putFile(localUri);

    const downloadURL = await ref.getDownloadURL();
    return downloadURL;
};
