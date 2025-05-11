
const { getLocalStorageData,updateLocalStorageData,addjournal,updateUI,deleteJournal}=  require('./journaltest.js');
const journalUtils = require('./journaltest.js');
const localStorageKey = 'journal'

describe('local storage data test', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });
    
    test('returns parsed data when localStorage has data', () => {
        const mockData = [{ name: 'test' ,email:'mail@gmail.com'}];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));

        const result = getLocalStorageData();
        expect(result).toEqual(mockData);
    });

    test('returns empty array when localStorage has no data', () => {
        const result = getLocalStorageData();
        expect(result).toEqual([]);
    });
});


describe('addjournal', () => {
    beforeEach(() => {
              jest.spyOn(journalUtils, 'getLocalStorageData').mockReturnValue([]);
        jest.spyOn(journalUtils, 'updateLocalStorageData').mockImplementation(jest.fn(newData => localStorage.setItem('jornal',JSON.stringify(newData))));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('adds a journal entry when content is not empty', () => {
        const title = 'My Title';
        const mood = 'Happy';
        const journalContent = ' This is my journal entry. ';
        const updateNewLocalStorageData = jest.fn(newData => localStorage.setItem('jornal',JSON.stringify(newData)))
        //calling the addjournal function
        addjournal(updateNewLocalStorageData,title, mood, journalContent);
        //check the number of times updateNewLocalStorage was called.
          expect(updateNewLocalStorageData.mock.calls).toHaveLength(1);
        // The first argument of the first call to the function was 0
         expect(updateNewLocalStorageData.mock.calls[0][0][0]).toMatchObject({
            title,
            mood,
            journalContent
        });

    });
    it('does not add entry when content is empty or whitespace', () => {
        addjournal(updateLocalStorageData,'Title', 'Sad', '    ');

        expect(journalUtils.updateLocalStorageData).not.toHaveBeenCalled();
    });
});

describe('ui test',() => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div class='journalDataContent'></div>
        `
        localStorage.clear();
    });
    afterEach(() => {
           jest.clearAllMocks();
    })
    test('when there is no search or filter applied with no item in local storage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        
        updateUI(filtermood='',searchterm='',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).toBe('')
    });

    test('when there is no search or filter applied with an item in localstorage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        const mockData = [{"id": 1746962938156, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"}];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));
        updateUI(filtermood='',searchterm='',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).toContain('My Title')
    });

    test('when there is a search applied with items in localstorage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        const mockData = [{"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 4, "journalContent": " This is my journal entry.V2 ", "mood": "Motivated", "timestamp": "2025-05-11T11:28:58.156Z", "title": "Do it"}
        ];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));
        updateUI(filtermood='',searchterm='do',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).toContain('Do it'),
        expect(journalDataContent.innerHTML).not.toContain('My Title')
    });

    test('when there is filter applied with items in localstorage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        const mockData = [{"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 4, "journalContent": " This is my journal entry.V2 ", "mood": "Motivated", "timestamp": "2025-05-11T11:28:58.156Z", "title": "Do it"}
        ];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));
        updateUI(filtermood='Happy',searchterm='',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).not.toContain('Do it'),
        expect(journalDataContent.innerHTML).toContain('My Title')
    });

    test('when there is both a filter and search applied with the search item not in the title and items in localstorage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        const mockData = [{"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 4, "journalContent": " This is my journal entry.V2 ", "mood": "Motivated", "timestamp": "2025-05-11T11:28:58.156Z", "title": "Do it"}
        ];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));
        updateUI(filtermood='Happy',searchterm='do',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).not.toContain('Do it'),
        expect(journalDataContent.innerHTML).toContain('')
    });

     test('when there is both a filter and search applied with the search item in the title and items in localstorage',()=> {
        const journalDataContent = document.querySelector('.journalDataContent')
        const mockData = [{"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 4, "journalContent": " This is my journal entry.V2 ", "mood": "Motivated", "timestamp": "2025-05-11T11:28:58.156Z", "title": "Do it"}
        ];
        localStorage.setItem(localStorageKey, JSON.stringify(mockData));
        updateUI(filtermood='Happy',searchterm='title',getLocalStorageData,journalDataContent)
        expect(journalDataContent.innerHTML).not.toContain('Do it'),
        expect(journalDataContent.innerHTML).toContain('My Title')
    });
})

describe('deleting journal',() => {
     beforeEach(() => {
        localStorage.clear();
    });
      afterEach(() => {
        jest.clearAllMocks();
    });
    test('deleting a journal with the right id',()=> {
        let newData = [
            {"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 2, "journalContent": " This is my journal entry2. ", "mood": "Sad", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title2"}
        ];
        const updateNewLocalStorageData = jest.fn(newData => localStorage.setItem('jornal',JSON.stringify(newData)))
        localStorage.setItem(localStorageKey,JSON.stringify(newData))
         deleteJournal(2,updateNewLocalStorageData,getLocalStorageData)
         //check the number of times updateNewLocalStorage was called.
          expect(updateNewLocalStorageData.mock.calls).toHaveLength(1);
        
          // The first argument of the first call to the function was 0
         expect(updateNewLocalStorageData.mock.calls[0][0].length).toBe(1)
    });
    test('deleting a journal without the right id',()=> {
        let newData = [
            {"id": 1, "journalContent": " This is my journal entry. ", "mood": "Happy", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title"},
            {"id": 2, "journalContent": " This is my journal entry2. ", "mood": "Sad", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title2"},
             {"id": 3, "journalContent": " This is my journal entry2. ", "mood": "Sad", "timestamp": "2025-05-11T11:28:58.156Z", "title": "My Title3"}
        ];
        const updateNewLocalStorageData = jest.fn(newData => localStorage.setItem('jornal',JSON.stringify(newData)))
        localStorage.setItem(localStorageKey,JSON.stringify(newData))
         deleteJournal(4,updateNewLocalStorageData,getLocalStorageData)
         //check the number of times updateNewLocalStorage was called.
          expect(updateNewLocalStorageData.mock.calls).toHaveLength(1);
        
          // The first argument of the first call to the function was 0
         expect(updateNewLocalStorageData.mock.calls[0][0].length).toBe(3)
    });
})
