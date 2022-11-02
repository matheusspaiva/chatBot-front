import { Button } from '@mui/material';
import React from 'react';
import { IMensagem } from '../Types/IMensagem';

interface Props {
  mensagens: IMensagem[];
  autorMsg: string
  handleSairrAutor: () => void
  getNumber: (uuid: string) => void
  idAutor: string
  handleLimparConversa: () => void
}

const listarMesagens: React.FC<Props> = (props) => {

  return (
    <div >
      <div className='header'>
        <Button variant="contained" onClick={props.handleSairrAutor}>
        {props.autorMsg} &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
        </Button>
        <Button variant="contained" onClick={props.handleLimparConversa}>
       Limpar
        </Button>
      </div>

      <div className='chatbody'>

        {props.mensagens?.map((i: IMensagem) => (
          <>
            {i.idAutor === props.idAutor && 
            <div className={i.autor !== props.autorMsg ? 'me' : 'bot'}  style={{ textAlign: i.autor === props.autorMsg ? 'end' : 'start' }}>
              <p><strong>{i.autor}</strong><br></br>  
              {i.mensagem.split("\n").map(msg =>(
                <>
                {msg}
                {i.mensagem.split("\n").at(-1) !== msg && <br></br>}
                </>
              ))}
               <p style={{float: i.autor !== props.autorMsg ? 'right' : 'left'}}> {new Date(i.data).toLocaleTimeString()}</p>
               </p>
              {i.autor !== props.autorMsg && i.mensagem[0]==="7" && <Button variant="contained" color="success" onClick={() => props.getNumber(i.idAutor)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.46 2.59L5.79 8.8c-.41-1.21-.67-2.48-.76-3.8zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51zM12 3v10l3-3h6V3h-9zm7 5h-5V5h5v3z"/></svg>
                </Button>}
            </div>}

          </>
        ))}

      </div>
    </div>
  );
}


export default listarMesagens;