import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Switch,
    Alert,
    ToastAndroid,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import {
    X,
    BriefcaseBusiness,
    CircleCheck,
    Calendar as CalendarIcon,
    Eye,
    File
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from '@react-native-firebase/firestore';

type MarkedDates = {
    [key: string]: {
        selected?: boolean;
        startingDay?: boolean;
        endingDay?: boolean;
        color?: string;
        textColor?: string;
    };
};

const SeosonalAvailabilityCreationScreen = () => {
    const navigation = useNavigation<any>();
    const [startDate, setStartDate] = useState('2025-02-03');
    const [endDate, setEndDate] = useState('2025-02-07');
    const [locations, setLocations] = useState(['New York, NY']);
    const [newLocation, setNewLocation] = useState('');
    const [aboutText, setAboutText] = useState('');
    const [isActive, setIsActive] = useState(true);
    const authInstance = getAuth();
    const db = getFirestore();
    const handleGoBack = () => {
        navigation.goBack();
    };

    const removeLocation = (index: number) => {
        const updatedLocations = locations.filter((_, i) => i !== index);
        setLocations(updatedLocations);
    };

    const getMarkedDates = (): MarkedDates => {
        const marked: MarkedDates = {};
        if (!startDate || !endDate) return marked;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const current = new Date(start);

        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            marked[dateStr] = {
                selected: true,
                color: '#FFD900',
                textColor: '#111111',
                startingDay: dateStr === startDate,
                endingDay: dateStr === endDate,
            };
            current.setDate(current.getDate() + 1);
        }
        return marked;
    };


    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month} ${day},\n${year}`;
    };

    const addLocation = () => {
        if (newLocation.trim() !== '') {
            setLocations([...locations, newLocation.trim()]);
            setNewLocation('');
        }
    };

    const handleTost = async () => {
        try {
            const user = authInstance.currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }
            const jobPost = {
                userId: user.uid,
                title: 'Event Server',
                category: 'Hospitality',
                type: 'seasonal',
                description:
                    'Serve guests during a private event. Experience preferred.',
                schedule: {
                    start: `${startDate}T18:00:00Z`,
                    end: `${endDate}T02:00:00Z`,
                },
                location: 'New York, NY',
                rate: {
                    amount: 25,
                    unit: 'hour',
                },
                requiredSkills: ['Serving', 'Wine Knowledge'],
                positions: {
                    total: 5,
                    filled: 0,
                },
                status: isActive ? 'open' : 'inactive',
                visibility: {
                    priority: false,
                    creditUsed: 0,
                },
                applicationsCount: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'jobs'), jobPost);

            const message = 'Job posted successfully';

            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Success', message);
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Create Availability</Text>

                <TouchableOpacity onPress={handleTost} activeOpacity={0.7}>
                    <Text style={styles.postText}>Post</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Job Details</Text>
                    <Text style={styles.subsectionTitle}>Target Position</Text>
                    <View style={styles.jobCard}>
                        <BriefcaseBusiness width={24} height={24} color="hsla(220, 13%, 91%, 0.85)" />
                        <TextInput
                            style={styles.jobText}
                            placeholder="Enter job title"
                            placeholderTextColor='hsla(220, 13%, 91%, 0.85)'
                        />
                        <CircleCheck width={24} height={24} color="#FFD900" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Availability</Text>
                    <View style={styles.labeldateRow}>
                        <Text style={styles.dateLabel}>Start Date</Text>
                        <Text style={styles.dateLabel}>End Date</Text>
                    </View>

                    <View style={styles.dateRow}>
                        <View style={styles.dateCard}>
                            <CalendarIcon width={24} height={24} color="#ffffff" />
                            <Text style={styles.dateValue}>
                                {formatDateDisplay(startDate)}
                            </Text>
                        </View>

                        <View style={styles.dateCard}>
                            <CalendarIcon width={24} height={24} color="#ffffff" />
                            <Text style={styles.dateValue}>
                                {formatDateDisplay(endDate)}
                            </Text>
                        </View>
                    </View>
                </View>

                <Calendar
                    current="2025-02-01"
                    markingType="period"
                    markedDates={getMarkedDates()}
                    onDayPress={(day) => {
                        if (!startDate || (startDate && endDate)) {
                            setStartDate(day.dateString);
                            setEndDate('');
                        } else {
                            if (new Date(day.dateString) < new Date(startDate)) {
                                setStartDate(day.dateString);
                            } else {
                                setEndDate(day.dateString);
                            }
                        }
                    }}
                    theme={{
                        calendarBackground: '#1E1E1E',
                        textSectionTitleColor: '#FFD900',
                        selectedDayBackgroundColor: '#FFD900',
                        selectedDayTextColor: '#111111',
                        todayTextColor: '#FFD900',
                        dayTextColor: '#FFFFFF',
                        textDisabledColor: '#666666',
                        monthTextColor: '#FFFFFF',
                        textMonthFontFamily: 'InterDisplayMedium',
                        textDayFontFamily: 'InterDisplayRegular',
                        textMonthFontWeight: '500' as any,
                        textDayFontWeight: '400' as any,
                        textDayHeaderFontFamily: 'InterDisplayMedium',
                        arrowColor: '#FFD900',
                        textDayHeaderFontSize: 18,
                    }}
                    style={{
                        borderRadius: 16,
                        padding: 10,
                    }}
                />
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <Text style={styles.subsectionTitle}>Preferred Location</Text>
                    <View style={styles.addLocationRow}>
                        <TextInput
                            style={[styles.jobText, { flex: 1 }]}
                            placeholder="Add location..."
                            placeholderTextColor="#9CA3AF"
                            value={newLocation}
                            onChangeText={setNewLocation}
                        />
                        <TouchableOpacity onPress={addLocation} style={styles.addLocationButton} activeOpacity={0.7}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locationsContainer}>
                        {locations.map((location, index) => (
                            <View key={index} style={styles.locationChip}>
                                <Text style={styles.locationText}>{location}</Text>
                                <TouchableOpacity onPress={() => removeLocation(index)} activeOpacity={0.7}>
                                    <X width={16} height={16} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About You</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe your experience..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        value={aboutText}
                        onChangeText={setAboutText}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resume/CV</Text>
                    <View style={styles.fileCard}>
                        <View style={styles.fileLeft}>
                            <View style={styles.fileIcon}>
                                <File width={24} height={24} color="#fff" />
                            </View>
                            <View>
                                <Text style={styles.fileName}>Alex_mixologist_cv_2025.Pdf</Text>
                                <Text style={styles.fileSubtext}>Uploaded 2 days ago</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.7}>
                            <X width={20} height={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.toggleCard}>
                        <View style={styles.toggleLeft}>
                            <View style={styles.fileIcon}>
                                <Eye width={24} height={24} color="#fff" />
                            </View>
                            <View>
                                <Text style={styles.toggleTitle}>Active Post</Text>
                                <Text style={styles.toggleSubtext}>
                                    Immediately Visible To Employers
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                            trackColor={{ false: '#2A2A2A', true: '#FFD900' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SeosonalAvailabilityCreationScreen;
