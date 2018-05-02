const Discord = require ('discord.js');
const bot = new Discord.Client();
const Fortnite = require("fortnite")
const ft = new Fortnite('957da0fc-0278-4d0b-883d-5346fb02bcaa');
const sf = require('snekfetch');
const snek = require("snekfetch");
const ansicolors = require("ansicolors");
const Hentai = require("hentai.js");

const hentaiClient = new Hentai();




var prefix = ("C!")

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "נσυευя")
    member.guild.channels.find("name", "bienvenue").send(`Hey ${member.user.username}, Bienvenue sur le discord de Le Royaume de Celestia !`)
    member.addRole(role)
})


bot.on("guildMemberRemove", member =>{
    member.guild.channels.find("name", "bienvenue").send(`Bye bye ${member.user.username} !`)

})


bot.on('ready', function() {
    bot.user.setGame("Celestia | " + (bot.users.size - 1) + " Membre(s) ", "https://www.twitch.tv/Méliodas")
    console.log("Go");


bot.on("guildMemberAdd", member => {
    bot.user.setGame("Celestia | " + (bot.users.size - 1) + " Membre(s) ", "https://www.twitch.tv/Méliodas")

})


});


bot.login(process.env.TOKEN);


bot.on("message", function(message, song) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "clear":
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("Erreur")})}
            break;

            case "avatar":
            if (!message.mentions.users.first()) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Mentionner quelqu'un  !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);   
            }
            if (message.mentions.users.first()) {
                let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
                let ava = user.displayAvatarURL
                let embed = {
                color:0x000000,
                description:"Photo d'utilisateur de "+user.username+"",
                image:{url:ava}
                }
            message.channel.send("", {embed})
            break;
            }
            case "8ball":
            let argsed = message.content.split(" ").slice(1);
            let tte = argsed.join(" ")
            if (!tte) {
               var help_embed = new Discord.RichEmbed()
               .setAuthor("❌ Merci de poser une question.  !")
               .setColor("#850606")
               message.channel.sendEmbed(help_embed);   
           }
           if (tte) {
                         var replys8 = [
                             '#F407FC', 
                             '#034EEF',
                             '#09F4D1',
                             '#09F14E',
                             '#E7EF07',
                             '#F5A718',
                             '#FB4B06',
                             '#FB2702',
                             '#F6F4F3',
                             '#201F1F'
                         ];
                     
                         let reponse8 = (replys8[Math.floor(Math.random() * replys8.length)])
     
                var replys = [
                "Oui",
                "Non",
                "Je ne sais pas",
                "Peut-être",
                "Probablement",
                "c vrai !",
                "Wallah je sais pas"
                ];
            
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var ballembed = new Discord.RichEmbed()
                .setDescription(":8ball: 8ball")
                .addField("Question", tte)
                .addField("Réponse", reponse)
                .setColor(reponse8)
            message.channel.sendEmbed(ballembed)
            break;
            }
            }
            
        }
    
        
);


