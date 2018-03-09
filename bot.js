const Discord = require('discord.js');
const util = require("util");
const client = new Discord.Client({ autofetch: [
        'MESSAGE_CREATE',
        'MESSAGE_UPDATE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
    ] });
const creator_id = '285372240198107136';
const bot_name = 'Critick';

/** @namespace process.env.PREFIX */
/** @namespace process.env.BOT_TOKEN */


function declOfNum(number, titles) {  
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function multipleReact(message, arr) {
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error);
        multipleReact(message,arr).catch(console.error);
    }
}

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


client.on('ready', () => {
	console.log('Bot loaded');
	client.user.setPresence({ game: { name: `как украсть аватарку`, type: 3 } }).catch();
});

client.on("message", async message => {

	if(message.author.bot) return;
    if(message.content.indexOf(process.env.PREFIX) !== 0) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();


	if (['скажи', 'say', 's'].includes(command) && message.author.id === creator_id) {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    let msg = message.channel.send(sayMessage).catch(()=>{message.reply('ты ебобо?');});
  	}

    if (['аватарка', 'ав', 'avatar', 'av'].includes(command)) {
		let member = message.mentions.members.first();
		if (!member) 
		return message.author.send({embed: {
				color: 16711680,
				title: "Ошибка кражи",
				description: `у тебя наверно украли мозг?я не дам аватарку :D.`,
				footer: {
				  	text: bot_name,
			  	},
			}});
		const embed = new Discord.RichEmbed()
		    .setTitle(`Аватарка пользователя ${member.user.tag}`)
		    .setImage(member.user.avatarURL)
		    .setFooter(bot_name)
		    .setColor(parseInt(getRandomInt(0,16777214)))
            .setDescription('Аватарка предоставлена по запросу '+ message.author);
		message.channel.send({embed});
		message.delete();
	}

    if (['emulate', 'terminal', 'eval', 'эмулировать', 'эвал', 'терминал'].includes(command) && message.author.id === creator_id) {
		try {
           let code = args.join(" ");
           let evaled = eval(code);
           message.guild.channels.get('416509595180072961').send('Был эмулирован код: \n```js\n' + code + '\n```');
       } catch (err) {
           message.channel.sendMessage(`\`ERROR\``);
       }
	}

    //Пример команды
    if (['help', 'название_команды_2', 'и_т.д.'].includes(command)) {
        //тут код комманды
    }
});

client.login(process.env.BOT_TOKEN).catch(err => {console.log(err)});
