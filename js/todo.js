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

    // دریافت تمام وظایف
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

    // افزودن وظیفه جدید
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

    // حذف وظیفه
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

    // خواندن داده‌های JSON
    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const newTask = new task(node.id, node.description); 
            this.#tasks.push(newTask);
        });
    }

    // افزودن وظیفه به آرایه
    #addToArray = (id, text) => {
        const newTask = new task(id, text); 
        this.#tasks.push(newTask); 
        return newTask; 
    }

    // حذف وظیفه از آرایه
    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks = arrayWithoutRemoved; 
    }
}

export { Todos };

