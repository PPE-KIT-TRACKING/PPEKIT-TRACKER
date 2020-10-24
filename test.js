const login = (creds) => {
    return {
        type: "J",
        payload: {
            ...creds
        }
    }
}


console.log(login({ user: "Hello" }))
