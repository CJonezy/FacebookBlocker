// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var myNewUrl = "https://www.facebook.com/";


chrome.runtime.onInstalled.addListener(function() {
 

});


function main(){

	//alert("main ran");
}

main();

//alert("running");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(){


	console.log("buttonClicked");
}


chrome.webNavigation.onBeforeNavigate.addListener(handler);

function handler(details) {
  
}

//chrome.webNavigation.onHistoryStateUpdated.addListener(callback);



// function callback(details) {

  
  
//   chrome.tabs.getSelected(null,function(tab) {
//     		var tablink = tab.url;
//     		if(tablink == "https://www.facebook.com/"){
//     			chrome.tabs.executeScript({file: 'content.js'});
//     		}else if(tablink == "http://www.facebook.com/"){
//     			chrome.tabs.executeScript({file: 'content.js'});
//     		}
//     	});
// }

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //alert("howdy");
    if(changeInfo.status == "complete"){


    	chrome.tabs.getSelected(null,function(tab) {
    		var tablink = tab.url;
    		if(tablink == "https://www.facebook.com/"){
    				
    				setTimeout(() => {  chrome.tabs.executeScript({file: 'content.js'}); }, 900);
    				

    		}else if(tablink == "http://www.facebook.com/"){
    				//alert("howdy");
    			chrome.tabs.executeScript({file: 'content.js'});
    		}

		});
    	
    }
});





