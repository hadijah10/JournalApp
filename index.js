const form  = document.getElementById('form')
const mood = document.getElementById('mood')
const journal = document.getElementById('content')
const journalData = document.getElementById('journalContent')
const editbtn  = document.getElementById('edit')
const deletebtn = document.getElementById('delete')
const updateDiv = document.getElementById('updateContent')
const updateContent = document.getElementById('updateContent')
const saveButton = document.getElementById('save')

form.addEventListener('submit',addjournal)

function addjournal(e){
    e.preventDefault()
    let text = journalData.value
    if(text){
        let localStorageRaw = localStorage.getItem('journal');
        let localStorageData = localStorageRaw ? JSON.parse(localStorageRaw) : [];
        let newData = { mood: mood.value, journalContent: text};
        let newLocalStorageData = [...localStorageData, newData];
        localStorage.setItem('journal', JSON.stringify(newLocalStorageData));
         updateUI()
         form.reset()
    }
}


function updateUI(){
    let localStorageRaw = localStorage.getItem('journal');
    let localStorageData = localStorageRaw ? JSON.parse(localStorageRaw) : [];
    let child = ''
    localStorageData.map((data,key) => {
        child += `<div class = 'list ${key}'>
        <div class='moood'>${data.mood}</div>
        <p class='journalText'>${data.journalContent}</p>
        <button type='button' id='edit' onClick= 'editJournal(${key})'>Edit</button>
        <button type='button' id='delete' onClick='deleteJournal(${key})'>Delete</button>
        </div>`
     
    })
    journalData.innerHTML = child
    }
updateUI()

function editJournal(index){
    let journalList = JSON.parse(localStorage.getItem('journal'));
    journalData.value = journalList[index].journalContent
    updateDiv.classList.toggle('hid')
}
// saveButton.addEventListener('click',updateEdit)
// function updateEdit(e){
    
// }
function deleteJournal(index){
    let journalList = JSON.parse(localStorage.getItem('journal'));
    let newJournalList = journalList.filter((data,key)=> {
        return key !== parseInt(index)
    })
    localStorage.setItem('journal',JSON.stringify(newJournalList))
    updateUI()
}