/*import { task } from "./task";

class Todos {
    #tasks = []
    #backend_url = ''

    constructor(url) {
        this.#backend_url = url
    }

    
    get tasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(this.#backend_url); 
                const json = await response.json();
                this.#readJson(json); 
                resolve(this.#tasks);  
            } catch (error) {
                reject(error); 
            }
        });
    }

    
    addTask = async (text) => {
        try {
            const json = JSON.stringify({ description: text }); 
            const response = await fetch(this.#backend_url + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            });
            const jsonResponse = await response.json();
            const task = this.#addToArray(jsonResponse.id, text); 
            return task; 
        } catch (error) {
            throw new Error('Error adding task: ' + error.message); 
        }

        removeTask= (id) => {
            return new Promise(async (resolve, reject) => {
               fetch(this.#backend_url + '/delete/' + id, {
                   method: 'DELETE',
               })
                .then((response) => response.json())
                .then((json) =>{
                    this.#removeFromArray(id); 
                    resolve(json.id)
                }, (error) => {
                    reject(error)
                })
                
                     
    })
        }}


    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const newTask = new task(node.id, node.description); 
            this.#tasks.push(newTask);
        });
    }

    #addToArray = (id, text) => {
        const newTask = new task(id, text); 
        this.#tasks.push(newTask); 
        return newTask; 
    }

    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks = arrayWithoutRemoved; 
    }
}

export { Todos };*/

import { task } from "./task";

class Todos {
    #tasks = []
    #backend_url = ''

    constructor(url) {
        this.#backend_url = url
    }

<<<<<<< HEAD
=======
    
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    get tasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(this.#backend_url); 
                const json = await response.json();
                this.#readJson(json); 
                resolve(this.#tasks);  
            } catch (error) {
                reject(error); 
            }
        });
    }

<<<<<<< HEAD
=======
 
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    addTask = async (text) => {
        try {
            const json = JSON.stringify({ description: text }); 
            const response = await fetch(this.#backend_url + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            });
            const jsonResponse = await response.json();
            const task = this.#addToArray(jsonResponse.id, text); 
            return task; 
        } catch (error) {
            throw new Error('Error adding task: ' + error.message); 
        }
    }

<<<<<<< HEAD
=======
    
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    removeTask = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(this.#backend_url + '/delete/' + id, {
                    method: 'DELETE',
                });
                const json = await response.json();
                this.#removeFromArray(id); 
                resolve(json.id);
            } catch (error) {
                reject(error);
            }
        });
    }

<<<<<<< HEAD
=======
   
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const newTask = new task(node.id, node.description); 
            this.#tasks.push(newTask);
        });
    }

<<<<<<< HEAD
=======
   
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    #addToArray = (id, text) => {
        const newTask = new task(id, text); 
        this.#tasks.push(newTask); 
        return newTask; 
    }

<<<<<<< HEAD
=======
   
>>>>>>> 7b8bf7f937eab3994b68c354d1309e4a14828b32
    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks = arrayWithoutRemoved; 
    }
}

export { Todos };

