import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  
}))

export default function Form() {
  const [aluno, setAluno] = useState({});
  const classes = useStyles();

  const handleChange = event => {
    const value = event.target.value;
    setAluno({...aluno, [event.target.name]: value})
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/alunos`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno)
    })

    const data = await response.json();
    if(data){
      alert(data.message)
      return window.location.reload();
    }
  }

  return (
    <Container maxWidth="md">

      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="R.A"
              margin="dense"
              type="text"
              autoComplete="off"
              fullWidth
              variant="outlined"
              name="ra"
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Nome"
              margin="dense"
              type="text"
              name="nome"
              autoComplete="off"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Sobrenome"
              margin="dense"
              type="text"
              name="sobrenome"
              autoComplete="off"
              variant="outlined"
              required
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              margin="dense"
              type="email"
              autoComplete="email"
              fullWidth
              variant="outlined"
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Status"
              margin="dense"
              type="text"
              autoComplete="off"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              name="status"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Curso"
              margin="dense"
              type="text"
              autoComplete="off"
              variant="outlined"
              name="curso"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Turma"
              margin="dense"
              type="text"
              autoComplete="off"
              variant="outlined"
              name="turma"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Transferência"
              margin="dense"
              type="text"
              autoComplete="off"
              variant="outlined"
              name="transferencia"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Score"
              margin="dense"
              type="text"
              autoComplete="off"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              name="score"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Interação"
              margin="dense"
              type="text"
              autoComplete="off"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              name="interacao"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Telefone"
              margin="dense"
              type="text"
              name="telefone"
              autoComplete="off"
              variant="outlined"
              required
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Telefone 2"
              margin="dense"
              type="text"
              name="telefone2"
              autoComplete="off"
              variant="outlined"
              required
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ano Ingresso"
              margin="dense"
              type="text"
              name="ano_ingresso"
              autoComplete="off"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data Nascimento"
              margin="dense"
              type="text"
              name="data_nascimento"
              autoComplete="off"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
            >
              Cadastrar
            </Button>
          </Grid>

        </Grid>
      </form>

    </Container>
  )
}
