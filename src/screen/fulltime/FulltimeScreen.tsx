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
  Search,
  SlidersHorizontal,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterItem from '../../components/FilterItem';
import { styles } from './style';
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
    </SafeAreaView>
  );
};

export default FulltimeScreen;
