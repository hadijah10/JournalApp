const form  = document.getElementById('form')
import { updateUI } from "./ui.js"
import { addjournal,editJournal,deleteJournal, updateJournal} from "./journal.js"
const journalContent = document.getElementById('journalContent')
const filterMood = document.getElementById('filtermood')
const titleSearch = document.getElementById('titleSearch')
let journalToEdit;

updateUI()
form.addEventListener('submit',(e) => {
    e.preventDefault()
    journalToEdit? updateJournal(journalToEdit) : addjournal()
    //updateUI(filterMood.value)
    updateUI(filterMood.value,titleSearch.value)
    form.reset()
    journalToEdit = null
}
)
journalContent.addEventListener('click',(e) => {
    if(e.target.id== 'edit'){
        let index = e.target.classList[1]
       journalToEdit= editJournal(index)
    }
    if(e.target.id== 'delete'){
        let index = e.target.classList[1]
        deleteJournal(index)
        updateUI(filterMood.value,titleSearch.value)
    }
})

filterMood.addEventListener('change',(e) => {
    updateUI(e.target.value,titleSearch.value)
})

titleSearch.addEventListener('input',(e) =>{
 
    updateUI(filterMood.value,e.target.value)
})