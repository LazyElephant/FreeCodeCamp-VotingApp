module.exports = {
  secret: process.env.SECRET || 'devsecret',
  dbURL: process.env.DB_URL || 'mongodb://localhost:27017/VotingApp',
}