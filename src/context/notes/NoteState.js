//import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []
    
    const [notes,setNotes] = useState(notesInitial);
    
    //Get all Notes
    const getNotes = async () => {
        // API call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMWQ0YzBkOTdjODNlYjU3MGMyYTNhIn0sImlhdCI6MTY2MDE4OTIwNH0.4IrcjXizLN_pp6GeHxGw56Um9DAN4HRrYTnk017ls1Q",
                //'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        //const json = response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        // console.log(json);
        setNotes(json);
      }


    //Add a Note
      const addNote = async (title, description, tag) => {
        //TODO: API call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMWQ0YzBkOTdjODNlYjU3MGMyYTNhIn0sImlhdCI6MTY2MDE4OTIwNH0.4IrcjXizLN_pp6GeHxGw56Um9DAN4HRrYTnk017ls1Q",
                //'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log('Adding a new log');

        // console.log(json);
        //const json = response.json(); // parses JSON response into native JavaScript objects


    //    let note = {
    //         "_id": "62f62d720b3cd11f312e0601",
    //         "user": "62f1d4c0d97c83eb570c2a3a",
    //         "title": title,
    //         "description": description,
    //         "tag": tag,
    //         "date": "2022-08-12T10:37:38.564Z",
    //         "__v": 0
    //       };
        //concat returns an array whereas push updates an array. 
      }


    //Delete a Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMWQ0YzBkOTdjODNlYjU3MGMyYTNhIn0sImlhdCI6MTY2MDE4OTIwNH0.4IrcjXizLN_pp6GeHxGw56Um9DAN4HRrYTnk017ls1Q"
                //'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json();
        // console.log(json);

        // console.log("Deleting the note with id" + id);
        let newNotes = notes.filter((note) => { return note._id !== id})
        setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //TODO: API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMWQ0YzBkOTdjODNlYjU3MGMyYTNhIn0sImlhdCI6MTY2MDE4OTIwNH0.4IrcjXizLN_pp6GeHxGw56Um9DAN4HRrYTnk017ls1Q"
                //'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);
    
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for(let index=0; index < newNotes.length ; index++)
        {
            const element = newNotes[index];
            if(element._id === id)
            {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;






// const s1 = {
    //     "name": "joginder",
    //     "class": "1a"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Thara bhai joginder",
    //             "class": "10a"
    //         })
    //     }, 1000)
    // }