export const isLoggedIn =()=>{
    return window.localStorage.getItem('AUTH_TOKEN')
}
export const logout =()=>{
    return window.localStorage.removeItem('AUTH_TOKEN')
}