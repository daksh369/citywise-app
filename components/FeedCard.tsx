import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Tag, MapPin, Clock, ChevronRight, Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { FeedItem } from '@/types/feed';

type FeedCardProps = {
  item: FeedItem;
  onPress: () => void;
};

export default function FeedCard({ item, onPress }: FeedCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        
        <View style={styles.categoryTag}>
          <Tag color={colors.white} size={12} />
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        {item.category === 'deals' && (
          <View style={styles.dealTag}>
            <Text style={styles.dealTagText}>{item.discount || '20% OFF'}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MapPin color={colors.gray[500]} size={14} />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
          
          {item.time && (
            <View style={styles.metaItem}>
              <Clock color={colors.gray[500]} size={14} />
              <Text style={styles.metaText}>{item.time}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>
              {item.category === 'deals' ? 'Claim Deal' : 
               item.category === 'events' ? 'View Event' : 'Learn More'}
            </Text>
            <ChevronRight color={colors.primary[600]} size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveButton}>
            <Heart color={colors.gray[400]} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  categoryTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  dealTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accent[500],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  dealTagText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: colors.white,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[600],
    marginRight: 4,
  },
  saveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});