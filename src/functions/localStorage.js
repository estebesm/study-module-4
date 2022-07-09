export const isAuth = () => localStorage.getItem('username')

export const signIn = (username) => localStorage.setItem('username', username)

export const signOut = () => localStorage.removeItem('username')

export const getUsername = () => localStorage.getItem('username')

export const getRecordsList = (mode = 'attack') => {
    return JSON.parse(localStorage.getItem(`${mode}-records`) || '[]').sort(compare)
}

// export const getUserRecord = (mode, username) => {
//     return localStorage.getItem(`${mode}-records`)
// }

function compare( a, b ) {
    if ( a.result < b.result ){
        return 1;
    }
    if ( a.result > b.result ){
        return -1;
    }
    return 0;
}

export const setUserRecord = (mode, username, result) => {
    const recordsList = getRecordsList(mode)

    const user = recordsList.find(user => username === user.username)
    if(user){
        if(user.result < result){
            recordsList.forEach(person => {
                if(person.username === username){
                    person.result = result
                }
            })
            localStorage.setItem(`${mode}-records`, JSON.stringify(recordsList))
        }
    }
    else{
        localStorage.setItem(`${mode}-records`, JSON.stringify(
            [
                ...recordsList,
                {username, result}
            ]
        ))
    }
}