import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/BottomNavigationStyles';

const BottomNavigation = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('feed');
  const insets = useSafeAreaInsets();

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);
  };

  return (
    <View
      style={[
        styles.wrapper,
        {paddingBottom: Platform.OS === 'ios' ? insets.bottom + 16 : 16},
      ]}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('feed')}
          activeOpacity={0.7}>
          <Icon
            name={activeTab === 'feed' ? 'home' : 'home-outline'}
            size={22}
            color={activeTab === 'feed' ? '#FFD700' : '#999'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'feed' && styles.activeLabel,
            ]}>
            Feed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('notifications')}
          activeOpacity={0.7}>
          <Icon
            name={
              activeTab === 'notifications'
                ? 'notifications'
                : 'notifications-outline'
            }
            size={22}
            color={activeTab === 'notifications' ? '#FFD700' : '#999'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('search')}
          activeOpacity={0.7}>
          <Icon
            name="briefcase-outline"
            size={22}
            color={activeTab === 'search' ? '#FFD700' : '#999'}
          />
          <Icon
            name="search-outline"
            size={14}
            color={activeTab === 'search' ? '#FFD700' : '#999'}
            style={styles.searchOverlay}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('profile')}
          activeOpacity={0.7}>
          <Icon
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={22}
            color={activeTab === 'profile' ? '#FFD700' : '#999'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigation;