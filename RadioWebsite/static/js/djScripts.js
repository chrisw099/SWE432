


//Update Timeslot column based on Search Text
function tsSearch(){
    var input, filter, selectList, i, txtval;

    input = document.getElementById("tsSearchBar");
    filter = input.value.toUpperCase();

    selectList = document.getElementById("tsOptList");

    for( i = 0; i < selectList.length; i++){
        txtval = selectList.options[i].text;
        if(txtval.toUpperCase().indexOf(filter) > - 1){
            selectList.options[i].style.display = "";
        }else{
            selectList.options[i].style.display = "none";
        }
    }

}

//Update Playlist Column based on Search text
function plSearch(){
    var input, filter, selectList, optionList, i, txtval;

    input = document.getElementById("plSearchBar");
    filter = input.value.toUpperCase();

    selectList = document.getElementById("plOptList");

    for( i = 0; i < selectList.length; i++){
        txtval = selectList.options[i].text;
        if(txtval.toUpperCase().indexOf(filter) > - 1){
            selectList.options[i].style.display = "";
        }else{
            selectList.options[i].style.display = "none";
        }
    }

}

//Update the Song column based on Search Filter Selections
function sSearch(){
    var input, filter, selectList, optionList, i, txtval;

    input = document.getElementById("sSearchBar");
    filter = input.value.toUpperCase();

    selectList = document.getElementById("sOptList");

    for( i = 0; i < selectList.length; i++){
        txtval = selectList.options[i].text;
        if(txtval.toUpperCase().indexOf(filter) > - 1){
            selectList.options[i].style.display = "";
        }else{
            selectList.options[i].style.display = "none";
        }
    }

}

//Validate that timeslot has been selected for editing. Display Error if Incorrect
function editBegin(){

    var prompt = document.getElementById("editStart");
    var err = document.getElementById("editErr");

    tsList = document.getElementById("tsOptList")
    tsSelected = tsList.selectedIndex;

    if(tsSelected == -1){
        err.show();
        setTimeout(() => {
        const err = document.getElementById("editErr");
        err.close();
        }, "3000");

    }else{

    prompt.show();
    setTimeout(() => {
    const prompt = document.getElementById("editStart");
    prompt.close();
    }, "3000");
    }
}

//Validate that all columns have selection before pushing submit. Once correctly submitted, unselects all columns
function doneEdit(){

    var done = document.getElementById("changesComplete")
    var err = document.getElementById("errBox");

    tsList = document.getElementById("tsOptList")
    tsSelected = tsList.selectedIndex;

    plList = document.getElementById("plOptList")
    plSelected = plList.selectedIndex;

    sList = document.getElementById("sOptList")
    sSelected = sList.selectedIndex;


    if(sSelected == -1 || plSelected == -1 || tsSelected == -1){
        err.show();
        setTimeout(() => {
        const err = document.getElementById("errBox");
        err.close();
    }, "3000");
    }else{
        
        done.show();
        setTimeout(() => {
        const done = document.getElementById("changesComplete");
        done.close();
        }, "3000");
        tsList.selectedIndex = -1;
        plList.selectedIndex = -1;
        sList.selectedIndex = -1;
    }

    
    
}


//JS to be run AFTER the page is loaded

document.addEventListener("DOMContentLoaded", ()=>{

var tsInfo;
tsInfo = document.getElementById("tsOptList");

//Update Timeslot text based on Timeslot Selection. Will eventually change rest of timeslot info here
tsInfo.addEventListener("click", function(){

    tsList = document.getElementById("tsOptList")
    tsSelected = tsList.options[tsList.selectedIndex].text;

    tsField = document.getElementById("timeSlotText");
    tsField.textContent = tsSelected;
    
});

//Update timeslot when another option is selected
tsInfo.addEventListener("change", function(){

    tsList = document.getElementById("tsOptList")
    tsSelected = tsList.options[tsList.selectedIndex].text;

    tsField = document.getElementById("timeSlotText");
    tsField.textContent = tsSelected;
    
});

//Update Song List based on Playlist Selection. Will eventually check properties of songs pulled from database to filter the song list instead of just name.
var plList = document.getElementById("plOptList");

plList.addEventListener("click", function(){

    input = document.getElementById("plOptList");
    
    filter = input.options[input.selectedIndex].text.toUpperCase();

    selectList = document.getElementById("sOptList");

    for( i = 0; i < selectList.length; i++){
        txtval = selectList.options[i].text;
        if(txtval.toUpperCase().indexOf(filter) > - 1){
            selectList.options[i].style.display = "";
        }else{
            selectList.options[i].style.display = "none";
        }
    }

});

});
   
