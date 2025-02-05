import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Extend globalThis to include a mongoose property without using namespace
declare global {
  interface GlobalMongoose {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  }
}

// Ensure correct typing for cached mongoose instance
const globalWithMongoose = globalThis as unknown as { mongoose?: GlobalMongoose };

// Use a properly typed cached object
const cached: GlobalMongoose = globalWithMongoose.mongoose || (globalWithMongoose.mongoose = { conn: null, promise: null });

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
