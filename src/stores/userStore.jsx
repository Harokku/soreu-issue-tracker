import {createRoot, createSignal} from "solid-js"

function createUserStore() {
    const [loggedIn, setLoggedIn] = createSignal(false)
    const [user, setUser] = createSignal(null)

    // Check if user is logged in
    const checkLogin = () => {
        const token = sessionStorage.getItem("user")
        if (token) {
            setLoggedIn(true)
            setUser(sessionStorage.getItem("user"))
            return true
        }
        return false
    }

    const login = (user) => {
        sessionStorage.setItem("user", user)
        setUser(user)
        setLoggedIn(true)
    }

    return {loggedIn, user, checkLogin, login}
}

export default createRoot(createUserStore)