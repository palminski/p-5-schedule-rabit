let setUpTimecards = function() { //Sets up the timeblocks when the page loads
    let time = 9
    for (i = 0; i<9 ;i++)
    {
        if (time > 12)
        {
            time = 1;
        }
        // Builds required elements for each timeblock
        let $timeblock = $("<div>").attr("id","time-"+time).addClass("timeblock row bg-secondary my-2");
        let $time = $("<h3>").text(time).addClass("block-time col-2 bg-white");
        let $task = $("<p>").addClass("task-input  col-8");
        let $saveButton = $("<button>").text("save").addClass("col-2");

        //places them on page
        $(".container").append($timeblock);
        $timeblock.append($time).append($task).append($saveButton);
        time ++        
    }
};
setUpTimecards();


$(".timeblock").on("click","p",function(){
    let thisSlotsTime = $(this).closest("block-time").attr("id");
    console.log(thisSlotsTime);
    let text = $(this).text();
    let $textInput = $("<textarea>").addClass("form-control col-8").val(text);
    $(this).replaceWith($textInput);
    $textInput.trigger("focus");
});0

$(".timeblock").on("blur","textarea",function(){
    let text =$(this).val().trim();
    let $task = $("<p>").text(text).addClass("task-input  col-8");

    $(this).replaceWith($task);
})