import fs from 'node:fs'
import {parse} from 'csv-parse'


const readStream = fs.createReadStream('tasks.csv')
const parser = parse({
    columns: true,
    skip_empty_lines: true,
});


async function createTask(chunk) {
    const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify(chunk),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const text = await response.text()
    console.log(text)
}

await readStream.pipe(parser).forEach((chunk) => {
    createTask(chunk)
})

