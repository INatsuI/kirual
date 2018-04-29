const Discord = require ('discord.js');
const queue = new Map();
const YTDL = require("ytdl-core");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg-binaries");

var prefix = ("M!");


var servers = {};


function play(connection, message) {
    var server = servers[message.guild.id];
       
       server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
       
       server.queue.shift();
       
       server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
        var help_embed = new Discord.RichEmbed()
        .setAuthor("✔ Deconection de la Musique !")
        .setColor("#3AF24B")
        message.channel.sendEmbed(help_embed);
    });
}



bot.on('ready', function() {
    bot.user.setGame("Méliodas | メリオダス | " + (bot.users.size - 1) + " Membre(s) | " + bot.guilds.size + " Serveur(s) !", "https://www.twitch.tv/Méliodas")
    console.log("Go");


bot.on("guildMemberAdd", member => {
    bot.user.setGame("Méliodas | メリオダス | " + (bot.users.size - 1) + " Membre(s) | " + bot.guilds.size + " Serveur(s) !", "https://www.twitch.tv/Méliodas")

})


});

bot.login(process.env.TOKEN);

bot.on("message", function(message, song) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "play":
            if (!args[1]) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Veuillez mettre un lien !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);             
                return;
            }
            if(!message.member.voiceChannel) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Vous devez être dans un salon vocal ! !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);             
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
               var help_embed = new Discord.RichEmbed()
               .setAuthor("✔ Musique en cours !", song.title)
               .setColor("#3AF24B")
               message.channel.sendEmbed(help_embed);
            });
        break;    
      
        case "skip":
             if(!message.member.voiceChannel) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Vous devez être dans un salon vocal !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);   
                return;
            }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            var help_embed = new Discord.RichEmbed()
            .setAuthor("✔ Musique Skip !")
            .setColor("#3AF24B")
            message.channel.sendEmbed(help_embed);
        break;    
      
        case "stop":
             if(!message.member.voiceChannel) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Vous devez être dans un salon vocal !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);             
                return;
            }
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
     
        break;

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
            case "intertchat":
            let xoargs = message.content.split(" ").slice(1);
            let xo03 = xoargs.join(" ")
            var xo01 = bot.channels.findAll('name', 'intertchat');
            var xo02 = message.guild.channels.find('name', 'intertchat');
            if(!xo02) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Channel intertchat introuvable  !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);                  
            }
            if (message.channel.name !== 'intertchat') {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Commande non executé dans le channel : intertchat  !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);                 
            }
            if(!xo03) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Message non écrit  !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed); 
            }
            if (message.channel.name == 'intertchat')   
                if(xo03) {
                         var replysg = [
                             '#850606'
                         ];
                     
                         let reponseg = (replysg[Math.floor(Math.random() * replysg.length)])
              
            var embedxo = new Discord.RichEmbed()
            .setColor(reponseg)
            .setTitle("Message - Intertchat")
            .addField("Pseudo de l'utilisateur", message.author.username)
            .addField("Discord de l'utilisateur", message.guild.name)
            .addField("Message", xo03)
            .setTimestamp()
        bot.channels.findAll('name', 'intertchat').map(channel => channel.send(embedxo))
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
                 case "botinfo":
                 var embedbot = new Discord.RichEmbed()
                     .setDescription("Information - BotInfo")
                     .addField("Versions", `0.1.5`)
                     .addField(`Fait par :`, `Drilen`)
                     .setColor("#850606")
                 message.channel.sendEmbed(embedbot)
                
                break;
                case "chat":

                var replys = [
                    'http://www.snut.fr/wp-content/uploads/2015/11/image-de-chat-4.jpg', 
                    'https://www.wikichat.fr/wp-content/uploads/sites/2/comment-soigner-une-plaie-dun-chat.jpg',
                    'https://www.assuropoil.fr/wp-content/uploads/assurance-chat-assurer-son-chat1.jpg',
                    'https://fr.cdn.v5.futura-sciences.com/buildsv6/images/wide1920/0/0/d/00dd1479a5_108485_chat-domestique.jpg',
                    'https://t1.uc.ltmcdn.com/fr/images/1/4/4/img_pourquoi_mon_chat_miaule_beaucoup_2441_600.jpg',
                    'https://www.doitinparis.com/files/2017/news-art-de-vivre/10/royal-canin/royal-canin-chat.jpg',
                    'https://jardinage.lemonde.fr/images/dossiers/2017-10/chat-160446.jpg',
                    'http://www.maxitendance.com/wp-content/uploads/2017/11/quimera-chat-chimere-instagram-1.jpg',
                    'https://static.wamiz.fr/images/articles/facebook/article/chats-fb-593eb532d4b9c.jpg',
                    'http://medias.psychologies.com/storage/images/planete/les-animaux-et-nous/articles-et-dossiers/penser-chat/327462-6-fre-FR/Penser-chat_imagePanoramique647_286.jpg'
                ];

                let reponse = (replys[Math.floor(Math.random() * replys.length)])
                    var Chat = new Discord.RichEmbed()
                    .setImage(reponse)
                message.channel.send(Chat)
                break;
                case "invite":
                var embedbot = new Discord.RichEmbed()
                    .addField("L'invitation : ", `https://discordapp.com/api/oauth2/authorize?client_id=438448612389814272&permissions=8&scope=bot`)
                message.channel.sendEmbed(embedbot)
               
               break;
                
            }
        
        }              
);

