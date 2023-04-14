import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const ActiveOrderCard = ({ product }) => {
  const [url, setUrl] = useState(product.url);
  const [status, setStatus] = useState(product.status);
  const [proofOfReceiptUri, setProofOfReceiptUri] = useState("");
  const [proofOfReceiptName, setProofOfReceiptName] = useState("");

  const handleProofOfReceiptClicked = () => {
    if(status === "0" ) {
      // This means the order has not been acquired yet
      _pickProofOfReceipt();
      return;
    }
    else if(status === "1") {
      // This means the order has been acquired
      Alert.alert('Order Already Acquired', 'You can only upload a proof of receipt once the order has been accepted.');
    }
    else if(status === "2") {
      // This means the order has been shipped
      Alert.alert('Order Already Shipped', 'You can only upload a proof of receipt once the order has been accepted.');
    }
    else if(status === "3") {
      // This means the order has arrived to Lebanon
      Alert.alert('Order Already Arrived', 'You can only upload a proof of receipt once the order has been accepted.');
    }
    else if(status === "4") {
      // This means the order has been sent out
      Alert.alert('Order Already Sent Out', 'You can only upload a proof of receipt once the order has been accepted.');
    }
    else if(status === "5") {
      // This means the order has been completed
      Alert.alert('Order Already Completed', 'You can only upload a proof of receipt once the order has been accepted.');
    }
    else {
      Alert.alert('Order Still Pending', 'You can only upload a proof of receipt once the order has been accepted.');
    }
  };
  const handleShippedClicked = () => {
    // if the status is 1, then the order has been acquired
    if(status === "1") {
      handleOrderShipped();
      return;
    }
    // if the status is 0, then the order has not been acquired yet
    else if(status === "0") {
      Alert.alert('Order Not Acquired', 'You can only mark an order as shipped once it has been acquired.');
    }
    // if the status is 2, then the order has been shipped
    else if(status === "2") {
      Alert.alert('Order Already Shipped', 'You can only mark an order as shipped once.');
    }
    // if the status is 3, then the order has arrived to Lebanon
    else if(status === "3") {
      Alert.alert('Order Already Arrived', 'You can only mark an order as shipped once.');
    }
    // if the status is 4, then the order has been sent out
    else if(status === "4") {
      Alert.alert('Order Already Sent Out', 'You can only mark an order as shipped once.');
    }
    // if the status is 5, then the order has been completed
    else if(status === "5") {
      Alert.alert('Order Already Completed', 'You can only mark an order as shipped once.');
    }
  };

  const handleArrivedClicked = () => {
    if(status === "2") {
      handleOrderArrived();
      return;
    }
    else if(status === "0") {
      Alert.alert('Order Not Acquired', 'You can only mark an order as arrived once it has been acquired.');
    }
    else if(status === "1") {
      Alert.alert('Order Not Shipped', 'You can only mark an order as arrived once it has been shipped.');
    }
    else if(status === "3") {
      // This means the order has already arrived to Lebanon
      Alert.alert('Order Already Arrived', 'You can only mark an order as arrived once.');
    }
    else if(status === "4") {
      // This means the order has already been sent out
      Alert.alert('Order Already Sent Out', 'You can only mark an order as arrived once.');
    }
    else if(status === "5") {
      // This means the order has already been completed
      Alert.alert('Order Already Completed', 'You can only mark an order as arrived once.');
    }
    else {
      Alert.alert('Order Not Shipped', 'You can only mark an order as arrived once it has been shipped.');
    }
  };

  const handleOrderArrived = () =>
  // helper function to update the status of the order
      Alert.alert('Order Arrived', 'Are you sure you want to mark the order as arrived to Lebanon?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          color: 'red',
        },
        {text: 'YES', onPress: () => console.log('YES Pressed')
        // Backend call to mark order as arrived to Lebanon
        // Update the order status in the database through the API
      },
      
    ]);

  const handleOrderShipped = () =>
  // helper function to update the status of the order
      Alert.alert('Order Shipped', 'Are you sure you want to mark the order as shipped?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          color: 'red',
        },
        {text: 'YES', onPress: () => console.log('YES Pressed')
        // Backend call to mark order as shipped
        // Update the order status in the database through the API
      },
      
    ]);

    _pickProofOfReceipt = async () => {
      // used to pick a proof of receipt from the user's phone
        try{
          let result = await DocumentPicker.getDocumentAsync({ 
          copyToCacheDirectory: true,
        });
          if(result.cancelled){
            result.cancelled = false;
          }
          if (!result.cancelled) {
            setProofOfReceiptUri(result.uri);
            setProofOfReceiptName(result.name);
          }
          
        }
        catch(e){
          console.log(e);
          return;
        }
      
      }

  const renderTimelineStage = (stage) => {
    const stages = ['Acquired', 'Shipped', 'Arrived', 'Sent out', 'Completed'];
    const isActive = stage <= product.status;
    const stageColor = isActive ? '#3274cb' : 'grey';
    const stageText = stage === product.status ? 'Current Stage' : '';
    
    return (
      <View style={styles.timelineStageContainer}>
        <View
          style={[styles.timelineStage, { backgroundColor: stageColor }]}
        />
        <Text style={[styles.timelineStageText, { color: stageColor }]}>
          {stageText}
        </Text>
        <Text style={styles.timelineStageText}>{stages[stage-1]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.stockStatus}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
        {
        //renderTimelineStages2(product.status)
          }
        <View style={styles.timelineContainer}>
          {renderTimelineStage(1)}
          {renderTimelineStage(2)}
          {renderTimelineStage(3)}
          {renderTimelineStage(4)}
          {renderTimelineStage(5)}
        </View>
      </View>
      <View style={styles.buttonsHolder}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleProofOfReceiptClicked}>
          <Text style={styles.buttonText}>Proof of Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleShippedClicked}>
        <Text style={styles.buttonText}>Mark as Shipped</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleArrivedClicked}>
        <Text style={styles.buttonText}>Mark as Arrived</Text>
        </TouchableOpacity>
      </View>
      
      
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
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonsHolder: {
    flexDirection: 'column',
    alignItems: 'center',
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
  buttonContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3274cb',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 3,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: 200,
    marginTop: 60,
  },
  timelineStageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timelineStage: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
  },
  timelineStageText: {
    fontSize: 8,
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default ActiveOrderCard;
