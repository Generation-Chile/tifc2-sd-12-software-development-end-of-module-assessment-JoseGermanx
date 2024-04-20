// Task 2: listUsers()

import * as getUrl from "./task1.js";
export function listUsers() {
    fetch(getUrl.getServerURL() + "/users")
        .then(response => response.json())
        .then(data => console.log(data));
    } 