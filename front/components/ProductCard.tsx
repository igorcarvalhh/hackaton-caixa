import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export const ProductCard: React.FC<Props> = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#9EB2B8',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
    color: '#22292E',
  },
  subtitle: {
    color: '#64747A',
    fontSize: 12,
  },
});