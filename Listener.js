let doc = document;
let songs = []
let search = ""

songs[0] = {
    Title: "What a Wonderful World",
    Artist: "Louis Armstrong",
    AlbumName: "",
    ImagePath: "./Assets/Louis_Armstrong_What_a_Wonderful_World.jpg",
};
songs[1] = {
    Title: "Giant Steps",
    Artist: "John Coltrane",
    AlbumName: "Giant Steps",
    ImagePath: "./Assets/Coltrane_Giant_Steps.jpg",
};
songs[2] = {
    "Title": "Fly Me to The Moon",
    "Artist": "Frank Sinatra",
    "AlbumName": "",
    "ImagePath": "./Assets/qe9o9pdvuu49b_600.jpg"
};
songs[3] = {
    "Title": "'Round Midnight",
    "Artist": "Thelonious Monk",
    "AlbumName": "",
    "ImagePath": "./Assets/round-midnight.jpg"
};
songs[4] = {
    "Title": "All Blue",
    "Artist": "Miles Davis",
    "AlbumName": "Kind of Blue",
    "ImagePath": "./Assets/10-KINDOFBLUE.jpg"
}
songs[5] = {
    "Title": "A Night in Tunisia",
    "Artist": "Dizzy Gillespie",
    "AlbumName": "",
    "ImagePath": "./Assets/maxresdefault.jpg"
}
songs[6] = {
    "Title": "Goodbye Pork Pie Hat",
    "Artist": "Charles Mingus",
    "AlbumName": "Mingus Mingus Mingus Mingus Mingus",
    "ImagePath": "./Assets/Charles_Mingus_Mingus_Mingus_Mingus_Mingus_Mingus.jpg"
};
songs[7] = {
    "Title": "Stolen Moments",
    "Artist": "Oliver Nelson",
    "AlbumName": "The Blues and the Abstract Truth",
    "ImagePath": "./Assets/The_Blues_and_the_Abstract_Truth_(Oliver_Nelson_album_-_cover_art).jpg"
};
songs[8] = {
    "Title": "Cantaloupe Island",
    "Artist": "Herbie Hancock",
    "AlbumName": "Empyrean Isles",
    "ImagePath": "./Assets/Empisle_hancock.jpg"
}
songs[9] = {
    "Title": "Song For My Father",
    "Artist": "Horace Silver",
    "AlbumName": "Song For My Father",
    "ImagePath": "./Assets/Song_for_My_Father_(Horace_Silver_album_-_cover_art).jpg"
}


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
                song.querySelector("img").src = include[i].ImagePath;
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
        song.querySelector("img").src = songs[i].ImagePath;
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