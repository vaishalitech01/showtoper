import mongoose from 'mongoose';

// Connect to your MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vaishalitechinfo_db_user:ATGoOusKCwAxYUgH@cluster0.omusakb.mongodb.net/");
    console.log('Connected to MongoDB');
    
    // Remove the unique index on email field
    await mongoose.connection.db.collection('forms').dropIndex('email_1');
    console.log('Email index removed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

connectDB();