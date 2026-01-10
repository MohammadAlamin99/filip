import React from 'react';
import {View, Text, FlatList} from 'react-native';
import GigCard from './GigCard';
import {styles} from '../styles/NewestGigsSectionStyles';
import {newestGigs} from '../data/dummyData';
import type {NewestGig} from '../data/dummyData';

const NewestGigsSection = (): React.JSX.Element => {
  const renderItem = ({item}: {item: NewestGig}) => <GigCard gig={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Newest Gigs</Text>
      </View>

      <FlatList
        data={newestGigs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default NewestGigsSection;