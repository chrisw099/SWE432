let doc = document;

assignHover();
assignUpdate();

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

function assignUpdate(){
    let element = doc.querySelector(".ProfileForm");
    element.addEventListener("submit", ()=> updateUser());
}

function timeClear(){
    if(prefs.DisplayName!=""){
        document.querySelector(".DisplayName").value = prefs.DisplayName;
    }else{
        document.querySelector(".DisplayName").value = "Enter Displayname"
    }
    if(prefs.Username!=""){
        document.querySelector(".Username").value = prefs.Username;
    }else{
        document.querySelector(".Username").value = "Enter Username";
    }
    if(prefs.Email!=""){
        document.querySelector(".Email").value = prefs.Email;
    }else{
        document.querySelector(".Email").value = "Enter Email";
    }
    if(Prefs.LikedGenres!=""){
        document.querySelector(".LGenre").value = prefs.LikedGenres;
    }else{
        document.querySelector(".LGenre").value = "Enter your liked Genres";
    }
    if(prefs.DislikedGenres){
        document.querySelector(".DGenre").value = prefs.DislikedGenres;
    }else{
        document.querySelector(".DGenre").value = "Enter Your Disliked Genres";
    }
}

async function updateUser(){
    event.preventDefault();
    const form = document.querySelector(".ProfileForm");
    const submitter = document.querySelector(".savesub");
    let data = new FormData(form, submitter);
    console.log(data);
    await fetch("http://localhost:8080/ListenerUpdate",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(data))
    }).then(userdata => userdata.json()).then(results => data = results)
    console.log(data)
        document.querySelector(".DisplayName").value = data.DisplayName;
        //document.querySelector(".DisplayName").value = "";
        document.querySelector(".Username").value = data.Username;
        //document.querySelector(".Username").value = "";
        document.querySelector(".Email").value = data.Email;
        //document.querySelector(".Email").value = "";
        document.querySelector(".LGenre").value = data.LikedGenres;
        //document.querySelector(".LGenre").value = "";
        document.querySelector(".DGenre").value = data.DislikedGenres;
        //document.querySelector(".DGenre").value = "";
        prefs = data
}