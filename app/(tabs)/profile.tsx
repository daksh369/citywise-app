import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import { User, Bell, Settings, LogOut, ChevronRight, Award, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileSection}>
        {isLoggedIn ? (
          <>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} 
              style={styles.profileImage} 
            />
            <Text style={styles.profileName}>Jamie Wilson</Text>
            <Text style={styles.profileEmail}>jamie.wilson@example.com</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Award color={colors.primary[600]} size={20} />
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Badges</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MapPin color={colors.primary[600]} size={20} />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Places</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.loginPrompt}>
            <View style={styles.avatarPlaceholder}>
              <User color={colors.white} size={32} />
            </View>
            <Text style={styles.loginTitle}>Log in to CityWise</Text>
            <Text style={styles.loginSubtitle}>
              Save your favorite places, collect badges, and get personalized updates
            </Text>
            <TouchableOpacity style={styles.loginButton} onPress={toggleLogin}>
              <Text style={styles.loginButtonText}>Log In / Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell color={colors.white} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Get alerts for deals and events</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray[300]}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.accent[500] }]}>
              <MapPin color={colors.white} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingDescription}>Enable for local updates</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray[300]}
            />
          </View>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.secondary[500] }]}>
              <Settings color={colors.white} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>App Preferences</Text>
              <Text style={styles.settingDescription}>Language, theme, and more</Text>
            </View>
            <ChevronRight color={colors.gray[400]} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.aboutCard}>
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Privacy Policy</Text>
            <ChevronRight color={colors.gray[400]} size={20} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Terms of Service</Text>
            <ChevronRight color={colors.gray[400]} size={20} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Help & Support</Text>
            <ChevronRight color={colors.gray[400]} size={20} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Send Feedback</Text>
            <ChevronRight color={colors.gray[400]} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoggedIn && (
        <TouchableOpacity style={styles.logoutButton} onPress={toggleLogin}>
          <LogOut color={colors.gray[700]} size={20} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.versionText}>CityWise v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  profileSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray[200],
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[800],
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  loginPrompt: {
    alignItems: 'center',
    width: '100%',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 8,
  },
  loginSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },
  loginButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 16,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginLeft: 56,
  },
  aboutSection: {
    marginBottom: 24,
  },
  aboutCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  aboutItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[700],
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[400],
    textAlign: 'center',
  },
});