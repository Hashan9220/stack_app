import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import DeleteUser from '../component/User/DeleteUser';

export default function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState('');
  const [userData, setUserData] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [db, setDb] = useState([]);

  useEffect(() => {
    const openDatabase = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'abc.db',
          location: 'default',
        });
        setDb(database);
        getUsers(database);
      } catch (error) {
        Alert.alert('Error opening database:', error);
      }
    };

    openDatabase();
  }, []);

  const saveUser = () => {
    if (!username) {
      Alert.alert('Please fill User Name');
      return;
    }
    if (!email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!address) {
      Alert.alert('Please fill Address');
      return;
    }

    const insertQuery = `
   INSERT INTO userDetails (name, email, address)
   VALUES (?, ?, ?)
 `;
    const values = [username, email, address];
    try {
      return db.executeSql(insertQuery, values);
    } catch (error) {
      Alert.alert('Error:', error);
      throw Error('Failed to add contact');
    }
  };
  const getUsers = async db => {
    try {
      const userdata = [];
      const results = await db.executeSql('SELECT * FROM userDetails');
      results?.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          userdata.push(result.rows.item(index));
        }
      });
      setUsers(userdata);
    } catch (error) {
      throw Error('Failed to get Contacts from database');
    }
  };
  const updateUser = async db => {
    const updateQuery = `
      UPDATE userDetails
      SET name = ?, email = ?, address = ?
      WHERE id = ?
    `;
    const values = [username, email, address, userData.id];
    try {
      return db.executeSql(updateQuery, values);
    } catch (error) {
      Alert.alert('Failed to update contact', error);
      throw new Error('Failed to update contact');
    }
  };
  const deleteUser = async (db, id) => {
    const deleteQuery = `
      DELETE FROM userDetails
      WHERE id = ?
    `;
    const values = [id];
    try {
      return db.executeSql(deleteQuery, values);
    } catch (error) {
      Alert.alert('Failed to update contact', error);
      throw new Error('Failed to remove contact');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderView}>
        <View style={{width: '60%'}}>
          <Text style={styles.cardTxt1}>
            Name : <Text style={styles.cardTxt2}>{item.name}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            Email : <Text style={styles.cardTxt2}>{item.email}</Text>
          </Text>
          <Text style={styles.cardTxt1}>
            Address : <Text style={styles.cardTxt2}>{item.address}</Text>
          </Text>
        </View>

        <View style={styles.renderBot}>
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <Image source={require('../assets/add.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible2(true);
              setAddress(item.address);
              setEmail(item.email);
              setUsername(item.name);
              setUserData(item);
            }}>
            <Image source={require('../assets/update.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteUser(db, item.id)}>
            <Image source={require('../assets/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.listView}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'flex-end', width: '100%'}}>
              <TouchableOpacity onPress={() => setModalVisible1(false)}>
                <Image source={require('../assets/close.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTxt}>Add User</Text>
            <View style={styles.mainView}>
              <TextInput
                placeholder="Enter User Name"
                placeholderTextColor="#8e918f"
                onChangeText={text => setUsername(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter User Email"
                placeholderTextColor="#8e918f"
                onChangeText={text => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter User Address"
                placeholderTextColor="#8e918f"
                onChangeText={text => setAddress(text)}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={saveUser} style={styles.saveBtn}>
              <Text style={styles.saveTxt}>Save User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'flex-end', width: '100%'}}>
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                <Image source={require('../assets/close.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTxt}>Update User</Text>
            <View style={styles.mainView}>
              <TextInput
                placeholder="Enter User Name"
                placeholderTextColor="#8e918f"
                onChangeText={text => setUsername(text)}
                value={username}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter User Email"
                placeholderTextColor="#8e918f"
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter User Address"
                placeholderTextColor="#8e918f"
                onChangeText={text => setAddress(text)}
                value={address}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              onPress={() => updateUser(db)}
              style={styles.saveBtn}>
              <Text style={styles.saveTxt}>Update User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#373957',
  },
  headerTxt: {fontSize: 30, fontWeight: 'bold', marginBottom: 20},
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
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
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    width: 300,
    height: 40,
    elevation: 15,
    marginTop: 10,
  },
  saveTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: '#252525',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  listView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 10,
    margin: 5,
  },
  renderBot: {
    width: '100%',
    height: 40,
    marginTop: 10,

    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  cardTxt1: {
    fontSize: 16,
    color: '#000',
  },
  cardTxt2: {
    fontSize: 14,
    color: '#000',
  },
});
