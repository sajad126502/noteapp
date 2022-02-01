// @flow
import { React, useContext, useRef, useState } from 'react';
import noteContext from '../context/noteContext';
import { NoteItem } from './NoteItem';

import { useEffect } from 'react/cjs/react.development';
import { Navbar } from './Navbar';

export function Notes() {
  const noteData = useContext(noteContext)
  const [state, setState] = useState({ title: "", description: "", tags: "", id: "" })
  const [sValue, setsValue] = useState("")
  const onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  useEffect(() => {

    noteData.loadData()
  }, [])

  const ref = useRef(null);
  const toggleNote = (note) => {
    ref.current.click();
    setState({ title: note.title, description: note.description, tags: note.tags, id: note._id })
  }
  const onKeyDown = (e) => {
    setsValue(()=>e.target.value)
    noteData.data.map((note) => {
    
      if (note.title.includes(e.target.value)) {
        document.getElementById(note._id).style.display = "block"
        console.log(note.title.includes(sValue))
      }
      else if(e.target.value==""){
        document.getElementById(note._id).style.display = "block" 
      }
      else{
        document.getElementById(note._id).style.display = "none" 
      }

    }
    )
  }
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <form className="d-flex">
          <input className="form-control me-2" type="text" value={sValue} onChange={onKeyDown} placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onchange} value={state.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" />

                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" onChange={onchange} value={state.description} className="form-control" cols="3" rows="3" name="description" id="description"></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" className="form-control" onChange={onchange} value={state.tags} name="tags" id="tags" />
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={() => { noteData.editNote(state) }} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <h1>Your Notes</h1>
        <div className="d-flex flex-row flex-wrap justify-content-around">

          {noteData.data.map((note) => {
            console.log(note)
            return (<NoteItem key={note._id} details={note} toggleNote={toggleNote}></NoteItem>)
          })}


        </div>

      </div>
    </>);
};