import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageItem from '../../components/message/MessageItem';
import styles from './style';
import { ChevronLeft, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { MessageData } from '../../@types/MessageData.type';

// Sample data
const DATA: MessageData[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Event Manager',
    status: 'Offer Pending',
    statusColor: '#3a351c',
    statusTextColor: '#fff',
    message: 'Can You Arrive 15 Mins Early To See...',
    time: '2m Ago',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'The Grand Hotel',
    role: 'Server Gig',
    status: 'Hired',
    statusColor: '#eff7cf',
    statusTextColor: '#86b33e',
    message: 'Shift Confirmed For Saturday, Please...',
    time: '1h Ago',
    image:
      'https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '3',
    name: 'Mark (Head Chef)',
    role: 'Line Cook Manager',
    status: 'Completed',
    statusColor: '#383119',
    statusTextColor: '#fff',
    message: 'Great Work Last Night, Sent The Payme...',
    time: '2m Ago',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '4',
    name: 'Boutique Bistro',
    role: 'Bartendin....',
    status: 'Inquiry',
    statusColor: '#DDD6FE',
    statusTextColor: '#1F2937',
    message: 'Are You Available For Bartendin....',
    time: 'Yesterday',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '5',
    name: 'Apex Jonsson',
    role: '',
    status: 'Canceled',
    statusColor: '#9CA3AF',
    statusTextColor: '#fff',
    message: 'Sorry, I Found Another Gig.',
    time: 'Oct 27',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: '6',
    name: 'Apex Jonsson',
    role: '',
    status: 'Canceled',
    statusColor: '#9CA3AF',
    statusTextColor: '#fff',
    message: 'Sorry, I Found Another Gig.',
    time: 'Oct 27',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: '7',
    name: 'Apex Jonsson',
    role: '',
    status: 'Canceled',
    statusColor: '#9CA3AF',
    statusTextColor: '#fff',
    message: 'Sorry, I Found Another Gig.',
    time: 'Oct 27',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
];

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
        />
      </View>

      {/* Message list */}
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageItem key={item.id} item={item} />}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
