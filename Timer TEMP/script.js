var timeInms, timeOutms;
var getInputHr;
var getInputMin; 
//Variables for the table
var length; 
var row;
var horseNumber;
var timeIn;
var timeOut;
var setTimer;
var price;

function getTimed(){
    var diff = timeInms - timeOutms;
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
}



function doSomething(){
    var timer = new Timer();
    const minutes = Number(new Date().getMinutes());
    getInputMin = document.getElementById('inputHours').value;
    console.log(getInputMin)
    
}


function addRow(){

    var table = document.getElementById("timeTable");
    
    var counter = 1;
    length = document.getElementById('horseNumber').value;
    //insert .hasAttribute() : boolean
    
    for(var i =1; i <= length; i++){
        row = table.insertRow(1);
        horseNumber = row.insertCell(0);
        timeIn = row.insertCell(1);
        timeOut = row.insertCell(2);
        setTimer = row.insertCell(3);
        price = row.insertCell(4);
        
        horseNumber.innerHTML = "Horse " + counter;
        timeIn.innerHTML = new Date().getHours() +":"+ new Date().getMinutes();
        setTimer.innerHTML = document.getElementById('inputHours').value + " hrs " +document.getElementById('inputMinutes').value + " mins"
        counter ++;
    }

    function createTimer(){
    }
    
}