import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LoginFields from './LoginFields';
import SignUpFields from './SignupFields';

const Login = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('emailPassword');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState();
  const [showError, setShowError] = useState({
    field: '',
  });

  const validateEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const clearAllFields = () => {
    setEmail('');
    setMobileNumber('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setShowError(prev => ({
      field: '',
    }));
  };

  const handleTabs = tabName => {
    clearAllFields();
    if (tabName === 'login') {
      setActiveTab('login');
    } else {
      setActiveTab('signup');
    }
  };

  //method to show fields according to selected login type
  const showLoginMethods = () => {
    setShowError(prev => ({
      field: '',
    }));
    setLoginMethod(
      loginMethod === 'mobileNumber' ? 'emailPassword' : 'mobileNumber',
    );
  };

  //handle signup validations
  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setShowError(prev => ({field: 'email'}));
      return;
    }

    if (!validatePhone(mobileNumber)) {
      setShowError(prev => ({field: 'mobile'}));
      return;
    }

    if (!validatePassword(password)) {
      setShowError(prev => ({
        field: 'password',
      }));
      return;
    }

    if (confirmPassword !== password) {
      setShowError(prev => ({
        field: 'confirmPassword',
      }));
      return;
    }

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validatePhone(mobileNumber)
    ) {
      setShowError(prev => ({
        field: '',
      }));
      navigation.navigate('Home');
    }
  };

  //handle login validations
  const handleLogin = async () => {
    if (loginMethod === 'emailPassword' && !validateEmail(email)) {
      setShowError(prev => ({field: 'email'}));
      return;
    }

    if (loginMethod === 'mobileNumber' && !validatePhone(mobileNumber)) {
      setShowError(prev => ({field: 'mobile'}));
      return;
    }

    if (loginMethod === 'emailPassword' && !validatePassword(password)) {
      setShowError(prev => ({
        field: 'password',
      }));
      return;
    }

    if (loginMethod === 'mobileNumber' && validatePhone(mobileNumber)) {
      setShowError(prev => ({
        field: '',
      }));
      navigation.navigate('Home');
    }

    if (
      loginMethod === 'emailPassword' &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      setShowError(prev => ({
        field: '',
      }));
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={{color: 'black', fontSize: 32, fontWeight: '600'}}>
        Aforro Groceries
      </Text>
      <View style={styles.contentContainer}>
        <View style={styles.optionView}>
          <TouchableOpacity
            onPress={() => handleTabs('login')}
            style={
              activeTab === 'login' ? styles.tabActive : styles.tabInactive
            }>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabs('signup')}
            style={
              activeTab === 'signup' ? styles.tabActive : styles.tabInactive
            }>
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          {activeTab === 'login' && (
            <LoginFields
              setEmail={setEmail}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
              showError={showError}
              email={email}
              password={password}
              showPassword={showPassword}
              mobileNumber={mobileNumber}
              loginMethod={loginMethod}
              setMobileNumber={setMobileNumber}
              otp={otp}
              setOtp={setOtp}
            />
          )}
          {activeTab === 'signup' && (
            <SignUpFields
              setEmail={setEmail}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
              showError={showError}
              email={email}
              password={password}
              showPassword={showPassword}
              mobileNumber={mobileNumber}
              loginMethod={loginMethod}
              setMobileNumber={setMobileNumber}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            activeTab === 'login' ? handleLogin() : handleSignup()
          }
          style={styles.submitButton}>
          <Text style={{color: 'black', fontSize: 16}}>Submit</Text>
        </TouchableOpacity>
        {activeTab === 'login' && (
          <View style={{alignItems: 'center', marginTop: '10%'}}>
            <Text>Or</Text>
            <TouchableOpacity
              onPress={() => showLoginMethods()}
              style={styles.loginOptions}>
              <Text style={{color: 'white'}}>
                {' '}
                {loginMethod === 'mobileNumber'
                  ? 'Login with Email'
                  : 'Login with Mobile Number'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFE141',
  },
  submitButton: {
    width: '60%',
    borderRadius: 8,
    backgroundColor: '#F8CB46',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  loginOptions: {
    borderRadius: 8,
    width: '60%',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    padding: 14,
    alignItems: 'center',
    marginTop: '6%',
  },
  tabActive: {
    width: '50%',
    backgroundColor: '#F8CB46',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  contentContainer: {
    height: '70%',
    marginTop: '10%',
    width: '90%',
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#C4C4C4',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 2,
    shadowRadius: 7,
    elevation: 20,
    alignItems: 'center',
  },
  fieldContainer: {
    marginHorizontal: 10,
    marginTop: '10%',
  },
  tabInactive: {
    width: '50%',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: '#FAD5A5',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  optionView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '6%',
    borderColor: '#F8CB46',
    marginHorizontal: 10,
  },
});
