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
    var userName;
    var miniuser = false;
    var miniusers = []
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
        miniusers.forEach((mini)=>{
        let script = mini.document.createElement('script');
        script.innerHTML = `sendMsg('${text}')`
        mini.document.body.appendChild(script)
        })
        }
    function joinmini(i){
    let mini = open('https://drednot.io/','miniguy '+i)
        let script = mini.document.createElement('script');
        script.innerHTML = `let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click()},1000)};miniuser=true;let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click()}});`
        mini.addEventListener('load',function(){mini.document.body.appendChild(script)});
        miniusers.push(mini);
    }
    function controlMini(msg){
        let args = msg.split(" ")
        if(!args[0]||!args[1]||!args[2])return sendMsg("there are three argeuments example: !bot join 1")
        if(args[1]==="leave"){
            if(typeof args[2] === 'number'){
            let mini = miniusers[args[2]]
            let script = mini.document.createElement('script')
            script.innerHTML = `window.close();`
            mini.document.body.appendChild(script)
            miniusers.splice(args[2], 1)
            }
            if(args[2]==="all"){
            miniusers.forEach((mini)=>{
            let script = mini.document.createElement('script')
            script.innerHTML = `window.close();`
            mini.document.body.appendChild(script)
            miniusers.splice(args[2], 1)
            })
            }
        }
        if(args[1]==="join"){
        for(let i =0;i<args[2];i++){
        joinmini(i)
        }
        }
        }

    function discordthingy(msg){
    sendDiscord(msg.slice(8));sendMsg("msg was sent to discord.gg/fVvvuCj3HK");
    }
    function shipjointhingy(){
    if(miniuser===true)return
    let mini = open('https://drednot.io/','miniguy '+Date.now())
        var script = mini.document.createElement('script');
        script.innerHTML = `miniuser=true;let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click();window.close();},1000)};let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click();sendMsg('the almighty ${userName} has joined your ship!')}});`
        mini.addEventListener('load', function() {mini.document.body.appendChild(script)});
    }
    function changeAccounts(){
        //logout from account
    let logoutbtn=Array.from(document.getElementsByTagName("button")).filter(btn=>btn.innerText==="Log Out")[0]
    if(typeof(logoutbtn)==="undefined"){
        let accpage = open('https://drednot.io/account/','account '+Date.now())
        let script = accpage.document.createElement('script');
        script.innerHTML = `show_key();let accName = Array.from(document.getElementsByClassName("user"))[0].innerText;let acckey = document.getElementById("key_box").innerText;Array.from(document.getElementsByName("confirm"))[0].value="confirm";Array.from(document.getElementsByTagName("button")).filter(btn=>btn.innerText==="Log Out")[0].click();document.getElementById("logout").click();close();`
        accpage.addEventListener('load',function() {accpage.document.body.appendChild(script)})
        accpage.addEventListener('onbeforeunload',function(){
            Array.from(document.getElementsByTagName("button")).filter(btn=>btn.innerText==="No, Play Anonymously")[0].click()
            Array.from(document.getElementsByClassName("sy-id")).filter(ship=>ship.innerText===shipid)[0].click()
        })
    }
    else logoutbtn.click()
    }
    function roles(msg){
    let args = msg.split(" ")
    let role = args[1]
    if(role==="cap"){
        let roleselec = Array.from(document.getElementsByTagName("select")).filter(selector=>Array.from(selector.options)[0].innerText==="Captain")
        roleselec.forEach((selec)=>{
        selec.value=3
            console.log(selec)
        selec.onchange()
        })
    }
    }
    function newMsg(msg){
        if(!msg.startsWith("!"))return
        if(msg.startsWith("!say")) return sendMsg(msg.slice(5))
        if(msg.startsWith("!shipid")) return sendMsg(shipid);
        if(msg.startsWith("!discord")) return discordthingy(msg);
        if(msg.startsWith("!bot")) return controlMini(msg);
        if(msg.startsWith("!account"))return changeAccounts();
        if(msg.startsWith("!roles"))return roles(msg);
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
    //shipjointhingy();
                })

})();
