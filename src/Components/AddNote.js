import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [input, setInput] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        console.log("added successfully");
        addNote(input.title,input.description,input.tag); 
        setInput({title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-4">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="title" value={input.title} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name="description" id="description" value={input.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" id="tag" value={input.tag} onChange={onChange} />
                    </div>
                   
                    <button disabled={input.title.length<5 || input.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
