import React ,{useContext}from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { note,updateNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            
            
            <div className="card my-3">
               
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash mx-3 icon" onClick={()=>deleteNote(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square icon" onClick={()=>{updateNote(note)}}></i>
                    </div>
                        
                    <p className="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit repellat vel deleniti laboriosam numquam, ex beatae nihil, aut suscipit voluptatem modi eius deserunt alias perferendi</p>
                    <hr />
                    <p>{note.tag}</p>
                   
                </div>
            </div>
        </div>
    )
}

export default NoteItem
