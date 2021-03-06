const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OptionSchema = Schema({
  option: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
}, {
  usePushEach: true,
});

// TODO: update schema to store users/ips who have already voted
const PollSchema = Schema({
  owner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Schema.Types.Mixed,
    required: true,
  },
  uservotes: [String],
  ipvotes: [String],
}, {
  usePushEach: true,
});


module.exports = mongoose.model("Poll", PollSchema);