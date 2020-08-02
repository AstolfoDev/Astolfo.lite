module.exports = {
  0: async (message, wallet) => {
      const filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      
      let emotes = ["<:Break1:738014582555279460>","<:Break2:738014591988138045>","<:Break3:738014594911698996>","<:Break4:738014598862733422>","<:Break5:738015059070156830>","<:Break6:738015060949205083>","<:Break7:738015063960584222>","<:Break8:738015063025123360>","<:Break9:738015061922021437>","<:Break10:738015062274342939>","<:astolfoEmerald:703305007939715093>"];
      
      message.sendLocale("MINE_ORE");
      let m = await message.send(emotes[0]);
      
      let number_of_breaks = Math.round(Math.random()*9)
      
      let checkValue = async () => {
        switch(number_of_breaks) {
          default:
            return;
          case 0:
            m.edit(emotes[0]);
            break;
          case 1:
            m.edit(emotes[1]);
            break;
          case 2:
            m.edit(emotes[2]);
            break;
          case 3:
            m.edit(emotes[3]);
            break;
          case 4:
            m.edit(emotes[4]);
            break;
          case 5:
            m.edit(emotes[5]);
            break;
          case 6:
            m.edit(emotes[6]);
            break;
          case 7:
            m.edit(emotes[7]);
            break;
          case 8:
            m.edit(emotes[8]);
            break;
          case 9:
            m.edit(emotes[9]);
            break;
          case 10:
            m.edit(emotes[10]);
            break;
        }
      }
      
      for (let i=number_of_breaks;i<10;i++) {
        m.react("737855791171895308");
        let reaction = await m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] });
        if (reaction.first()._emoji.id == "737855791171895308") {
          m.reactions.resolve("737855791171895308").users.remove(message.author.id);
          checkValue();
          number_of_breaks++;
        } else {
          return m.edit(message.language.get("WORK_FAIL"));
        }
      }
      
      let pay = Math.round(Math.random()*15)+10;
      
      let acc = await wallet.findOne({ userID: message.author.id });
      
      let update = { credits: acc.credits+pay };
      
      await wallet.findOneAndUpdate({ userID: message.author.id }, update);
      
      m.edit(message.language.get("WORK_DONE", pay, acc.credits+pay));
      return;
  },
  
  1: async (message, wallet) => {
      let m = await message.sendLocale("LOAD_WORK");
      
      const filter = m => m.author.id === message.author.id;
      
      let code = ["let mut bruh = String::from(\"moment\");","() => console.log(\"owo\");","public static void owo() {}","new bruh.moment();","new owo.moe();","use cute::Astolfo::moe::*;","let kawaii = vec!['OwO', true, 13, 69];","println!(\"OwO\");","System.out.println(\"kawaii\");","const sun = require(\"tsu\");","import owo.uwu.*;","fn owo() -> &str {\nreturn \"uwu\"\n}"];
      
      let num = Math.round(Math.random()*code.length);
      
      while (code[num] == undefined) {
        num = Math.round(Math.random()*code.length);
      }
      
      
      m.edit(message.language.get("CS_WORK", code, num));
      
      let cunt = await m.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
      
      if (cunt.first().content.toLowerCase() != code[num].toLowerCase()) {
        return message.sendLocale("WORK_FAIL");
      }
      
      let pay = Math.round(Math.random()*15)+10;
      
      let acc = await wallet.findOne({ userID: message.author.id });
      
      let update = { credits: acc.credits+pay };
      
      await wallet.findOneAndUpdate({ userID: message.author.id }, update);
      
      m.edit(message.language.get("WORK_DONE", pay, acc.credits+pay));
  },
  
  /*
  three: async (message, wallet) => {
      const filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      
      let words = ["guardian","ghast","emerald","diamond sword", "diamond", "creeper", "blaze"];
      let emojis = ["<:astolfoGuardian:703305017637077143>","<:astolfoGhast:703305011920109610>","<:astolfoEmerald:703305007939715093>","<:astolfoDiamondSword:703305007264694394>","<:astolfoDiamond:703305007713484871>","<:astolfoCreeper:703305009571561472>","<:astolfoBlaze:703305014654795828>"];
      
      let emote_id = {
        "guardian": "703305017637077143",
        "ghast": "703305011920109610",
        "emerald": "703305007939715093",
        "diamond sword": "703305007264694394",
        "diamond": "703305007713484871",
        "creeper": "703305009571561472",
        "blaze": "703305014654795828"
      }
      
      let i = [Math.floor(Math.random()*words.length)];
      let emote = { word: words[i], emoji: emojis[i] };
      
      words.splice(i, 1);
      emojis.splice(i, 1);
      
      i = [Math.floor(Math.random()*words.length)];
      
      var emote1 = { word: words[i], emoji: emojis[i] };
      
      words.splice(i, 1);
      emojis.splice(i, 1);
      
      i = Math.floor(Math.random()*words.length);
      
      let finalWord = words[i];
      
      words.splice(i, 1);
      emojis.splice(i, 1);
      
      i = Math.floor(Math.random()*words.length);
      
      let finalEmoji = emojis[i];
      let emote2 = { word: finalWord, emoji: finalEmoji };
      
      var success = true;
      var list = [emote, emote1, emote2];
      var indexList = [0,1,2];
  
      let j;
  
      let shuffle = (arra1) => {
          var ctr = arra1.length, temp, index;
          while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
          }
          return arra1;
       }
       
       var list1 = shuffle(list);
  
       var word = finalWord;
       
       let msg = await message.sendLocale("MC_GAME", list1[0].emoji, list[0].word, list1[1].emoji, list1[1].word, list1[2].emoji, list1[2].word);
       
         msg.react(emote_id[list1[0].word]);
         msg.react(emote_id[list1[1].word]);
         msg.react(emote_id[list1[2].word]);
      
      return msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
        .catch(err => {
        msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** da emoji wazzzz \`${word}\`!!`)
        })
        .then(async answer => {
      
      if (answer.first()._emoji.id != emote_id[finalWord]) {
        msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** the emoji was \`${word}\`!!!`);
        return;
      }
      
      let pay = Math.round(Math.random()*15)+10;
      
      let acc = await wallet.findOne({ userID: message.author.id });
      
      let update = { credits: acc.credits+pay };
      
      await wallet.findOneAndUpdate({ userID: message.author.id }, update);
      
      msg.edit(message.language.get("WORK_DONE", pay, acc.credits+pay));
    });
  }
  */
}