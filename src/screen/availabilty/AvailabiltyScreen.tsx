import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import Worker from '../../@types/Worker.type';
import WorkerCard from '../../components/WorkerCard';
import { useNavigation } from '@react-navigation/native';

import AvailabilityHeader from '../../components/findjob/AvailabilityHeader';
import AvailabilityFilters from '../../components/findjob/AvailabilityFilters';
import PremiumBanner from '../../components/findjob/PremiumBanner';

const AvailabilityScreen = () => {
  const navigation = useNavigation<any>();

  const workers: Worker[] = [
    {
      id: '1',
      name: 'Alex',
      role: 'Server',
      rating: 4.9,
      reviews: 1501,
      price: '25',
      distance: '3.1',
      isVerified: true,
      isAvailable: true,
      bio: 'Experienced Fine Dining Server With 5+ Years In High-Volume Environments. Quick Learner And...',
      tags: ['Wine Knowledge', 'Pos System'],
      image: 'https://i.pravatar.cc/150?u=alex',
    },
    {
      id: '2',
      name: 'Mike T',
      role: 'Dishwasher',
      rating: 4.9,
      reviews: 1501,
      price: '35',
      distance: '4.1',
      isAvailable: true,
      bio: 'Hard Working And Reliable. Available For Late Shifts And Weekends. Fast In The Kitchen And Organized...',
      tags: ['Heavy Lifting', 'Sanitation'],
      image: 'https://i.pravatar.cc/150?u=mike',
    },
    {
      id: '3',
      name: 'Elena R',
      role: 'Bartender',
      rating: 4.9,
      reviews: 1501,
      price: '25',
      distance: '3.1',
      isAvailable: false,
      bio: 'Hard Working And Reliable. Available For Late Shifts And Weekends. Fast In The Kitchen And Organized...',
      tags: ['Heavy Lifting', 'Sanitation'],
      image: 'https://i.pravatar.cc/150?u=elena',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AvailabilityHeader />
      <FlatList
        data={workers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <WorkerCard
            worker={item}
            onPress={() => navigation.navigate('sendoffer')}
          />
        )}
        ListHeaderComponent={
          <>
            <AvailabilityFilters
              onSeasonal={() => navigation.navigate('Seasonal')}
            />
          </>
        }
        ListFooterComponent={
          <PremiumBanner onPress={() => navigation.navigate('sendoffer')} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
    </SafeAreaView>
  );
};

export default AvailabilityScreen;
