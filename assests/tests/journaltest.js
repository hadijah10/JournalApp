
/**
 * @jest-environment jsdom
 */
const localStorageKey = 'journal'

 const getLocalStorageData = () => {
    let localStorageRaw = localStorage.getItem(localStorageKey);
    let localStorageData = localStorageRaw ? JSON.parse(localStorageRaw) : [];
    return localStorageData
}
 const updateLocalStorageData = (newData) => {
    localStorage.setItem(localStorageKey,JSON.stringify(newData))
}

// function to add new journal entries

    function addjournal(updateNewLocalStorageData,title,mood,journalContent){
    let text =  journalContent.trim()
    let localStorageData = getLocalStorageData()
        if(text){
            
            let newData = { id: Date.now(), title:title, mood: mood, journalContent:journalContent, timestamp: new Date().toISOString()};
            let newLocalStorageData = [...localStorageData, newData];
            updateNewLocalStorageData(newLocalStorageData)
    
    }
}

//function to display the 
 function updateUI(filtermood='',searchterm='',getLocalStorageData,journalDataContent){
    let localStorageData = filtermood=='' ? getLocalStorageData() :getLocalStorageData().filter(data => data.mood==filtermood)
    if(searchterm.length >0){
        localStorageData = localStorageData.filter(data => data.title.toLowerCase().includes(searchterm.toLowerCase()))
    }
    let child = ''
    localStorageData.map((data,key) => {
        child += `<div class = 'list ${key}'>
        <div class='head'>
         <h6 class='mood'>${data?.mood}</h6>
        <h2 class='title' id='title'>${data.title}</h2></div>
        <p class='journalText'>${data.journalContent}</p>
        <p class='time'>${data.timestamp.slice(0,10)}</p>
        <div class='btngroup'>
        <button type='button' id='edit' class='edit ${data.id}'>Edit</button>
        <button type='button' id='delete' class='delete ${data.id}'>Delete</button>
        </div>
        </div>`
     
    })
    journalDataContent.innerHTML = child
    }

    //function to delete a journal.
function deleteJournal(index,updateNewLocalStorageData,getNewLocalStorageData){
    let journalList = getNewLocalStorageData()
    let newJournalList = journalList.filter((data,key)=> {
        return data.id != parseInt(index)
    })
    updateNewLocalStorageData(newJournalList)
  
} 

module.exports = {getLocalStorageData,updateLocalStorageData,addjournal,updateUI,deleteJournal}