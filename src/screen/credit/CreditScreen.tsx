import React from 'react';
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
  History,
  Gift,
  Clock4,
  Gem,
  ChevronRight,
  MedalIcon,
  PlayCircleIcon,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import UsersAddIcon from '../../components/svg/UsersAddIcon';

const CreditsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Credit Score</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceAmountRow}>
            <Text style={styles.balanceNumber}>12</Text>
            <Text style={styles.balanceText}>Credits</Text>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <History width={20} height={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Gift width={22} height={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Purchase Pack Section */}
        <Text style={styles.sectionTitle}>Purchase Pack</Text>

        <View style={styles.packGrid}>
          {/* Starter Pack */}
          <View style={styles.smallPackCard}>
            <View style={styles.clockIconWrapper}>
              <Clock4 width={24} height={24} color="#FFD900" />
            </View>
            <Text style={styles.smallPackTitle}>Starter</Text>
            <Text style={styles.smallPackTitle}>1 Credit</Text>
            <TouchableOpacity
              style={styles.starterPackButton}
              activeOpacity={0.7}
            >
              <Text style={styles.starterPackButtonText}>€2</Text>
            </TouchableOpacity>
          </View>

          {/* Seasonal Special Bundle */}
          <View style={styles.smallPackCard}>
            <View style={styles.offersBadge}>
              <Text style={styles.offersBadgeText}>Offers</Text>
            </View>
            <View style={styles.clockIconWrapper}>
              <Clock4 width={24} height={24} color="#FFD900" />
            </View>
            <Text style={styles.smallPackTitle}>Seasonal</Text>
            <Text style={styles.smallPackTitle}>Special Bundle</Text>
            <TouchableOpacity
              style={styles.seasonalPackButton}
              activeOpacity={0.7}
            >
              <Text style={styles.seasonalPackButtonText}>€5</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pro Pack */}
        <View style={styles.premiumPackCard}>
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>Most Popular</Text>
          </View>
          <View style={styles.premiumPackContent}>
            <View style={styles.premiumPackLeft}>
              <View style={styles.wrapGem}>
                <Gem width={32} height={32} color="#ffffff" />
              </View>
              <View style={styles.premiumPackInfo}>
                <Text style={styles.premiumPackTitle}>Pro Pack</Text>
                <Text style={styles.premiumPackCredits}>5 Credits</Text>
              </View>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save 20%</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.premiumPackButton}
              activeOpacity={0.7}
            >
              <Text style={styles.premiumPackButtonText}>€8</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ELITE Pack */}
        <View style={styles.elitePackCard}>
          <View style={styles.bestValueBadge}>
            <Text style={styles.bestValueBadgeText}>Best Value</Text>
          </View>
          <View style={styles.elitePackContent}>
            <View style={styles.elitePackLeft}>
              <View style={styles.wrapMedalIcon}>
                <MedalIcon width={32} height={32} color="#000000" />
              </View>
              <View style={styles.elitePackInfo}>
                <Text style={styles.elitePackTitle}>ELITE</Text>
                <Text style={styles.elitePackCredits}>10 Credits</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.elitePackButton}
              activeOpacity={0.7}
            >
              <Text style={styles.elitePackButtonText}>€15</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Earn Free Credits Section */}
        <View style={styles.dividerRow}>
          <Text style={styles.dividerText}>Or Earn Free</Text>
        </View>

        {/* Watch Videos Card */}
        <TouchableOpacity style={styles.earnCard} activeOpacity={0.7}>
          <View style={styles.earnCardLeft}>
            <View style={styles.playIconWrapper}>
              <PlayCircleIcon width={24} height={24} color="#76C6FF" />
            </View>
            <View style={styles.earnCardInfo}>
              <View style={styles.earnCardTitleRow}>
                <Text style={styles.earnCardTitle}>Watch 5 Videos</Text>
                <View style={styles.creditBadge}>
                  <Text style={styles.creditBadgeText}>+1 Credit</Text>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressBarFill} />
                </View>
              </View>
              <Text style={styles.progressText}>
                0/5 Watched (Resets Weekly)
              </Text>
            </View>
          </View>
          <ChevronRight width={20} height={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Refer Colleague Card */}
        <TouchableOpacity style={styles.earnCard} activeOpacity={0.7}>
          <View style={styles.earnCardLeft}>
            <View style={styles.usersIconWrapper}>
              <UsersAddIcon width={24} height={24} color="#34D399" />
            </View>
            <View style={styles.earnCardInfo}>
              <View style={styles.earnCardTitleRow}>
                <Text style={styles.earnCardTitle}>Refer A Colleague</Text>
                <View style={styles.creditBadge}>
                  <Text style={styles.creditBadgeText}>+1 Credit</Text>
                </View>
              </View>
              <Text style={styles.referSubtext}>
                Invite Friends To Join Goldshift
              </Text>
            </View>
          </View>
          <ChevronRight width={20} height={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreditsScreen;
