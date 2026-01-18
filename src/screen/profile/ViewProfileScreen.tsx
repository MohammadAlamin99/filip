import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import {
    X,
    MapPin,
    CalendarCheck2
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './viewProfileStyle';
import ReviewCard from '../../components/profile/ReviewCard';
import ProfileHead from './ProfileHead';
import { ToastAndroid, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Day {
    day: string;
    date: string;
    active: boolean;
    hasDot?: boolean;
}
const ViewProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>()
    const roles: string[] = ['Mixology', 'Customer Service', 'Inventory Management', 'POS System'];

    const dates: Day[] = [
        { day: 'Sat', date: '12', active: true, hasDot: true },
        { day: 'Sun', date: '13', active: false },
        { day: 'Mon', date: '14', active: false, hasDot: true },
        { day: 'Tue', date: '15', active: false },
        { day: 'Wed', date: '16', active: false, hasDot: true },
        { day: 'Thu', date: '17', active: true, hasDot: true },
        { day: 'Fri', date: '18', active: true, hasDot: true },
    ];

    const handleSendEngagement = () => {
        const message = 'Engagement request sent successfully.';

        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            Alert.alert('Success', message);
        }

        navigation.goBack();
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            {/* Top Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><X size={20} color="#fff" strokeWidth={2.5} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Section */}
                <ProfileHead />

                {/* Form Fields */}
                <Text style={styles.label}>Full Name</Text>
                <View>
                    <Text style={styles.box}>Alex Rivera</Text>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>City</Text>
                        <View style={styles.inputWithIcon}>
                            <MapPin size={24} color="#fff" />
                            <View>
                                <Text style={styles.flexInput}>San Francisco, CA</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.age}>
                        <Text style={styles.label}>Age</Text>
                        <View>
                            <Text style={[styles.box, styles.agetext]}>26</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.label}>Short Bio / CV</Text>
                <View>
                    <Text style={[styles.box, styles.bioText]}>Experienced Mixologist With 4 Years In High-Volume Nightclubs. Fast, Reliable, And Friendly, Always Ready To Jump In During The Rush.</Text>
                </View>

                {/* Roles Section */}
                <Text style={styles.label}>Professional Roles</Text>
                <View style={styles.rolesContainer}>
                    <View style={styles.tagsWrapper}>
                        {roles.map((role, i) => (
                            <View key={i} style={styles.tag}>
                                <Text style={styles.tagText}>{role}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Availability Section */}
                <Text style={styles.label}>This Week</Text>
                <View style={styles.daysRow}>
                    {dates.map((item, i) => (
                        <View key={i} style={styles.dayContainer}>
                            <Text style={styles.dayLabelText}>{item.day}</Text>
                            <View style={[styles.dateCircle, item.active && styles.activeDateCircle]}>
                                <Text style={[styles.dateText, item.active && styles.activeDateText]}>{item.date}</Text>
                            </View>
                            {item.hasDot && <View style={[styles.dot, { backgroundColor: item.active ? '#FFD900' : '#FFD900' }]} />}
                        </View>
                    ))}
                </View>

                {/* Reviews Section */}
                <Text style={styles.label}>Reviews</Text>
                <ReviewCard
                    name="The Grand Hotel"
                    role="Event Server"
                    time="2d ago"
                    rating="5.0"
                    text="Alex was fantastic! Showed up early and handled the rush perfectly. Highly recommended."
                />
                <ReviewCard
                    name="The Grand Hotel"
                    role="Event Server"
                    time="2d ago"
                    rating="5.0"
                    text="Great energy and very skilled with cocktails. Good vibes only."
                />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={handleSendEngagement}
                >
                    <CalendarCheck2 size={20} color="#000" strokeWidth={2.5} />
                    <Text style={styles.mainButtonText}>Send Engagement</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};



export default ViewProfileScreen;