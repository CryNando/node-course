const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully!'))
    } else {
        console.log(chalk.red.inverse("Note wasn't added because it's a duplicate note"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title !== title)

    if (notes.length === filteredNotes.length) {
        console.log(chalk.red.inverse("It was not possible to remove " + title + ". Check if you provide the right note!"))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse(title + " was removed successfully!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.bold("Your notes: "))
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const matchNote = notes.find((note) => note.title === title)

    if (!matchNote) {
        console.log(chalk.red.inverse("Note not found!"))
    } else {
        console.log(chalk.inverse(matchNote.title()))
        console.log(matchNote.body)
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
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