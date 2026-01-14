import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  BriefcaseBusiness,
  MessageSquareText,
  CircleCheck,
  X,
  Eye,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import WalletIcon from '../../components/svg/WalletIcon';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: '1',
      type: 'shift',
      title: 'New Shift Offer',
      description: 'Barista Shift\nAt The Coffee Club • $25/Hr. Tap To View Details.',
      time: '2h Ago',
      section: 'Today',
      isNew: true,
    },
    {
      id: '2',
      type: 'message',
      title: 'Message From Sarah',
      description: 'Hey, Are You Available To Start An Hour Early Tomorrow? The Manager Was Asking...',
      time: '4h Ago',
      section: 'Today',
    },
    {
      id: '3',
      type: 'confirmation',
      title: 'Offer Accepted',
      description: 'Confirmed! You Are Booked For The Friday Night Shift At Hotel Grand',
      time: '5h Ago',
      section: 'Today',
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Processed',
      description: 'Your Payment Of $150.00 For The Shift At The Burger Joint Has Been Processed.',
      time: '1d Ago',
      section: 'Yesterday',
    },
    {
      id: '5',
      type: 'rejection',
      title: 'Application Declined',
      description: 'Unfortunately, The Position At Seaside Cafe Has Been Filled.',
      time: '3d Ago',
      section: 'Yesterday',
    },
    {
      id: '6',
      type: 'view',
      title: 'Profile View',
      description: '5 Employers Viewed Your Profile This Week. Keep Your Availability Updated!',
      time: 'Oct 27',
      section: 'Earlier',
    },
  ];

  const filteredNotifications = notifications.filter(n => {
    const query = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(query) || n.description.toLowerCase().includes(query);
  });

  const renderIcon = (type: string, isNew: boolean) => {
    if (type === 'shift') {
      return (
        <View style={styles.iconContainer}>
          <BriefcaseBusiness width={28} height={28} color="#2BEE79" />
          {isNew && <View style={styles.newDot} />}
        </View>
      );
    }
    if (type === 'message') {
      return (
        <View style={styles.iconContainer}>
          <MessageSquareText width={28} height={28} color="#60A5FA" />
        </View>
      );
    }
    if (type === 'confirmation') {
      return (
        <View style={styles.iconContainer}>
          <CircleCheck width={28} height={28} color="#525252" fill="#2BEE79" />
        </View>
      );
    }
    if (type === 'payment') {
      return (
        <View style={styles.iconContainer}>
          <WalletIcon width={28} height={28} color="#EAB308" />
        </View>
      );
    }
    if (type === 'rejection') {
      return (
        <View style={styles.iconContainer}>
          <View style={styles.iconContainerRed}>
            <X width={22} height={22} color="#525252" />
          </View>
        </View>
      );
    }
    if (type === 'view') {
      return (
        <View style={styles.iconContainer}>
          <Eye width={28} height={28} color="#956BC3" />
        </View>
      );
    }
    return null;
  };

  const sections = ['Today', 'Yesterday', 'Earlier'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search Notification"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sections.map(section => {
          const sectionItems = filteredNotifications.filter(n => n.section === section);
          if (sectionItems.length === 0) return null;

          return (
            <View key={section}>
              <Text style={styles.sectionTitle}>{section}</Text>
              {sectionItems.map(item => (
                <TouchableOpacity key={item.id} style={styles.notificationCard} activeOpacity={0.7}>
                  {renderIcon(item.type, item.isNew || false)}
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.notificationDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        {filteredNotifications.length === 0 && (
          <Text style={styles.noResults}>No notifications found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;