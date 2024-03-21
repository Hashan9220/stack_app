import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function TaskPage({navigation}) {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.taskView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={styles.taskBtn}>
          <Text style={styles.btnTxt}>Task 01</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.taskBtn}>
          <Text style={styles.btnTxt}>Task 02</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.taskBtn}>
          <Text style={styles.btnTxt}>Task 03</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddUser')}
          style={styles.taskBtn}>
          <Text style={styles.btnTxt}>Task 04</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskBtn}>
          <Text style={styles.btnTxt}>Task 05</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#373957',
  },
  taskView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  taskBtn: {
    width: '70%',
    height: 40,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
