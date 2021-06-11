const Discord = require('discord.js')
const secrets = require('./secrets.json')
const delay = require('delay')
const client = new Discord.Client()

client.on('voiceStateUpdate', async function(oldState, newState){
    if(newState.channel == null) {return}
    if(oldState.channel != null && oldState.channel.id == newState.channel.id) {return}

    console.log("--------------")
    console.log(`user: ${newState.member.nickname}, ${newState.member.id}`)
    if(oldState.channel != null){
          console.log(`old: ${oldState.channel.name}, ${oldState.channel.id}`)}
    else {console.log("old: none")}
    console.log(`new: ${newState.channel.name}, ${newState.channel.id}`)
    console.log("--------------")

    await delay(1000)

    if(!newState.deaf) {return}
    if(newState.channel == null) {return}
    if(newState.channel.parent.name == "undeafen"){
        chans = newState.channel.parent.children
        for(i = 0; i< chans.size; i++){
            chans.sweep(function(channel){
                return channel.id == newState.channel.id
            })
        }
        try{
            newState.member.voice.setChannel(chans.first())
        }
        catch{
            
        }
        
    }
})

client.on('rateLimit', function(data){
    console.log("--------------")
    console.log("Rate Limit")
    console.log(data)
    console.log("--------------")
})

client.on('ready', function(){
    console.log("Bot Online")
})

client.login(secrets.token)