import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ActiveOrderCard = ({ product }) => {
  const handleCopyLink = () => {
    Clipboard.setString(product.link);
  };

  const renderTimelineStages = (status) => {
    const stages = ['Acquired', 'Shipped', 'Arrived', 'Sent out', 'Completed'];
    const primaryColor = '#3274cb';
    const grayColor = 'gray';

    return (
      <View style={styles.timelineContainer}>
        {stages.map((stage, index) => (
          <View key={stage} style={[styles.timelineStage, index + 1 <= status ? { backgroundColor: primaryColor } : { backgroundColor: grayColor }]} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.stockStatus}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
        {renderTimelineStages(product.status)}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleCopyLink}>
        <Text style={styles.buttonText}>Copy Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  stockStatus: {
    fontSize: 14,
    color: '#888',
  },
  timelineContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  timelineStage: {
    flex: 1,
    height: 4,
    backgroundColor: 'gray',
    marginRight: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3274cb',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default ActiveOrderCard;
