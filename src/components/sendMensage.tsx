import { Button, TextField } from '@mui/material';
import React from 'react';

interface Props {
  texto: string;
  setTexto: (texto: string) => void
  handleAdicionarMsg: () => void
}

const sendMensage: React.FC<Props> = (props) => {

  return (
    <div id='formulario'>
    <TextField autoComplete='off' size='small' onKeyDown={(e)=> {if(e.code==="Enter" || e.code==="NumpadEnter") props.handleAdicionarMsg()}} style={{backgroundColor: "#FFFFFF", width:'90%'}} variant="outlined" value={props.texto} onChange={(e) => props.setTexto(e.target.value as string)} />
    <Button variant="contained" onClick={props.handleAdicionarMsg}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/></svg>
    </Button>
</div>
  );
}


export default sendMensage;