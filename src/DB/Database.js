import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  try {
    const db = await openDatabase({name: 'abc.db', location: 'default'});
    console.log('Database opened successfully');
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error; // Rethrow the error to handle it where connectToDatabase is called
  }
};
