import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BadgeCheck, Clock, Heart } from 'lucide-react-native';
import styles from '../../screen/feed/style';
// import { feedData } from '../../@types/FeedData.type';
import { useNavigation } from '@react-navigation/native';

const FeedCard = ({ item }: { item: any }) => {
  console.log(item);
  const navigation = useNavigation<any>();
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <View key={item.id} style={styles.recCard}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardImage}>
        <View style={styles.MainbadgeContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>• {item.type}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            style={[styles.heartWrapper]}
          >
            <Heart
              height={24}
              width={24}
              color={liked ? '#FF3B30' : 'white'}
              fill={liked ? '#FF3B30' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileRow}>
          <View style={styles.avatarCircle}>
            {/* <Text style={styles.avatarInitial}>{item.name.charAt(0)}</Text> */}
          </View>
          <View>
            <Text style={styles.profileName}>
              {item?.user?.name || 'Unknown'}
            </Text>
            <View style={styles.verifiedContainer}>
              <BadgeCheck width={16} height={16} color="#FFD900" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardInfo}>
        <View style={styles.rowBetween}>
          <Text style={styles.roleTitle}>{item?.title}</Text>
          <Text style={styles.rateText}>
            {item.rate?.amount}
            <Text style={styles.perHr}>/Hr</Text>
          </Text>
        </View>
        <Text style={styles.locationText}>{item.location}</Text>

        <View style={styles.availabilityBox}>
          <Clock width={24} height={24} color="#FFD900" />
          <View>
            <Text style={styles.availLabel}>
              {item.subAvailability ? 'Availability' : 'Next Available'}
            </Text>
            <Text style={styles.availValue}>
              {item?.schedule?.end || 'n/a'}
            </Text>
            {item.subAvailability && (
              <Text style={styles.availSub}>{item.subAvailability}</Text>
            )}
          </View>
        </View>

        {/* <View style={styles.tagRow}>
          {item.tags.map((tag: string, idx: number) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>
                {item?.requiredSkills || 'n/a'}
              </Text>
            </View>
          ))}
        </View> */}

        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() => navigation.navigate('viewprofile')}
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedCard;
