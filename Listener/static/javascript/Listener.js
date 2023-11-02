let doc = document;
console.log(songs);
let search = ""


assignHover();
assignSearch();
populateMain();
populateSide();

function linkHover(element){
    element.previous = element.style.backgroundColor
    element.style.backgroundColor = "#9C8677";
}

function linkHoverOff(element){
    element.style.backgroundColor = element.previous;
}

function assignHover(){
    let elements = doc.querySelectorAll(".NavRight > ul > li");
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener("mouseover",() => linkHover(elements[i]));
        elements[i].addEventListener("mouseout", ()=> linkHoverOff(elements[i]));
    }
}

function assignSearch(){
    let element = doc.querySelector(".SearchBox");
    let form = doc.querySelector(".Form");
    if(element!=null && form!=null){
        element.addEventListener("keypress", searchSubmit);
    }
}

function searchSubmit(key){
    if(key!=null){
        if(key.keyCode==13){
            if(search.length==0){
                alert("Please search for something!");
            }
            searchresults();
            search = "";
        }
        else{
            search += key.key
        }
    }
}

function searchresults(){
    console.log(search);
    let songcontent = doc.querySelectorAll(".SongContentBox");
    let include = []
    let songindx = 0;
    for(let i = 0; i < songs.length; i++){
        if(songs[i].Title.includes(search) || songs[i].Artist.includes(search)){
            include[songindx] = songs[i];
            songindx++;
        }
    }
    if(include.length==0){
        alert("No matching songs were found :(");
        populateMain(); 
    }
    else{
        for(let i = 0; i < songcontent.length; i++){
            let song = songcontent[i];
            if(i < include.length){
                song.querySelector("img").src = "/Assets/"+include[i].ImagePath;
                song.querySelector("figcaption").textContent = include[i].Title;
                song.style.display = song.ogDisplay;
            }
            else{
                song.style.display = "none";
            }
        }
    }
}

function populateMain(){
    let songcontent = doc.querySelectorAll(".SongContentBox");
    for(let i = 0; i < songcontent.length; i++){
        let song = songcontent[i];
        console.log(song);
        song.querySelector("img").src = "/Assets/"+songs[i].ImagePath;
        song.querySelector("figcaption").textContent = songs[i].Title;
        song.ogDisplay = song.style.display;
    }
}

function populateSide(){
    let sidecontent = doc.querySelectorAll(".Sidebar ul li");
    for(let i = 0; i < sidecontent.length; i++){
        let song = sidecontent[i];
        song.textContent = songs[i].Title;
    }
}