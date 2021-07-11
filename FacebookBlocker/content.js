

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
var hasLoadedWorkTimer = false;
var workTimer;
var workTimer1;
var workTimer2;
var workTimerAllTime;

var workTimersLoaded = 0;

//social timer variables
var hasLoadedSocialTimer = false;
var totalSecondsSocialTimerRecord = 0;


//date variables
var newestDate;
var hasLoadedNewestDate = false;
var currentDate;


var timerReduceSaveWrites = 0;
var morePostsDiv;

var ModeActive = 0;

var hasScriptAlreadyRun = false;

var numberElementsInFeed = -1;
var isMorePostsDeleted = false;

var hasRemovedMorePostsButton = false;

//load and assign variable to detirmine which mode is active
//first function thas fired that does stuff
function LoadModeActive(){  
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





//save work timer functions

	//saves work timer count to chrome storage function
function saveWorkTimer(valuePass){   
       console.log('saveWorkTimer got called');
 
   chrome.storage.sync.set({'workTimerKey': valuePass}, function() {
     console.log('work timer Value is set to ' + valuePass);
   });
  
}


function saveWorkTimer1(valuePass){
    console.log('saveWorkTimer1 got called');

    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'workTimerKey1': valuePass}, function() {
     console.log('work timer1 Value is set to ' + valuePass);
   });
}


function saveWorkTimerAllTime(valuePass){
    console.log('save WorkTimerAllTime got called');
    
    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'workTimerAllTime': valuePass}, function() {
     console.log('work timer All Time Value is set to ' + valuePass);
   });
}

//gets the most recent date from storage
function saveNewestDate(valuePass){
    console.log('save newestDate got called');
 
    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'newestDate': valuePass}, function() {
     console.log('newestDate Value is set to ' + valuePass);
   });


}







//load work timers

	// loads the timer count variable for Work mode
function loadWorkTimer(){
  if(hasLoadedWorkTimer == false){
   chrome.storage.sync.get(['workTimerKey'], function(result) {
     console.log('work timer Value currently is ' + result.workTimerKey);

      workTimer = result.workTimerKey;
      hasLoadedWorkTimer = true;
      totalSeconds = totalSeconds + workTimer;

      // checks if chrome storage has a value for work timer
      if(result.workTimerKey == null){
          //if not assign value
     	    totalSeconds = 0;
      }
      workTimersLoaded++;
      if(workTimersLoaded > 3){
        workTimersLoadedFunc();

     }
  });
 }
}


function getWorkTimer1(){
   chrome.storage.sync.get(['workTimerKey1'], function(result) {
     console.log('work timer1 Value currently is ' + result.workTimerKey1);
      workTimer1 = result.workTimerKey1;
      if(result.workTimerKey1 == null){
      	workTimer1 = 0;
      }

      workTimersLoaded++;

      if(workTimersLoaded > 3){
        workTimersLoadedFunc();

     }      
  });
}


function getWorkTimerAllTime(){
   chrome.storage.sync.get(['workTimerAllTime'], function(result) {
     console.log('newestDate Value currently is ' + result.workTimerAllTime);
     //checking if work timer all time exists
     if(result.workTimerAllTime == null){
        workTimerAllTime = getCurrentDate();
     }else{
        workTimerAllTime = result.workTimerAllTime;

     }  
     workTimersLoaded++;
     if(workTimersLoaded > 3){
        workTimersLoadedFunc();

     }
  });
}


