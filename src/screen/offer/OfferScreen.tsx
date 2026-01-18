import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bell,
  CreditCard,
  Calendar,
  MapPin,
  Image,
  CalendarIcon,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import CupIcon from '../../components/svg/CupIcon';

const OfferScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('pending');
  const [expandedCards, setExpandedCards] = useState(new Set());

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleDescription = (id: string) => {
    setExpandedCards((prev: any) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const pendingOffers = [
    {
      id: '1',
      type: 'bartender',
      title: 'Bartender',
      time: '1h Ago',
      rate: '35/Hr + Tips',
      schedule: 'Today, 7 PM',
      location: 'Downtown',
      description:
        'High Volume Cocktail Bar, Black Vest Required. Experience With Craft Cocktails Preferred',
      fullDescription:
        'High Volume Cocktail Bar, Black Vest Required. Experience With Craft Cocktails Preferred. Must be able to work in fast-paced environment.',
    },
    {
      id: '2',
      type: 'cook',
      title: 'Line Cook',
      time: '1h Ago',
      rate: '35/Hr + Tips',
      schedule: 'Friday, Today, 7 PM',
      location: 'Downtown',
      description:
        'High Volume Cocktail Bar, Black Vest Required. Experience With Craft Cocktails Preferred',
      fullDescription:
        'High Volume Cocktail Bar, Black Vest Required. Experience With Craft Cocktails Preferred. Professional kitchen experience required.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>My offer</Text>
        <View style={styles.notificationWrapper}>
          <Bell width={24} height={24} color="#FFFFFF" />
          <View style={styles.notifDot} />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}
          >
            Pending (2)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Offer Cards */}
        {pendingOffers.map(offer => (
          <View key={offer.id} style={styles.offerCard}>
            {/* Header Row */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.iconCircle}>
                  {offer.type === 'bartender' ? (
                    <CupIcon width={27} height={26} color="#FCD34D" />
                  ) : (
                    <CalendarIcon width={27} height={26} color="#FFD900" />
                  )}
                </View>
                <Text style={styles.jobTitle}>{offer.title}</Text>
              </View>
              <Text style={styles.timeAgo}>{offer.time}</Text>
            </View>

            {/* Info Pills */}
            <View style={styles.infoPills}>
              <View style={styles.infoPill}>
                <CreditCard width={14} height={14} color="#FFD900" />
                <Text style={styles.infoPillTextYellow}>{offer.rate}</Text>
              </View>
              <View style={styles.infoPill}>
                <Calendar width={14} height={14} color="#9CA3AF" />
                <Text style={styles.infoPillText}>{offer.schedule}</Text>
              </View>
              <View style={styles.infoPill}>
                <MapPin width={14} height={14} color="#9CA3AF" />
                <Text style={styles.infoPillText}>{offer.location}</Text>
              </View>
            </View>

            {/* Description */}
            <Text
              style={styles.description}
              numberOfLines={expandedCards.has(offer.id) ? undefined : 2}
            >
              {expandedCards.has(offer.id)
                ? offer.fullDescription
                : offer.description}
            </Text>
            <TouchableOpacity
              onPress={() => toggleDescription(offer.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.showMore}>
                {expandedCards.has(offer.id) ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.declineButton}
                activeOpacity={0.7}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} activeOpacity={0.7}>
                <Text style={styles.acceptButtonText}>Accept Offer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Bottom CTA */}
        <View style={styles.bottomCTA}>
          <View style={styles.ctaIconWrapper}>
            <Image width={24} height={24} color="#d3d3d3" />
          </View>
          <Text style={styles.ctaText}>
            Update Your Availability To{'\n'}Receive More Offers Tailored To
            {'\n'}You.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferScreen;
