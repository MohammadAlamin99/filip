import { View, Image } from 'react-native'
import React from 'react'
import styles from './viewProfileStyle'
interface ProfileHeadProps {
    photo?: string;
}
const ProfileHead = ({ photo }: ProfileHeadProps) => {
    return (
        <View style={styles.profileImageContainer}>
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: photo }}
                    style={styles.profileImage}
                />
            </View>
        </View>
    )
}

export default ProfileHead