import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<ITaskData[]>([]);

  const loadTasks = async (): Promise<void> => {
    const response = await fetch('http://localhost:3000/api/tasks')
    const data = await response.json()
    setTasks(data);
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
      })
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.log({ ErrorDelete: error });
    }
  };

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card key={task.id} style={{ marginBottom: '.7rem', backgroundColor: '#1e272e' }}>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: '#fff' }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button variant='contained' color='inherit' onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                Edit
              </Button>
              <Button variant='contained' color='warning' style={{ marginLeft: '.5rem' }} onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default TaskList
