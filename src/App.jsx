// import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { TaskCreator } from './components/TaskCreator.jsx';
import { TaskTable } from './components/TaskTable.jsx';
import { VisibilityControl } from './components/VisibilityControl.jsx';
import { Container } from './components/Container.jsx';



function App() {

  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!tasksItems.find(task => task.name === taskName) && taskName != "") {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) => (t.name === task.name ? {...t, done: !t.done} : t))
    );
  }

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, [])

  const cleanTask = () => {
    setTasksItems(tasksItems.filter(task => !task.done));
    setShowCompleted(false);
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksItems));
  }, [tasksItems])

  return (
    <main className='bg-dark vh-100 text-white'>

      <Container>
        <TaskCreator 
          createNewTask={createNewTask} />
        <TaskTable 
          tasks={tasksItems} 
          toggleTask={toggleTask}/>
        <VisibilityControl 
          isChecked = {showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTask={cleanTask}
          />
        {
          showCompleted === true && (
            <TaskTable 
              tasks={tasksItems} 
              toggleTask={toggleTask} 
              showCompleted={showCompleted}/>
          )
        }
      </Container>
      
    </main>
  );
}

export default App;