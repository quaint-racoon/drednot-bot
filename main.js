// ==UserScript==
// @name         New Userscript
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

    let chat = document.getElementById("chat-content");
    let current_chat = chat.innerHTML;
    let textbar = document.getElementById("chat-input");
    let send = document.getElementById("chat-send");
    function sendMsg(text){
        send.click();
        textbar.value = text;
        send.click();
    }
    function newMsg(msg){
        if(!msg.startsWith("!"))return
        if(msg.startsWith("!say")) return sendMsg(msg.slice(4))
    };
    //chat.addEventListener("DOMSubtreeModified",function(e){
      //  let new_chat = chat.innerHTML;
        //if(new_chat.length != current_chat.length){
          //  let msg = new_chat.slice(current_chat.length);
            //newMsg(msg); current_chat = new_chat;
        //}}
    //);
    document.addEventListener('keydown',function(e){
        if(e.code === "Enter"){
        textbar.value
        let msg = chat.lastChild
        let sender = msg.childNodes[0]
        let content = msg.childNodes[1].nodeValue
        newMsg(content)
        }
    });
    sendMsg()
})();
