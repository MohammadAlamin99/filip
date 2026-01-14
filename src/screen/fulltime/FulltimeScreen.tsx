import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {
  Bell,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterItem from '../../components/FilterItem';
import { styles } from './style';
import { JobCard } from '../../components/fulltime/JobCard';
type Filter = {
  id: string;
  label: string;
  active: boolean;
};

const INITIAL_FILTERS: Filter[] = [
  { id: '1', label: 'All Jobs', active: true },
  { id: '2', label: 'Kitchen', active: false },
  { id: '3', label: 'Front House', active: false },
  { id: '4', label: '$50k+', active: false },
  { id: '5', label: 'Immediate Starts', active: false },
];
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Head Chef',
    company: 'The Golden Fork Bistro',
    location: 'San Francisco, CA',
    salary: '€85k - €95k/yr',
    type: 'Full-Time',
    image: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',
  },
  {
    id: '2',
    title: 'Hotel Concierge',
    company: 'Grand Plaza Hotel',
    location: 'Austin, TX',
    salary: '€45k - €55k/yr',
    type: 'Full-Time',
    image: 'https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg',
  },
  {
    id: '3',
    title: 'Bar Manager',
    company: 'The Night Owl',
    location: 'New York, NY',
    salary: '€45k - €55k/yr',
    type: 'Full-Time',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
  },
  {
    id: '4',
    title: 'Bar Manager',
    company: 'The Night Owl',
    location: 'New York, NY',
    salary: '€45k - €55k/yr',
    type: 'Full-Time',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
  },
  {
    id: '5',
    title: 'Bar Manager',
    company: 'The Night Owl',
    location: 'New York, NY',
    salary: '€45k - €55k/yr',
    type: 'Full-Time',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
  },
];

const FulltimeScreen = () => {
  const [filters, setFilters] = useState<Filter[]>(INITIAL_FILTERS);
  const onFilterPress = useCallback((id: string) => {
    setFilters((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );
  }, []);
  const renderFilterItem: ListRenderItem<Filter> = useCallback(
    ({ item }) => (
      <FilterItem
        label={item.label}
        active={item.active}
        onPress={() => onFilterPress(item.id)}
      />
    ),
    [onFilterPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full-Time roles</Text>
        <View>
          <Bell width={24} height={24} color="white" />
          <View style={styles.notifDot} />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainerWrapper}>
        <View style={styles.searchContainer}>
          <Search width={24} height={24} color="white" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.filterBtnIcon}>
          <SlidersHorizontal width={24} height={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <FlatList
        data={filters}
        horizontal
        renderItem={renderFilterItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
        <View style={styles.listHeader}>
        <Text style={styles.countText}>24 Available Candidate</Text>
        <TouchableOpacity style={styles.sortRow}>
          <Text style={styles.sortText}>Sort by</Text>
          <ChevronDown size={14} color="#FFD700" />
        </TouchableOpacity>
      </View>
      {/* job apply list */}
      <FlatList
        data={MOCK_JOBS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard 
            job={item} 
            onApply={() => console.log(`Applying for ${item.title}`)}
          />
        )}
      />
    </SafeAreaView>
    
  );
};

export default FulltimeScreen;
