import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ChevronDown } from 'lucide-react-native';
type FilterItemProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};
const FilterItem = ({ label, active, onPress }: FilterItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.filterBtn, active && styles.filterBtnActive]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={active ? styles.filterBtnTextActive : styles.filterBtnText}>
        {label}
      </Text>

      <ChevronDown size={20} color={active ? '#000' : '#FFF'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 8,
  },
  filterBtnTextActive: {
    color: '#000',
    fontWeight: '600',
    marginRight: 5,
  },
  filterBtnText: {
    color: '#FFF',
    marginRight: 5,
  },

  filterBtnActive: {
    backgroundColor: '#FFD900',
  },
});

export default FilterItem;
