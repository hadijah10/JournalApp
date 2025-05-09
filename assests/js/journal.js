
const mood = document.getElementById('mood')
const title = document.getElementById('title')
const journal = document.getElementById('content')

import {getLocalStorageData,updateLocalStorageData} from './storage.js'

// function to add new journal entries
function addjournal(){
    let text = journal.value.trim()
    let localStorageData = getLocalStorageData()
        if(text){
            
            let newData = { id: Date.now(), title:title.value, mood: mood.value, journalContent: text, timestamp: new Date().toISOString()};
            let newLocalStorageData = [...localStorageData, newData];
            updateLocalStorageData(newLocalStorageData)
    
    }
}
//function to add new journal entries
function updateJournal(journalToEdit){
    let text = journal.value.trim()
    let localStorageData = getLocalStorageData()
    let newData = {title:title.value, mood: mood.value, journalContent: text, timestamp: new Date().toISOString()}
    const editLocalStorageData=  localStorageData.map(data => 
         data.id == journalToEdit.id ?  {...data,...newData}:  data
     )
     updateLocalStorageData(editLocalStorageData)
}

function editJournal(index){
    let localStorageData = getLocalStorageData()
    let journalToEdit = localStorageData.filter(data => data.id==index)[0]
    mood.value = journalToEdit.mood
    title.value = journalToEdit.title
    journal.value = journalToEdit.journalContent
    return journalToEdit
}

function deleteJournal(index){
    let journalList = getLocalStorageData()
    let newJournalList = journalList.filter((data,key)=> {
        return data.id != parseInt(index)
    })
    updateLocalStorageData(newJournalList)
} 

function searchTitle(text){
    let journalList = getLocalStorageData()
   return journalList.filter(data => data.title.includes(text))
}
export {addjournal,updateJournal,editJournal,deleteJournal,searchTitle}