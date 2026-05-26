import type { Connection } from 'mongoose';

// Semantically we would want to put the insert commmand
// inside the `up` function and then reverse it via `down`.
// But `init` is a special case such that we want to run it
// at any time we want to reset the state of the app.
export async function up(connection: Connection): Promise<void> {
  await connection.collection('users').deleteMany({});
  await connection.collection('books').deleteMany({});
  await connection.collection('checkoutrecords').deleteMany({});
  await connection.collection('payments').deleteMany({});
}

export async function down(connection: Connection): Promise<void> {
  // Initialize the `admin` user
  await connection.collection('users').insertOne({
    username: 'admin',
    firstName: 'Super',
    lastName: 'Admin',
  });
}
