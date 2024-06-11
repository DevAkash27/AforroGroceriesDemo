import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const SignUpFields = ({
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  email,
  password,
  showError,
  mobileNumber,
  setMobileNumber,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <View>
      <View style={styles.fieldContainer}>
        <View>
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            value={email}
            onChangeText={setEmail}
          />
          {showError.field === 'email' && (
            <Text style={{color: 'red'}}>Please enter valid email address</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder={'Mobile Number'}
            keyboardType={'number-pad'}
            value={mobileNumber}
            maxLength={10}
            onChangeText={setMobileNumber}
          />
          {showError.field === 'mobile' && (
            <Text style={{color: 'red'}}>
              Please enter valid valid phone number
            </Text>
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
              placeholder={'Password'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={showPassword == true ? false : true}
            />
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <Text style={{textAlign: 'center', paddingEnd: 10}}>
                {showPassword == true ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {showError.field === 'password' && (
            <Text style={{color: 'red'}}>
              Password must be at least 8 characters long and include uppercase,
              lowercase, numeric, and special characters.
            </Text>
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
              placeholder={'Confirm Password'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={showPassword == true ? false : true}
            />
          </View>
          {showError.field === 'confirmPassword' && (
            <Text style={{color: 'red'}}>
              Confirm Password must match your password
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default SignUpFields;
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
