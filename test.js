

import * as task1 from "./task1.js";
import * as task2 from "./task2.js";
import * as task3 from "./task3.js";
import * as task4 from "./task4.js";


test('getServerURL returns correct response', async () => {
 
   

    const url = task1.getServerURL();
    const response = await fetch(url + '/test');
    const data = await response.json();

    // Verificar que la respuesta es correcta
    expect(data).toEqual({ "body": 'success' });

});

test('listUsers prints correct response', async () => {
    // Espiar console.log
    const consoleSpy = jest.spyOn(console, 'log');

    // Llamar a listUsers
    task2.listUsers();

    // Hacer la petición
    const response = await fetch(task1.getServerURL() + '/users');
    const expectedData = await response.json();

    // Verificar que se llamó a console.log con la respuesta correcta
    expect(consoleSpy).toHaveBeenCalledWith(expectedData);

    // Limpiar el espía
    consoleSpy.mockRestore();
});

test('addUser adds a new user correctly', async () => {
    // Hacer la petición para obtener la lista de usuarios antes de añadir el nuevo usuario
    let response = await fetch(task1.getServerURL() + '/users');
    let usersBefore = await response.json();

    // Llamar a addUser
    const newUser = {first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' };
    task3.addUser(newUser.first_name, newUser.last_name, newUser.email);

    // Hacer la petición para obtener la lista de usuarios después de añadir el nuevo usuario
    let responseAfter = await fetch(task1.getServerURL() + '/users/').then(response => response);
    expect(responseAfter.status).toBe(200);
   
});

test('delUser deletes a user correctly', async () => {
    // Hacer la petición para obtener la lista de usuarios antes de eliminar el usuario
    let response = await fetch(task1.getServerURL() + '/users');
    let usersBefore = await response.json();

    // Llamar a delUser
    const userIdToDelete = usersBefore[0].id; // Asegúrate de que este ID existe en tu base de datos
    await task4.delUser(userIdToDelete);

    // Hacer la petición para obtener la lista de usuarios después de eliminar el usuario
    let responseAfter = await fetch(task1.getServerURL() + '/users');
    let usersAfter = await responseAfter.json();

    // Verificar que se ha eliminado un usuario
    expect(usersAfter.length).toBe(usersBefore.length - 1);

    // Verificar que el usuario se ha eliminado correctamente
    const deletedUser = usersBefore.find(user => user.id === userIdToDelete);
    expect(usersAfter).not.toContainEqual(deletedUser);
});