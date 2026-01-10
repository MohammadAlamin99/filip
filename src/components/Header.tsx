import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';
import {styles} from '../styles/HeaderStyles';
import {userData} from '../data/dummyData';

const Header = (): React.JSX.Element => {
  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.greetingContainer}>
          <Image source={userData.avatar} style={styles.avatar} />
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>{userData.greeting}</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
          activeOpacity={0.7}>
          <View style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationDot} />
          </View>
        </TouchableOpacity>
      </View>

      <SearchBar />
    </View>
  );
};

export default Header;