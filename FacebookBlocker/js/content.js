

// variables of facebook hompage element ID's
var messengerID = "navItem_217974574879787";
var newsfeedID = "navItem_4748854339";
var watchID = "navItem_2392950137";
var marketplaceID = "navItem_1606854132932955";
var createpostID = "pagelet_composer";
var storiesID = "stories_pagelet_below_composer";
var newsfeedmainID = "topnews_main_stream_408239535924329";
var topMenuCreateButtonID = "creation_hub_entrypoint";
var contentdivID = "contentArea";
var faceBookLogoID = "_2md";


//timer variables
var timerDiv;
var timerInterval;
var minutesLabel;
var secondsLabel;
var totalSeconds = 0;
//work timer variables
var totalSecondsWorkTimerRecord = 0;
var hasRecordedWorkTimerRecord = false;
var hasLoadedWorkTimer = false;
//social timer variables
var hasLoadedSocialTimer = false;
var timerReduceSaveWrites = 0;
var totalSecondsSocialTimerRecord = 0;

var hasSetDay = false;



var morePostsDiv;

var ModeActive = 0;

var hasScriptAlreadyRun = false;

var numberElementsInFeed = -1;
var isMorePostsDeleted = false;

var hasRemovedMorePostsButton = false;


var dateChangeCheck = -1;


function day(day){


  chrome.storage.sync.set({'day': day1}, function() {
  console.log(day1+"yee");
  });


}



//load and assign variable to detirmine which mode is active
//first function thas fired that does stuff
function LoadModeActive(){

chrome.storage.sync.get(['day'], function(result) {
var d = new Date();
  if(result.day ==d.getDay()){
    dateChangeCheck = d.getDay();
  }
});



     chrome.storage.sync.get(['key'], function(result) {
          console.log('ModeActive Value currently is ' + result['key']);
          ModeActive = result['key'];
          console.log(ModeActive);
          if(ModeActive == 1){

            executeWorkMode();
            loadWorkTimer();
          }  else if(ModeActive == 2){

            executeSocialMode();
            loadSocialTimer();
          }else if(ModeActive == 3){

            executeOffMode();
          }

        });
}



//saves work timer count to chrome storage function
function saveWorkTimer(valuePass, dayCheck){
       console.log('saveWorkTimer got called');

       if(dayCheck==-1){
         var d = new Date();
         dateChangeCheck=d.getDay();

         chrome.storage.sync.set({'day': d.getDay()}, function() {
           console.log('Value is set to ' + valuePass);
         });

         chrome.storage.sync.set({'workTimerKey': 0}, function() {
           console.log('Value is set to ' + valuePass);
         });

       }else {
         chrome.storage.sync.set({'workTimerKey': valuePass}, function() {
           console.log('Value is set to ' + valuePass);
         });

       }


}


// loads the timer count variable for Work mode
function loadWorkTimer(){
  if(hasLoadedWorkTimer == false){
   chrome.storage.sync.get(['workTimerKey'], function(result) {
     console.log('work timer Value currently is ' + result.workTimerKey);

      totalSecondsWorkTimerRecord = result.workTimerKey;
      hasLoadedWorkTimer = true;
      totalSeconds = totalSeconds + totalSecondsWorkTimerRecord;

      // checks if chrome storage has a value for work timer
      if(result.workTimerKey == null){
          //if not assign value
     	    totalSeconds = 0;

      }

  });
 }
}



//saves Social timer count to chrome storage function
function saveSocialTimer(valuePass){
       console.log('saveSocialTimer got called');

   chrome.storage.sync.set({'socialTimerKey': valuePass}, function() {
     console.log('Social timer Value is set to ' + valuePass);
   });

}


// loads the timer count variable for Social mode
function loadSocialTimer(){
  if(hasLoadedSocialTimer == false){
   chrome.storage.sync.get(['socialTimerKey'], function(result) {
     console.log('social timer Value currently is ' + result.socialTimerKey);

      totalSecondsSocialTimerRecord = result.socialTimerKey;
      hasLoadedSocialTimer = true;
      totalSeconds = totalSeconds + totalSecondsSocialTimerRecord;

      // checks if chrome storage has a value for social timer
      if(result.socialTimerKey == null){
          //if not assign value
          totalSeconds = 0;

      }
  });
 }
}



//this function gets called every 1 second on a loop
function setTime() {
  //total seconds variable holds current time
  ++totalSeconds;
  var div = document.getElementById(contentdivID);
  //sets timer card in homepage to display current time
  timerDiv.innerHTML = formatTime(totalSeconds);

  //debugging
  console.log("hasLoadedWorkTimer" + hasLoadedWorkTimer);
  console.log("hasLoadedSocialTimer" + hasLoadedSocialTimer);
  console.log("modeActive" + ModeActive);
  console.log(dateChangeCheck);
  var d = new Date();
  console.log(d.getDay());
  var dayCheck;

  //saves work timer to chrome storage
  if(hasLoadedWorkTimer){

    if(dateChangeCheck==d.getDay()){

      dayCheck=d.getDay();

    }else{
      dayCheck=-1;
      totalSeconds=0;
    }
    //timer reduce save writes to once every 2 seconds
    //halfing timer save writes
    timerReduceSaveWrites++
    if(timerReduceSaveWrites > 1){

        saveWorkTimer(totalSeconds,dayCheck );
        timerReduceSaveWrites = 0;
    }

  }else if(hasLoadedSocialTimer){
    // saves social timer to chrome storage
    timerReduceSaveWrites++
    if(timerReduceSaveWrites > 1){

        saveSocialTimer(totalSeconds);
        timerReduceSaveWrites = 0;
    }
  }
}








