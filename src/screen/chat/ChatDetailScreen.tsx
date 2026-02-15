import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical, Send } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './chatDetailStyle';
import ChatMessageItem from '../../components/message/ChatMessageItem';
import {
  subscribeToMessages,
  sendMessage,
  markAsRead,
  getOtherUserInfo,
} from '../../services/chat';
import { ChatMessage } from '../../@types/Chat.type';
import { getAuth } from '@react-native-firebase/auth';

const ChatDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { chatId } = route.params;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    getOtherUserInfo(chatId).then(user => {
      setOtherUser(user);
      setLoading(false);
    });

    const unsubscribe = subscribeToMessages(chatId, msgs => {
      setMessages(msgs);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    markAsRead(chatId);

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(chatId, message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

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
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Image
            source={{
              uri: otherUser?.photo || 'https://via.placeholder.com/50',
            }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>{otherUser?.name || 'User'}</Text>
            {/* <Text style={styles.headerStatus}>Online</Text> */}
          </View>
        </View>
        <TouchableOpacity>
          <MoreVertical color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const currentUserId = getAuth().currentUser?.uid || '';
          return (
            <ChatMessageItem
              message={{
                id: item.id,
                text: item.text,
                time:
                  item.createdAt?.toDate().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  }) || '',
                sender:
                  item.senderId === currentUserId
                    ? 'Me'
                    : otherUser?.name || 'User',
                isMe: item.senderId === currentUserId,
                avatar:
                  item.senderId === currentUserId
                    ? undefined
                    : otherUser?.photo,
                type: item.type,
                metadata: item.metadata,
              }}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#666"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send width={14} height={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
