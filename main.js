//created by quaint_racoon


(function() {
    'use strict';
    if(window.name.startsWith("miniguy")) return
    var shipid;
    var userName;
    var miniuser = false;
    var miniusers = [];
    let motdflipactive = false;
    let motdIntervId;
    window.addEventListener('load',()=>{
        userName= Array.from(document.getElementsByClassName("user"))[0].innerText;
        document.getElementById("disconnect-popup").innerHTML = `<div><h2>DISCONNECTED</h2>You were kicked from this ship. You might still be able to rejoin.<p><button class="btn-green">Return to Menu</button></p></div>`
    })
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
            "content": null,
  "embeds": [
    {
      "title": `{${shipid}}`,
      "description": msg,
      "color": 8459284,

    }],
  };
        request.send(JSON.stringify(params));
    }
    function sendMsg(text){
        send.click();
        textbar.value=text;
        setTimeout(()=>{send.click()},1000)
        miniusers.forEach((mini)=>{
        let script = mini.document.createElement('script');
        script.innerHTML = `sendMsg('${text}')`
        mini.document.body.append(script)
        })
        }
    function joinmini(i){
    let mini = open(window.location.href,'miniguy '+i)
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
            for(let i=0;i in miniusers;i++){
            let mini = miniusers[miniusers.length-(1+i)]
            let script = mini.document.createElement('script')
            script.innerHTML = `window.close();`
            mini.document.body.appendChild(script)
            }
             miniusers = []
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
    let mini = open(window.location.href,'miniguy '+Date.now())
        var script = mini.document.createElement('script');
        script.innerHTML = `miniuser=true;let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click();window.close();},1000)};let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click();sendMsg('the almighty ${userName} has joined your ship!')}});`
        mini.addEventListener('load', function() {mini.document.body.appendChild(script)});
    }
    function changeAccounts(){
        //logout from account
    let logoutbtn=Array.from(document.getElementsByTagName("button")).filter(btn=>btn.innerText==="Log Out")[0]
    if(typeof(logoutbtn)==="undefined"){
        let accpage = open(`${window.location.href}account/`,'account '+Date.now())
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
        teamAct('toggle_ui');
        let btns = Array.from(document.getElementsByTagName("button"))

            btns.filter(b=>b.innerText==="Crew Control & Log")[0].click()
            btns.filter(b=>b.innerText==="↻ Refresh List + Clear Filters")[0].click()

        setTimeout(()=>{

            teamAct('toggle_ui');

    let args = msg.split(" ")
    if(args.length<3) return sendMsg("there needs to be 2 arguements")
    let role = args[1]
    let val;
    let i = 0;
    if(role==="cap")val = 3
    if(role==="crew")val = 1
    if(role==="guest")val = 0

        let roleselec = Array.from(document.getElementsByTagName("select")).filter(selector=>Array.from(selector.options)[0].innerText.startsWith("Captain"))
        let totalroles = roleselec.length
        let done = 0
        let bar = document.createElement("div")
        bar.style.backgroundColor = "grey"
        bar.innerHTML = `<div id="countbar" style="position:absolute;"></div><div id="percbar" style="background-color:blue;height:30px;"></div>`
        bar.style=`background-color: grey;width: 300px;position: absolute;left: 50%;top: 100px;height: 30px;transform: translate(-50%, -50%);display: flex;align-items: center;justify-content: center;`
        document.body.append(bar)
        let percbar = document.getElementById("percbar")
        let countbar = document.getElementById("countbar")

        percbar.style.width = 0
        roleselec.forEach((selec)=>{
            i++;
            setTimeout(()=>{
            selec.value=val
            const event = new Event('change')
            selec.dispatchEvent(event)
            done+=1
            percbar.style.width =`${done/totalroles*300}px`
            countbar.innerText = `${done}/${totalroles}`
            if(done/totalroles == 1) {bar.remove()}
            },i*100)
        })
},300)
    }
    let antikickId;
    function toggleAntikick(msg){
        let args = msg.split(" ")
        if(args[1]==="false")return clearInterval(antikickId)
        if(args[1]==="true"){
        antikickId = setInterval(()=>{
            let error_ = document.getElementById("disconnect-popup")
            let errormsg=error_.childNodes[0].childNodes[1].nodeValue
            if(error_.style.display==="none")return//This ship is not available to join. It may have been saved.
            let ship =Array.from(document.getElementsByClassName("sy-id")).filter(ship=>ship.innerText==="{"+shipid+"}")
            if(errormsg==="You were banned from this ship. You can still join another ship or create your own.")return clearInterval(antikickId)
            if(errormsg==="This ship is not available to join. It may have been saved.")return clearInterval(antikickId);
            let returnbtn = error_.childNodes[0].childNodes[2]
            returnbtn.click()
            ship[0].click()
        },1000)
    }
    }

    function motd(val){

        if(motdflipactive){
        clearInterval(motdIntervId)
        motdflipactive = false
        }
        if(!motdflipactive){
        motdflipactive = true
        let words = [`!@#$%&\n${val}\n@#$%&!`,`#$%&!@\n${val}\n$%&!@#`,`%&!@#$\n${val}\n&!@#$%`,`#^&%*!\n${val}\n@%&*$`];
        motdIntervId=setInterval(function(){
            let word=Math.floor(Math.random()*words.length);
            editMotd();
            document.getElementById("motd-edit-text").value=words[word];
            saveMotd(true);}
            ,100)
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
        if(msg.startsWith("!antikick"))return toggleAntikick(msg);
        if(msg.startsWith("!motd")) return motd(msg.slice(6))

    };
    textbar.addEventListener('change',function(e){
            let msg = textbar.value
                newMsg(msg)
    });
    function log(msg){

    }
    chat.addEventListener('DOMNodeInserted',function(e){
        let msg = chat.lastChild
        log(msg)
        if(msg.childNodes.length==1&&typeof(msg.childNodes[0].childNodes[0].innerText)==="string"){
    shipid = msg.childNodes[0].childNodes[0].innerText;
    shipid= shipid.substring(shipid.indexOf("{") + 1, shipid.lastIndexOf("}"));
        }
    //shipjointhingy();
    setTimeout(()=>{
        if(msg.childNodes.length>1){
        let text = msg.childNodes[1]
        if(text.nodeName==="A"){
        let link = text.href
        if(link.startsWith("https://media.discordapp.net/attachments/")){
            let img = document.createElement("img")
        img.src = link
            img.style.display = "block"
            if(msg.childNodes.length>2)return
            msg.appendChild(img)
                chat.scrollY = chat.height
        }
            if(link.startsWith("https://drednot.io/invite/")){
                if(msg.done===true)return
                msg.done = true
                fetch(link)
                    .then(response => response.text())
                    .then(async (data) =>{
                    let html = await string2html(data)
                    let metas = Array.from(html.children).filter(a=>a.nodeName==="META")
                    let title = metas.filter(a=>a.attributes[0].value==="og:title")[0]
                    let image = metas.filter(a=>a.attributes[0].value==="og:image")[0]
                    let div = document.createElement("div")
                    div.style.display = "flex"
                    div.innerHTML = `<img src="${image.content}" width="150px" height="150px" style="padding:3px;"><div style="display:flex;flex-direction: column;align-items: center;justify-content: space-evenly;font-size:18px;"><strong>${title.content.slice(0, -13)}</strong><div style="display:flex;justify-content: center;align-items: center;width:100%;"><span>open in:</span><a href="${link}" target="_blank"><button style="margin:5px;" class="btn-small btn-orange">new tab</button></a><a href="${link}"><button class="btn-red btn-small">this tab</button></a></div></div>`
                    msg.appendChild(div)

                })
            }
        }
        }
    },500)
                })
    function string2html(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content
}

})();
