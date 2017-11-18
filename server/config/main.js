const testDB = process.env.NODE_ENV === 'test' ? "mongodb://localhost:27017/Test" : undefined;
module.exports = {
  secret: process.env.SECRET || 'devsecret',
  dbURL: process.env.DB_URL || testDB || 'mongodb://localhost:27017/VotingApp',
}