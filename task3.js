// Task 3: addUser(first_name, last_name, email)

import * as getUrl from "./task1.js";
export function addUser(first_name, last_name, email) {
    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email
    }
    fetch(getUrl.getServerURL() + "/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    }