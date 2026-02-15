import { View, Image } from 'react-native';
import React from 'react';
import styles from './viewProfileStyle';
interface ProfileHeadProps {
  photo?: string;
}
const ProfileHead = ({ photo }: ProfileHeadProps) => {
  return (
    <View style={styles.profileImageContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              photo ||
              'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg',
          }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

export default ProfileHead;
