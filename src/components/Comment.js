import React, { useState } from 'react';

const Comment = (props) => {

    const [comment, setComment] = useState(props.comment)
    const [id] = useState(props.userID)

    const onSubmit = (e) => {
        e.preventDefault();
        if(!comment) {
            alert('Please add a task')
            return
        }
        props.updateComment({comment, id})
    }

    return (
            <form onSubmit={(e) => onSubmit(e)}>
                <label><span className={props.comment ? 'hidden' : 'visible'}>Add a </span><span className={props.comment ? 'visible' : 'hidden'}>Update </span>comment:<br />
                    <input onChange={e => setComment(e.target.value)} />
                </label><br />
                <button>Submit
                </button><br />
            </form>
    )
}

export default Comment;