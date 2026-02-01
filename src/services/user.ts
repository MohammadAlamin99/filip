import { getAuth } from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';

type UpdateProfilePayload = {
  city: string;
  aboutMe: string;
  skills: string[];
  openToWork: boolean;
  photo?: string | null;
};



// the role of the current user
export const fetchUserRole = async () => {
  const user = getAuth().currentUser;
  if (!user) return null;
  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() ? userSnap.data()?.role ?? null : null;
};

//  user profile
export const fetchCurrentUser = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not logged in');
  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('User data not found');
  return userSnap.data();
};

// update profile
export const updateUserProfile = async (payload: UpdateProfilePayload) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not logged in');

  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);

  await updateDoc(userRef, {
    'profile.city': payload.city,
    'workerProfile.aboutMe': payload.aboutMe,
    'workerProfile.skills': payload.skills,
    'workerProfile.openToWork': payload.openToWork,
    ...(payload.photo && { 'profile.photo': payload.photo }),
    updatedAt: new Date(),
  });
};

// update role
export const updateUserRoles = async (roles: string[]) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not logged in');

  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);

  await updateDoc(userRef, {
    'workerProfile.skills': roles,
    updatedAt: new Date(),
  });
};