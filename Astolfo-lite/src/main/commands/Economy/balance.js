const { Command } = require('klasa');
const mongoose = require("mongoose");
const wallet = require("../../../database/mongodb/models/eco/wallet.js");
const config = require("../../config.json");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'balance',
            enabled: true,
            bucket: 1,
            aliases: ["bal","money","wallet","cash"],
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

      let embed = {
          embed: {
              title: `${config.bot.identity.full_name} | Credits Transfer`,
              fields: [],
              color: config.bot.identity.colour,
              url: "https://astolfo.tech",
              footer: { text: `${config.bot.identity.name} | https://astolfo.tech/`, url: "https://astolfo.tech/" }
          }
      };

      message.sendLocale("LOAD_BALANCE").then(m => {
          wallet.findOne({
              userID: user.id,
          }, (err, wallet) => {
              if (err) console.error(err);

              if (!wallet) {
                  embed.embed.description = message.language.get("ERR_NO_BALANCE");
              } else {
                  embed.embed.description = message.language.get("BALANCE_DESC");
                  embed.embed.fields.push({ name: message.language.get("CR"), value: wallet.credits+" "+config.bot.emotes.eco.cr, inline: true });
                  embed.embed.fields.push({ name: message.language.get("TC"), value: wallet.trapcoins+" "+config.bot.emotes.eco.tc, inline: true });
                  embed.embed.fields.push({ name: message.language.get("AT"), value: wallet.tokens+" "+config.bot.emotes.eco.at, inline: true });
              }

              return m.edit(message.language.get("LOADED"), embed);
          });
      })
      return;
    }

    async init() {
      return;
    }

};