bot.on("message", async function(message, result, reject) {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (message.author.equals(bot.user)) return;
 
    if (!message.content.startsWith(prefix)) return;


    if(message.content.startsWith(prefix + "createrole") || message.content.startsWith(prefix + "cr")) {
        let argson = message.content.split(" ").slice(1);
        let namerole = argson.join(" ")
        if(!message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR')) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);             
        }

        if(message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR'))
                if(!namerole) {
                    var help_embed = new Discord.RichEmbed()
                    .setAuthor("❌ Erreur : ❌")
                    .addField("GayNoSécurité :", "Nivaeu 0")
                    .addField("Erreur :", "Tu n'a pas mis le nom du role !")
                    .setColor("#850606")
                    message.channel.sendEmbed(help_embed); 
            }
            if(message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR'))
                if(namerole) {
                    message.guild.createRole({name: namerole,})
                    var help_embed = new Discord.RichEmbed()
                    .setAuthor("✔️ Succès :")
                    .addField("Role :", `${namerole}`)
                    .setColor("#800080")
                    message.channel.sendEmbed(help_embed);  
            }
        }
    
    if(message.content.startsWith(prefix + "Candy")) {
        var help_embed = new Discord.RichEmbed()
        .setDescription("Tien un bonbon :D")
        .setImage("http://33.media.tumblr.com/d6f19c25149fd69fc06e2a14276d349f/tumblr_n3k5ui8iWt1rveihgo1_500.gif")
        .setColor("#850606")
        message.channel.sendEmbed(help_embed);  

    }

    if(message.content.startsWith(prefix + "Bob")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/bob?url=${message.author.displayAvatarURL}`,
              name: `bob.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Blood")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/blood?url=${message.author.displayAvatarURL}`,
              name: `blood.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Beautiful")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/beautiful?url=${message.author.displayAvatarURL}`,
              name: `beautiful.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Wasted")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/wasted?url=${message.author.displayAvatarURL}`,
              name: `wasted.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Tobecontinued")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/tobecontinued?url=${message.author.displayAvatarURL}`,
              name: `tobecontinued.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Convmatrix")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/convmatrix?url=${message.author.displayAvatarURL}`,
              name: `convmatrix.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Invert")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/invert?url=${message.author.displayAvatarURL}`,
              name: `invert.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Illuminati")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/illuminati?url=${message.author.displayAvatarURL}`,
              name: `illuminati.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }

    if(message.content.startsWith(prefix + "Triggered")) {
        message.channel.send({
            files:[{
              attachment: `http://triggered-api.tk/api/v2/triggered?url=${message.author.displayAvatarURL}`,
              name: `triggered.gif`
            }]
            
          }).catch(err => { if(err) return message.channel.send("**:x: Une erreur s'est produite**") }) 

    }


    if(message.content.startsWith(prefix + "4k")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
            var replys = [
                "http://www.wallsexy.net/wp-content/uploads/2016/09/fonds-ecran-images-sexy-photoshop-de-femmes-nues-04-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2017/01/fonds-ecran-images-sexy-blonde-bombasse-porno-16-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2016/10/fonds-ecran-images-sexy-chikita-nue-et-sexy-94-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2016/03/amy-se-masturbe-avec-un-vibrateur-18-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2016/02/blonde-pulpeuse-se-caresse-la-chatte-15-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2017/12/fonds-ecran-images-sexy-belles-salopes-brune-03-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2016/12/fonds-ecran-images-sexy-brunette-bombasse-sexy-14-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2016/03/aspen-se-masturbe-le-cul-et-la-chatte-15-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2017/02/fonds-ecran-images-sexy-etudiantes-brunette-nues-03-660x330.jpg",
                "http://www.wallsexy.net/wp-content/uploads/2017/01/fonds-ecran-images-sexy-etudiante-qui-prefere-baiser-13-660x330.jpg"
            ];
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var embed = new Discord.RichEmbed()
            .setColor('#800080')
            .setImage(reponse)
         nsfw.send({embed})
        }
    }
  

    if(message.content.startsWith(prefix + "Ass")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
            var replys = [
                    "http://www.wallsexy.net/wp-content/uploads/2017/01/fonds-ecran-images-sexy-gros-seins-de-jolies-bombasses-09-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2017/01/fonds-ecran-images-sexy-blonde-bombasse-porno-16-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/12/fonds-ecran-images-sexy-2-mecs-pour-la-bombasse-01-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/12/fonds-ecran-images-sexy-2-bombasses-blanche-pour-un-black-12-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/12/fonds-ecran-images-sexy-brunette-bombasse-sexy-14-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2018/01/fonds-ecran-images-sexy-une-bouteille-dans-le-cul-07-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2017/12/fonds-ecran-images-sexy-deux-penis-dans-le-cul-09-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2017/02/fonds-ecran-images-sexy-simony-diamond-se-fait-enculer-13-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/11/fonds-ecran-images-sexy-Jolie-cul-de-femmes-noires-02-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/11/fonds-ecran-images-sexy-femmes-mature-avec-un-jolie-cul-14-660x330.jpg"
                ];
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setImage(reponse)
             nsfw.send({embed})
            }
        }

    if(message.content.startsWith(prefix + "boobs")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
            var replys = [
                    "http://www.wallsexy.net/wp-content/uploads/2017/02/fonds-ecran-images-sexy-photoshop-de-gros-seins-06b-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2017/01/fonds-ecran-images-sexy-gros-seins-de-jolies-bombasses-09-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/12/fonds-ecran-images-sexy-gros-seins-jeune-femme-12-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/11/fonds-ecran-images-sexy-gros-seins-de-salope-noire-20-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/08/fonds-ecran-images-sexy-gros-seins-femme-sexy-08-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/08/fonds-ecran-images-sexy-jeunette-avec-des-seins-parfais-14-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/08/fonds-ecran-images-sexy-seins-de-jolies-rousses-14-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/05/fonds-ecran-images-sexy-petits-seins-amateurs-19-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/02/anette-dawn-et-ses-jolies-seins-10-660x330.jpg",
                    "http://www.wallsexy.net/wp-content/uploads/2016/02/jolie-femme-et-gros-seins-09-660x330.jpg"
                ];
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setImage(reponse)
             nsfw.send({embed})
            }
        }
    

    if(message.content.startsWith(prefix + "Fuck")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
            var replys = [
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/gifs-anim%C3%A9s-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-de-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/gif-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/position-du-kamasutra-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/kamasutra-la-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/kamasutra-la-levrette.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/levrette-debout.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/levrette-exterieur.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/levrette-%C3%A0-plusieurs.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2017/10/gif-anim%C3%A9-levrette-en-couple.gif"
                ];
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setImage(reponse)
             nsfw.send({embed})
            }
        }

    if(message.content.startsWith(prefix + "Suck")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
            var replys = [
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-fellation.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-anime-fellation.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-ejac-faciale.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-fellation-69.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/animation-fellation.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/fellation-plaisir.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/fellation-pleine-nature.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/fellation-pipe.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/faire-une-fellation.gif",
                    "https://www.rencontresanslendemain.net/wp-content/uploads/2018/01/gif-de-fellation.gif"
                ];
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setImage(reponse)
             nsfw.send({embed})
            }
        }



    if(message.content.startsWith(prefix + "Hentai")) {
        const nsfw = message.guild.channels.find(m => m.name === "nsfw");
        if (!nsfw) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'est pas dans un salon NSFW !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);              
        }
        if(nsfw) {
                var replys = [
                    "https://images.sex.com/images/pinporn/2018/04/11/300/19353548.gif",
                    "https://images.sex.com/images/pinporn/2018/04/02/300/19317076.gif",
                    "https://images.sex.com/images/pinporn/2018/04/05/300/19329798.gif",
                    "https://images.sex.com/images/pinporn/2018/03/18/300/19257302.gif",
                    "https://images.sex.com/images/pinporn/2018/03/17/300/19257050.gif",
                    "https://images.sex.com/images/pinporn/2018/04/05/300/19329924.gif",
                    "https://images.sex.com/images/pinporn/2018/04/06/300/19335137.gif",
                    "https://images.sex.com/images/pinporn/2018/03/13/300/19240110.gif",
                    "https://images.sex.com/images/pinporn/2018/03/17/300/19254702.gif",
                    "https://images.sex.com/images/pinporn/2018/03/12/300/19236921.gif"
                ];
                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                var embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setImage(reponse)
             nsfw.send({embed})
            }
        }

        if(message.content.startsWith(prefix + "chat")) {
            var replys = [
                "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/326875/pexels-photo-326875.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/315582/pexels-photo-315582.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/22346/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/115011/cat-face-close-view-115011.jpeg?auto=compress&cs=tinysrgb&h=350"
            ];
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var embed = new Discord.RichEmbed()
            .setColor('#800080')
            .setImage(reponse)
        message.channel.send(embed)
    }

        if(message.content.startsWith(prefix + "dog")) {
            var replys = [
                "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/159541/wildlife-photography-pet-photography-dog-animal-159541.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/89775/dog-hovawart-black-pet-89775.jpeg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/9080/night-garden-yellow-animal.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&h=350"
            ];
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var embed = new Discord.RichEmbed()
            .setColor('#800080')
            .setImage(reponse)
          message.channel.send({embed})
    }

        if (message.content.startsWith(prefix + "Aide") || message.content.startsWith(prefix + "aide")){
            message.react("📩")
            var help_embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("🔨 Commandes du bot Celestia (En Dév)")
                .addField("⛔ Modérateur", "```- C!ban\n- C!kick\n- C!clear\n- C!unban (En dév)\n- C!mute (En dév)\n- C!unmute (En Dév)\n- C!warn (En dév) ```")
                .addField("🔥 Général", "```- C!Support  ```")
                .addField(":gear: Gestion du serveur", "```- C!createrole  ```")
                .addField("🎉 Fun", "```- C!avatar\n- C!ping\n- C!chat \n- C!Dog\n- C!Invert\n- C!Convmatrix\n- C!Tobecontinued\n- C!Wasted\n- C!Beautiful\n- C!Blood\n- C!Bob\n- C!Triggered\n- C!Illuminati\n- C!Candy```")
                .addField("🎵 Musique", "```- C!play (Lien Youtube) (En Dév)\n- C!skip (En Dév)\n- C!stop (En Dév) ```")
                .addField("💦 NSFW", "```- C!boobs\n- C!4k\n- G!Ass\n- G!Fuck\n- G!Suck\n- G!Kiss ```")
                .setTimestamp()
                message.author.sendEmbed(help_embed); 
        }

    if(message.content === prefix + "mute"){
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        let Membermute = message.guild.member(message.mentions.users.first());

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);            
        }

        if(Perm)
            if(!Membermute){
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Erreur : ❌")
                .addField("GayNoSécurité :", "Nivaeu 0")
                .addField("Erreur :", "Tu doit mentionner quelqu'un !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);    
            }
        if(Perm)
            if(Membermute) {
                message.guild.Membermute.overwritePermissions(Membermute, { SEND_MESSAGES: false }).then(Membermute => {
                    var help_embed = new Discord.RichEmbed()
                    .addField("Commande :", "Mute")
                    .addField("Utilisateur :", member.displayName)
                    .addField("Modérateur :", message.member)
                    .setColor("#800080")
                    .setTimestamp()
                    message.channel.sendEmbed(help_embed);            
                })
            }

        
    }

    if(message.content === prefix + "ping"){
        const then = Date.now();
            var help_embed = new Discord.RichEmbed()
            .addField("Ping :", `${bot.ping}`)
            .setColor("#800080")
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
    }

    if(message.content === prefix + "Support"){
        var help_embed = new Discord.RichEmbed()
        .addField("Discord :", "https://discord.gg/E8TVJY6")
        .setColor("#800080")
        .setTimestamp()
        message.channel.sendEmbed(help_embed);
}





    if(message.content.startsWith(prefix + "kick")) {
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        var member = message.mentions.members.first();           

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
        if(Perm)
            if(!member) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Erreur : ❌")
                .addField("GayNoSécurité :", "Nivaeu 0")
                .addField("Erreur :", "Utilisateur non mentionner !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);
        }


        if(Perm) 
            if(member) {


        member.kick().then((member) => {
            var help_embed = new Discord.RichEmbed()
            .addField("Commande :", "Kick")
            .addField("Utilisateur :", member.displayName)
            .addField("Modérateur :", message.member)
            .setColor("#800080")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
        
        }).catch(() => {
        }
        )
    }
    }

    if(message.content.startsWith(prefix + "ban")) {
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        var member = message.mentions.members.first();           

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
        if(Perm)
            if(!member) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Erreur : ❌")
                .addField("GayNoSécurité :", "Nivaeu 0")
                .addField("Erreur :", "Utilisateur non mentionner !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);
        }


        if(Perm) 
            if(member) {


        member.ban().then((member) => {
            var help_embed = new Discord.RichEmbed()
            .addField("Commande :", "ban")
            .addField("Utilisateur :", member.displayName)
            .addField("Modérateur :", message.member)
            .setColor("#800080")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
        
        }).catch(() => {
        }
    )
    

} 

if(message.content.startsWith(prefix + "giverole") || message.content.startsWith(prefix + "gr")) {
    message.delete(message.author)
    let membergiverole = message.mentions.members.first()
    if(!membergiverole){
        var help_embed = new Discord.RichEmbed()
        .setAuthor("❌ Erreur : ❌")
        .addField("GayNoSécurité :", "Nivaeu 0")
        .addField("Erreur :", "Tu a mentionner personne !")
        .setColor("#850606")
        message.channel.sendEmbed(help_embed);                
    }
    let namerole = message.mentions.roles.first();
    if(!namerole) {
        var help_embed = new Discord.RichEmbed()
        .setAuthor("❌ Erreur : ❌")
        .addField("GayNoSécurité :", "Nivaeu 0")
        .addField("Erreur :", "Veuillez mettre un role a give !")
        .setColor("#850606")
        message.channel.sendEmbed(help_embed);    
    }
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);                    
        }
        if(!message.guild.member(message.author.id).hasPermission("MANAGE_ROLES")) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("GayNoSécurité :", "Nivaeu 0")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);    
        }
        if(message.guild.member(message.author.id).hasPermission("MANAGE_ROLES")) {
            if(namerole) {
                membergiverole.addRole(namerole)
                var help_embed = new Discord.RichEmbed()
                .setAuthor("✔️ Succès :")
                .addField("Role :", `${namerole}`)
                .addField("Donné à :", `${membergiverole}`)
                .setColor("#800080")
                message.channel.sendEmbed(help_embed);  
            }
    }

}}});
