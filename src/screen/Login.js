import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const openDatabase = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'abc.db',
          location: 'default',
        });
        setDb(database);
      } catch (error) {
        Alert.alert('Error database Open', error);
      }
    };

    openDatabase();
  }, []);

  const onLoginPress = () => {
    if (!db) {
      Alert.alert('Database is not ready yet');
      return;
    }

    if (username === '' || password === '') {
      Alert.alert('Please enter your username and password!');
      return;
    }

    db.transaction(tx => {
      const sql = `SELECT * FROM users WHERE name='${username}'`;
      tx.executeSql(sql, [], (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          Alert.alert('This account does not exist!');
        } else {
          const row = results.rows.item(0);
          if (password === row.password) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('TaskPage'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Authentication failed!');
          }
        }
      });
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.headerTxt}>Welcome Back Please Login</Text>
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#8e918f"
        onChangeText={name => setUsername(name)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#8e918f"
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.logBtn} onPress={onLoginPress}>
        <Text style={styles.logTxt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#373957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTxt: {fontSize: 30, fontWeight: 'bold', marginBottom: 20},
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
  logBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    width: 300,
    height: 40,
    elevation: 15,
    marginTop: 10,
  },
  logTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
