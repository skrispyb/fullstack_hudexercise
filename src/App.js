import React, { useState, useEffect } from 'react';
import './App.css';
import Character from './components/Character';



export default function App() {
    const [title, setTitle] = useState('HUD')
    const [content, setContent] = useState([])

    useEffect(() => {
        document.title = title
        const getCharArray = async () => {
            const contentFromDB = await fetchArray()
            setContent(contentFromDB)
           }
        getCharArray()
    }, [title])

    // Fetch data from db
    const fetchArray = async () => {
        const res = await fetch('http://localhost:5555/charArray')
        const data = await res.json()
        return data
    }
    
    // Fetch data for single character from db
    const fetchCharacter = async (id) => {
        const res = await fetch(`http://localhost:5555/charArray/${id}`)
        const data = await res.json()
        return data
    }

    // Save changed data from UI to db
    const saveChanges = async (upd) => {
        const charToUpdate = await fetchCharacter(upd.id)
        const updChar = { ...charToUpdate, name: upd.value}
        await fetch(`http://localhost:5555/charArray/${upd.id}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updChar)
        })  
    }

    const updateComment = async (update) => {
        const charToUpdate = await fetchCharacter(update.id)
        const updChar = { ...charToUpdate, comment: update.comment}
        await fetch(`http://localhost:5555/charArray/${update.id}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updChar)
        })
        const content = await fetchArray()
        setContent(content)
    }

    // Display content on browser
    const listComp = () => {
        return content.map((item, i) => <Character key={i} userID={item.id} name={item.name} race={item.race} save={saveChanges} updateComment={updateComment} status={item.status} comment={item.comment} />);
    }

    return (
        <div className="App">
            <label htmlFor="titleChange">Change Page Title</label>
            <input 
                type="text"
                id="titleChange"
                onChange={e => setTitle(e.target.value)}
            />
            <hr />
            <header className="App-header">
                {listComp()}
            </header>
        </div>
    );
}