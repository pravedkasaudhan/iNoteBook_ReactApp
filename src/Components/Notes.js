import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import {useHistory} from 'react-router-dom';

function Notes() {
    const context = useContext(noteContext);
    const history=useHistory();
    const { notes, getAllNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            history.push('./Login');
        }
        // eslint-disable-next-line
    }, []);
    const [input, setInput] = useState({ id:"",etitle: "", edescription: "", etag: "" })

    const updateNote = (currentnote) => {
        ref.current.click();
        setInput({ id:currentnote._id,etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("updated successfully",input);
        refClose.current.click();
        editNote(input.id,input.etitle,input.edescription,input.etag)
        // addNote(input.title, input.description, input.tag); 
    }
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            <div className="container">
                {/* <!-- Button trigger modal --> */}
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={input.etitle} aria-describedby="title" onChange={onChange} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" name="edescription" id="edescription" value={input.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" name="etag" id="etag" value={input.etag} onChange={onChange} />
                                    </div>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-3">
                    <h2>All Notes</h2>
                    {(notes && notes.length!==0)?notes.map((ele) => {
                        return <NoteItem key={ele._id} updateNote={updateNote} note={ele} />
                    }):"no notes available"}
                </div>
            </div>
        </>
    )
}

export default Notes
