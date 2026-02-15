import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    increment,
    arrayUnion,
    Unsubscribe,
    writeBatch,
} from '@react-native-firebase/firestore';
import { Chat, ChatMessage, JobAttachment } from '../@types/Chat.type';

const app = getApp();
const db = getFirestore(app);

// Helper: Generate chat ID from two user IDs
const getChatId = (userId1: string, userId2: string): string => {
    return [userId1, userId2].sort().join('_');
};

// 1. CREATE OR GET CHAT
export const createOrGetChat = async (
  otherUserId: string,
  jobContext?: JobAttachment,
): Promise<string> => {
  console.log('🔵 [C1] createOrGetChat called');
  console.log('🔵 [C2] otherUserId:', otherUserId);
  console.log('🔵 [C3] jobContext:', JSON.stringify(jobContext, null, 2));

  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log('🔵 [C4] Current user from getAuth:', currentUser?.uid);

  if (!currentUser) throw new Error('Not authenticated');

  if (!otherUserId || otherUserId.trim() === '') {
    throw new Error('Invalid user ID');
  }

  if (currentUser.uid === otherUserId) {
    throw new Error('Cannot create chat with yourself');
  }

  const chatId = getChatId(currentUser.uid, otherUserId);
  console.log('🔵 [C5] Generated chatId:', chatId);

  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);
  console.log('🔵 [C6] Chat exists:', chatSnap.exists());

  if (chatSnap.exists()) {
    console.log('🟢 [C7] Returning existing chat');
    return chatId;
  }

  console.log('🔵 [C8] Creating new chat document...');
  await setDoc(chatRef, {
    participants: [currentUser.uid, otherUserId],
    participantIds: {
      [currentUser.uid]: true,
      [otherUserId]: true,
    },
    lastMessage: '',
    lastMessageAt: serverTimestamp(),
    lastMessageBy: '',
    unreadCount: {
      [currentUser.uid]: 0,
      [otherUserId]: 0,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  console.log('🟢 [C9] Chat document created');

  if (jobContext) {
    console.log('🔵 [C10] Sending job attachment message...');
    await sendMessage(chatId, '', 'job_attachment', { jobAttachment: jobContext });
    console.log('🟢 [C11] Job message sent');
  }

  return chatId;
};

// 2. SEND MESSAGE
export const sendMessage = async (
  chatId: string,
  text: string,
  type: 'text' | 'job_attachment' | 'system' = 'text',
  metadata?: any,
): Promise<void> => {
  console.log('🔵 [M1] sendMessage called');
  console.log('🔵 [M2] chatId:', chatId, 'type:', type);

  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log('🔵 [M3] Current user:', currentUser?.uid);

  if (!currentUser) throw new Error('Not authenticated');

  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);
  console.log('🔵 [M4] Chat exists:', chatSnap.exists());

  if (!chatSnap.exists()) throw new Error('Chat not found');

  const chatData = chatSnap.data();
  if (!chatData) throw new Error('Chat data not found');

  const otherUserId = chatData.participants.find((id: string) => id !== currentUser.uid);
  console.log('🔵 [M4.5] Other user ID:', otherUserId);

  console.log('🔵 [M5] Adding message to subcollection...');
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(messagesRef, {
    senderId: currentUser.uid,
    text,
    type,
    createdAt: serverTimestamp(),
    readBy: [currentUser.uid],
    metadata: metadata || {},
  });
  console.log('🟢 [M6] Message added');

  console.log('🔵 [M7] Updating chat document...');
  await updateDoc(chatRef, {
    lastMessage: type === 'job_attachment' ? 'Sent a job' : text,
    lastMessageAt: serverTimestamp(),
    lastMessageBy: currentUser.uid,
    [`unreadCount.${otherUserId}`]: increment(1),
    updatedAt: serverTimestamp(),
  });
  console.log('🟢 [M8] Chat updated');

  console.log('🔵 [M9] Creating notification...');
  const notifRef = doc(collection(db, 'notifications'));
  await setDoc(notifRef, {
    toUserId: otherUserId,
    fromUserId: currentUser.uid,
    type: 'NEW_MESSAGE',
    title: 'New Message',
    body: type === 'job_attachment' ? 'Sent you a job' : text.substring(0, 50),
    data: { chatId },
    isRead: false,
    createdAt: serverTimestamp(),
  });
  console.log('🟢 [M10] Notification created');
};

// 3. SUBSCRIBE TO MESSAGES
export const subscribeToMessages = (
    chatId: string,
    onMessagesUpdate: (messages: ChatMessage[]) => void,
): Unsubscribe => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    return onSnapshot(q, snapshot => {
        const messages: ChatMessage[] = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
        })) as ChatMessage[];

        onMessagesUpdate(messages);
    });
};

// 4. SUBSCRIBE TO USER'S CHATS
export const subscribeToChats = (
    onChatsUpdate: (chats: Chat[]) => void,
): Unsubscribe => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const chatsRef = collection(db, 'chats');
    const q = query(
        chatsRef,
        where('participants', 'array-contains', currentUser.uid),
        orderBy('lastMessageAt', 'desc'),
    );

    return onSnapshot(q, snapshot => {
        const chats: Chat[] = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
        })) as Chat[];

        onChatsUpdate(chats);
    });
};

// 5. MARK MESSAGES AS READ
export const markAsRead = async (chatId: string): Promise<void> => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const chatRef = doc(db, 'chats', chatId);
    const messagesRef = collection(db, 'chats', chatId, 'messages');

    const q = query(messagesRef, where('senderId', '!=', currentUser.uid));
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);

    snapshot.docs.forEach((msgDoc: any) => {
        const msgRef = doc(db, 'chats', chatId, 'messages', msgDoc.id);
        batch.update(msgRef, {
            readBy: arrayUnion(currentUser.uid),
        });
    });

    // Reset unread count
    batch.update(chatRef, {
        [`unreadCount.${currentUser.uid}`]: 0,
    });

    await batch.commit();
};

// 6. GET OTHER USER INFO
export const getOtherUserInfo = async (chatId: string) => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const chatRef = doc(db, 'chats', chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) throw new Error('Chat not found');

    const chatData = chatSnap.data();
    if (!chatData) throw new Error('Chat data not found');

    const otherUserId = chatData.participants.find((id: string) => id !== currentUser.uid);

    const userRef = doc(db, 'users', otherUserId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    const userData = userSnap.data();
    if (!userData) return null;

    return {
        id: otherUserId,
        name: userData.profile?.name || 'Unknown',
        photo: userData.profile?.photo || null,
    };
};