let savedTasks = ["","","","","","","","",""];

const collectSavedTasks = function() {
    if (localStorage.getItem("savedTasks") === null)
    {
        return false;
    }
    savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
};


const saveTask = function() {
    localStorage.setItem("savedTasks",JSON.stringify(savedTasks));
};


let setUpTimecards = function() { //Sets up the timeblocks when the page loads
    let time = 9
    for (i = 0; i<9 ;i++)
    {
        if (time > 12)
        {
            time = 1;
        }
        // Builds required elements for each timeblock
        let $timeblock = $("<div>").attr("id","time-"+time).attr("data-array-slot",i).addClass("timeblock row bg-secondary my-2");
        let $time = $("<h3>").text(time).addClass("block-time col-2 bg-white");
        let $task = $("<p>").addClass("task-input  col-8");
        if (savedTasks[i]) {
            $task.text(savedTasks[i]);
        }
        let $saveButton = $("<button>").text("save").addClass("col-2");

        //places them on page
        $(".container").append($timeblock);
        $timeblock.append($time).append($task).append($saveButton);
        time ++        
    }
};
collectSavedTasks();
setUpTimecards();


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
    let $task = $("<p>").text(text).addClass("task-input  col-8");

    $(this).replaceWith($task);
});

$(".timeblock").on("click","button",function(){ //When clicking on button you will save the data within
    let thisSlotsText = $(this).siblings("p").text(); //Collects the text in the timeblock and the number it will be saved to in the array
    let thisSlotsId = $(this).closest(".timeblock").attr("data-array-slot");
    savedTasks[thisSlotsId] = thisSlotsText;
    saveTask();
    
    
});