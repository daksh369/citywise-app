import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, Search, Filter } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockLocations } from '@/data/mockData';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={colors.gray[400]} size={20} />
          <Text style={styles.searchPlaceholder}>Search locations, deals & events...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={colors.gray[600]} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Popular Nearby</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        >
          {mockLocations.slice(0, 5).map((location) => (
            <TouchableOpacity key={location.id} style={styles.locationCard}>
              <Image 
                source={{ uri: location.imageUrl }} 
                style={styles.locationImage} 
              />
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <View style={styles.locationDetails}>
                  <MapPin color={colors.primary[600]} size={14} />
                  <Text style={styles.locationDistance}>{location.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Trending Spots</Text>
        
        {mockLocations.slice(5, 10).map((location) => (
          <TouchableOpacity key={location.id} style={styles.fullLocationCard}>
            <Image 
              source={{ uri: location.imageUrl }} 
              style={styles.fullLocationImage} 
            />
            <View style={styles.fullLocationGradient} />
            <View style={styles.fullLocationInfo}>
              <Text style={styles.fullLocationName}>{location.name}</Text>
              <Text style={styles.fullLocationDescription}>{location.description}</Text>
              <View style={styles.fullLocationDetails}>
                <MapPin color={colors.white} size={14} />
                <Text style={styles.fullLocationDistance}>{location.distance}</Text>
              </View>
            </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[400],
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 16,
  },
  horizontalListContent: {
    paddingBottom: 24,
  },
  locationCard: {
    width: 160,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  locationImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  locationInfo: {
    padding: 12,
  },
  locationName: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.gray[800],
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
  },
  fullLocationCard: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  fullLocationImage: {
    width: '100%',
    height: '100%',
  },
  fullLocationGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  fullLocationInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  fullLocationName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
  },
  fullLocationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  fullLocationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullLocationDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
});