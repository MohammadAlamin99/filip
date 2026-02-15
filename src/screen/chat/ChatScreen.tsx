import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageItem from '../../components/message/MessageItem';
import styles from './style';
import { ChevronLeft, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import { subscribeToChats, getOtherUserInfo } from '../../services/chat';
import { ChatWithUser } from '../../@types/Chat.type';
import { timeAgo } from '../../helper/timeAgo';

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToChats(async fetchedChats => {
      const chatsWithUsers = await Promise.all(
        fetchedChats.map(async chat => {
          const otherUser = await getOtherUserInfo(chat.id);
          return {
            ...chat,
            otherUser: otherUser || { id: '', name: 'Unknown', photo: '' },
          };
        }),
      );
      setChats(chatsWithUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFD900" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
        />
      </View>

      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const currentUserId = getAuth().currentUser?.uid || '';
          const unreadCount = item.unreadCount[currentUserId] || 0;

          return (
            <MessageItem
              key={item.id}
              chatId={item.id}
              otherUserId={item.otherUser.id}
              item={{
                id: item.id,
                name: item.otherUser.name,
                role: '',
                status: unreadCount > 0 ? 'Inquiry' : 'Completed',
                statusColor: unreadCount > 0 ? '#DDD6FE' : '#383119',
                statusTextColor: unreadCount > 0 ? '#1F2937' : '#fff',
                message: item.lastMessage,
                time: timeAgo(item.lastMessageAt),
                image: item.otherUser.photo || 'https://via.placeholder.com/50',
              }}
            />
          );
        }}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
