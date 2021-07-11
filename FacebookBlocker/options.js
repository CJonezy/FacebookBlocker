var NewsFeedVarOn = true;
var MessengerVarOn = true;
var WatchVarOn = true;
var MarketPlaceVarOn = true;
var CreatePostOn = true;
var NewsFeedMainVarOn = true;

var ModeActive = 5;
var key = 'ModeActive'

var buttonDisabledOpacity = 0.2;

var workTimer;
var workTimer1;
var workTimer2;
var workTimerAllTime;


//used for setting radio button onload
var timerInterval;
var hasSetRadioButton = false;


//date variables
var newestDate;
var workTimersLoaded;



  main();




//functions that load variables from chrome storage  

//loads timer for work mode
function loadWorkTimer(){
   chrome.storage.sync.get(['workTimerKey'], function(result) {
     console.log('work timer Value currently is ' + result.workTimerKey);
      workTimer = result.workTimerKey;
     
      
  });

}

//loads currently selected mode
function loadModeActive(){  
    chrome.storage.sync.get(['key'], function(result) {
      console.log('Value currently is ' + result.key);
      ModeActive = result.key;
      setRadioButton();
      
   });
 
 
   
}






//functions run if mode is selected on options html

function WorkModeClicked(){ 
    console.log(document.getElementById("option-1").value);
    saveModeActive(1);
}

function SocialModeClicked(){ 
    console.log(document.getElementById("option-2").value);
    saveModeActive(2);
}

function OffClicked(){ 
    console.log(document.getElementById("option-3").value);
    saveModeActive(3);
}




//saving

function saveModeActive(valuePass){   
       console.log('saveModeActive got called');

    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({key: valuePass}, function() {
     console.log('Value is set to ' + valuePass);
   });
  
}

function saveWorkTimer(valuePass){   
       console.log('saveWorkTimer got called');
      
    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'workTimerKey': valuePass}, function() {
     console.log('Value is set to ' + valuePass);
   });
  
}


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










//Date Functions

//shifts the timers
//passes numer of days to shift down. this is used to change timers after a new day
function shiftDownWorkTimers(days){
  //check if work timers has loaded
  var newWorkTimerArray;

  if(workTimersLoaded >= 2){
    //timers have loaded
    var workTimerArray = [workTimer, workTimer1];   
    //for loop pushes array back by number of days into newWorkTimerArray
    for(var i = 0; i < workTimerArray.length; i++){
        newWorkTimerArray[i + days] = workTimerArray[i];

    }

    workTimer = newWorkTimerArray[0];
    workTimer1 = newWorkTimerArray[1];

    console.log(newWorkTimerArray.length);

    //insert unused work timer values into all time value
    for(var i = 2; i < newWorkTimerArray.length; i++){

      workTimerAllTime += newWorkTimerArray[i];

    }

  }else{
    //timers have not loaded

  }
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

function getWorkTimer1(){
   chrome.storage.sync.get(['workTimerKey1'], function(result) {
     console.log('work timer Value currently is ' + result.workTimerKey1);
      workTimer = result.workTimerKey1;
      
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
  });
}


function saveWorkTimer1(valuePass){
    console.log('saveWorkTimer1 got called');

    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'workTimerKey1': valuePass}, function() {
     console.log('Value is set to ' + valuePass);
   });
}


function saveNewestDate(valuePass){
    console.log('save newestDate got called');
 
    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'newestDate': valuePass}, function() {
     console.log('newestDate Value is set to ' + valuePass);
   });
}


function saveWorkTimerAllTime(valuePass){
    console.log('save WorkTimerAllTime got called');
    
    // Save it using the Chrome extension storage API.
   chrome.storage.sync.set({'workTimerAllTime': valuePass}, function() {
     console.log('workTimerAllTime Value is set to ' + valuePass);
   });
}



