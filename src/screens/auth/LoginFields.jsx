import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const LoginFields = ({
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  email,
  password,
  showError,
  loginMethod,
  mobileNumber,
  setMobileNumber,
  otp,
  setOtp,
}) => {
  return (
    <View>
      <View style={styles.fieldContainer}>
        <View>
          <TextInput
            style={styles.input}
            placeholder={
              loginMethod === 'emailPassword' ? 'Email' : 'MobileNumber'
            }
            maxLength={loginMethod === 'emailPassword' ? 100000 : 10}
            value={loginMethod === 'emailPassword' ? email : mobileNumber}
            onChangeText={
              loginMethod === 'emailPassword' ? setEmail : setMobileNumber
            }
          />
          {loginMethod === 'emailPassword' && showError.field === 'email' && (
            <Text style={{color: 'red'}}>Please enter valid email address</Text>
          )}
          {loginMethod === 'mobileNumber' && showError.field === 'mobile' && (
            <Text style={{color: 'red'}}>Please enter valid Phone number</Text>
          )}
        </View>

        <View>
          <View
            style={[
              styles.input,
              {flexDirection: 'row', alignItems: 'center', marginTop: 10},
            ]}>
            <TextInput
              style={{width: '88%'}}
              placeholder={
                loginMethod === 'emailPassword' ? 'Password' : 'Enter OTP'
              }
              keyboardType={
                loginMethod === 'mobileNumber' ? 'number-pad' : 'default'
              }
              maxLength={loginMethod === 'mobileNumber' ? 6 : 10000}
              value={loginMethod === 'emailPassword' ? password : otp}
              onChangeText={
                loginMethod === 'emailPassword' ? setPassword : setOtp
              }
              secureTextEntry={showPassword == true ? false : true}
            />
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <Text style={{textAlign: 'center', paddingEnd: 10}}>
                {showPassword == true ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {loginMethod === 'emailPassword' &&
            showError.field === 'password' && (
              <Text style={{color: 'red'}}>
                Password must be at least 8 characters long and include
                uppercase, lowercase, numeric, and special characters.
              </Text>
            )}
          {loginMethod === 'mobileNumber' && showError.field === 'password' && (
            <Text style={{color: 'red'}}>Please enter OTP</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginFields;
const styles = StyleSheet.create({
  fieldContainer: {
    marginHorizontal: 10,
    marginTop: '10%',
  },

  input: {
    height: 40,
    borderColor: '#FAD5A5',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
