import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    CameraIcon,
    MapPin,
    User,
    Phone,
    ChevronDown,
} from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { fetchCurrentUser, updateEmployerProfile } from '../../services/user';
import styles from './employerProfileStyle';



const EmployerProfile: React.FC = () => {
    const queryClient = useQueryClient();

    const [photo, setPhoto] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const { data: user } = useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
    });
    useEffect(() => {
        if (user) {
            setPhoto(user?.profile?.photo || null);
            setCompanyName(user?.profile?.companyName || '');
            setIndustry(user?.profile?.industry || '');
            setAbout(user?.profile?.about || '');
            setAddress(user?.employerProfile?.address || '');
            setContactName(user?.employerProfile?.contactName || '');
            setPhone(user?.employerProfile?.phone || '');
        }
    }, [user]);


    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, res => {
            if (res.assets?.[0]?.uri) {
                setPhoto(res.assets[0].uri);
            }
        });
    };

    // 🔥 employer profile update (SAFE mutation)
    const { mutate: saveProfile, isPending } = useMutation({
        mutationFn: updateEmployerProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            Toast.show({
                type: 'success',
                text1: 'Profile Updated',
                text2: 'Employer profile saved successfully',
            });
        },
        onError: (err: any) => {
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: err.message || 'Something went wrong',
            });
        },
    });

    const handleSave = () => {
        if (!companyName.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Company name is required',
            });
            return;
        }

        saveProfile({
            photo,
            companyName,
            industry,
            about,
            address,
            contactName,
            phone,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.headerTitle}>Edit Profile</Text>

                {/* Photo */}
                <View style={styles.photoSection}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.avatar}>
                            <Image
                                source={{
                                    uri:
                                        photo ||
                                        'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
                                }}
                                style={styles.avatarImage}
                            />
                            <View style={styles.cameraIcon}>
                                <CameraIcon size={22} color="#000" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.uploadText}>Upload Photo</Text>
                    <Text style={styles.subText}>
                        Make A Great First Impression
                    </Text>
                </View>

                {/* Company */}
                <Text style={styles.section}>Company Location</Text>

                <Text style={styles.label}>Company Name</Text>
                <TextInput
                    style={styles.input}
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholder="The Grand Hotel"
                    placeholderTextColor="#9CA3AF"
                />

                <Text style={styles.label}>Industry</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>
                        {industry || 'Select Industry Type'}
                    </Text>
                    <ChevronDown size={18} color="#9CA3AF" />
                </TouchableOpacity>

                <Text style={styles.label}>About Me</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    value={about}
                    onChangeText={setAbout}
                    placeholder="Tell Employer About Your Experience In Hospitality..."
                    placeholderTextColor="#9CA3AF"
                />

                {/* Location */}
                <Text style={styles.section}>Location</Text>

                <Text style={styles.label}>Business Address</Text>
                <View style={styles.iconInput}>
                    <MapPin size={18} color="#9CA3AF" />
                    <TextInput
                        style={styles.flexInput}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Street, City, Zip Code"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Contact */}
                <Text style={styles.section}>Primary Contact</Text>

                <Text style={styles.label}>Contact Person</Text>
                <View style={styles.iconInput}>
                    <User size={18} color="#9CA3AF" />
                    <TextInput
                        style={styles.flexInput}
                        value={contactName}
                        onChangeText={setContactName}
                        placeholder="Full Name"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.iconInput}>
                    <Phone size={18} color="#9CA3AF" />
                    <TextInput
                        style={styles.flexInput}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+1 (555) 000-0000"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Save */}
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    disabled={isPending}
                >
                    <Text style={styles.saveText}>
                        {isPending ? 'Saving...' : 'Save Profile'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployerProfile;
