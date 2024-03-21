export const createTables = async db => {
  const users = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        password TEXT
    )
  `;
  const userData = `
    CREATE TABLE IF NOT EXISTS userData(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        address TEXT
    )
  `;
  const userDetails = `
  CREATE TABLE IF NOT EXISTS userDetails(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      address TEXT
  )
`;
  try {
    await db.executeSql(users);
    await db.executeSql(userData);
    await db.executeSql(userDetails);
  } catch (error) {
    throw Error(`Failed to create tables`);
  }
};
