//created by quaint_racoon


(function() {
    'use strict';
    if(window.name.startsWith("miniguy")) return
    var shipid;
    var userName;
    var miniuser = false;
    var miniusers = [];
    let userMenu = document.createElement("div")
    let linkstarters = ["https://","http://","youtube","www.","media.discordapp.net/attachments"]
    userMenu.id = "userMenu"
    userMenu.classList="darker"
    userMenu.style="padding: 10px; left: 20px; bottom: 100px; position: fixed; z-index: 100;display:none"
    userMenu.innerHTML='<h2 id="EPICheader">epic menu!</h2> <button class="btn-small" id="promote">promote</button><select id="promoteVal" style="background: rgb(136, 255, 255);right: 10px;position: absolute;" onchange="Array.from(this.options).forEach((opt)=>{if(opt.value==this.value)this.style.background=opt.style.background})"><option value="3" style="background: rgb(136, 255, 255);">Captain</option><option value="1" style="background: rgb(255, 255, 136);">Crew</option><option value="0" style="background: rgb(204, 204, 204);">Guest</option></select><br><button id="EPICantiafk" class="btn-small">antiAFK</button><input type="text" id="EPICantiafkText" value="message here" style="font-size:14px;maxlength:250px"><br><button id="EPICmotd" class="btn-small">motd</button><input type="text" id="EPICmotdText" value="message here" style="font-size:14px;maxlength:250px">'
    
    let userMenuBtn = document.createElement("button")
    userMenuBtn.classList = "btn-blue btn-small"
    userMenuBtn.innerText = "Epic menu"
    userMenuBtn.addEventListener("click",function(){
        userMenu.style.display = userMenu.style.display === 'none' ? '' : 'none';
    })
    
    let shipPlayersMenu = document.createElement("div")
    shipPlayersMenu.style = "width:100%;position:absolute;"
    
    window.addEventListener('load',()=>{
        document.body.append(userMenu)
        let last_button = Array.from(document.getElementsByClassName("last-left"))[0]
        last_button.parentElement.insertBefore(userMenuBtn,last_button)
        userName= Array.from(document.getElementsByClassName("user"))[0].innerText;
        document.getElementById("disconnect-popup").innerHTML = `<div><h2>DISCONNECTED</h2>You were kicked from this ship. You might still be able to rejoin.<p><button class="btn-green">Return to Menu</button></p></div>`
    let chat = document.getElementById("chat-content");
    let current_chat = chat.innerHTML;
    let textbar = document.getElementById("chat-input");
    let send = document.getElementById("chat-send");
        let antiAfk= document.getElementById("EPICantiafk")
        let antiAfkText = document.getElementById("EPICantiafkText")
        let EPICmotd = document.getElementById("EPICmotd")
        let EPICmotdText = document.getElementById("EPICmotdText")
        let words = [
            `!@#$%&\n${EPICmotdText.value}\n@#$%&!`,
            `#$%&!@\n${EPICmotdText.value}\n$%&!@#`,
            `%&!@#$\n${EPICmotdText.value}\n&!@#$%`,
            `#^&%*!\n${EPICmotdText.value}\n@%&*$`
        ];
        
        EPICmotdText.addEventListener("change",()=>{
            words = [
                `!@#$%&\n${EPICmotdText.value}\n@#$%&!`,
                `#$%&!@\n${EPICmotdText.value}\n$%&!@#`,
                `%&!@#$\n${EPICmotdText.value}\n&!@#$%`,
                `#^&%*!\n${EPICmotdText.value}\n@%&*$`
            ];
        })
        
        async function playerscounter(){
            let allplayers = Array.from(document.getElementById("team_players_inner").firstChild.lastChild.children)
            let banned=0;
            let cap=0;
            let crew=0;
            let guest=0;
            allplayers.forEach((player)=>{
                player = player.lastChild.firstChild
                if(player.innerText.toLowerCase().startsWith("banned"))return banned+=1
                if(player.innerText.toLowerCase().startsWith("captain")&&player.nodeName!="SELECT")return cap+=1
                switch(player.value){
                    case "3":
                        cap+=1;
                        break;
                    case "1":
                        crew+=1;
                        break;
                    case "0":
                        guest+=1;
                        break;
                }
            })
            return {banned,cap,crew,guest}
        }
        
        document.getElementById("team_manager_button").addEventListener("click",async ()=>{ 
            setTimeout(async ()=>{
                if(document.getElementById("team_menu").style.display=="none")return;
        document.getElementById("team_players_inner").parentElement.insertBefore(shipPlayersMenu,document.getElementById("team_players_inner"))
        document.getElementById("team_players_inner").style.top="100px"
            let players = await playerscounter()
            shipPlayersMenu.innerHTML = `<span>Captain: ${players.cap}</span> <span>Crew: ${players.crew}</span> <span>Guest: ${players.guest}</span> <span>Banned: ${players.banned}</span>`
            
            },500)
        })
        
        addEventListener("keydown",function(event){
            let key = event.code
            let target = event.target
            if(target != document.body)return
            switch(key){
                case "KeyE":
                    userMenu.style.display = userMenu.style.display === 'none' ? '' : 'none';
            }
        })
        
        let antiAfkId
        antiAfk.addEventListener("click",function(){
            if(!antiAfk.classList.toggle("btn-green"))return clearInterval(antiAfkId)
            antiAfkId = setInterval(function(){
                sendMsg(antiAfkText.value)
            },10000)
            
        })
        
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
        setTimeout(()=>{send.click()},500)
        miniusers.forEach((mini)=>{
        let script = mini.document.createElement('script');
        script.innerHTML = `sendMsg('${text}')`
        mini.document.body.append(script)
        })
        }
    function joinmini(i){
    let mini = open(window.location.href,'miniguy '+i)
        let script = mini.document.createElement('script');
        script.innerHTML = `let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click()},500)};miniuser=true;let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click()}});`
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
        script.innerHTML = `miniuser=true;let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click();window.close();},500)};let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click();sendMsg('the almighty ${userName} has joined your ship!')}});`
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
    document.getElementById("promote").addEventListener("click",function(){
        teamAct('toggle_ui');
        let btns = Array.from(document.getElementsByTagName("button"))

            btns.filter(b=>b.innerText==="Crew Control & Log")[0].click()
            btns.filter(b=>b.innerText==="↻ Refresh List + Clear Filters")[0].click()
        let val = document.getElementById("promoteVal").value
        setTimeout(()=>{

            teamAct('toggle_ui');

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
        let i = 0;
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
},1000)
    })
        let EPICmotdId;
    EPICmotd.addEventListener("click",function(){
        
        if(!EPICmotd.classList.toggle("btn-green"))return clearInterval(EPICmotdId)
        EPICmotdId=setInterval(function(){
            let word=Math.floor(Math.random()*words.length);
            editMotd();
            document.getElementById("motd-edit-text").value=words[word];
            saveMotd(true);}
            ,100)
        
        })
    function newMsg(msg){
        if(!msg.startsWith("!"))return
        if(msg.startsWith("!say")) return sendMsg(msg.slice(5))
        if(msg.startsWith("!shipid")) return sendMsg(shipid);
        if(msg.startsWith("!discord")) return discordthingy(msg);
        if(msg.startsWith("!bot")) return controlMini(msg);
        if(msg.startsWith("!account"))return changeAccounts();

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
        let words = msg.innerText.split(" ")
        if(!linkstarters.some(r=> words.indexOf(r) >= 0))return console.log("no link found",words)
        let link = words.filter(r=>linkstarters)
        if(link.startsWith("https://media.discordapp.net/attachments/"||"media.discordapp.net/attachments")){
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
//<iframe src="${src}" style=" aspect-ratio: 16/9; height: 150px; "></iframe>
                })
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
})

})();
