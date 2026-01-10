import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/SearchBarStyles';

const SearchBar = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={handleSearch}
        activeOpacity={0.7}>
        <Icon name="search-outline" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#969595"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export default SearchBar;