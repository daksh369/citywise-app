import { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, QrCode, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary[600], colors.primary[800]]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>CityWise</Text>
        <View style={styles.logoIconContainer}>
          <MapPin color={colors.white} size={24} />
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Discover Your City</Text>
        <Text style={styles.subtitle}>
          Hyper-local updates, deals, and hidden gems during your commute
        </Text>
        
        <View style={styles.illustration}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
            style={styles.image}
          />
          <View style={styles.illustrationOverlay} />
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => router.push('/scan')}
          >
            <QrCode color={colors.white} size={24} />
            <Text style={styles.scanButtonText}>Scan Transit QR Code</Text>
            <ChevronRight color={colors.white} size={20} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.exploreButtonText}>Explore Without Scanning</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.white,
    marginRight: 8,
  },
  logoIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 300,
  },
  illustration: {
    width: 320,
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  illustrationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 320,
  },
  scanButton: {
    backgroundColor: colors.accent[500],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scanButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
    marginRight: 12,
    flex: 1,
  },
  exploreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  exploreButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.white,
  },
});