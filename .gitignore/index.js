const Discord = require ('discord.js');
const queue = new Map();
const YTDL = require("ytdl-core");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg-binaries");

var prefix = ("O!");

var autorole = ("🌀- Visiteur");

var bienvenuem = ("Bienvenue");

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
        .setColor("#77B5FE")
        message.channel.sendEmbed(help_embed);
    });
}

bot.on("guildMemberAdd", member =>{
    if(!member.guild.roles.find('name', role)) return console.log("Role inconnu");
    member.addRole(member.guild.roles.find('name', autorole));
})

bot.on('ready', function() {
    bot.user.setGame("OyoRi | " + (bot.users.size - 1) + " Membre(s) | " + bot.guilds.size + " Serveur(s) !", "https://www.twitch.tv/Méliodas")
    console.log("Go");


bot.on("guildMemberAdd", member => {
    bot.user.setGame("OyoRi | " + (bot.users.size - 1) + " Membre(s) | " + bot.guilds.size + " Serveur(s) !", "https://www.twitch.tv/Méliodas")

})

bot.on("guildMemberAdd", member => {
    const embed = new Discord.RichEmbed()
      .setColor('#77B5FE')
      .setAuthor(member.user.tag, member.user.avatarURL)
      .setTitle("Un nouvel utilisateur vient d'arriver", `Il s'agit de [${member.user.tag}](https://discordapp.com/)`, true)
      .addField("Comment connaitre mon fonctionnement ? ", "Je t'invite a exécuter la command : " + prefix )
      .addField(`Nombre de membres après l'arrivée de ${member.user.tag}`, member.guild.memberCount)
      .setTimestamp()
member.guild.channels.find("name", bienvenuem).send({embed})

})

bot.on("guildMemberRemove", member => {
    const embed = new Discord.RichEmbed()
    bot.user.setGame("OyoRi | " + (bot.users.size - 1) + " Membre(s) | " + bot.guilds.size + " Serveur(s) !", "https://www.twitch.tv/Méliodas")
    .setColor('#77B5FE')
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setTitle("Départ d'un utilisateur")
    .addField("Il s'agit de : ", `[${member.user.tag}](https://discordapp.com/)`, true)
    .addField(`Nombre de membres après le départ de ${member.user.tag}`, member.guild.memberCount)
    .setTimestamp()
    member.guild.channels.find("name", bienvenuem).send({embed})
})

});

bot.login(process.env.TOKEN);

bot.on("message", function(message) {
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
               .setAuthor("✔ Musique en cours !")
               .setColor("#77B5FE")
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
            .setColor("#77B5FE")
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
             const serverQueue = queue.get(message.guild.id);
             var server = servers[message.guild.id];
             if (!serverQueue) return message.channel.send("Aucune musique est joué !")
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
     
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
            .addField("Erreur :", "Permission Refusé !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
    
        if(!member) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Utilisateur non mentionner / Invalide !")
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
            .setColor("#77B5FE")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            message.channel.sendEmbed(help_embed);
        
        }).catch(() => {
        }
        )
    }
    }


    if(message.content.startsWith(prefix + "Aide")){
        var help_embed = new Discord.RichEmbed()
        .setAuthor("✔ Tu vien de recevoir l'aide en message privé !")
        .setColor("#3AF24B")
        message.channel.sendEmbed(help_embed);
        var help_embed = new Discord.RichEmbed()
            .setColor('#77B5FE')
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription("Voici les commandes du bot !")
            .addField("O!ban (@Utilisateur) (Raison)", "Permet de bannir un utilisateur de votre discord !")
            .addField("O!kick (@Utilisateur) (Raison)", "Permet d'expulser un utilisateur de votre discord !")
            .addField("O!mute (@Utilisateur) (Raison)", "Permet de rendre muet un utilisateur de votre serveur discord !")
            .addField("O!unmute (@Utilisateur) (Raison)", "Permet de rendre unmuet un utilisateur de votre serveur discord !")
            .addField("O!Sondage (ex : Aimez-vous les pommes ?)", "Permet de faire des sondages ! - En maintenance !")
            .addField("O!InfoDiscord ", "Permet de vous donner les info du discord !")
            .addField("O!ping ", "Permet d'avoir le ping du discord ")
            .setTimestamp()
            message.author.sendEmbed(help_embed); 
    
    }

    if(message.content.startsWith(prefix + "ban")) {
        let Perm = message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR');
        var member= message.mentions.members.first();

        if(!Perm) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Permission Refusé !")
            .setColor("#850606")
            message.channel.sendEmbed(help_embed);
        }
    
        if(!member) {
            var help_embed = new Discord.RichEmbed()
            .setAuthor("❌ Erreur : ❌")
            .addField("Erreur :", "Utilisateur non Mentionner / Invalide !")
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
        .setColor("#77B5FE")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        message.channel.sendEmbed(help_embed);
        }).catch(() => {

        })
    }
    }
        if(message.content.startsWith(prefix + "changeprefix")){
            if(message.member.permissions.has('ADMINISTRATOR')){
                if(!args[0]) {
                    var help_embed = new Discord.RichEmbed()
                    .setAuthor("❌ Erreur : ❌")
                    .addField("Erreur :", "Veuillez mettre le prefix que vous voulez !")
                    .setColor("#850606")
                    message.channel.sendEmbed(help_embed);
                }
                if(args[0]) {
                    prefix = args[0]
                    var help_embed = new Discord.RichEmbed()
                    .setAuthor("✔ Succès : ")
                    .addField("Nouveau prefix :", `${args[0]}`)
                    .setColor("#77B5FE")
                    message.channel.sendEmbed(help_embed);               
                }  

    } 


    if(message.content.startsWith(prefix + "messagebienvenue")){
        if(message.member.permissions.has('ADMINISTRATOR')){
            if(!args[0]) {
                var help_embed = new Discord.RichEmbed()
                .setAuthor("❌ Erreur : ❌")
                .addField("Erreur :", "Veuillez mettre le channel de bienvenue que vous voulez !")
                .setColor("#850606")
                message.channel.sendEmbed(help_embed);
            }
            if(args[0]) {
                bienvenuem = args[0]
                var help_embed = new Discord.RichEmbed()
                .setAuthor("✔ Succès : ")
                .addField("Nouveau channel :", `${args[0]}`)
                .setColor("#77B5FE")
                message.channel.sendEmbed(help_embed);   
            }
  
        };

}}});
