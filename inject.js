//created by quaint_racoon
(function()
{
	'use strict';
	if (window.name.startsWith("miniguy")) return
	var shipid;
	var userName;
	var miniuser = false;
	var miniusers = [];
	let userMenu = document.createElement("div")
	let linkstarters = /^(https:\/\/|http:\/\/|youtube(\.com|\.co)\/watch\?v=|www\.|media\.discordapp\.net\/attachments)/gim
	const regexFileExtensions = "midi?|mp3|mpa|ogg|wav|wma|7z|deb|pkg|rar|gz|z|zip|bin|dmg|iso|csv|dat|dbf?|log|mdb|sav|sql|tar|xml|apk|bat|bin|exe|jar|msi|wsf|fnt|fon|otf|ttf|bmp|gif|ico|jpe?g|png|psd|svg|css|html?|js|php|py|c|class|java|cs|sh|swift|ico|sys|tmp|dll|icns|avi|flv|mkv|mov|mp4|mpe?g|swf|wmv|docx?|xlsx?|pptx?|pps|rtf|txt|pdf";
	const regexUrl = new RegExp(String.raw`(?<!@[^\s]*|<[^>]*)(?:https?:)?(?:(?:\/|&#x2F;)(?:\/|&#x2F;))?([\w.-]+[\w.-]\w\.(?!(?:${regexFileExtensions}|no)(?!\w))[a-zA-Z-_][\w\-_~:/?#[\]@!\$&'\(\)\*\+%,;=.]+)(?<!\.)`, "gi");
	userMenu.id = "userMenu"
	userMenu.classList = "darker"
    userMenu.style="display:none;"
	userMenu.innerHTML = '<h2 id="EPICheader">epic menu!</h2> <section class="usermenu-cap-section" id="capCommands" style="display:none;"><h3>captain commands</h3><button class="btn-small" id="promote">promote</button><select id="promoteVal" style="background: rgb(136, 255, 255);float:right;" onchange="Array.from(this.options).forEach((opt)=>{if(opt.value==this.value)this.style.background=opt.style.background})"><option value="3" style="background: rgb(136, 255, 255);">Captain</option><option value="1" style="background: rgb(255, 255, 136);">Crew</option><option value="0" style="background: rgb(204, 204, 204);">Guest</option></select><br><button class="btn-small" id="kick">kick</button><select id="kickVal" style="background: rgb(255, 255, 136); float: right;" onchange="Array.from(this.options).forEach((opt)=>{if(opt.value==this.value)this.style.background=opt.style.background})"><option value="1" style="background: rgb(255, 255, 136);">Crew</option><option value="0" style="background: rgb(204, 204, 204);">Guest</option></select><br><button id="EPICantiafk" class="btn-small">antiAFK</button><input type="text" id="EPICantiafkText" value="message here" style="font-size:14px;maxlength:250px"><br><button id="EPICmotd" class="btn-small">motd</button><input type="text" id="EPICmotdText" value="message here" style="font-size:14px;maxlength:250px"></section><br><section class="usermenu-normal-section" id="normalCommands"><h3>normal commands</h3><button class="btn-small" id="chat embeds">chat embeds</button><button class="btn-small" id="motd embeds">motd embeds</button></section>'
	let userMenuBtn = document.createElement("button")
	userMenuBtn.classList = "btn-blue btn-small"
	userMenuBtn.innerText = "Epic menu"
	userMenuBtn.addEventListener("click",()=>{toggleUI(userMenu)})
    
    const quick_save = document.createElement('button');
    quick_save.textContent = "quick Save";
    quick_save.classList='btn-small btn-red';
    quick_save.id = 'quick_save';
    quick_save.onclick = function(){ saveShip() }
    
    
	let shipPlayersMenu = document.createElement("div")
	shipPlayersMenu.style = "width:100%;position:absolute;"
	shipPlayersMenu.id = "shipPlayersMenu"
    
    function getUser(text){
        let output;
        let data = accountdata()
        if(text.startsWith("[")){
            output = text.substring(
                text.indexOf("] ") + 2,   
                text.indexOf(":")    
            );
        }else{
            output = text.substring(
                0,   
                text.indexOf(":")    
                );
        }
        fetch("https://drednots-database.quaint0racoon.repl.co/getuser", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
    },
  body: JSON.stringify({name:ouput,usercode:data.usercode,acc:data.acc})
}).then((data)=>{
            console.log(data)
            if(data.error) alert(data.error)
            if(data.verifycode){
                let code = prompt(data.verifycode)
                db.set("code",code)
                alert("code set up please retry to send another request now")
            }
            if(data.info){
                let div = document.createElement("div")
                div.class="popup"
                div.innerText=data.info
            }
        })
        
    }
    
    function saveShip(){
        teamAct('toggle_ui');
        teamAct('toggle_ui');
        Array.from(document.getElementsByTagName("button")).filter(b => b.innerText === "Ship Settings")[0].click()
        setTimeout(()=>{
        Array.from(document.getElementsByTagName("button")).filter(b => b.innerText === "Save Ship")[0].click()
        Array.from(document.getElementsByTagName("button")).filter(b => b.innerText === "Okay")[0].click()
        },100)
        
    }
    
    let loginsection = document.createElement("section")
    loginsection.innerHTML = "<h3>discord login</h3><div id='discordloginsection'><button id='discordloginbtn' class='btn-small btn-green'>login</button></div><div id='avatar' style='display:none;'><img id='avatarPFP'><p id='avatarTAG'></p><div>"    
    class DB {
        get(item){
            return JSON.parse(localStorage.getItem(item));
        }
        set(item,value){
            return localStorage.setItem(item, JSON.stringify(value));
        }
    }
    const db = new DB();
    function isCap(){
        return document.getElementById("team_manager_button").style.display!="none"
    }
    function accountdata(){
        return {usercode:db.get("code"),acc:(Array.from(document.getElementsByClassName("user"))[0].innerText)}
    }
    
    function loginToDrednotsDB(){
        fetch("https://drednots-database.quaint0racoon.repl.co/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
    },
  body: JSON.stringify(accountdata())
}).then(async (data)=>{
            return await data.json()
        }).then((data)=>{
            console.log(data)
            if(data.error) alert(data.error)
            if(data.verifycode){
                let code = prompt(data.verifycode)
                db.set("code",code)
            }
            if(data.user){
                document.getElementById("discordloginsection").style.display = "none"
                document.getElementById("avatar").style.display = "flex"
                document.getElementById("avatarPFP").src=data.user.avatarURL
                document.getElementById("avatarTAG").innerText=data.user.tag

            }
        })
    }
	function toggleUI(ui){
        ui.style.display = ui.style.display === 'none' ? '' : 'none';
    }
	window.addEventListener('load', () =>
	{
		   const observer = new MutationObserver(mutations => {
  if (mutations.some(mutation => {
    return Array.from(mutation.addedNodes).some(node => node.id=="shipyard")
  })) {
    setTimeout(() => { 
             let sectionmenu = document.getElementById("shipyard").firstChild
            sectionmenu.insertBefore(loginsection,Array.from(sectionmenu.children)[2])
        document.getElementById("discordloginbtn").addEventListener("click",()=>{loginToDrednotsDB()})
    }, 0)
    observer.disconnect()
  }
})

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true
})

        let exitBtn = document.getElementById("exit_button")
        exitBtn.parentElement.insertBefore(quick_save, exitBtn);
        
		let oldMotdText = document.getElementById("motd-text")
		let motdText = document.createElement("div")
        motdText.id="new-motd"
        oldMotdText.parentElement.insertBefore(motdText,oldMotdText)
        oldMotdText.style="display:none"
        new MutationObserver(async (list) =>
		{
            motdText.innerText=oldMotdText.innerText
		}).observe(oldMotdText,{childList: true});
        
        
            
            
        
        
     
        
        
        
        
		document.body.append(userMenu)
		let last_button = Array.from(document.getElementsByClassName("last-left"))[0]
		last_button.parentElement.insertBefore(userMenuBtn, last_button)
            
		document.getElementById("disconnect-popup").innerHTML = `<div><h2>DISCONNECTED</h2>You were kicked from this ship. You might still be able to rejoin.<p><button class="btn-green">Return to Menu</button></p></div>`
		let chat = document.getElementById("chat-content");
		let textbar = document.getElementById("chat-input");
		let send = document.getElementById("chat-send");
		let antiAfk = document.getElementById("EPICantiafk")
		let antiAfkText = document.getElementById("EPICantiafkText")
		let EPICmotd = document.getElementById("EPICmotd")
		let EPICmotdText = document.getElementById("EPICmotdText")
        let chatembeds = document.getElementById("chat embeds")
        let MOTDembeds = document.getElementById("motd embeds")
        
        let settings = db.get("settings")||{chatEmbeds:true,MotdEmbeds:true}
        function changeSettings(key){
            settings[key] = !settings[key]
            db.set("settings",settings)
        }
        
		let words = [
			`!@#$%&\n${EPICmotdText.value}\n@#$%&!`,
			`#$%&!@\n${EPICmotdText.value}\n$%&!@#`,
			`%&!@#$\n${EPICmotdText.value}\n&!@#$%`,
			`#^&%*!\n${EPICmotdText.value}\n@%&*$`
		];
		EPICmotdText.addEventListener("change", () =>
		{
			words = [
				`!@#$%&\n${EPICmotdText.value}\n@#$%&!`,
				`#$%&!@\n${EPICmotdText.value}\n$%&!@#`,
				`%&!@#$\n${EPICmotdText.value}\n&!@#$%`,
				`#^&%*!\n${EPICmotdText.value}\n@%&*$`
			];
		})
        
       
		async function playerscounter()
		{
            let btns = Array.from(document.getElementsByTagName("button"))
			let crewcontrol = btns.filter(b => b.innerText === "Crew Control & Log")[0]
            if(!crewcontrol.classList.value.split(" ").includes("btn-green"))return
			let allplayers = Array.from(document.getElementById("team_players_inner").firstChild.lastChild.children)
			let banned = 0;
			let cap = 0;
			let crew = 0;
			let guest = 0;
            
			allplayers.forEach((player) =>
			{
				player = player.lastChild.firstChild
				if (player.innerText.toLowerCase().startsWith("banned")) return banned += 1
				if (player.innerText.toLowerCase().startsWith("captain") && player.nodeName != "SELECT") return cap += 1
				switch (player.value)
				{
					case "3":
						cap += 1;
						break;
					case "1":
						crew += 1;
						break;
					case "0":
						guest += 1;
						break;
				}
			})
			return {
				banned,
				cap,
				crew,
				guest
			}
		}
		document.getElementById("team_manager_button").addEventListener("click", async () =>
		{
			setTimeout(async () =>
			{
				if (document.getElementById("team_menu").style.display == "none") return;
				document.getElementById("team_players_inner").parentElement.insertBefore(shipPlayersMenu, document.getElementById("team_players_inner"))
				document.getElementById("team_players_inner").style.top = "100px"
				let players = await playerscounter()
				shipPlayersMenu.innerHTML = `<span style=" background: rgb(136, 255, 255); ">Captain: ${players.cap}</span> <span style=" background: rgb(255, 255, 136); ">Crew: ${players.crew}</span> <span style=" background: rgb(204, 204, 204); ">Guest: ${players.guest}</span> <span style=" background: rgb(255, 50, 50); ">Banned: ${players.banned}</span>`
			}, 500)
		})
		addEventListener("keydown", function(event)
		{
			let key = event.code
			let target = event.target
			if (target != document.body) return
			switch (key)
			{
				case "KeyE":
					toggleUI(userMenu)
			}
		})
		let antiAfkId
		antiAfk.addEventListener("click", function()
		{
			if (!antiAfk.classList.toggle("btn-green")) return clearInterval(antiAfkId)
			antiAfkId = setInterval(function()
			{
				sendMsg(antiAfkText.value)
			}, 10000)
		})
        
        
        
		
		function sendMsg(text)
		{
			send.click();
			textbar.value = text;
			setTimeout(() =>
			{
				send.click()
			}, 1000)
			miniusers.forEach((mini) =>
			{
				let script = mini.document.createElement('script');
				script.innerHTML = `sendMsg('${text}')`
				mini.document.body.append(script)
			})
		}

		function joinmini(i)
		{
			let mini = open(window.location.href, 'miniguy ' + i)
			let script = mini.document.createElement('script');
			script.innerHTML = `let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click()},500)};miniuser=true;let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click()}});`
			mini.addEventListener('load', function()
			{
				mini.document.body.appendChild(script)
			});
			miniusers.push(mini);
		}

		function controlMini(msg)
		{
			let args = msg.split(" ")
			if (!args[0] || !args[1] || !args[2]) return sendMsg("there are three argeuments example: !bot join 1")
			if (args[1] === "leave")
			{
				if (typeof args[2] === 'number')
				{
					let mini = miniusers[args[2]]
					let script = mini.document.createElement('script')
					script.innerHTML = `window.close();`
					mini.document.body.appendChild(script)
					miniusers.splice(args[2], 1)
				}
				if (args[2] === "all")
				{
					for (let i = 0; i in miniusers; i++)
					{
						let mini = miniusers[miniusers.length - (1 + i)]
						let script = mini.document.createElement('script')
						script.innerHTML = `window.close();`
						mini.document.body.appendChild(script)
					}
					miniusers = []
				}
			}
			if (args[1] === "join")
			{
				for (let i = 0; i < args[2]; i++)
				{
					joinmini(i)
				}
			}
		}

		function discordthingy(msg)
		{
			sendDiscord(msg.slice(8));
			sendMsg("msg was sent to discord.gg/fVvvuCj3HK");
		}

		function shipjointhingy()
		{
			if (miniuser === true) return
			let mini = open(window.location.href, 'miniguy ' + Date.now())
			var script = mini.document.createElement('script');
			script.innerHTML = `miniuser=true;let textbar = document.getElementById("chat-input");let send = document.getElementById("chat-send");function sendMsg(text){send.click();textbar.value=text;setTimeout(()=>{send.click();window.close();},500)};let ships = Array.from(document.getElementsByClassName("sy-id")); ships.forEach((ship)=>{;if(ship.innerText === '{${shipid}}'){ship.click();sendMsg('the almighty ${userName} has joined your ship!')}});`
			mini.addEventListener('load', function()
			{
				mini.document.body.appendChild(script)
			});
		}

		function changeAccounts()
		{
			//logout from account
			let logoutbtn = Array.from(document.getElementsByTagName("button")).filter(btn => btn.innerText === "Log Out")[0]
			if (typeof(logoutbtn) === "undefined")
			{
				let accpage = open(`${window.location.href}account/`, 'account ' + Date.now())
				let script = accpage.document.createElement('script');
				script.innerHTML = `show_key();let accName = Array.from(document.getElementsByClassName("user"))[0].innerText;let acckey = document.getElementById("key_box").innerText;Array.from(document.getElementsByName("confirm"))[0].value="confirm";Array.from(document.getElementsByTagName("button")).filter(btn=>btn.innerText==="Log Out")[0].click();document.getElementById("logout").click();close();`
				accpage.addEventListener('load', function()
				{
					accpage.document.body.appendChild(script)
				})
				accpage.addEventListener('onbeforeunload', function()
				{
					Array.from(document.getElementsByTagName("button")).filter(btn => btn.innerText === "No, Play Anonymously")[0].click()
					Array.from(document.getElementsByClassName("sy-id")).filter(ship => ship.innerText === shipid)[0].click()
				})
			}
			else logoutbtn.click()
		}
		document.getElementById("promote").addEventListener("click", function()
		{
			teamAct('toggle_ui');
            teamAct('toggle_ui');
			let btns = Array.from(document.getElementsByTagName("button"))
			btns.filter(b => b.innerText === "Crew Control & Log")[0].click()
			btns.filter(b => b.innerText === "↻ Refresh List + Clear Filters")[0].click()
			let val = document.getElementById("promoteVal").value
			setTimeout(() =>
			{
				let roleselec = Array.from(document.getElementsByTagName("select")).filter(selector => Array.from(selector.options)[0].innerText.startsWith("Captain"))
				let totalroles = roleselec.length
				let done = 0
				let bar = document.createElement("div")
				bar.style.backgroundColor = "grey"
				bar.innerHTML = `<div class="countbar" style="position:absolute;"></div><div class="percbar" style="background-color:blue;height:30px;"></div>`
				bar.style = `background-color: grey;width: 300px;position: absolute;left: 50%;top: 100px;height: 30px;transform: translate(-50%, -50%);display: flex;align-items: center;justify-content: center;`
				document.body.append(bar)
				let percbar = bar.getElementsByClassName("percbar")[0]
				let countbar = bar.getElementsByClassName("countbar")[0]
				let i = 0;
				percbar.style.width = 0
				roleselec.forEach((selec) =>
				{
					i++;
					setTimeout(() =>
					{
						selec.value = val
						const event = new Event('change')
						selec.dispatchEvent(event)
						done += 1
						percbar.style.width = `${done/totalroles*300}px`
						countbar.innerText = `${done}/${totalroles}`
						if (done / totalroles == 1)
						{
							bar.remove()
						}
					}, i * 100)
				})
			}, 1000)
		})
        document.getElementById("kick").addEventListener("click", function()
		{
			teamAct('toggle_ui');
            teamAct('toggle_ui');
			let btns = Array.from(document.getElementsByTagName("button"))
			btns.filter(b => b.innerText === "Crew Control & Log")[0].click()
			btns.filter(b => b.innerText === "↻ Refresh List + Clear Filters")[0].click()
			let val = document.getElementById("kickVal").value
			setTimeout(() =>
			{
				let roleselec = Array.from(document.getElementById("team_players_inner").firstChild.lastChild.children).filter(s=>s.firstChild.firstChild!==null&&s.lastChild.children.length>1&&s.lastChild.firstChild.value==val)
                console.log(roleselec)
				let totalroles = roleselec.length
				let done = 0
				let bar = document.createElement("div")
				bar.style.backgroundColor = "grey"
				bar.innerHTML = `<div id="countbar" style="position:absolute;"></div><div id="percbar" style="background-color:blue;height:30px;"></div>`
				bar.style = `background-color: grey;width: 300px;position: absolute;left: 50%;top: 100px;height: 30px;transform: translate(-50%, -50%);display: flex;align-items: center;justify-content: center;`
				document.body.append(bar)
				let percbar = document.getElementById("percbar")
				let countbar = document.getElementById("countbar")
				let i = 0;
				percbar.style.width = 0
				roleselec.forEach((selec) =>
				{
                    selec.lastChild.lastChild.firstChild.click()
					i++;
					setTimeout(() =>
					{
						selec
						done += 1
						percbar.style.width = `${done/totalroles*300}px`
						countbar.innerText = `${done}/${totalroles}`
						if (done / totalroles == 1)
						{
							bar.remove()
						}
					}, i * 100)
				})
			}, 1000)
		})
		let EPICmotdId;
		EPICmotd.addEventListener("click", function()
		{
			if (!EPICmotd.classList.toggle("btn-green")) return clearInterval(EPICmotdId)
			EPICmotdId = setInterval(function()
			{
				let word = Math.floor(Math.random() * words.length);
				editMotd();
				document.getElementById("motd-edit-text").value = words[word];
				saveMotd(true);
			}, 100)
		})

		function newMsg(msg)
		{
			if (!msg.startsWith("!")) return
			if (msg.startsWith("!say")) return sendMsg(msg.slice(5))
			if (msg.startsWith("!shipid")) return sendMsg(shipid);
			if (msg.startsWith("!discord")) return discordthingy(msg);
			if (msg.startsWith("!bot")) return controlMini(msg);
			if (msg.startsWith("!account")) return changeAccounts();
		};
		textbar.addEventListener('change', function(e)
		{
			let msg = textbar.value
			newMsg(msg)
		});
		const motdTextObserver = new MutationObserver(async (list) =>
		{
			motdTextObserver.disconnect();
			if(settings.MotdEmbeds)await URLmodifier(motdText)
			motdTextObserver.observe(motdText,
			{
				childList: true
			});
		});
		
        
		const chatObserver = new MutationObserver((list) =>
		{
			let msg = chat.lastChild
             if (!/Joined ship/gi.test(msg.innerText)){
                  if(!/^\[SYSTEM\] (.+)$/mi.test(msg.innerText)){
                      msg.addEventListener("dblclick",()=>{
                          getUser(msg.innerText)
                      })
                  }
             }
            if(settings.chatEmbeds) URLmodifier(msg)

		})
        
        
        function URLmodifier(msg){
            if (/Joined ship/gi.test(msg.innerText))
			{
                teamAct('toggle_ui');
                teamAct('toggle_ui');
				shipid = msg.childNodes[0].childNodes[0].innerText;
				shipid = shipid.substring(shipid.indexOf("{") + 1, shipid.lastIndexOf("}"));
        
                
                    document.getElementById("capCommands").style.display = isCap()? "":"none"
                    document.getElementById("quick_save").style.display = isCap()? "":"none"
                return;
			}
            if(/^\[SYSTEM\] (.+)$/mi.test(msg.innerText))return
            
            
					let words = msg.innerText.split(/(\r\n|\r|\n| )/g)
					let links = words.filter(r => linkstarters.test(r))
					if (links.length < 1) return;
            msg.innerHTML = msg.innerHTML.replace(regexUrl, function(text,link){return`<div class="link-wrapper"><a href="${text}" target="_blank">🔗${text}</a></div>`})
					links.forEach((link) =>
					{
						
                        if (link.startsWith("https://media.discordapp.net/attachments/" || "media.discordapp.net/attachments"))
						{
							let div = document.createElement("div")
							div.classList = "embed"
							div.innerHTML = `<div class="fixed-wrapper"><image src="${link}" style="display:block;"></image></div>`
							Array.from(document.getElementsByClassName("link-wrapper")).filter(l=>l.children.length<2).filter(l=>l.firstChild.href==link)[0].appendChild(div)
                            chat.scrollY = chat.height
						}
						if (link.startsWith("https://drednot.io/invite/"))
						{
							fetch(link)
								.then(response => response.text())
								.then(async (data) =>
								{
									let html = await string2html(data)
									let metas = Array.from(html.children).filter(a => a.nodeName === "META")
									let title = metas.filter(a => a.attributes[0].value === "og:title")[0]
									let image = metas.filter(a => a.attributes[0].value === "og:image")[0]
									let div = document.createElement("div")
                                    div.classList = "embed"
									div.innerHTML = `<div class="fixed-wrapper"><img src="${image.content}" width="150px" height="150px" style="padding:3px;"><div style="display:flex;flex-direction: column;align-items: center;justify-content: space-evenly;font-size:18px;"><strong>${title.content.slice(0, -13)}</strong><div style="display:flex;justify-content: center;align-items: center;width:100%;"><span>open in:</span><a href="${link}" target="_blank"><button style="margin:5px;" class="btn-small btn-orange">new tab</button></a><a href="${link}"><button class="btn-red btn-small">this tab</button></a></div></div></div>`
							Array.from(document.getElementsByClassName("link-wrapper")).filter(l=>l.children.length<2).filter(l=>l.firstChild.href==link)[0].appendChild(div)
								})
						}
						if (/.*youtu\.*be(\.com)*\/watch\?v=/gim.test(link))
						{
							let div = document.createElement("div")
							div.classList = "embed video"
                            div.innerHTML = `<div class="fixed-wrapper"><iframe src="${link.replace("watch?v=","embed/")}" style=" aspect-ratio: 16/9; height: 150px; " allowfullscreen></iframe></div>`
							Array.from(document.getElementsByClassName("link-wrapper")).filter(l=>l.children.length<2).filter(l=>l.firstChild.href==link)[0].appendChild(div)
                            
						}
					})
                }
        
        
		

		function string2html(html)
		{
			var template = document.createElement('template');
			html = html.trim();
			template.innerHTML = html;
			return template.content
		}
        
        function startMotd(){
            
            MOTDembeds.classList.toggle("btn-green")
        }
        function startChat(){
            
            chatembeds.classList.toggle("btn-green")
        }
            motdTextObserver.observe(motdText,{childList: true,});
        chatObserver.observe(chat,{characterData: false,attributes: false,childList: true,subtree: false});
        if(settings.chatEmbeds) startChat()
        if(settings.MotdEmbeds) startMotd()
        
        MOTDembeds.onclick= ()=>{
            changeSettings("MotdEmbeds")
            MOTDembeds.classList.toggle("btn-green")
            alert("reload to see changes")
        }
        chatembeds.onclick= ()=>{
            changeSettings("chatEmbeds")
            chatembeds.classList.toggle("btn-green")
            alert("reload to see changes")
        }
	})
})();
