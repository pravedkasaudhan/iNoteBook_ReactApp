import React, { useState } from 'react'
import noteContext from './noteContext'

function NoteState(props) {


  const host = "http://localhost:5000";
  // const [state, setstate] = useState(data);
  // const update=()=>{
  // setTimeout(() => {
  //     setstate({
  //         "name":"pk",
  //         "id":"1722210114"
  //     })

  // }, 2000);
  //     }
  const note = [
    {
      "_id": "620fecdb304aade052bc6e89e3",
      "user": "620f5114a6bb75a162f76eb1",
      "title": "my time pass",
      "description": "hobb2 : watching youtube",
      "tag": "personal",
      "date": "1645210843707",
      "__v": 0
    },
    {
      "_id": "62134e921ab76abda07a71ab2d",
      "user": "620f5114a6bb75a162f76eb1",
      "title": "night time",
      "description": "hobb2 : coding time",
      "tag": "night",
      "date": "1645432466235",
      "__v": 0

    },
    {
      "_id": "62134e921ab76ab07aa71ab2d",
      "user": "620f5114a6bb75a162f76eb1",
      "title": "night time",
      "description": "hobb2 : coding time",
      "tag": "night",
      "date": "1645432466235",
      "__v": 0

    },
    {
      "_id": "62134e921ab7a6ab07a71ab2d",
      "user": "620f5114a6bb75a162f76eb1",
      "title": "night time",
      "description": "hobb2 : coding time",
      "tag": "night",
      "date": "1645432466235",
      "__v": 0

    }
  ];

  const [notes, setNotes] = useState(null);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    );
    const data = await response.json();

    setNotes(data);
  }
  //add an note
  const addNote = async (title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag,
      date: "1645210843707"
    };
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify(note)
     
    });
    const json = await response.json();
    console.log(json);
  
    setNotes(notes.concat(json));
    // getAllNotes();
    // console.log(notes);
    
  }

  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }     
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id = ", id);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  //edit a note
  const editNote = async(id,title,description,tag) => {
    const editednote = {
      title: title,
      description: description,
      tag: tag,
    }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify(editednote)     
    });
    const json = await response.json();
    console.log("updated",json);
    let i,element,data;
    data=JSON.parse(JSON.stringify(notes));
    for(i=0;i<data.length;i++){
      element=data[i];
      if(element._id===id){
        data[i].title=title;
        data[i].description=description;
        data[i].tag=tag;
        break;
      }
    }
    setNotes(data);
    console.log(notes);
  }
  return (
    <div>
      {/* <noteContext.Provider value={{state,update}}> */}
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
        {props.children}
      </noteContext.Provider>
    </div>
  )
}

export default NoteState
