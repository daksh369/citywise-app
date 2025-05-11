import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Search, Bookmark, Tag, Filter, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockFavorites } from '@/data/mockData';

export default function FavoritesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'deals', name: 'Deals' },
    { id: 'events', name: 'Events' },
    { id: 'places', name: 'Places' },
  ];
  
  const filteredItems = mockFavorites
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={colors.gray[400]} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.gray[400]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X color={colors.gray[400]} size={16} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={colors.gray[600]} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoryFilter}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.selectedCategoryButtonText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Bookmark color={colors.gray[300]} size={48} />
            <Text style={styles.emptyStateTitle}>No saved items found</Text>
            <Text style={styles.emptyStateDescription}>
              Items you save will appear here. Try saving some local deals or places!
            </Text>
          </View>
        ) : (
          filteredItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.favoriteCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.favoriteImage} />
              
              <View style={styles.favoriteContent}>
                <View style={styles.favoriteHeader}>
                  <View style={styles.categoryTag}>
                    <Tag color={colors.primary[600]} size={12} />
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  
                  <TouchableOpacity>
                    <Bookmark color={colors.primary[600]} size={20} fill={colors.primary[600]} />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.favoriteTitle}>{item.title}</Text>
                <Text style={styles.favoriteDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                
                <View style={styles.favoriteFooter}>
                  <Text style={styles.favoriteLocation}>{item.location}</Text>
                  {item.expiresAt && (
                    <Text style={styles.favoriteExpiry}>Expires: {item.expiresAt}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
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
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[800],
    marginLeft: 8,
    padding: 0,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilter: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.gray[100],
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary[600],
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  selectedCategoryButtonText: {
    color: colors.white,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[700],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    maxWidth: 280,
  },
  favoriteCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteImage: {
    width: '100%',
    height: 160,
  },
  favoriteContent: {
    padding: 16,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.primary[700],
    marginLeft: 4,
  },
  favoriteTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 8,
  },
  favoriteDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
    lineHeight: 20,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  favoriteExpiry: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.accent[600],
  },
});