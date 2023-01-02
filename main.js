// ==UserScript==
// @name         drednot bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://drednot.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=drednot.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var shipid;
    var userName
    window.addEventListener('onload',()=>{userName= Array.from(document.getElementsByClassName("user"))[0].innerText;})
    let chat = document.getElementById("chat-content");
    let current_chat = chat.innerHTML;
    let textbar = document.getElementById("chat-input");
    let send = document.getElementById("chat-send");
    function sendDiscord(msg){
    const request = new XMLHttpRequest();
request.open("POST", "https://discord.com/api/webhooks/1059542540510048336/CTnXtQwbj8bYbXuRuKK0NBfaf2vNMUb3nJkkvY7SFHJopVLNFKNO7O-1LkGDZa5DQtxu");
        let avatarUrl = "https://media.discordapp.net/attachments/845217484860030999/1059543864119152693/266495196622094336_7eLhT8SQxirx.gif?width=395&height=395"
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
            "username":"drednot bot feed" ,
            "avatar_url":avatarUrl ,
            "content" : msg };
        request.send(JSON.stringify(params));
    }
    function sendMsg(text){
        send.click();
        textbar.value=text;
        setTimeout(()=>{send.click()},1000)
        }
    function joinmini(){
        let mini = open('https://drednot.io/','miniguy '+Date.now())
        var script = mini.document.createElement('script');
        script.innerHTML = `let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click()}});`
        mini.onload= function() {mini.document.body.appendChild(script)};
    }
    function discordthingy(msg){
    sendDiscord(msg.slice(8));sendMsg("msg was sent to discord.gg/fVvvuCj3HK");
    }
    function shipjointhingy(){
    if(name.startsWith("miniguy"))return
    let mini = open('https://drednot.io/','miniguy '+Date.now())
        var script = mini.document.createElement('script');
        script.innerHTML = `let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click();window.close();},1000)};let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click();sendMsg('the almighty ${userName} has joined your ship!')}});`
        mini.addEventListener('load', function() {mini.document.body.appendChild(script)});
    }
    function newMsg(msg){
        if(!msg.startsWith("!"))return
        if(msg.startsWith("!say")) return sendMsg(msg.slice(4))
        if(msg.startsWith("!shipid")) return sendMsg(shipid);
        if(msg.startsWith("!discord")) return discordthingy(msg);
        if(msg.startsWith("!join")) return joinmini();
    };
    textbar.addEventListener('change',function(e){
            let msg = textbar.value
                newMsg(msg)
    });
    chat.addEventListener('DOMNodeInserted',function(e){
        let msg = chat.lastChild
        if(msg.childNodes.length>1||typeof(msg.childNodes[0].childNodes[0].innerText)!="string")return

    shipid = msg.childNodes[0].childNodes[0].innerText;
    shipid= shipid.substring(shipid.indexOf("{") + 1, shipid.lastIndexOf("}"));
    shipjointhingy();
                })

})();
