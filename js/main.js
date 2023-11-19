let noteTitleInput = document.getElementById("noteTitleInput");
let noteDateInput = document.getElementById("noteDateInput");
let noteDescriptionInput = document.getElementById("noteDescriptionInput");
let addNoteCard = document.getElementById("addNoteCard");
let addNoteBtn = document.getElementById("addNoteBtn");
let updateNoteBtn = document.getElementById("updateNoteBtn")
let noteContainer;

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("note") != null) {
        noteContainer = JSON.parse(localStorage.getItem("note"));
        displayNote(noteContainer);
    } else {
        noteContainer = [];
    }
  });

function addNote() {
        if(validateInputs()){
            let noteObj = {
                title: noteTitleInput.value,
                description: noteDescriptionInput.value,
                date: noteDateInput.value,
              };
              noteContainer.push(noteObj);
              localStorage.setItem("note", JSON.stringify(noteContainer));
              displayNote(noteContainer);
              clearInputs()
        }
    }


function displayNote(arr){

    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona +=`
        <div class="col-lg-4 col-md-6">
        <div class="note d-flex justify-content-between align-items-center flex-column">
        <h3 class="noteTitle fw-bold">${arr[i].title}</h3>
        <p class="noteText text-black-50 fs-5">${arr[i].description}</p>
        <div class="bottomContent d-flex justify-content-between w-100">
            <p class="date fw-bold text-black-50">${arr[i].date}</p>
            <div class="settings position-relative">
                <span class="menuKey">
                    <i class="fa-solid fa-ellipsis"></i>
                </span>
                <div class="miniMenu">
                    <span  onclick="deleteNote(${i})" class="d-flex delete align-items-center mb-2"><i class="fa-solid fa-trash-can me-1 text-danger"></i> Delete</span>
                    <span data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getValues(${i})" class="d-flex edit align-items-center"><i class="fa-solid fa-edit me-1 text-warning"></i> Edit</span>
                </div>
            </div>
        </div>
    </div>
    </div>

        `
    }
    addNoteCard.innerHTML = cartona
}

function validateInputs(){
    if(noteTitleInput.value && noteDescriptionInput.value){
        Swal.fire({
            icon: 'success',
            title: 'Hope you read it again!',
            text: 'Note Added Succeffully!',
          })
          return true
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill The Blanks!',
          })
          return false
    }
}

function deleteNote(idx){
    noteContainer.splice(idx,1)
    localStorage.setItem("note",JSON.stringify(noteContainer))
    displayNote(noteContainer)
}

let updatedIndex = 0;
function getValues(index){
    document.getElementById("modalTitle").innerHTML = "Edit Note"
    addNoteBtn.classList.replace("d-block","d-none")
    updateNoteBtn.classList.replace("d-none","d-block")
    noteTitleInput.value = noteContainer[index].title
    noteDescriptionInput.value = noteContainer[index].description
    noteDateInput.value = noteContainer[index].date
    updatedIndex = index
}
function updateNote(){
    console.log("updating");
    addNoteBtn.classList.replace("d-none","d-block")
    updateNoteBtn.classList.replace("d-block","d-none")
    let newNote = {
        title: noteTitleInput.value,
        date: noteDateInput.value,
        description: noteDescriptionInput.value
    }
    noteContainer.splice(updatedIndex,1,newNote)
    localStorage.setItem("note",JSON.stringify(noteContainer))
    displayNote(noteContainer)
    clearInputs()
}

function clearInputs(){
    noteTitleInput.value = ""
    noteDescriptionInput.value = ""
    noteDateInput.value = ""
}

updateNoteBtn.addEventListener("click", function(){
    updateNote()
})
addNoteBtn.addEventListener("click", function () {
    addNote();
});

document.getElementById("outerAddBtn").addEventListener("click",function(){
    document.getElementById("modalTitle").innerHTML = "Add New Note"
    addNoteBtn.classList.replace("d-none","d-block")
    updateNoteBtn.classList.replace("d-block","d-none")
})