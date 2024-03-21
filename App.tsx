import 'react-native-gesture-handler';
import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigator/StackNav';
import {connectToDatabase} from './src/DB/Database';
import {createTables} from './src/DB/CreateTable';

export default function App() {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
