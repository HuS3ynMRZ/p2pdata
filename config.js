export const MONGO_URL = typeof process.env.MONGO_URI === 'undefined' ? 'mongodb://127.0.0.1:27017' : 'mongodb://db:27017/p2p-db' 