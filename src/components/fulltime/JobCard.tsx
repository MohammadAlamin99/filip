import { useNavigation } from '@react-navigation/native';
import { Banknote, Bookmark, Clock, MapPin } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { JobCardProps } from '../../@types/JobCardProps.type';

const InfoTag = ({
  text,
  iconType,
}: {
  text: string;
  iconType: 'location' | 'salary' | 'time';
}) => {
  const getIcon = () => {
    if (iconType === 'location')
      return <MapPin width={16} height={16} color="white" />;
    if (iconType === 'salary')
      return <Banknote width={16} height={16} color="white" />;
    return <Clock width={16} height={16} color="white" />;
  };

  return (
    <View
      style={[styles.tagContainer, iconType === 'salary' && styles.salaryTag]}
    >
      <Text style={styles.tagIcon}>{getIcon()}</Text>
      <Text
        style={[styles.tagText, iconType === 'salary' && styles.salaryText]}
      >
        {text}
      </Text>
    </View>
  );
};

export const JobCard: React.FC<JobCardProps> = ({ job, onBookmark }) => {
  const navigation = useNavigation<any>();
  const handleTost = () => {
    const message = 'Apply successfully';

    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      Alert.alert('Success', message);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleSection}>
          <Image source={{ uri: job?.user?.photo }} style={styles.avatar} />
          <View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job?.user?.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onBookmark}>
          <Bookmark width={24} height={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Info Tags Row */}
      <View style={styles.tagsWrapper}>
        <View style={styles.row}>
          <InfoTag text={job.location} iconType="location" />
          <InfoTag
            text={`€ ${job?.rate?.amount}/${
              job?.rate?.unit.charAt(0).toUpperCase() + job?.rate?.unit.slice(1)
            }`}
            iconType="salary"
          />
        </View>
        <View style={styles.row}>
          <InfoTag
            text={job.type.charAt(0).toUpperCase() + job.type.slice(1)}
            iconType="time"
          />
        </View>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleTost}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121212',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    objectFit: 'cover',
    marginRight: 12,
  },
  jobTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'InterDisplayBold',
  },
  companyName: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'InterDisplayRegular',
    fontWeight: 400,
  },
  tagsWrapper: {
    gap: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 21,
    textTransform: 'capitalize',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  salaryTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  tagIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  tagText: {
    color: '#E0E0E0',
    fontSize: 12,
    fontFamily: 'InterDisplayRegular',
    fontWeight: 400,
  },
  salaryText: {
    color: '#FBBF24',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#FFD900',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'InterDisplayMedium',
    lineHeight: 24,
  },
});
