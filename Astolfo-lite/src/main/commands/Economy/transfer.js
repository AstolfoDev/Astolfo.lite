const { Command } = require('klasa');
const mongoose = require("mongoose");
const wallet = require("../../../database/mongodb/models/eco/wallet.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'transfer',
            enabled: true,
            aliases: ["pay"],
            permissionLevel: 0,
            description: '',
            usage: '<target:user> <amount:int>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
      mongoose.connect(`mongodb+srv://astolfo:${process.env.DBPASS}@astolfo-01-s6fj2.gcp.mongodb.net/Economy?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true   }, err => {
          if (err) return console.error(err);
      });
      
      let user = params[0];
      let amount = Math.round(params[1]);
      
      if (amount < 1) {
        return message.sendLocale("GREATER_THAN_ZERO");
      }

      if (user.id == message.author.id) return message.sendLocale("IS_SELF");

      let embed = {
          embed: {
              title: `Astolfo Lite | Credits Transfer`,
              fields: [],
              color: 0xde1073,
              url: "https://astolfo.tech",
              footer: { text: "Astolfo.lite | https://astolfo.tech/", url: "https://astolfo.tech/" }
          }
      };


      let bal;
      message.sendLocale("LOAD_TRANSFER").then(m => {
        wallet.findOne({
          userID: user.id,
        }, (err, balance1) => {
          if (err) console.error(err);
          if (!balance1) {
            m.edit(message.language.get("ERR_NO_BALANCE"));
                return;
            }
            else {
              wallet.findOne({
                userID: message.author.id,
              }, (err, balance2) => {
                if (!balance2) {
                  return m.edit(message.language.get("NO_TRANSFER"));
                    } else {
                        bal = balance2.credits;
                        if (amount > balance2.credits) {
                            return m.edit(message.language.get("ERR_TRANSFER_FUNDS", amount, balance2.credits));
                        } else {
                            const update = {credits: balance2.credits-amount}
                            const update2 = {credits: balance1.credits+amount};
                            wallet.findOneAndUpdate({userID: message.author.id}, update).then(async () => {
                                wallet.findOneAndUpdate({userID: user.id}, update2).then(async () => {
                                    embed.embed.description = message.language.get("TRANSFER_SENT", amount, message.author, user);
                                    embed.embed.fields.push({ name: message.author.tag, value: balance2.credits-amount });
                                    embed.embed.fields.push({ name: user.tag, value: balance1.credits+amount });
                                    return m.edit(message.language.get("TRANSFER_DONE"), embed);
                                });
                            });
                        }
                    }
                });
          }
        });
      })
      return;
    }

    async init() {
      return;
    }

};
