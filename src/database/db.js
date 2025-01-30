import SQLite from 'react-native-sqlite-storage';

// Enable debugging in development
SQLite.DEBUG(true);
// Use the default location for iOS/Android
SQLite.enablePromise(true);

const database_name = "cantant.db";
const database_version = "1.0";
const database_displayname = "Cantant SQLite Database";
const database_size = 200000;

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: database_name,
    location: 'default',
  });
};

export const initDB = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        date INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
      );`
    );
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const addTransaction = async (type, amount, description) => {
  try {
    const db = await getDBConnection();
    const timestamp = Math.floor(Date.now() / 1000);
    const [result] = await db.executeSql(
      'INSERT INTO transactions (type, amount, description, date) VALUES (?, ?, ?, ?)',
      [type, amount, description, timestamp]
    );
    const [selectResult] = await db.executeSql(
      'SELECT * FROM transactions WHERE id = ?',
      [result.insertId]
    );
    console.log('Transaction added successfully with ID:', result.insertId);
    return selectResult.rows.item(0);
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const db = await getDBConnection();
    const [results] = await db.executeSql(
      'SELECT * FROM transactions ORDER BY date DESC'
    );
    const transactions = [];
    for (let i = 0; i < results.rows.length; i++) {
      transactions.push(results.rows.item(i));
    }
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getCurrentBalance = async () => {
  try {
    const db = await getDBConnection();
    const [results] = await db.executeSql(
      `SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance 
       FROM transactions`
    );
    return results.rows.item(0).balance || 0;
  } catch (error) {
    console.error('Error calculating balance:', error);
    throw error;
  }
};
