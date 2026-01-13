import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/login/LoginScreen';
import SplashScreen from '../screen/splash/SplashScreen';
import BottomTabs from './Buttomtabs';
import MemberShipScreen from '../screen/membership/MemberShipScreen';
import PurchaseScreen from '../screen/purchase/PurchaseScreen';
import ChatScreen from '../screen/chat/ChatScreen';
import ChatDetailScreen from '../screen/chat/ChatDetailScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  BottomTabs: undefined;
  membership: undefined;
  purchase: undefined;
  Seasonal: undefined;
  fulltime: undefined;
  chat: undefined;
  ChatDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="membership" component={MemberShipScreen} />
      <Stack.Screen name="purchase" component={PurchaseScreen} />
      <Stack.Screen name="fulltime" component={ChatScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
