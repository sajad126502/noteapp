// @flow
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NoteContext from './noteContext';

export function NoteState(props) {
    const state = [];
    const [data, setdata] = useState(state)
    const loadData = async () => {
        if (localStorage.getItem("myjwt")) {
            const st = await axios.get("http://127.0.0.1:4000/api/notes/allnotes", {
                headers: {
                    "my-token": localStorage.getItem("myjwt")
                }
            }
            )
            setdata(() => {
                return st.data
            })
        }

    }
    
    useEffect(() => {
        loadData()
       
    }, [])



    //add the note 
    const addNote = async (note) => {
        const rs = await axios.post("http://127.0.0.1:4000/api/notes/addnotes", note, {
            headers: {
                "my-token": localStorage.getItem("myjwt")
            }
        });
        setdata(data.concat(rs.data))


    }

    //edit note
    const editNote = async ({ title, description, tags, id }) => {
        const rs = await axios.put(`http://127.0.0.1:4000/api/notes/updatenote/${id}`, { title, description, tags },
            {
                headers: {
                    "my-token": localStorage.getItem("myjwt")
                }

            })
        setdata((prevState) => {
            const temp = JSON.parse(JSON.stringify(prevState))
            temp.map((ele) => {
                if (ele._id === id) {
                    ele.title = title
                    ele.description = description
                    ele.tags = tags

                }
            })
            return temp
        })
    }
    //delete the note
    const deleteNote = async (id) => {
        console.log("delete note")
        const rs = await axios.delete(`http://127.0.0.1:4000/api/notes/deletenote/${id}`, {
            headers: {
                "my-token": localStorage.getItem("myjwt")
            }

        }
        )
        setdata((prevState) => {
            return prevState.filter((ele) => {
                return ele._id != id
            })

        })
    }



    return (
        <div>
            <NoteContext.Provider value={{ data, addNote, deleteNote, editNote, loadData }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    );
};
