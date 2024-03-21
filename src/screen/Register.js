import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

export default function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const openDatabase = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'abc.db', // Adjust database name as per your actual database file
          location: 'default',
        });
        setDb(database); // Set the database once opened
        console.log('Database is opened');
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    openDatabase(); // Call the function to open the database
  }, []);

  const openSuccess = () => {
    console.log('Database is opened');
  };

  const openError = err => {
    console.log('Error opening database:', err);
  };

  const registerUser = () => {
    console.log(username, password, confirmPassword);

    if (!username) {
      Alert.alert('Please fill User Name');
      return;
    }
    if (!password) {
      Alert.alert('Please fill Password');
      return;
    }
    if (!confirmPassword) {
      Alert.alert('Please fill Confirm Password');
      return;
    }

    if (!db) {
      console.log('Database is not initialized yet.');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO users (name, password ) VALUES (?, ?)',
        [username, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Registration Failed');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>
        Welcome to Register
      </Text>
      <View style={styles.mainView}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#8e918f"
            onChangeText={name => setUsername(name)}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#8e918f"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            maxLength={10}
            style={styles.input}
          />
          <TextInput
            placeholder="Re-Enter Password"
            placeholderTextColor="#8e918f"
            secureTextEntry={true}
            onChangeText={password => setConfirmPassword(password)}
            maxLength={10}
            style={styles.input}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.regBtn} onPress={registerUser}>
          <Text style={styles.regTxt}>Register</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10}}>Or</Text>
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logTxt}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#373957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    padding: 10,
    margin: 10,
    width: 300,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 15,
    color: '#000',
  },
  regBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    width: 300,
    height: 40,
    elevation: 15,
    marginTop: 10,
  },
  regTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
