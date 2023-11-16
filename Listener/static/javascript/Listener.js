let doc = document;
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
            doc.querySelector(".SearchBox").value = "";
            search = "";
        }
        else{
            search += key.key
        }
    }
}

async function searchresults(){
    event.preventDefault();
    console.log(search);
    let songcontent = doc.querySelectorAll(".SongContentBox");
    let songs = []
    await fetch("http://localhost:8080/ListenerSearch?search="+search).then(songlist => songlist.json()).then(results => songs = results);
    console.log(songs)
    for(let i = 0; i < songcontent.length; i++){
        let song = songcontent[i];
        if(i < songs.length){
            song.querySelector("img").src = "/Assets/"+songs[i].ImagePath;
            song.querySelector("figcaption").textContent = songs[i].Title;
            song.style.display = song.ogDisplay;
        }
        else{
            song.style.display = "none";
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