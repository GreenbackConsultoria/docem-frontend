import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { IoMdArrowRoundBack } from 'react-icons/io';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', //IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogonIES() {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({
    email: undefined,
    password: undefined
  })

  function handleChange(event) {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (!user.email || !user.password) {
      return alert('Por favor preencha todos os campos!')
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/usuarios/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.password
        },
        body: JSON.stringify({email: user.email})
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user_id', data.user_id);
        history.push('/ies/profile')
      }else if(response.status !== 200){
        return alert('Falha na autenticação!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h4">
          DOCEM
        </Typography>
        <Typography component="h4" variant="h5">
          Login IES
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">
                <IoMdArrowRoundBack
                  size={30}
                  color={'#11323c'}
                  style={{
                    cursor: 'pointer'
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
