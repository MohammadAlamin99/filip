
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Bell,
  Search,
  SlidersHorizontal,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import FilterItem from '../../components/FilterItem';
import { JobCard } from '../../components/fulltime/JobCard';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchFullTimeJobs } from '../../services/jobs';


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

const FulltimeScreen = () => {
  const navigation = useNavigation<any>();
  const [filters, setFilters] = useState<Filter[]>(INITIAL_FILTERS);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchFullTimeJobs,
  });

  const onFilterPress = useCallback((id: string) => {
    setFilters(prev =>
      prev.map(item => ({
        ...item,
        active: item.id === id,
      })),
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
    [onFilterPress],
  );

  const renderJobItem: ListRenderItem<any> = useCallback(
    ({ item }) => <JobCard job={item} />,
    [],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 40 }}>
          Loading jobs...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full-Time roles</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('notification')}
        >
          <Bell width={24} height={24} color="white" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Search (static) */}
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

      {/* Filters (STATIC for now) */}
      <FlatList
        data={filters}
        horizontal
        renderItem={renderFilterItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      />

      {/* Job List */}
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={renderJobItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      />
    </SafeAreaView>
  );
};

export default FulltimeScreen;
