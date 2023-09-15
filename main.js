(function(){
var c = document.createElement('style')
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
c.src = chrome.runtime.getURL('inject.css');
document.head.appendChild(s)
document.head.appendChild(c)    
})();
