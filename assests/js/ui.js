import { getLocalStorageData } from "./storage.js"
const journalData = document.getElementById('journalContent')


//function to display the 
 function updateUI(filtermood='',searchterm=''){
    let localStorageData = filtermood=='' ? getLocalStorageData() :getLocalStorageData().filter(data => data.mood==filtermood)
    if(searchterm.length >0){
        localStorageData = localStorageData.filter(data => data.title.toLowerCase().includes(searchterm.toLowerCase()))
    }
    let child = ''
    localStorageData.map((data,key) => {
        child += `<div class = 'list ${key}'>
        <div class='head'>
         <h6 class='mood'>${data?.mood}</h6>
        <h2>${data.title}</h2></div>
        <p class='journalText'>${data.journalContent}</p>
        <p class='time'>${data.timestamp.slice(0,10)}</p>
        <div class='btngroup'>
        <button type='button' id='edit' class='edit ${data.id}'>Edit</button>
        <button type='button' id='delete' class='delete ${data.id}'>Delete</button>
        </div>
        </div>`
     
    })
    journalData.innerHTML = child
    }

  export {updateUI}
