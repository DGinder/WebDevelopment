function timeAlert() {
    var temp = new Date();
    var hours = (temp.getHours() < 12) ? temp.getHours() : (temp.getHours() - 12);
    var min = temp.getMinutes();
    var sec = temp.getSeconds();
    var suffix = (temp.getHours() < 12) ? "AM" : "PM"
    alert("The Time Is: " + hours + ":" + min + ":" + sec + " " + suffix);
}

setInterval(timeAlert, 10000);