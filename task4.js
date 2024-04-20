// Task 4: delUser(number)

import * as getUrl from "./task1.js";

export function delUser(number) {
    fetch(getUrl.getServerURL() + "/users/" + number, {
        method: "DELETE"
    })
}