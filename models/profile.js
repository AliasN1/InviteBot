const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schmea ({
  user_id: {
    type: String,
    required: true,
    unique = true
  },
  invite: {
    type: String,
    required: true
  },
  uses: {
    type: Number,
    required: true,
    default: 0
  }
}, {timestamps: true});

const Invites = mongoose.model('Invites', invitesSchema);

module.exports = Invites;