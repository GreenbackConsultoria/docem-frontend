import React, { useEffect, useState } from 'react';

import Form from '../components/Form';

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),
  },
  container: {
    overflowY: 'scroll',
  }
}))

export default function Profile() {
  const [alunos, setAlunos] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedAlunos, setSelectedAlunos] = useState([]);

  const classes = useStyles();

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 130 },
    { field: 'sobrenome', headerName: 'Sobrenome', width: 130 },
    { field: 'ra', headerName: 'R.A', width: 130 },
    { field: 'email', headerName: 'E-mail', width: 220 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'interacao', headerName: 'Interação' },
    { field: 'score', headerName: 'Score' },
    { field: 'curso', headerName: 'Curso' },
    { field: 'turma', headerName: 'Turma' },
    { field: 'transferencia', headerName: 'Transferência' },
    { field: 'status', headerName: 'Status' },
    { field: 'telefone', headerName: 'Telefone', width: 130 },
    { field: 'telefone2', headerName: 'Telefone2', width: 130 },
    { field: 'data_nascimento', headerName: 'Data de Nascimento', width: 170 },
    { field: 'ano_ingresso', headerName: 'Ano Ingresso', width: 130 },
    {
      field: 'created_at',
      headerName: 'Created_at',
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/alunos`)
      const data = await response.json();

      setAlunos(data)
    }
    getData();
  }, [])

  function handleSelectionChange(event) {
    if (event.rowIds.length > 0) {
      setIsButtonDisabled(false)
      setSelectedAlunos(event.rowIds);
    } else if (event.rowIds.length <= 0) {
      setIsButtonDisabled(true)
      setSelectedAlunos(event.rowIds);
    }
  }

  function handleDelete(event) {
    selectedAlunos.length > 1
      ? deleteMoreThanOne(selectedAlunos)
      : deleteOne(selectedAlunos)
  }

  async function deleteOne(id) {
    const confirmed = window.confirm(`Quer mesmo deletar o aluno(a) com ID: ${id}?`);
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/alunos/${id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          alert('Houve uma falha! Por favor acione o setor técnico.')
          return window.location.reload();
        }
        const data = await response.json();
        alert(data.success);
        return window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function deleteMoreThanOne(ids) {
    const confirmed = window.confirm(`Quer mesmo deletar os aluno(a)s com IDs: ${ids}?`);
    if (confirmed) {
      alert('Essa feature ainda não está disponível! Por favor acione o setor técnico.');
      return window.location.reload();
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4">
        DOCEM
      </Typography>
      <div style={{ textAlign: 'right' }}>
        <Fab
          color="primary"
          className={classes.icon}
          onClick={() => setFormVisible(!isFormVisible)}
        >
          <Add 
            style={{
              transform: `rotate(${isFormVisible ? '45deg' : '0deg' })`
            }}
          />
        </Fab>
        <Fab
          color="primary"
          className={classes.icon}
          onClick={handleDelete}
          disabled={isButtonDisabled ? true : false}
        >
          <Delete />
        </Fab>
      </div>
      <Collapse in={isFormVisible}>
        <Form />
      </Collapse>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={alunos}
          columns={columns}
          pageSize={10}
          checkboxSelection
          paginationMode="client"
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </Container >
  )
}
