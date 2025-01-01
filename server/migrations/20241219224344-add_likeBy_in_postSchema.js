const up = async (db, client) => {
  try {
    // Perform the migration changes
    await db.collection('posts').updateMany({}, { $set: { likeBy: [] } });
  } catch (error) {
    // Handle error during migration
    console.error('Error occurred during migration:', error);
    // Perform rollback
    await down(db, client);
    throw error; // Re-throw the error after rollback
  }
};

const down = async (db, client) => {
  try {
    // Rollback changes
    await db.collection('posts').updateMany({}, { $unset: { likeBy: "" } });
  } catch (error) {
    console.error('Error occurred during rollback:', error);
    throw error; // Re-throw the error during rollback
  }
};

export { up, down };