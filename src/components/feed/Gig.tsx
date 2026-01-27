// import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// import React from 'react';
// import styles from '../../screen/feed/style';
// import FeedCard from './FeedCard';
// const Gig = () => {
//   const RECOMMENDED_DATA = [
//     {
//       id: '1',
//       name: 'Micheal J.',
//       role: 'Event Server',
//       rate: '€25',
//       location: 'SoHo, New York • 0.5 Mil',
//       badge: 'Starts In 2 Hours',
//       availability: 'Today, 6:00 PM - 2:00 AM',
//       tags: ['Weddings', 'Vip Service'],
//       image:
//         'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
//     },
//     {
//       id: '2',
//       name: 'Sarah J.',
//       role: 'Bartender Assistance',
//       rate: '€35',
//       location: 'Zinc Lounge • 5 Mil',
//       badge: 'Seasonal',
//       availability: 'Nov 15 - Jan 05',
//       subAvailability: 'Flexible Weekends',
//       tags: ['Inventory', 'Mixology Basic'],
//       image:
//         'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800',
//     },
//   ];
//   return (
//     <View>
//       <View style={styles.headerRow}>
//         <Text style={styles.sectionTitle}>Recommended For You</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAllText}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={RECOMMENDED_DATA}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <FeedCard item={item} />}
//         showsVerticalScrollIndicator={false}
//       />

//       <Text style={styles.sectionTitle}>Newest Availabilities</Text>
//     </View>
//   );
// };

// export default Gig;


import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../screen/feed/style';
import FeedCard from './FeedCard';

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from '@react-native-firebase/firestore';

const Gig = () => {
  const [recommendedData, setRecommendedData] = useState<any[]>([]);

  // 🔹 FETCH JOBS FOR "RECOMMENDED FOR YOU"
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const q = query(
          collection(getFirestore(), 'jobs'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );

        const snapshot = await getDocs(q);

        const mappedData = snapshot.docs.map((doc: { data: () => any; id: any; }) => {
          const job = doc.data();

          return {
            id: doc.id,
            name: job.userName ?? 'Anonymous',
            role: job.title,
            rate: job.rate
              ? `€${job.rate.amount}`
              : '',
            location: Array.isArray(job.location)
              ? job.location.join(', ')
              : 'Unknown location',
            badge: job.type === 'seasonal'
              ? 'Seasonal'
              : 'Starts Soon',
            availability: job.schedule?.end
              ? 'Scheduled'
              : job.type,
            subAvailability: job.schedule?.end
              ? 'Flexible'
              : undefined,
            tags: job.requiredSkills ?? [],
            image:
              job.bannerImage && job.bannerImage !== ''
                ? job.bannerImage
                : 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
          };
        });

        setRecommendedData(mappedData);
      } catch (error) {
        console.log('Error fetching recommended jobs:', error);
      }
    };

    fetchRecommendedJobs();
  }, []);

  return (
    <View>
      {/* HEADER – UNCHANGED */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* LIST – SAME UI */}
      <FlatList
        data={recommendedData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Newest Availabilities</Text>
    </View>
  );
};

export default Gig;
