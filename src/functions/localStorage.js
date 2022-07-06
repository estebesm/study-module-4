export const isAuth = () => localStorage.getItem('username')

export const signIn = (username) => localStorage.setItem('username', username)

export const signOut = () => localStorage.removeItem('username')

export const getUsername = () => localStorage.getItem('username')