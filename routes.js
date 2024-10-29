import {Database} from "./database.js";
import {randomUUID} from "node:crypto";
import {buildRoutePath} from "./utils/build-route-path.js";


const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/'),
        handler: (req, res) => {
            return res.end(JSON.stringify("Pong"))
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {search} = req.query
            const tasks = database.select('tasks', search ? {
                id: search,
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: async (req, res) => {
            try {
                const {title, description} = req.body
                const created_at = new Date()

                const task = {
                    id: randomUUID(),
                    title,
                    description,
                    created_at,
                    updated_at: created_at,
                    completed_at: null,
                }
                const record = database.insert('tasks', task)
                console.log(record)
                return res.writeHead(201).end(JSON.stringify({status: "success", result: record}))
            } catch (e) {
                return res.writeHead(400).end(JSON.stringify({
                    error: 'Corpo da requisição inválido',
                    body: req
                }))
            }
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            console.log(req.params)
            const {id} = req.params

            const result = database.find_by_id('tasks', id)
            if (result.length === 0) {
                return res.writeHead(404).end('Task não encontrada')
            } else {
                database.delete('tasks', id)
                return res.writeHead(204).end('Task deletada')
            }
        }
    },

    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const {id} = req.params
            console.log(id)
            console.log(req.body)
            try {
                const {title, description} = req.body
                const updated_at = new Date()
                const task = {
                    title,
                    description,
                    updated_at,
                }
                const result = database.find_by_id('tasks', id)
                console.log(result)
                if (result.length === 0) {
                    return res.writeHead(404).end('Task não encontrada')
                } else {
                    database.update('tasks', id, task)
                    return res.writeHead(204).end('Task atualizada')
                }
            } catch (e) {
                return res.writeHead(400).end(JSON.stringify({error: 'Corpo da requisição inválido'}))
            }
        }


    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const {id} = req.params

            const result = database.find_by_id('tasks', id)
            if (result.length === 0) {
                return res.writeHead(404).end('Task não encontrada')
            } else {
                const completed_at = new Date()
                database.update('tasks', id, {completed_at, updated_at: completed_at})
                return res.writeHead(204).end('Task completada')
            }
        }
    }
]