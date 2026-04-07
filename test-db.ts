import mysql from 'mysql2/promise';

async function testConnection() {
  const url = process.env.DATABASE_URL || 'mysql://admin:password@127.0.0.1:3307/actlink';
  console.log(`Connecting to: ${url}`);
  
  try {
    const connection = await mysql.createConnection(url);
    console.log('✅ Connection successful!');
    
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('✅ Query successful:', rows);
    
    await connection.end();
  } catch (error: any) {
    console.error('❌ Connection failed:');
    console.error(`- Error Code: ${error.code}`);
    console.error(`- Error Address: ${error.address}:${error.port}`);
    console.error(`- Message: ${error.message}`);
    process.exit(1);
  }
}

testConnection();
