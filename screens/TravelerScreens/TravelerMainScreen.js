import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';
import { Platform, StatusBar} from 'react-native';
import BottomNav2 from '../../components/traveler_components/BottomNav2'; // Import the bottom navigation component
import { useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const TravelerMainScreen = ({navigation}) => {
    const route = useRoute();

    const [ticketUri, setTicketUri] = useState("");
    const [ticketName, setTicketName] = useState("");
    const [ticketType, setTicketType] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [clickedUpload, setClickedUpload] = useState(false);
    const [pickupLocation, setPickupLocation] = useState("");

    const [hasTicket, setHasTicket] = useState(false);

    // api call to check if user has a ticket

    const handleTicketUploadClicked = async() => {
      if (clickedUpload == true){
        Alert.alert('Ticket already uploaded', 'You have already uploaded a ticket, please wait.');
        return;
      }
      if (pickupLocation == ""){
        Alert.alert('Pickup Location not set', 'Please set your pickup location before uploading a ticket.');
        return;
      }
        _pickTicket();
        // BACKEND CODE TO UPLOAD TICKET TO DATABASE
        try{
            console.log("We are here 6");
            const formData = new FormData();
            formData.append('file', {
              uri: ticketUri,
              type: ticketType,
              name: ticketName,
              data: ticketData
            });
            const res = await axios.post('/traveler/home/uploadTicket', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            console.log(res.data);//for you to check what the server is responding with
            
            //send user to corresponding page
      
            //add what happens when uploaded successfully
            setClickedUpload(true);
            setHasTicket(true);
      
          }catch(err){
      
            console.log(err);
          }
        //will add 10 second wait later

    };

    const _pickTicket= async () => {
        // used to pick a ticket from the user's phone
        try{
            let result = await DocumentPicker.getDocumentAsync({ 
            copyToCacheDirectory: false,
            type: "*/*"
          });
          const fileUri = result.uri;
          const fileName = result.name;
          const mimeType = result.mimeType;
    
          const tempFileUri = FileSystem.cacheDirectory + fileName;
          await FileSystem.copyAsync({
            from: fileUri,
            to: tempFileUri
          });
    
          const fileData = await FileSystem.readAsStringAsync(tempFileUri, { encoding: FileSystem.EncodingType.Base64 });
    
          setTicketName(fileName);
          setTicketUri(tempFileUri);
          setTicketType(mimeType);
          setTicketData(fileData);
          }
          catch(e){
            console.log(e);
            return;
          }
        };

    const handleCancelTicket = () => {
        // BACKEND CODE TO CANCEL TICKET IN DATABASE
    };

    // this is just a placeholder for now
    // will be replaced with a api call to get the flight date
    const flightDate = "2021-05-01";

    const handleTravelerView = () => {
      if (hasTicket == false){
        return (<View style={styles.body}>
          <Text style={styles.bodyText}>Upload Your Flight Ticket Here:</Text>
          <Text style={styles.bodyText}>(PDF Only)</Text>
          <Text style={styles.bodyText}>Enter Your Pickup Location:</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Pickup Location"
            onChangeText={setPickupLocation}
            value={pickupLocation}
            maxLength={200}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleTicketUploadClicked}>
              <Text style={styles.buttonText}>Upload Ticket</Text>
          </TouchableOpacity>
      </View>
      );
      }
      else{
        return (<View style={styles.body}>
          <Text style={styles.bodyText}>Your Flight Date:</Text>
          <Text style={styles.bodyText}>{flightDate}</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCancelTicket}>
              <Text style={styles.buttonText}>Cancel Ticket</Text>
          </TouchableOpacity>
      </View>
      );
      }
    }

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Traveler Main Screen</Text>
        </View>
        {handleTravelerView()//this handles whether to show the upload ticket or the cancel ticket button
        }
        <BottomNav2 navigation={navigation}/>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20 ,
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3274cb',
    },
    body: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3274cb',
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3274cb',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginVertical: 3,
        marginHorizontal: 3,
        marginTop: 10,
      },
      buttonText: {
        fontSize: 14,
        color: 'white',
      },
      textBox: {
        width: '100%',
        height: 40,
        borderColor: '#3274cb',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 8,
      },
});
export default TravelerMainScreen;
