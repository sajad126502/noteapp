// @flow

import  React, { useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import  noteContext  from '../context/noteContext';
import { Alert } from './Alert';
export function Addnote() {
 
    const data=useContext(noteContext)
    const intialState={title:"",description:"",tags:""}
    const[state,setState]=useState(intialState)
    const[message,setMessage]=useState({mess:true,text:"",color:""})
    const onchange=(e)=>{
       const name=e.target.name
       const val=e.target.value
setState({...state,[e.target.name]:e.target.value})
    }
    const onButtonClick=(e)=>{
      e.preventDefault();
      if (state.title&&state.description&&state.tags!="") {
        data.addNote(state)
        setMessage({mess:true,text:"Note Added Successfully!",color:"success"})
        setTimeout(() => {
          setMessage({...message,mess:false});
        }, 2000)
        setState(intialState)
      }
      else{
        setMessage({mess:true,text:"Please Enter All Fields!",color:"danger"})
        setTimeout(() => {
          setMessage({...message,mess:false});
        }, 2000)
      }
       
      
    }

  return (
    
    <div className="my-3">
       {message.mess ? <Alert message={message.text} col={message.color}></Alert> : ""}
    <h1>Add Note</h1>

    <form >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" onChange={onchange} className="form-control" id="title" value={state.title} name="title" aria-describedby="emailHelp" />
        
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea type="text" onChange={onchange} className="form-control" name="description"  value={state.description} id="description" cols="30" rows="10"></textarea>
       
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input type="text" className="form-control" onChange={onchange}  value={state.tags} name="tags" id="tags" />
      </div>
     
      <button type="submit" onClick={onButtonClick} className="btn btn-primary">Save</button>
    </form>
  
  </div>);
};