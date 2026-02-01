import { getAuth } from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  serverTimestamp,
  runTransaction,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
} from '@react-native-firebase/firestore';

// Compute priority based on end date & visibility
const computePriority = (
  visibility: {
    priority: 'active' | 'consumed' | 'withdrawn' | 'expired';
  },
  schedule: { start: string; end: string },
) => {
  const now = new Date();
  if (!schedule?.end) return 'active';
  const end = new Date(schedule.end);

  if (visibility?.priority === 'consumed') return 'consumed';
  if (visibility?.priority === 'withdrawn') return 'withdrawn';
  if (now > end) return 'expired';

  return 'active';
};

// fetch my jobs
export const fetchMyJobs = async () => {
  const user = getAuth().currentUser;
  if (!user) return [];
  const db = getFirestore();
  const q = query(
    collection(db, 'jobs'),
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: { data: () => any; id: string }) => {
    const data = doc.data();
    const priority = computePriority(
      data.visibility ?? {},
      data.schedule ?? { start: '', end: '' },
    );
    return {
      id: doc.id,
      title: data.title,
      schedule: data.schedule ?? { start: '', end: '' },
      status: priority,
      type: data.type,
      createdAt:
        data.createdAt && typeof data.createdAt.toDate === 'function'
          ? data.createdAt.toDate()
          : null,
      icon: 'cup',
    };
  });
};

// create jobs

export const createJob = async ({
  title,
  type = 'seasonal',
  description = 'No description provided.',
  bannerImage = '',
  schedule = { start: '', end: '' },
  location = [] as string[],
  rate = { amount: 0, unit: 'hour' },
  requiredSkills = [] as string[],
  positions = { total: 5, filled: 0 },
  visibility = { priority: 'active' },
  contact = { phone: '', email: '' },
  daysPerWeek = 0,
}: {
  title: string;
  type?: 'seasonal' | 'fulltime';
  description?: string;
  bannerImage?: string;
  schedule?: { start: string; end: string };
  location?: string[];
  rate?: { amount: number; unit: string };
  requiredSkills?: string[];
  positions?: { total: number; filled: number };
  visibility?: {
    priority: 'active' | 'consumed' | 'withdrawn' | 'expired';
    creditUsed?: number;
    consumed?: number;
    withdrawn?: number;
  };
  contact?: { phone: string; email: string };
  daysPerWeek?: number;
}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);
  const jobRef = doc(collection(db, 'jobs'));

  const priority = computePriority(visibility, schedule);

  await runTransaction(db, async transaction => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists()) throw new Error('User profile not found');

    const userData = userSnap.data();
    if (!userData) throw new Error('User data undefined');

    const membershipTier: 'free' | 'basic' | 'premium' =
      userData?.membership?.tier || 'free';
    const membershipExpiry = userData?.membership?.expiresAt?.toDate?.();
    const credits = userData?.credits?.balance ?? 0;

    // Check if membership expired
    const now = new Date();
    if (
      membershipTier !== 'free' &&
      membershipExpiry &&
      now > membershipExpiry
    ) {
      throw new Error('Your premium membership has expired.');
    }

    // Free & Basic tier: check credits
    if (membershipTier !== 'premium' && credits < 1) {
      throw new Error('Not enough credits to post a job');
    }

    // Deduct credit if free/basic tier
    if (membershipTier !== 'premium') {
      transaction.update(userRef, {
        'credits.balance': credits - 1,
        'membership.freePostsUsed':
          (userData?.membership?.freePostsUsed || 0) + 1,
      });
    }
    const jobPost: any = {
      userId: user.uid,
      title: title,
      type,
      description,
      bannerImage,
      location,
      rate,
      requiredSkills,
      positions,
      visibility: {
        ...visibility,
        priority,
        creditUsed: membershipTier === 'premium' ? 0 : 1,
      },
      applicationsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (type === 'seasonal') jobPost.schedule = schedule;
    if (type === 'fulltime') {
      jobPost.contact = contact;
      jobPost.daysPerWeek = daysPerWeek;
    }

    // Create the job
    transaction.set(jobRef, jobPost);
  });
};

// Fetch recommended jobs
// export const fetchRecommendedJobs = async () => {
//   const q = query(
//     collection(getFirestore(), 'jobs'),
//     orderBy('createdAt', 'desc'),
//   );
//   const snapshot = await getDocs(q);
//   const mappedData = snapshot.docs.map(
//     (doc: { data: () => any; id: string }) => {
//       const job = doc.data();
//       console.log(job);
//       return {
//         id: doc.id,
//         name: job.userName ?? 'Anonymous',
//         role: job.title,
//         rate: job.rate ? `€${job.rate.amount}` : '',
//         location: Array.isArray(job.location)
//           ? job.location.join(', ')
//           : 'Unknown location',
//         badge: job.type === 'seasonal' ? 'Seasonal' : 'Full Time',
//         availability: job.schedule?.end ? 'Scheduled' : job.type,
//         subAvailability: job.schedule?.end ? 'Flexible' : undefined,
//         tags: job.requiredSkills ?? [],
//         image:
//           job.bannerImage && job.bannerImage !== ''
//             ? job.bannerImage
//             : 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
//       };
//     },
//   );

//   return mappedData;
// };

export const fetchRecommendedJobs = async () => {
  const db = getFirestore();
  const jobsCol = collection(db, 'jobs');
  const q = query(jobsCol, orderBy('createdAt', 'desc'));
  const jobSnapshots = await getDocs(q);

  const jobsWithUserInfo = await Promise.all(
    jobSnapshots.docs.map(async (jobDoc: { data: () => any; id: any }) => {
      const jobData = jobDoc.data();
      const userRef = doc(db, 'users', jobData.userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;
      return {
        id: jobDoc.id,
        ...jobData,
        user: userData
          ? {
            id: userSnap.id,
            name: userData.profile.name,
            email: userData.email,
            membership: userData.membership,
            verified: userData.verified,
          }
          : null,
      };
    }),
  );

  return jobsWithUserInfo;
};
