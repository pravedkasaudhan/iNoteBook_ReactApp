import React ,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
    // const context = useContext(noteContext);
    // useEffect(() => {
    //     context.update()
    // }, [])
    return (
        <div>
            {/* This is About.{context.state.name} with {context.state.id} */}
            This is About.
        </div>
    )
}

export default About
