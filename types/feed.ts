export type FeedItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'transit' | 'deals' | 'events' | 'community' | 'gems';
  location: string;
  time?: string;
  discount?: string;
  expiresAt?: string;
  link?: string;
};