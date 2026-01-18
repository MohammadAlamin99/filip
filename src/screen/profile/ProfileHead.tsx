import { View, Image } from 'react-native'
import React from 'react'
import styles from './viewProfileStyle'

const ProfileHead = () => {
    return (
        <View style={styles.profileImageContainer}>
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: 'https://img.freepik.com/premium-photo/portrait-smiling-african-american-businessman-blue-suit-sit-table-meeting-office-with-notebook-with-pen-laptop_183314-9637.jpg' }}
                    style={styles.profileImage}
                />
            </View>
        </View>
    )
}

export default ProfileHead