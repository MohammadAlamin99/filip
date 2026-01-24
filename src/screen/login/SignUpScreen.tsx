import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, MapPin } from 'lucide-react-native';
import styles from '../login/style';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !fullName || !city) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!selected) {
      Alert.alert('Error', 'Please accept Terms & Conditions');
      return;
    }
    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Firestore schema
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          email: email,
          role: 'worker',

          profile: {
            name: fullName,
            photo: null,
            city: city,
            skills: [],
          },

          membership: {
            tier: 'free',
            freePostsUsed: 0,
            postLimit: 10,
          },

          workerProfile: {
            aboutMe: '',
            baseCity: city,
            skills: [],
            openToWork: true,
          },

          employeeProfile: null,

          credits: {
            balance: 0,
            lifetimeEarned: 0,
            used: 0,
          },

          referral: {
            code: null,
            invitedCount: 0,
            verifiedCount: 0,
          },

          rating: {
            avg: 0,
            count: 0,
          },

          terms: {
            accepted: true,
            acceptedAt: firestore.FieldValue.serverTimestamp(),
          },

          verified: false,

          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      navigation.navigate('Login');

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('This email is already in use');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password should be at least 6 characters');
      } else {
        Alert.alert('Something went wrong');
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, styles.signupContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Join <Text style={styles.span}>GoldShift</Text>
        </Text>
        <Text style={[styles.subtext, styles.signupSubtext]}>
          Connect With The Best Staff
        </Text>
        {/* full name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your Full Name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          autoCapitalize="none"
          value={fullName}
          onChangeText={setFullName}
        />
        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {/* city */}
        <Text style={styles.label}>City</Text>
        <View style={[styles.passwordWrapper, styles.signupWrapper]}>
          <TextInput
            placeholder="City"
            placeholderTextColor="#9CA3AF"
            style={styles.passwordInput}
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          >
            <MapPin size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Create a Password"
            placeholderTextColor="#9CA3AF"
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          >
            {passwordVisible ? (
              <EyeOff size={24} color="#374151" />
            ) : (
              <Eye size={24} color="#374151" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.radioWrapper}
          onPress={() => setSelected(true)}
          activeOpacity={0.8}
        >
          <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected && <View style={styles.radioInner} />}
          </View>

          <Text style={styles.text}>
            I Agree To The{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://example.com/terms')}
            >
              Terms & Condition
            </Text>{' '}
            And{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://example.com/privacy')}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>

        {/* login button */}
        <TouchableOpacity
          style={[styles.button, styles.signupBtn]}
          // onPress={() => navigation.navigate('BottomTabs')}
          onPress={handleSignUp}
        >
          <Text style={styles.loginButton}>{loading ? 'Loading...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        {/* another acount */}
        <View style={[styles.doyouHave, styles.signDoyouHave]}>
          <Text style={styles.dontText}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textStyle_text}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