function daily(){
    chrome.storage.sync.get(['workTimerKey'], function(result){
                            workTimer = result.workTimerKey;
                            console.log(workTimer);
                            console.log("yee");
                            var numberT=workTimer/60/60;
                            var numberC=12;
                            let myChart = document.getElementById('myChart').getContext('2d');
                            
                            // Global Options
                            Chart.defaults.global.defaultFontFamily = 'Lato';
                            Chart.defaults.global.defaultFontSize = 18;
                            Chart.defaults.global.defaultFontColor = '#777';
                            
                            let massPopChart = new Chart(myChart, {
                                                         type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                                                         data:{
                                                         labels:['Social', 'Work'],
                                                         datasets:[{
                                                                   label:'hours',
                                                                   data:[
                                                                         numberT,
                                                                         numberC
                                                                         
                                                                         ],
                                                                   //backgroundColor:'green',
                                                                   backgroundColor:[
                                                                                    'rgba(255, 99, 132, 0.6)',
                                                                                    'rgba(54, 162, 235, 0.6)',
                                                                                    
                                                                                    ],
                                                                   borderWidth:1,
                                                                   borderColor:'#777',
                                                                   hoverBorderWidth:3,
                                                                   hoverBorderColor:'#000',
                                                                   //maxBarThickness;100
                                                                   }]
                                                         },
                                                         options:{
                                                         
                                                         scales: {
                                                         yAxes: [{
                                                                 ticks: {
                                                                 beginAtZero:true
                                                                 }
                                                                 }]
                                                         },
                                                         
                                                         
                                                         
                                                         legend:{
                                                         display:true,
                                                         position:'right',
                                                         labels:{
                                                         fontColor:'#000'
                                                         }
                                                         },
                                                         layout:{
                                                         padding:{
                                                         left:50,
                                                         right:0,
                                                         bottom:0,
                                                         top:0
                                                         }
                                                         },
                                                         tooltips:{
                                                         enabled:true
                                                         },
                                                         options: {
                                                         responsive: false
                                                         }
                                                         }
                                                         });
                            
                            var ctx = document.getElementById("myChart");
                            //ctx.height = 1000;
                            
                            
                            
                            });
}


function weekly(){
    var ctx = document.getElementById("myChart2").getContext("2d");
    
    
    //will fill these based off arrays recieved.. index 0 = mon, 6 = sun
    var monWork;
    var monSocial;
    var monOff;
    
    var tueWork;
    var tueSocial;
    var tueOff;
    
    var wedWork;
    var wedSocial;
    var wedOff;
    
    var thurWork;
    var thurSocial;
    var thurOff;
    
    var friWork;
    var friSocial;
    var friOff;
    
    var satWork;
    var satSocial;
    var satOff;
    
    var sunWork;
    var sunSocial;
    var sunOff;
    
    
    var data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuday", "Sunday"],
    datasets: [
               {
               label: "Work",
               backgroundColor: "blue",
               data: [3,7,4]
               },
               {
               label: "Social",
               backgroundColor: "red",
               data: [4,3,5]
               },
               {
               label: "Off",
               backgroundColor: "green",
               data: [7,2,6]
               }
               ]
    };
    
    var myBarChart = new Chart(ctx, {
                               type: 'bar',
                               data: data,
                               options: {
                               barValueSpacing: 20,
                               scales: {
                               yAxes: [{
                                       ticks: {
                                       min: 0,
                                       }
                                       }]
                               }
                               }
                               });
    
    
    
    
}



  //loading variables

 
 function main(){

    
   loadModeActive();
     daily();
     weekly();
   
   
   console.log("modeactive loaded");




 






  //date debugging
  //console.log(datetime);
  //console.log(currentdate);
  //console.log(getCurrentDate());

  console.log(getDifferenceInDays(getCurrentDate(), "12/4/2020"));


  //print time today

  //print time yesterday

  // print total time



  // var str = "4/4/20:2003048948";
  // var res = str.split(":");
  // console.log(res);
    
  //storing an array
  // var testArray=["test", "teste", "testes"];

  // chrome.storage.sync.set({list:testArray}, function() {
  //   console.log("added to list");
  // });
    
}


//document.addEventListener('load', setRadioButton());

//this function is used to select current mode selected radio button on load up of options page
function setRadioButton(){
  
  console.log("ModeActive" + ModeActive);
  if(ModeActive == 1){
    var radiobtn = document.getElementById("option-1");
    radiobtn.checked = true;
    hasSetRadioButton = true;
    
  }else if(ModeActive == 2){
    var radiobtn = document.getElementById("option-2");
    radiobtn.checked = true;
    hasSetRadioButton = true;
   
  }else if(ModeActive == 3){
    var radiobtn = document.getElementById("option-3");
    radiobtn.checked = true;
    hasSetRadioButton = true;
    
  }
}


document.getElementById('option-1').addEventListener('click', WorkModeClicked);
document.getElementById('option-2').addEventListener('click', SocialModeClicked);
document.getElementById('option-3').addEventListener('click', OffClicked);
