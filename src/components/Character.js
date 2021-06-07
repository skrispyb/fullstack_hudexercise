import React, { useState } from 'react';
import './Character.css';
import Comment from './Comment';
const Character = (props) => {
    // Name
    const [name, setName] = useState(props.name)
    // Health
    const [health, setHealth] = useState(props.health)
    // Stamina
    const [stamina, setStamina] = useState(props.stamina)
    // Gold
    const [gold, setGold] = useState(props.gold)

    const [location, setLocation] = useState(props.location)

    const [id] = useState(props.userID)


    const saveUpdate = (newComment) => {
        props.save({ newComment, id })
    }

    const saveHealthStaminaGOld = (health, gold, stamina) => {
        props.updateHealthStaminaGold( {id, health, stamina, gold} )
    }

    const updateLocation = (gold, location) => {
        props.updateLocation({gold, location, id})
    }
    return (
        <div>
            <h2>{name}'s Bio:</h2>
            <p>Race: {props.race}</p>
            <p>Status: <br />
                Health at {health}<br />
                Stamina at {stamina}
            </p>
            <p>Location:<br />
                Vancouver Tower - Level {props.location}</p>
            <p>Gold: {gold}</p>
            <p className={props.comment ? 'visible' : 'hidden'}>Comment: {props.comment}</p>
            <Comment comment={props.comment} userID={props.userID} updateComment={props.updateComment} />
            <button onClick={() => {
                 setHealth(parseInt(health) + 10);
                 setGold(parseInt(gold) - 2);
                 saveHealthStaminaGOld(health+10, gold-2, stamina);
             }}>
                 Add 10 Health (Costs 2 Gold)
            </button><br />

            <button onClick={() => {
                 setStamina(parseInt(stamina) + 5);
                 setGold(parseInt(gold) - 1);
                 saveHealthStaminaGOld(health, gold-1, stamina+5);
             }}>
                 Add 5 Stamina (Costs 1 Gold)
            </button><br />
            
            <button onClick={() => {
                 setLocation(parseInt(location) + 1);
                 setGold(parseInt(gold) - 1);
                 updateLocation(gold-1, location+1);
             }}>
                 Change Location (Costs 1 Gold)
            </button><br />

            <button onClick={() => {
                 setGold(parseInt(gold) + 3);
                 setHealth(parseInt(health) - 10);
                 setStamina(parseInt(stamina) - 5);
                 saveHealthStaminaGOld(health-10, gold+3, stamina-5);
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