import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

if (!env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const uri = env.MONGODB_URI;
const client = new MongoClient(uri);

export const dbPromise = client.connect().then(() => client.db('apaes'));

export async function getCollection(name: string) {
    const db = await dbPromise;
    return db.collection(name);
}

export default client;
