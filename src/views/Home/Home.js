import React, { useEffect, useState } from 'react'
import './Home.css'
import addIcon from "./plus (1).png"
import TaskCard from './../../components/TaskCard/TaskCard'

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('');

  const saveTasksToLS = (tasksToSave) => {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }

  const validateNewTask = () => {
    if (newTask === '') {
      setError('Please enter a task')
      return false;
    }
    else if (newTask.length < 5) {
      setError('Task should be at least 5 characters long')
      return false;
    }
    else {
      setError('')
      return true;
    }
  }

  const addTask = () => {
    const validationResult = validateNewTask();
    if(!validationResult) return;

    const newTasks = [
      {
       title: newTask,
       category: category,
      },
      ...tasks
    ]
    saveTasksToLS(newTasks);

    setTasks([newTasks])
    setNewTask('')
  }

  const deleteTask = (index) => {
    const newTasks = tasks;
    newTasks.splice(index, 1);
    setTasks([...newTasks]);
    saveTasksToLS(newTasks);
   }

  useEffect(() => {
    const tasks = localStorage.getItem('tasks');
    if(tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, [])

  return (
    <>
      <h1 className='app-heading'>ToDo App</h1>

      <div className='tasks-container'>
        {
          tasks.map((task, i) => {
            const {title, category} = task;

            return ( <TaskCard 
                      title={title} 
                      category={category}
                       key={i} 
                       delFuncion={deleteTask}
                       index={i}
                       /> )
          })
        }
      </div >

      <p className='error-message'>{error}</p>

      <div className='input-container'>
        <input type='text'
          placeholder='Add a new task'
          className='task-input'
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value)
          }}
        />

        <select className='category-select' 
          value={category}
          onChange={(e) => {
          setCategory(e.target.value)
          }}>
          <option>Category</option>
          <option value='🏫 Study'>🏫 Study</option>
          <option value='🛒 Shopping'>🛒 Shopping</option>
          <option value='🎯 Goals'>🎯 Goals</option>
          <option value='🎨 Hobby'>🎨 Hobby</option>
        </select>

        <img
          src={addIcon}
          alt='Add'
          className='add-icon'
          onClick={addTask}
        />
      </div>
    </>
  )
}

export default Home