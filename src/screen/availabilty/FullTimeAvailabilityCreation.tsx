

import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, CircleDollarSign } from 'lucide-react-native';
import styles from './FulltimeStyle';


const FullTimeAvailabilityCreation = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.title}>Create Availability</Text>

                {/* Posting Fee Card */}
                {/* Posting Fee Card */}
                <View style={styles.feeCard}>
                    <View style={styles.iconTextRow}>
                        <CircleDollarSign size={26} color="#F5C400" />

                        <View style={styles.textWrapper}>
                            <Text style={styles.feeTitle}>Posting Fee</Text>

                            <Text style={styles.feeText}>
                                Posting a full-time job costs{' '}
                                <Text style={styles.bold}>1 credit</Text>.{'\n'}
                                You have 3 credits remaining in your balance.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.singleBorder} />

                    <TouchableOpacity style={styles.linkRow}>
                        <Text style={styles.link}>View Membership Benefits</Text>
                        <ArrowRight size={18} color="#D4AF37" />
                    </TouchableOpacity>
                </View>

                {/* Job Details */}
                <Text style={styles.sectionTitle}>Job Details</Text>

                <Text style={styles.label}>Position

                </Text>

                <View>
                    <TextInput
                        placeholder="Select Position"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                    />

                </View>

                <Text style={styles.label}>City</Text>
                <TextInput
                    placeholder="E.g. New York, NY"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                />

                <View style={styles.row}>
                    <View style={styles.flex}>
                        <Text style={styles.label}>Salary</Text>
                        <TextInput
                            placeholder="65k/Yr"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.flex}>
                        <Text style={styles.label}>Days / Week</Text>
                        <TextInput
                            placeholder="5 Days"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* About */}
                <Text style={styles.sectionTitle}>About This Role</Text>

                <Text style={styles.label}>Job Description</Text>
                <TextInput
                    placeholder="Describe the responsibilities and day-to-day tasks..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.textArea}
                    multiline
                />

                {/* Contact */}
                <Text style={styles.sectionTitle}>Contact Info</Text>

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder="Alex@Bristo.com"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Post Job Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FullTimeAvailabilityCreation;