import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState<TTaskForm>({ title: '', description: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      loadTask(param.id)
    }
  }, [param.id]);

  const loadTask = async (id: string): Promise<void> => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEditing(true)
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    setLoading(true)
    e.preventDefault()

    if (editing) {
      await fetch(`http://localhost:3000/api/tasks/${param.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    } else {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })
    }

    setLoading(false)
    navigate('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  return (
    <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant={'h5'} textAlign={'center'} color={'#fff'}> { editing ? 'Edit Task' : 'Create Task'}</Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='title'
                variant='filled'
                label='Write your title'
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={task.title || ''}
              />
              <TextField
                name='description'
                variant='filled'
                label='Write your description'
                multiline
                rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
                onChange={handleChange}
                value={task.description || ''}
              />
              <Button variant='contained' color='primary' type='submit' disabled={!task.description || !task.title}>
                {loading ? <CircularProgress color='inherit' size={24} /> : editing ? 'Edit' : 'Create'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm
