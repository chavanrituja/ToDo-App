import React from 'react'
import './TaskCard.css'
import imgDelete from "./dustbin (1).png"

function TaskCard({title, category, delFuncion, index}) {
    return (
        <>
          <div className='task-card'>
            <h2 className='task-title'>{title}</h2>
            <span className='task-category'>{category}</span>
            <img src={imgDelete} 
                 alt='delete'
                 className='delete-icon' 
                 onClick= {() => {
                  delFuncion(index)
                 }}
          />
          </div>
        </>
        )
}

export default TaskCard