import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

type TabBarIconProps = {
  icon: LucideIcon;
  color: string;
};

export default function TabBarIcon({ icon: Icon, color }: TabBarIconProps) {
  return (
    <View style={styles.container}>
      <Icon color={color} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
});