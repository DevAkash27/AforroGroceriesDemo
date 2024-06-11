import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {selectedPaymentOption} from '../../apiSlices/homeSlice';
import {useDispatch, useSelector} from 'react-redux';

const AddressPaymentScreen = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const paymentMethod = useSelector(state => state?.home?.paymentMethod);

  const handleAddressChange = text => {
    setAddress(text);
  };

  const handleCityChange = text => {
    setCity(text);
  };

  const handlePostalCodeChange = text => {
    setPostalCode(text);
  };

  const validateAddress = () => {
    if (
      address.trim().length !== 0 &&
      city.trim().length !== 0 &&
      postalCode.trim().length !== 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSaveAddress = () => {
    if (!isValid) {
      Alert.alert('Oops!!!', 'Please fill in all fields before saving.');
    }
  };

  const savePaymentMethod = method => {
    dispatch(selectedPaymentOption(method));
  };

  const proceedToCheckout = () => {
    if (isValid && paymentMethod.length > 0) {
      navigation.navigate('Checkout', {
        address: address,
        city: city,
        postalCode: postalCode,
      });
    } else {
      Alert.alert('Oops!!!', 'Please check all fields before checkout.');
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{fontSize: 24, fontWeight: '600'}}>Add Address </Text>
        <View style={{marginTop: '5%'}}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={handleAddressChange}
            placeholder="Address"
            onBlur={validateAddress}
          />
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={handleCityChange}
            placeholder="City"
            onBlur={validateAddress}
          />
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            placeholder="Postal Code"
            keyboardType="numeric"
            onBlur={validateAddress}
          />
        </View>

        <TouchableOpacity
          style={styles.saveAddressView}
          onPress={() => handleSaveAddress()}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Save Address</Text>
        </TouchableOpacity>

        <View style={styles.paymentContainer}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
            Select Payment Method:
          </Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Credit/Debit Card' &&
                styles.selectedPaymentOption,
            ]}
            onPress={() => savePaymentMethod('Credit/Debit Card')}>
            <Text
              style={{
                color:
                  paymentMethod === 'Credit/Debit Card' ? 'white' : 'black',
              }}>
              Credit/Debit Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'UPI' && styles.selectedPaymentOption,
            ]}
            onPress={() => savePaymentMethod('UPI')}>
            <Text
              style={{
                color: paymentMethod === 'UPI' ? 'white' : 'black',
              }}>
              UPI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Cash on Delivery' &&
                styles.selectedPaymentOption,
            ]}
            onPress={() => savePaymentMethod('Cash on Delivery')}>
            <Text
              style={{
                color: paymentMethod === 'Cash on Delivery' ? 'white' : 'black',
              }}>
              Cash on Delivery
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => proceedToCheckout()}
          style={styles.viewOrderSummary}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
            View Order Summary
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '20%',
  },
  input: {
    height: 40,
    borderColor: '#FAD5A5',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  paymentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#D3D3D3',
  },
  selectedPaymentOption: {
    backgroundColor: '#f0bf7a',
  },
  saveAddressView: {
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#f0bf7a',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewOrderSummary: {
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

export default AddressPaymentScreen;
