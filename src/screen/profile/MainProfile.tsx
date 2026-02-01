// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Switch,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { CameraIcon, MapPin } from 'lucide-react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import styles from './mainProfileStyle';
// import SkillInput from '../../components/profile/SkillInput';
// import { useQuery } from '@tanstack/react-query';
// import { fetchCurrentUser } from '../../services/user';

// const MainProfile: React.FC = () => {
//   const [skillInput, setSkillInput] = useState('');
//   const [skills, setSkills] = useState<string[]>([]);
//   const [openToWork, setOpenToWork] = useState(true);
//   const [photo, setPhoto] = useState<string | null>(null);

//   const [city, setCity] = useState('');
//   const [about, setAbout] = useState('');

//   const { data: user } = useQuery({
//     queryKey: ['currentUser'],
//     queryFn: fetchCurrentUser,
//   });

//   /* 🔥 SYNC FIRESTORE → LOCAL STATE */
//   useEffect(() => {
//     if (user) {
//       setCity(user?.profile?.city || '');
//       setAbout(user?.workerProfile?.aboutMe || '');
//       setSkills(user?.workerProfile?.skills || []);
//       setOpenToWork(user?.workerProfile?.openToWork ?? true);
//     }
//   }, [user]);

//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, res => {
//       if (res.assets && res.assets[0]?.uri) {
//         setPhoto(res.assets[0].uri);
//       }
//     });
//   };

//   const addSkill = () => {
//     const value = skillInput.trim();
//     if (!value) return;

//     setSkills(prev => (prev.includes(value) ? prev : [...prev, value]));
//     setSkillInput('');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.container}>
//           {/* Header */}
//           <Text style={styles.headerTitle}>Edit Profile</Text>

//           {/* Photo */}
//           <View style={styles.photoSection}>
//             <TouchableOpacity onPress={pickImage}>
//               <View style={styles.avatar}>
//                 <Image
//                   source={{
//                     uri:
//                       photo ||
//                       user?.profile?.photo ||
//                       'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
//                   }}
//                   style={styles.avatarImage}
//                 />
//                 <View style={styles.cameraIcon}>
//                   <CameraIcon size={24} color="#1F2937" />
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <Text style={styles.uploadText}>Upload Photo</Text>
//             <Text style={styles.subText}>Make A Great First Impression</Text>
//           </View>

//           {/* About */}
//           <Text style={styles.label}>About Me</Text>
//           <TextInput
//             style={styles.textArea}
//             placeholder="Tell something about yourself"
//             placeholderTextColor="#9CA3AF"
//             value={about}
//             onChangeText={setAbout}
//             multiline
//             maxLength={300}
//           />
//           <Text style={styles.counter}>{about.length}/300</Text>

//           {/* City */}
//           <Text style={styles.label}>Base City</Text>
//           <View style={styles.inputWithIcon}>
//             <TextInput
//               style={styles.flexInput}
//               value={city}
//               onChangeText={setCity}
//               placeholder="Your city"
//               placeholderTextColor="#9CA3AF"
//             />
//             <MapPin size={24} color="#374151" />
//           </View>

//           {/* Skills Input */}
//           <SkillInput
//             skillInput={skillInput}
//             setSkillInput={setSkillInput}
//             addSkill={addSkill}
//           />

//           {/* 🔥 SKILL CHIPS */}
//           <View style={styles.skillWrap}>
//             {skills.map((skill, index) => (
//               <View key={index} style={styles.skillChip}>
//                 <Text style={styles.skillText}>{skill}</Text>

//                 <TouchableOpacity
//                   onPress={() =>
//                     setSkills(prev => prev.filter((_, i) => i !== index))
//                   }
//                   style={styles.removeBtn}
//                 >
//                   <Text style={styles.removeText}>×</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>

//           {/* Open To Work */}
//           <View style={styles.switchRow}>
//             <View>
//               <Text style={[styles.label, styles.openToWorkText]}>
//                 Open To Work
//               </Text>
//               <Text style={styles.subText}>
//                 Show Employer You Are Available
//               </Text>
//             </View>

//             <Switch
//               value={openToWork}
//               onValueChange={setOpenToWork}
//               trackColor={{ false: '#515E72', true: '#515E72' }}
//               thumbColor="#FFFFFF"
//               style={styles.bigSwitch}
//             />
//           </View>

//           {/* Save */}
//           <TouchableOpacity style={styles.saveBtn}>
//             <Text style={styles.saveText}>Save Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MainProfile;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraIcon, MapPin, X } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import styles from './mainProfileStyle';
import SkillInput from '../../components/profile/SkillInput';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchCurrentUser,
  updateUserProfile,
} from '../../services/user';

const MainProfile: React.FC = () => {
  const queryClient = useQueryClient();

  //  states
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [openToWork, setOpenToWork] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');

  // fetch user
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });

  useEffect(() => {
    if (user) {
      setCity(user?.profile?.city || '');
      setAbout(user?.workerProfile?.aboutMe || '');
      setSkills(user?.workerProfile?.skills || []);
      setOpenToWork(user?.workerProfile?.openToWork ?? true);
    }
  }, [user]);

  // image picker
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, res => {
      if (res.assets && res.assets[0]?.uri) {
        setPhoto(res.assets[0].uri);
      }
    });
  };

  // add skill
  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;

    setSkills(prev => (prev.includes(value) ? prev : [...prev, value]));
    setSkillInput('');
  };

  // update profile
  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been saved successfully',
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

  // save handler
  const handleSaveProfile = () => {
    if (!city.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'City is required',
      });
      return;
    }

    if (!about.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'About Me is required',
      });
      return;
    }

    saveProfile({
      city,
      aboutMe: about,
      skills,
      openToWork,
      photo,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
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
                      user?.profile?.photo
                  }}
                  style={styles.avatarImage}
                />
                <View style={styles.cameraIcon}>
                  <CameraIcon size={24} color="#1F2937" />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.uploadText}>Upload Photo</Text>
            <Text style={styles.subText}>Make A Great First Impression</Text>
          </View>

          {/* About */}
          <Text style={styles.label}>About Me</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tell something about yourself"
            placeholderTextColor="#9CA3AF"
            value={about}
            onChangeText={setAbout}
            multiline
            maxLength={300}
          />
          <Text style={styles.counter}>{about.length}/300</Text>

          {/* City */}
          <Text style={styles.label}>Base City</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.flexInput}
              value={city}
              onChangeText={setCity}
              placeholder="Your city"
              placeholderTextColor="#9CA3AF"
            />
            <MapPin size={24} color="#374151" />
          </View>

          {/* Skills Input */}
          <SkillInput
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            addSkill={addSkill}
          />

          {/* Skill Chips */}
          <View style={styles.skillWrap}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setSkills(prev => prev.filter((_, i) => i !== index))
                  }
                  style={styles.removeBtn}
                >
                  <X color='#fff' size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Open To Work */}
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.label, styles.openToWorkText]}>
                Open To Work
              </Text>
              <Text style={styles.subText}>
                Show Employer You Are Available
              </Text>
            </View>

            <Switch
              value={openToWork}
              onValueChange={setOpenToWork}
              trackColor={{ false: '#515E72', true: '#515E72' }}
              thumbColor="#FFFFFF"
              style={styles.bigSwitch}
            />
          </View>

          {/* Save */}
          < TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSaveProfile}
            disabled={isPending}
          >
            <Text style={styles.saveText}>
              {isPending ? 'Saving...' : 'Save Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainProfile;
