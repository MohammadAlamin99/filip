import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FeedScreen from './src/screens/FeedScreen';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <FeedScreen />
    </SafeAreaProvider>
  );
};

export default App;