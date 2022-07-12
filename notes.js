const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
    const allNotes = loadNotes()
    const duplicateNote = allNotes.find((note) => note.title === title)

    if (!duplicateNote) {
        allNotes.push({
            title: title,
            body: body
        })
        saveNotes(allNotes)
        console.log(chalk.bgGreen('New note added'))
    } else {
        console.log(chalk.bgRed('Note with title: ', title, ' already exists'))
    }
}

const removeNote = (title) => {
    console.log("Removing Note with Title: ", title)
    const allNotes = loadNotes()
    const notesToBeKept = allNotes.filter((note) => note.title !== title)

    if (allNotes.length > notesToBeKept.length) {
        console.log(chalk.bgGreen('Note Removed'))
        saveNotes(notesToBeKept)
    } else {
        console.log(chalk.bgRed('No note found'))
    }
}

const listNotes = () => {
    const allNotes = loadNotes()

    if (allNotes.length > 0) {
        console.log(chalk.bgYellow('Your Notes...'))
        allNotes.forEach((note) => {
            console.log('Title: ', note.title, 'Body: ', note.body)
        });
    } else {
        console.log(chalk.bgRed('No notes found'))
    }
}

const readNote = (title) => {
    console.log(chalk.bgYellow('Reading note with Title: ', title, '\n'))
    const allNotes = loadNotes()
    const noteRead = allNotes.find((note) => note.title === title)

    if (noteRead) {
        console.log(chalk.bgGreen('Title: ', noteRead.title))
        console.log('Body: ', noteRead.body)
    } else {
        console.log(chalk.bgRed('No Note Found'))
    }
}

const saveNotes = (allNotes) => {
    const dataJSON = JSON.stringify(allNotes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}