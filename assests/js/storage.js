const localStorageKey = 'journal'

 const getLocalStorageData = () => {
    let localStorageRaw = localStorage.getItem(localStorageKey);
    let localStorageData = localStorageRaw ? JSON.parse(localStorageRaw) : [];
    return localStorageData
}
 const updateLocalStorageData = (newData) => {
    localStorage.setItem(localStorageKey,JSON.stringify(newData))
}

export {getLocalStorageData,updateLocalStorageData}
