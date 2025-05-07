const form  = document.getElementById('form')
const mood = document.getElementById('mood')
const journal = document.getElementById('content')
const journalData = document.getElementById('journalContent')
const edit  = document.getElementById('edit')
const deletebtn = document.getElementById('delete')

form.addEventListener('submit',
   addjournal)

function addjournal(e){
    e.preventDefault()
    let text = journal.value.trim()
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
    let newJournalList = journalList.filter((data,key)=> {

    })
}
function deleteJournal(index){
    let journalList = JSON.parse(localStorage.getItem('journal'));
    console.log(journalList);
    let newJournalList = journalList.filter((data,key)=> {
        key !== parseInt(index)
    })
    console.log(newJournalList)
    localStorage.setItem('journal',JSON.stringify(newJournalList))
    updateUI()
}