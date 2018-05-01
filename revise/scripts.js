var timeIn, timeOut;
var price;

//for time thingy
var time;

function generate(){
    var table = document.getElementById("timeTable");
    let length = document.getElementById("value").value;
    let counter = 1;

    for(let i = 1; i <=length; i++){
        let row = table.insertRow(1);
        let horseNumber = row.insertCell(0);
        timeIn = row.insertCell(1);
        timeOut = row.insertCell(2);
        price = row.insertCell(3);

        horseNumber.innerHTML = "Horse " + counter;
        timeIn.innerHTML = '<input type = "button" value = "Time In" id = "timeIn" onlick = "timeIn()"></input>' + '<p id = "print"></p>' ;
        timeOut.innerHTML = '<input type = "button" value = "Time Out" id = "timeOut" onlick = "timeOut()"></input>' ;
        counter ++;
    }
}

function timeIn(){
    
    time = new Date();
    let hours = 12 - time.getHours();
    let mins = time.getMinutes();
    
    //print the current time
    timeIn = document.getElementById("print").innerHTML;
}