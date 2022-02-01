// @flow
import  {React,useContext} from 'react';
import noteContext from '../context/noteContext';
import moment from "moment"

export function NoteItem(props) {
    const info=useContext(noteContext);
    var formatted = moment(props.details.date).format('MMMM Do YYYY, h:mm a');
    
    return (
<>
            <div className=" card col-md-5" id={props.details._id}>
                <div className="card-body ">
                    <h5 className="card-title">{props.details.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{formatted}</h6>
                    <p className="card-text">{props.details.description}</p>
                    <i  className="far fa-edit mx-2" onClick={()=>{props.toggleNote(props.details)}}></i>
                    <i  className="fas fa-trash mx-2 " onClick={()=>{info.deleteNote(props.details._id)}}></i>
                </div>
            </div>



        </>
    );
};