import { Text, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../login/style';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome to<Text style={styles.span}> GoldShift</Text>
      </Text>
      <Text style={styles.subtext}>
        Find your next shift or hire great staff.
      </Text>
      {/* input */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Enter Your Email"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
