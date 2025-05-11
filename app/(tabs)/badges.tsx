import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Award, Lock, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { mockBadges } from '@/data/mockData';

export default function BadgesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const collectedBadges = mockBadges.filter(badge => badge.collected);
  const lockedBadges = mockBadges.filter(badge => !badge.collected);
  
  const displayedBadges = selectedFilter === 'all' 
    ? mockBadges 
    : selectedFilter === 'collected' 
      ? collectedBadges 
      : lockedBadges;

  const progressPercentage = (collectedBadges.length / mockBadges.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={[colors.primary[500], colors.primary[700]]}
          style={styles.progressCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.progressContent}>
            <Text style={styles.progressTitle}>Your Badge Collection</Text>
            <Text style={styles.progressCount}>
              {collectedBadges.length} of {mockBadges.length} badges collected
            </Text>
            
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share Collection</Text>
              <ChevronRight color={colors.white} size={16} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.badgeIconContainer}>
            <Award color={colors.white} size={64} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'all' && styles.activeFilterButton
          ]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text 
            style={[
              styles.filterButtonText,
              selectedFilter === 'all' && styles.activeFilterButtonText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'collected' && styles.activeFilterButton
          ]}
          onPress={() => setSelectedFilter('collected')}
        >
          <Text 
            style={[
              styles.filterButtonText,
              selectedFilter === 'collected' && styles.activeFilterButtonText
            ]}
          >
            Collected
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'locked' && styles.activeFilterButton
          ]}
          onPress={() => setSelectedFilter('locked')}
        >
          <Text 
            style={[
              styles.filterButtonText,
              selectedFilter === 'locked' && styles.activeFilterButtonText
            ]}
          >
            Locked
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.badgesContainer}
        contentContainerStyle={styles.badgesContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedBadges.map((badge) => (
          <TouchableOpacity 
            key={badge.id} 
            style={styles.badgeCard}
            disabled={!badge.collected}
          >
            <View style={[
              styles.badgeImageContainer,
              !badge.collected && styles.badgeImageContainerLocked
            ]}>
              {badge.collected ? (
                <Image 
                  source={{ uri: badge.imageUrl }} 
                  style={styles.badgeImage} 
                />
              ) : (
                <Lock color={colors.gray[400]} size={24} />
              )}
            </View>
            
            <Text style={[
              styles.badgeName,
              !badge.collected && styles.badgeNameLocked
            ]}>
              {badge.name}
            </Text>
            
            <Text style={styles.badgeLocation}>{badge.location}</Text>
            
            {badge.collected && (
              <Text style={styles.badgeDate}>Collected: {badge.dateCollected}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: colors.white,
  },
  progressCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
  },
  progressCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
    marginRight: 4,
  },
  badgeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.primary[50],
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[500],
  },
  activeFilterButtonText: {
    color: colors.primary[600],
  },
  badgesContainer: {
    flex: 1,
  },
  badgesContent: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeImageContainerLocked: {
    backgroundColor: colors.gray[100],
  },
  badgeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  badgeName: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.gray[800],
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeNameLocked: {
    color: colors.gray[400],
  },
  badgeLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.primary[600],
    textAlign: 'center',
  },
});