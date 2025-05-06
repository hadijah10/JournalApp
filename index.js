const form  = document.getElementById('form')
const mood = document.getElementById('mood')
const journal = document.getElementById('content')

let journalContent = localStorage.getItem('journal') || []
form.addEventListener('submit',e => {
    let newJournalContent = [...journalContent,{mood:mood.value,journalContent: journal.value}]
    localStorage.setItem('journal',JSON.stringify(newJournalContent))
})

function updateUI(){
     
     console.log(journalContent)

    }

   updateUI()