import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CardJogo({ image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover" 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
    margin: 8,
    overflow: 'hidden', 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: 'cover'
  },
});