function getNewestDate(){
   chrome.storage.sync.get(['newestDate'], function(result) {
     console.log('newestDate Value currently is ' + result.newestDate);
     //checking if newest date exists
     if(result.newestDate == null){
        newestDate = getCurrentDate();
     }else{
        newestDate = result.newestDate;

     }  
     if(ModeActive == 1){
      workTimersLoaded++;
      if(workTimersLoaded > 3){
        workTimersLoadedFunc();
      }
   }
  });
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



  //saves work timer to chrome storage
  if(hasLoadedWorkTimer){
    //timer reduce save writes to once every 2 seconds
    //halfing timer save writes
    timerReduceSaveWrites++
    if(timerReduceSaveWrites > 1){

        saveWorkTimer(totalSeconds);
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



// is fired after all timers have loaded that work called from execute Work Mode
function workTimersLoadedFunc(){
  currentDate = getCurrentDate();
  console.log("all work timers have loaded");
  
  if(currentDate == newestDate){
        //same day no need to shift timers
        console.log("today is current date");

  }else{
    console.log("currentDate = " + currentDate);
    console.log("newestDate = " + newestDate);
    console.log("not current date shifting timers");
    shiftDownWorkTimers(getDifferenceInDays(currentDate, newestDate));

  }

}

//part 2 of execute work Mode
//used to wait for shift down timers to save
function executeWorkModePart2(){


}


// this function fires after modeActive variable has been loaded
// this function fires if modeActive = workmode, aka modeActive = 1
function executeWorkMode(){

    //check if work mode has been fired before
    var elementExists = document.getElementById(newsfeedID);
    if(elementExists != null){
      // if workmode has not been executed before

      //load all timers associated with workMode
      getWorkTimer1();
      getWorkTimerAllTime();
      getNewestDate();

      //removing elements
      removeElement(newsfeedID);
      removeElement(messengerID);
      removeElement(watchID);
      removeElement(marketplaceID);
      removeElement(storiesID);
      removeElement(newsfeedmainID);

      /*
      //wait for timers to load
      while(hasLoadedNewestDate == false || hasLoadedWorkTimer == false || workTimersLoaded < 2){

      }
      currentDate = getCurrentDate();
      if(currentDate == newestDate){
      	//same day no need to shift timers

      }else{
      	shiftDownWorkTimers(getDifferenceInDays(currentDate, newestDate));
      	newestDate = currentDate;
      	


      }
	  */
	


    console.log("hasLoadedNewestDate" + hasLoadedNewestDate);
    console.log("hasLoadedWorkTimer" + hasLoadedWorkTimer);
    console.log("workTimersLoaded" + workTimersLoaded.toString());

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

      //checking if todays date is last recorded date


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







//date functions

//returns an int of the difference in days, between two dates
function getDifferenceInDays(date1Var,date2Var){
  // date 1 should be present day
  //date 2 is older than date 1
  var americanDate1 = swapDayMonth(date1Var);
  var americanDate2 = swapDayMonth(date2Var);

  var date1 = new Date(americanDate1); 
  var date2 = new Date(americanDate2); 

  console.log("Diff" + date1);
  console.log("Diff" + date2);

  

  var timeDiff = Math.abs(date1.getTime() - date2.getTime());

  // days difference
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  console.log(diffDays);
  //return differenceInMilliseconds;


}




//shifts the timers
//passes numer of days to shift down. this is used to change timers after a new day
function shiftDownWorkTimers(days){
  //check if work timers has loaded
  var newWorkTimerArray = [];

  if(workTimersLoaded > 3){
    //timers have loaded
    var workTimerArray = [workTimer, workTimer1];   
    //for loop pushes array back by number of days into newWorkTimerArray
    for(var i = 0; i < workTimerArray.length; i++){
      newWorkTimerArray[i + days] = workTimerArray[i];
    }

    workTimer = newWorkTimerArray[0];
    workTimer1 = newWorkTimerArray[1];


    //insert unused work timer values into all time value
    for(var i = 2; i < newWorkTimerArray.length; i++){

      workTimerAllTime += newWorkTimerArray[i];

    }

  }else{
    //timers have not loaded

  }

  saveWorkTimer(workTimer);
  saveWorkTimer1(workTimer1);
  saveWorkTimerAllTime(workTimerAllTime);
  saveNewestDate(currentDate);
  newestDate = currentDate;
  totalSeconds = 0;

}

function getCurrentDate(){
  var currentdate = new Date();

  var datetime = currentdate.getDate() + "/"+(currentdate.getMonth()+1) 
  + "/" + currentdate.getFullYear();

  return datetime;


}

//swaps day with month to convert to american date format or back to australian
function swapDayMonth(dateVar){
  var tempDay = "";
  if(dateVar == null){
    dateVar = "";
  }
  var arrayDateSplit = dateVar.split("/");
 
  //swapping
  tempDay = arrayDateSplit[0];
  arrayDateSplit[0] = arrayDateSplit[1];
  arrayDateSplit[1] = tempDay;

  var newDateFormat = (arrayDateSplit[0] + "/" + arrayDateSplit[1] + "/" + arrayDateSplit[2]);


  return newDateFormat;


}

function checkWorkTimerDate(day){
  var currentdate = getCurrentDate();
  var storedDateSeconds = day.split(":");

  if(storedDateSeconds[0] == currentdate){
    //latest timer is from today



  }else{
    //latest timer is from different day


  }

}






