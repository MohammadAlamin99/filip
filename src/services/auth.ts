import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  city: string;
  acceptedTerms: boolean;
}

export const signUpUser = async (data: SignUpData) => {
  const { fullName, email, password, city, acceptedTerms } = data;

  if (!fullName || !email || !password || !city) {
    throw new Error('Please fill in all required fields.');
  }

  if (!acceptedTerms) {
    throw new Error('You must accept the terms and conditions.');
  }

  const auth = getAuth();
  const firestore = getFirestore();

  // Create auth user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  // Firestore user document
  await setDoc(doc(firestore, 'users', user.uid), {
    email,
    roles: ['worker'],
    profile: {
      name: fullName,
      photo: null,
      city,
      skills: [],
    },

    workerProfile: {
      aboutMe: '',
      baseCity: city,
      skills: [],
      status: 'open',
    },

    employerProfile: null,

    membership: {
      tier: 'free',
      freePostsUsed: 0,
      postLimit: 10,
    },

    credits: {
      balance: 0,
      lifetimeEarned: 0,
      used: 0,
    },

    terms: {
      accepted: true,
      acceptedAt: serverTimestamp(),
    },

    verified: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};
