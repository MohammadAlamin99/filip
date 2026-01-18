import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../../screen/profile/viewProfileStyle';
import { ReviewProps } from '../../@types/Review.type';
import StarIcon from '../svg/StarIcon';


const ReviewCard = ({ name, role, time, text, rating }: ReviewProps) => (
    <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
            <Image source={{ uri: 'https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg' }} style={styles.avatarPlaceholder} />
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.reviewTitle}>{name}</Text>
                <Text style={styles.reviewSubtext}>{role} • {time}</Text>
            </View>
            <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{rating}</Text>
                <StarIcon width={14} height={14} color="#FFD900" />
            </View>
        </View>
        <Text style={styles.reviewBody}>"{text}"</Text>
    </View>
);

export default ReviewCard