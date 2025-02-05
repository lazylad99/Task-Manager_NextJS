import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Extend the global object to store the cached connection
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Check if the cache exists, if not, initialize it
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
