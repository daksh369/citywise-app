import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { MapPin, Award, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import * as Haptics from 'expo-haptics';

export default function LandingScreen() {
  const { location } = useLocalSearchParams<{ location: string }>();
  const [showBadge, setShowBadge] = useState(false);

  // Simulate loading the location information
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(true);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetUpdates = () => {
    router.push('/(tabs)');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={[colors.secondary[600], colors.secondary[800]]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <X color={colors.white} size={24} />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.locationContainer}>
          <MapPin color={colors.white} size={24} />
          <Text style={styles.locationText}>{location || 'Transit Location'}</Text>
        </View>

        <Text style={styles.welcomeTitle}>Welcome to {location || 'Your Location'}!</Text>
        <Text style={styles.welcomeDescription}>
          You've unlocked local updates, deals, and hidden gems in this area. Discover what's happening around you right now!
        </Text>

        {showBadge && (
          <View style={styles.badgeContainer}>
            <View style={styles.badgeIconContainer}>
              <Award color={colors.accent[500]} size={32} />
            </View>
            <View style={styles.badgeContent}>
              <Text style={styles.badgeTitle}>New Location Badge!</Text>
              <Text style={styles.badgeDescription}>
                You've collected the "{location || 'Transit Hub'}" badge! Keep exploring to collect more.
              </Text>
            </View>
          </View>
        )}

        <Image
          source={{ uri: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
          style={styles.locationImage}
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleGetUpdates}>
          <Text style={styles.updateButtonText}>Get Local Updates Now</Text>
        </TouchableOpacity>

        <Text style={styles.noAppText}>
          No app download required - access your updates directly in the browser
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 24 : 48,
    right: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 0 : 40,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },
  welcomeTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 320,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    maxWidth: 320,
  },
  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  badgeContent: {
    flex: 1,
    marginLeft: 16,
  },
  badgeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.secondary[800],
    marginBottom: 4,
  },
  badgeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  locationImage: {
    width: 320,
    height: 180,
    borderRadius: 16,
    marginBottom: 32,
  },
  updateButton: {
    backgroundColor: colors.accent[500],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    marginBottom: 16,
  },
  updateButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  noAppText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: 280,
  },
});