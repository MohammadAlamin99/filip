import React from 'react';
import {View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../components/Header';
import RecommendedSection from '../components/RecommendedSection';
import NewestGigsSection from '../components/NewestGigsSection';
import BottomNavigation from '../components/BottomNavigation';
import {styles} from '../styles/FeedScreenStyles';

const FeedScreen = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Header />
        <RecommendedSection />
        <NewestGigsSection />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default FeedScreen;