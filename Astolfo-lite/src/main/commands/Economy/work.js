const { Command } = require('klasa');
const mongoose = require("mongoose");
const wallet = require("../../../database/mongodb/models/eco/wallet.js");
const jobs = require("../../../modules/commands/economy/work/games.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'work',
            enabled: true,
            cooldown: 0,
            bucket: 1,
            aliases: ["w"],
            permissionLevel: 0,
            description: '',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
      mongoose.connect(`mongodb+srv://astolfo:${process.env.DBPASS}@astolfo-01-s6fj2.gcp.mongodb.net/Economy?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true   }, err => {
        if (err) return console.error(err);
      });
      
      let user;
      user = message.author;
      wallet.findOne({ userID: message.author.id }, (err, walletS) => {
          if (err) console.log(err);
          if (!walletS) {
            const Wallet = new wallet({ _id: mongoose.Types.ObjectId(), userID: message.author.id, credits: 0, trapcoins: 0, tokens: 0 });
            Wallet.save().catch(err => console.log(err));
          }
      });
      
      let int = Math.round(Math.random()*Object.keys(jobs).length);
      
      while (int >= Object.keys(jobs).length) {
        int = Math.round(Math.random()*Object.keys(jobs).length);
      }

      jobs[int](message, wallet);
    }

    async init() {
      return;
    }

};
