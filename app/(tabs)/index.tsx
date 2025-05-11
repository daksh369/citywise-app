import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Bell, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import FeedCard from '@/components/FeedCard';
import { mockFeedItems } from '@/data/mockData';
import CategoryFilter from '@/components/CategoryFilter';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState(mockFeedItems);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'transit', name: 'Transit' },
    { id: 'deals', name: 'Deals' },
    { id: 'events', name: 'Events' },
    { id: 'community', name: 'Community' },
    { id: 'gems', name: 'Hidden Gems' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filteredItems = selectedCategory === 'all' 
    ? feedItems 
    : feedItems.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.locationBar}>
        <View style={styles.locationContainer}>
          <MapPin color={colors.primary[600]} size={18} />
          <Text style={styles.locationText}>Downtown Transit Hub</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell color={colors.gray[600]} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.timeHeader}>
        <Clock color={colors.gray[500]} size={16} />
        <Text style={styles.timeText}>Updates as of 2:35 PM</Text>
      </View>

      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView
        style={styles.feedContainer}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[600]}
            colors={[colors.primary[600]]}
          />
        }
      >
        {filteredItems.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
            onPress={() => console.log('Feed item pressed:', item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  locationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[800],
    marginLeft: 6,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 6,
  },
  feedContainer: {
    flex: 1,
  },
  feedContent: {
    padding: 16,
    paddingBottom: 32,
  },
});