bot.on("message", async function(message) {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();


    if(message.content.startsWith(prefix + "kick")) {
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        var member= message.mentions.members.first();

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
    
        if(!member) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Utilisateur non mentionner !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
        if(Perm) {

        member.kick().then((member) => {
            var help_embed = new Discord.RichEmbed()
            .addField("Commande :", "Kick")
            .addField("Utilisateur :", member.displayName)
            .addField("Modérateur :", message.member)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#F6DC12")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
        
        }).catch(() => {
        }
        )
    }
    }


    if (message.content.startsWith(prefix + "userinfo") || message.content.startsWith(prefix + "ui")){
        let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
let member = message.guild.member(user);
let roles = [];
if (member.roles.size > 0) {
    member.roles.forEach(r => {
        if(
    !r.name.includes("everyone")
)
    {
        roles.push(r.name);
    }
})
} else {
    roles = "Aucun role pour le moment";
}
let ttt = (member.roles.size > 0) ? roles.length : "0";
let wato = (roles.length > 0) ? roles.join(", ") : "None";
let game = (!!user.presence && user.presence !== null && user.presence.game !== null && user.presence.game.name !== null) ? user.presence.game.name : "Rien"
let embed = {
    author: {
        name: user.username,
        icon_url: (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
    },
    color: 0xC3FE01,
    thumbnail: {
        url: (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
    },
    fields: [{
        name: "Utilisateur",
        value: user.username + "#" + user.discriminator,
        inline: true
    }, {
        name: "ID",
        value: user.id,
        inline: true
    }, {
        name: "Nickname",
        value: (member.nickname !== null) ? member.nickname : user.username,
        inline: true
    }, {
        name: "Jeux",
        value: "Joue a : " + game,
        inline: true
    }, {
        name: "Status",
        value: (user.presence !== null && user.presence.status !== null) ? user.presence.status : "Offline",
        inline: true
    }, {
        name: "Rejoins Le",
        value: member.joinedAt.toString(),
        inline: true
    }, {
        name: "Compte Crée Le",
        value: user.createdAt,
        inline: true
    }, {
        name: "Roles (" + ttt + ")",
        value: wato,
        inline: true
    }]
}
message.channel.send("", {
    embed
});
    }    

    if(message.content.startsWith(prefix + "ban")) {
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        var member= message.mentions.members.first();

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Tu n'a pas la permission !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
    
        if(!member) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Utilisateur non mentionner !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
        if(Perm) {
        // Ban
        member.ban().then((member) => {
        // Successmessage
        var help_embed = new Discord.RichEmbed()
        .addField("Commande :", "Ban")
        .addField("Utilisateur :", member.displayName)
        .addField("Modérateur :", message.member)
        .addField("Heure:", message.channel.createdAt)
        .setColor("#F6DC12")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        message.channel.sendEmbed(help_embed);
        }).catch(() => {

        })
    }
    } 

    if(message.content === prefix + "ping"){
        const then = Date.now();
        message.channel.send('Ping en cours !').then(m =>{
            var help_embed = new Discord.RichEmbed()
            .addField("Ping :", `${bot.ping}`)
            .setColor("#F6DC12")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
        });
    }

    if(message.content === prefix + "Support"){
            var help_embed = new Discord.RichEmbed()
            .addField("Discord :", "https://discord.gg/E8TVJY6")
            .setColor("#F6DC12")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
    }

    if (message.content.startsWith(prefix + "Aide") || message.content.startsWith(prefix + "aide")){
        var help_embed = new Discord.RichEmbed()
        .setAuthor("Informations :")
        .addField("Tu vien de recevoir l'aide en message privée !", "✔")
        .setColor("#3AF24B")
        message.channel.sendEmbed(help_embed);
        message.react("📩")
        var help_embed = new Discord.RichEmbed()
            .setColor('#F6DC12')
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("⛔ Modérateur", "```- M!ban\n- M!kick\n- M!clear\n- M!unban (En dév)\n- M!mute (En dév)\n- M!unmute (En Dév)\n- M!warn (En dév) ```")
            .addField("🔥 Général", "```- M!Support\n- M!ui\n- M!intertchat\n- M!invite  ```")
            .addField("🎉 Fun", "```- M!avatar\n- M!ping\n- M!chat (Non Api)\n- M!Dog (Non Api) (En dév) ```")
            .addField("🎵 Musique", "```- M!play (Lien Youtube)\n- M!skip\n- M!stop ```")
            .addField("💦 NSFW", "```- M!boobs (En Dév) ```")
            .setTimestamp()
            message.author.sendEmbed(help_embed); 
    }
});
