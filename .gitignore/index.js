const Discord = require ('discord.js');
const bot = new Discord.Client();

var prefix = ("k!")

bot.on('ready', function() {
    bot.user.setGame("キルア | k! | NoxLord  ", 'https://www.twitch.tv/gotaga')
    console.log("Go");

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "bienvenue").send(`Bienvenue  ${member.user.username} sur le discord de NoxLord !`)
})

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Joueur")
    member.addRole(role)
})
    
    
bot.on("guildMemberRemove", member =>{
        member.guild.channels.find("name", "bienvenue").send(`A plus ${member.user.username} reviens quand tu veux dans le discord de NoxLord !`) 
})

});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if(message.content.startsWith("^^^^purge")){

        message.channel.bulkDelete(99).then(() =>{
            message.channel.send(``).then(msg => msg.delete(99))
        });

        var help_embed = new Discord.RichEmbed()
        .setColor('#D473D4')
        .setTitle("**Information :**                         ")
        .addBlankField()
        .addField("Commande :", "Purge                               ")
        .addField("Exécuteur : ", "" + message.member + "              ")
        .addBlankField()
        .addField("Info :", "Purge = - 99 Messgaes ")
        message.channel.sendEmbed(help_embed);
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR'))
            message
        var member= message.mentions.members.first();
        if(!member) {
            return message.reply("Utilisateur introuvable / Impossible a expulser / Aucun Utilisateur a été détecté !").catch(console.error);
        }
        if(!args[1]) return message.reply("Veuillez mettre la raison du kick !");
        // Kick
        member.kick().then((member) => {
            var help_embed = new Discord.RichEmbed()
            .setColor('#D473D4')
            .setTitle("**Informations Kick :**")
            .addBlankField()
            .addField("**Utilisateur kick :**",  "" + member.displayName + "" )
            .addField("**Exécuteur :**", "" + message.member + "" )
            .addField("**Raison :**", `${args[1]}` )
            .addBlankField()
            message.channel.sendEmbed(help_embed);
        }).catch(() => {
        })
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(message.guild.members.get(message.author.id).permissions.has('ADMINISTRATOR'))
        var member= message.mentions.members.first();
        if(!member) {
            return message.reply("Utilisateur introuvable / Impossible a expulser / Aucun Utilisateur a été détecté !").catch(console.error);
        }
        if(!args[1]) return message.reply("Veuillez mettre la raison du bannisement !");
        // Ban
        member.ban().then((member) => {
        // Successmessage
        var help_embed = new Discord.RichEmbed()
        .setColor('#D473D4')
        .setTitle("**Informations Bannisement :**")
        .addBlankField()
        .addField("**Utilisateur banni :**",  "" + member.displayName + "" )
        .addField("**Exécuteur :**", "" + message.member + "" )
        .addField("**Raison :**", `${args[1]}` )
        .addBlankField()
        message.channel.sendEmbed(help_embed);
        }).catch(() => {

        })
    }
    if(message.content === prefix + 'renchannel'){
        var interval = setInterval (function (){
              message.guild.channels.find('id',"433977187545120768")
              .setName("🎌 NoxLord 🎌 👥 "+`${message.guild.members.filter(m => m.presence.status !== 'offline').size} / ${message.guild.memberCount}`+"");
        }, 1000); // intervalle entre les envoi de packet
        console.log("Commande Renchannel demandée !");
    }

    if (message.content === prefix + 'Aide'){
        message.reply ("Tu vien de recevoir l'aide en message privé !");
        var help_embed = new Discord.RichEmbed()
            .setColor('#D473D4')
            .setAuthor("Help | Aide | キルア ", 'https://orig00.deviantart.net/4c8f/f/2014/134/0/e/profile_picture_by_kirua_zoldyk-d7ibe7e.png')
            .addBlankField()
            .addField("k!ban (@Utilisateur) (Raison)", "Permet de bannir un utilisateur de votre discord !")
            .addField("k!kick (@Utilisateur) (Raison)", "Permet d'expulser un utilisateur de votre discord !")
            .addField("k!Sondage (ex : Aimez-vous les pommes ?)", "Permet de faire un sondage !")
            .addField("k!InfoDiscord ", "Permet de vous donner les info du discord !")
            .addField("k!Twitter ", "Permet de vous donner le Twitter du serveur et celui de KiruaHan !")
            .addField("k!Recrutement ", "Vous donne les critères de recrutement ainsi que d'autre informations au sujet du recrutement staff ! - Soon")
            .addField("k!Partenaire ", "Vous donne le nom de tout nos partenaire !")
            .addField("k!ping ", "Permet de vous donner votre ping ! - Soon")
            .addBlankField()
            .setFooter("Fait par キルア - Han")
            message.author.sendEmbed(help_embed); 
    
    }

    if(message.content === prefix + "ping"){
        const then = Date.now();
        message.channel.send('Pinging...').then(m =>{
            m.edit(`Ping du bot : ${bot.ping}ms`);
        });
    }

    if(message.content === prefix + "Discordinfo"){
        var help_embed = new Discord.RichEmbed()
            .setAuthor("Informations Discord | キルア ", 'https://orig00.deviantart.net/4c8f/f/2014/134/0/e/profile_picture_by_kirua_zoldyk-d7ibe7e.png')
            .addBlankField()
            .addField("Nom du discord : " , message.guild.name)
            .addField("Crée le : " , message.guild.createdAt)
            .addField("Tu nous a rejoin le : " , message.member.joinedAt)
            .addField("Ce discord possèdent " , message.guild.memberCount + " Utilisateurs")
            .addField("Ping bot : " , `${bot.ping}ms`)
            .addBlankField()
            .setColor("#F58800")
            message.channel.sendEmbed(help_embed);

    }

    if (message.content === prefix ){
        var help_embed = new Discord.RichEmbed()
            .setColor('#D473D4')
            .setAuthor("キルア ", 'https://orig00.deviantart.net/4c8f/f/2014/134/0/e/profile_picture_by_kirua_zoldyk-d7ibe7e.png')
            .addBlankField()
            .addField("k!Aide", "Permet de vous donner tout les commandes disponnibles !")
            .addBlankField()
            message.channel.sendEmbed(help_embed);
    }

    if (message.content === prefix + "Partenaire"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#D473D4')
            .setAuthor("キルア ", 'https://orig00.deviantart.net/4c8f/f/2014/134/0/e/profile_picture_by_kirua_zoldyk-d7ibe7e.png')
            .addBlankField()
            .addField("Partenaires :", "Aucun Partenaire !")
            .addBlankField()
            message.channel.sendEmbed(help_embed);
    
    }

    if (message.content === prefix + "Twitter"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#D473D4')
            .setAuthor("キルア ", 'https://orig00.deviantart.net/4c8f/f/2014/134/0/e/profile_picture_by_kirua_zoldyk-d7ibe7e.png')
            .addBlankField()
            .addField("Twitter :", 'Twitter de KiruaHan : Soon\nTwitter du serveur : Soon')
            .addBlankField()
            message.channel.sendEmbed(help_embed);
    
    };
});
