import { Button, TextField } from '@mui/material';
import React from 'react';

interface Props {
  numeroTel: string;
  valueAutor: string
  setValueAutor: (uuid: string) => void
  setNumeroTel: (uuid: string) => void
  handleAdicionarAutor: () => void
}

const login: React.FC<Props> = (props) => {

  return (
    <div style={{display:'block', textAlign: "center"}}>
      <div>
      <TextField autoFocus={true} variant="standard" onKeyDown={(e)=> {if(e.code==="Enter" || e.code==="NumpadEnter") props.handleAdicionarAutor()}} label="* Nome de Usuario" value={props.valueAutor} onChange={(e) => props.setValueAutor(e.target.value as string)} />
    </div>
    <div style={{display:'block', marginBottom:'2px'}}>
      {false && <TextField variant="standard" label="Numero de telefone" placeholder='11999999999 (opcional)' value={props.numeroTel} onChange={(e) => props.setNumeroTel(e.target.value as string)} />}
    </div>
    <div>
      <Button variant="contained" onClick={props.handleAdicionarAutor}>Entrar</Button>
    </div>
</div>
  );
}


export default login;