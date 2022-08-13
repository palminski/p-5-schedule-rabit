let savedTasks = ["","","","","","","","",""]; //Default Saved Tasks
const collectSavedTasks = function() { //Updates Saved Tasks if they exist in local storage
    if (localStorage.getItem("savedTasks") === null)
    {
        return false;
    }
    savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
};

const saveTask = function() { //Updates Saved Tasks in Local storage
    localStorage.setItem("savedTasks",JSON.stringify(savedTasks));
};

let setUpTimecards = function() { //Sets up the timeblocks when the page loads
    let time = 9
    let timeSuffix = "AM";
    for (i = 0; i<9 ;i++)
    {
        if (time > 12)
        {
            time = 1;
            timeSuffix = "PM";
        }
        // Builds required elements for each timeblock
        let $timeblock = $("<div>").attr("id","time-"+time).attr("data-array-slot",i).addClass("timeblock timeblock-bg-before row my-2");
        let $time = $("<h3>").text(time+" "+timeSuffix).addClass("block-time col-2 bg-info text-center h-100 pt-4");
        
        let $task = $("<p>").addClass("task-input  col-8 pt-3");
        if (savedTasks[i]) {    //If the saved tasks array has a value contained in it that value will be added to the <p> of the timecard
            $task.text(savedTasks[i]);
        }
        let $saveButton = $("<button>").html("<span class='oi oi-pin'></span>").addClass("col-2 btn btn-primary h-100");

        //places them on page
        $(".container").append($timeblock);
        $timeblock.append($time).append($task).append($saveButton);
        time ++        
    }
};

const checkTime = function() { //Checks current time for top of page and gets the current hour

    let currentTime = moment().format("DD/MM/YYYY hh:mm");
    $("#currentDay").text(currentTime);
    let currentHour = moment().hour();
    

    for (i=0;i<9;i++) {  //Removes the bg-color classes from each timeblock and replaces them depending on the current hour
        let $timeblock = $("div[data-array-slot="+i+"]");
        $timeblock.removeClass("timeblock-bg-before timeblock-bg-current timeblock-bg-after")
        if (9+i < currentHour ) {
            $timeblock.addClass("timeblock-bg-before");
        }
        else if (9+i === currentHour) {
            $timeblock.addClass("timeblock-bg-current");
        }
        else if (9+i > currentHour) {
            $timeblock.addClass("timeblock-bg-after");
        }
    }
}

//Runs the important functions when page loads
collectSavedTasks();
setUpTimecards();
checkTime();

//Input from User VVV
$(".timeblock").on("click","p",function(){ //When clicking on the text you can enter new text
    let thisSlotsTime = $(this).closest("block-time").attr("id");
    console.log(thisSlotsTime);
    let text = $(this).text();
    let $textInput = $("<textarea>").addClass("form-control col-8").val(text);
    $(this).replaceWith($textInput);
    $textInput.trigger("focus");
});

$(".timeblock").on("blur","textarea",function(){ //When Clicking off text you will save it on page
    let text =$(this).val().trim();
    let $task = $("<p>").text(text).addClass("task-input  col-8 pt-3");

    $(this).replaceWith($task);
});

$(".timeblock").on("click","button",function(){ //When clicking on button you will save the data within
    let thisSlotsText = $(this).siblings("p").text(); //Collects the text in the timeblock and the number it will be saved to in the array
    let thisSlotsId = $(this).closest(".timeblock").attr("data-array-slot");
    savedTasks[thisSlotsId] = thisSlotsText;
    saveTask();
});

//checks the time every minute to update the clock at top of Page as well as the BG colors of timeblocks
setInterval(function() {
    checkTime();
}, 1000*60)