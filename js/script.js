var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("urlSubmit");
var alert = document.querySelector(".alert")


var bookMarksContainer;
if (localStorage.getItem("bookMarkList") == null) {
    bookMarksContainer = [];
}
else {
    bookMarksContainer = JSON.parse(localStorage.getItem('bookMarkList'));
    displayBookmarks();
}

addButton.onclick = function () {
    if (siteNameInput.value != "" && siteUrlInput.value != "") {
        addBookMark();
        displayBookmarks();
        clrForm();
        alert.style.display = "none"
        return false;
    }
    else {
        alert.style.display = "block";
        return false;
    }
}
function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);

function addBookMark() {
    var website = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    }
    bookMarksContainer.push(website);
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarksContainer));
    clrForm();
    displayBookmarks()
}

function clrForm() {
    siteNameInput.value = ``;
    siteUrlInput.value = ``;
}

function deleteBookMark(index) {
    bookMarksContainer.splice(index, 1);
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarksContainer));
    displayBookmarks();
}

function displayBookmarks() {

    var container = ``;

    for (var i = 0; i < bookMarksContainer.length; i++) {
        container += `<div class="column m-auto"><h3>${bookMarksContainer[i].siteName}</h3>
        <a href="${bookMarksContainer[i].siteUrl}" class="btn btn-outline-primary" target="_blank">Visit</a>
        <button onclick="deleteBookMark(${i})" class="btn btn-outline-danger">Delete</button> <button onclick="prepUpdate(${i})" class="btn btn-outline-success">Update</button> <button onclick="updateBookMark(${i})" class="btn btn-outline-warning btn-mine " id ="update">Confirm Update</button> </div>`
    }
    document.getElementById("container").innerHTML = container;
}

function prepUpdate(bookMarkIndex) {
    siteNameInput.value = bookMarksContainer[bookMarkIndex].siteName;
    siteUrlInput.value = bookMarksContainer[bookMarkIndex].siteUrl;
}

function updateBookMark(index) {
    if (siteNameInput.value != "" && siteUrlInput.value != "") {
        bookMarksContainer[index].siteName = siteNameInput.value;
        bookMarksContainer[index].siteUrl = siteUrlInput.value;
        localStorage.setItem("bookMarkList", JSON.stringify(bookMarksContainer));
        displayBookmarks()
        clrForm()
    }
    else {
        window.alert("Press the update button first")
    }
}

function searchBookmarks(searchValue) {
    var container = ``;
    for (var i = 0; i < bookMarksContainer.length; i++) {

        if (bookMarksContainer[i].siteName.toLowerCase().includes(searchValue.toLowerCase()) == true || bookMarksContainer[i].siteUrl.toLowerCase().includes(searchValue.toLowerCase()) == true) {
            container += `<div class="column m-auto"><h3>${bookMarksContainer[i].siteName}</h3>
            <a href="${bookMarksContainer[i].siteUrl}" class="btn btn-outline-primary" target="_blank">Visit</a>
            <button onclick="deleteBookMark(${i})" class="btn btn-outline-danger">Delete</button> <button onclick="prepUpdate(${i})" class="btn btn-outline-success">Update</button> <button onclick="updateBookMark(${i})" class="btn btn-outline-warning btn-mine " id ="update">Confirm Update</button> </div>`
        }
    }
    document.getElementById("container").innerHTML = container;
}

function welcomingUser(){
    document.getElementById("welcoming").innerHTML = `Welcome ${localStorage.getItem('sessionUserName')}` 
}

function logOut() {
    localStorage.removeItem('sessionUserName')
    window.location.replace("Sign in.html");
}