// this function formats total seconds int that keeps time
// into a string thats readable to be displayed and returns it
function formatTime(val) {
  var valString;
  secondsLabel = val % 60;
  //making shure seconds label has 2 digits if below 10 seconds
  if(secondsLabel.toString().length < 2){
   // adds 0 infront of seconds
    secondsLabel = "0" + secondsLabel;
  }
  minutesLabel = parseInt(val / 60);
  valString = minutesLabel + ":" + secondsLabel;
  return valString;

}





// this function fires after modeActive variable has been loaded
// this function fires if modeActive = workmode, aka modeActive = 1
function executeWorkMode(){

    //check if work mode has been fired before
    var elementExists = document.getElementById(newsfeedID);
    if(elementExists != null){
      // if workmode has not been executed before

      //removing elements
      removeElement(newsfeedID);
      removeElement(messengerID);
      removeElement(watchID);
      removeElement(marketplaceID);
      removeElement(storiesID);
      removeElement(newsfeedmainID);


      //creating timer div and putting it inside main content div
      var div = document.getElementById(contentdivID);
      //creating div inside main content area
      timerDiv = document.createElement("div");
      div.appendChild(timerDiv);
      div.style = "float: left;"
      //setting the style for the created timer div
      timerDiv.style = "background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.12), "
      + "0 1px 2px rgba(0,0,0,0.24); border-radius: 3px;  float: left; width: 500px; text-align: center; font-size: 30px; color: #eb3a34; margin-left: 0px; margin-bottom: 10px;"
      //clearing timer interval if one was previously called
      clearInterval(timerInterval);
      //starting timer interval to run every 1 second
      timerInterval = setInterval(setTime, 1000);

      console.log("executeWorkMode has fired");

    }
}




// this function fires after modeActive variable has been loaded
// this function fires if modeActive = socailMode, aka modeActive = 2
function executeSocialMode(){

    console.log("executeSocialMode has fired 1");
  //creating timer div and putting it inside main content div
    var div = document.getElementById(contentdivID);
    timerDiv = document.createElement("div");
    timerDiv.setAttribute("id", "timer-div");
    div.prepend(timerDiv);
    div.style = "float: left;";

    //setting the style of the timer card
    timerDiv.style = "background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.12), "
    + "0 1px 2px rgba(0,0,0,0.24); border-radius: 3px;   width: 500px; text-align: center; font-size: 30px; color: #eb3a34; margin-bottom: 12px; ";
    clearInterval(timerInterval);
    timerInterval = setInterval(setTime, 1000);

}



// this function fires after modeActive variable has been loaded
// this function fires if modeActive = OffMode, aka modeActive = 3
function executeOffMode(){



}


// this function removes the button that generates more posts when scrolling
//removes infinte scrolling
function removeMorePostsButton(){
  document.getElementsByClassName("mbl")[0].parentNode.removeChild(document.getElementsByClassName("mbl")[0]);
  hasRemovedMorePostsButton = true;

}


// adblock function
// function also removes infinite scrolling
// this function gets fired like every .1 seconds
!function(){

  var e=new MutationObserver(function(){
    //check if in social mode
    //console.log(ModeActive);
   if(ModeActive == 2){
      //gets element with feed count
      var elementWithFeedCount =  document.querySelectorAll('[aria-setsize]')[0];
      //console.log("ModeActive = 2");
      //checks if element exists otherwise will throw error
      if(elementWithFeedCount != null){
        //element with feed count does exist
        console.log(elementWithFeedCount.getAttribute("aria-setsize"));
        numberElementsInFeed = elementWithFeedCount.getAttribute("aria-setsize");
        if(numberElementsInFeed > 20 & hasRemovedMorePostsButton == false){
          removeMorePostsButton();
           console.log("removed more posts button");

        }
      }else{
        //element with feed count does not exist
      	console.log("more posts button does not exist");

      }
    }


  }),f=0;e.observe(document,{childList:!0,subtree:!0,characterData:!0,attributes:!0}
)}();



//event listeners - listen for an event and fire function if event fired
//this function starts the script
document.addEventListener('load', pageReloaded());





//this function gets fired on loading of facebook homepage
//this function checks if timer div card already exists
function pageReloaded(){
  var elementExists = document.getElementById("timer-div");
  if(elementExists == null){
    // if timer div card does not exist, run loadModeActive to get current ActiveMode
    console.log(document.readyState);
    LoadModeActive();


  }else{
    //runs if no newsfeed present

  }
}




// this function removes elements
// removes an element with the id passed to it
function removeElement(id){

    var element = document.getElementById(id);
    element.parentNode.removeChild(element);

}

//debugging area


//check if previous content script is running
//function checkForPreviousScript(){

//}
