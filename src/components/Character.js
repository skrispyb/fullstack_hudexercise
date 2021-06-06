import React, { useState } from 'react';
import './Character.css';
import Comment from './Comment';
const Character = (props) => {
    // Name
    const [name, setName] = useState(props.name)
    // Health
    const [health, setHealth] = useState('150')
    // Stamina
    const [stamina, setStamina] = useState('200')
    // Gold
    const [gold, setGold] = useState('75')

    const [id] = useState(props.userID)


    const saveUpdate = (value) => {
        props.save({ value, id })
    }

    return (
        <div>
            <h2>{name}'s Bio:</h2>
            <p>Race: {props.race}</p>
            <p>Status: <br />
                Health at {health}<br />
                Stamina at {stamina}
            </p>
            <p>Gold: {gold}</p>
            <p className={props.comment ? 'visible' : 'hidden'}>Comment: {props.comment}</p>
            <Comment comment={props.comment} userID={props.userID} updateComment={props.updateComment} />
            <button onClick={() => {
                 setHealth(parseInt(health) + 10);
                 setGold(parseInt(gold) - 2);
             }}>
                 Add 10 Health (Costs 2 Gold)
            </button><br />

            <button onClick={() => {
                 setStamina(parseInt(stamina) + 5);
                 setGold(parseInt(gold) - 1);
             }}>
                 Add 5 Stamina (Costs 1 Gold)
            </button><br />

            <button onClick={() => {
                 setGold(parseInt(gold) + 3);
                 setHealth(parseInt(health) - 10);
                 setStamina(parseInt(stamina) - 5);
             }}>
                 Add 3 Gold (Cost 10 Health and 5 Stamina)
            </button><br />

            <label htmlFor="nameChange">Change Player's Name:</label><br />
            <input 
                type="text"
                onChange={(e) => {setName(e.target.value); saveUpdate(e.target.value);}}
            />
            <br /><br /><hr />

        </div>
    )
}

export default Character;