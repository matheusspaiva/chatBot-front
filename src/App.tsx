import { useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { v4 as uuid } from 'uuid';
import ListarMesagens from './components/listarMensagens'
import axios from 'axios';
import { IApiResponse } from './Types/IApiResponse';
import { IMensagem } from './Types/IMensagem';
import Login from './components/login';
import CryptoJS from "crypto-js"
import SendMensage from './components/sendMensage';

function App() {

    const [mensagens, setMensagens] = useState<IMensagem[]>([])
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
    const [texto, setTexto] = useState<string>('')
    const [autorMsg, setAutorMsg] = useState<string>('')
    const [numeroTel, setNumeroTel] = useState<string>('')
    const [valueAutor, setValueAutor] = useState<string>('')
    const [id, setId] = useState<string>('')

    useEffect(() => {
        const newSocket = io("http://localhost:3334")
        
        setSocket(newSocket)
        const nomeDoAutor = localStorage.getItem('nomeAutor')
        setAutorMsg(nomeDoAutor ?? '')
        const idAutor = localStorage.getItem('idAutor')
        if(idAutor) setId(idAutor)
        else setId(uuid())
    }, [autorMsg]);

    socket?.on('listaMensagens', msgs => {
        if (autorMsg.length > 0) {
            setMensagens(msgs)
        }
        setTimeout(()=>{

            const objDiv = document.getElementById("chatbox");
            const objDiv2 = document.getElementById("formulario");
            if(!objDiv || !objDiv2) return
            var heightPage =objDiv.scrollHeight  //document.body.scrollHeight;
            console.log(heightPage)
            objDiv2.style.bottom = '0'
            objDiv.scrollTo(0 , heightPage);
        }, 1)
    })

    const handleAdicionarMsg = () => {
        if (texto?.length === 0) return;
        socket!.emit('adicionarMensagem', {idAutor:id ,autor: autorMsg, mensagem: texto, data: new Date() })

        setTexto('')
    };

    const handleLimparConversa =() => {
        socket!.emit('limparConversa', id)
    }

    const handleAdicionarAutor = () => {
        if (valueAutor.length === 0) return;
        setAutorMsg(valueAutor)
        socket!.emit('enterUser', {id:id,nome:valueAutor, numero:numeroTel})
        localStorage.setItem('nomeAutor', valueAutor)
        localStorage.setItem('idAutor', id)
        setValueAutor('')
    };

    const handleSairrAutor = () => {
        setAutorMsg('')
        setNumeroTel('')
        localStorage.removeItem('nomeAutor')
        localStorage.removeItem('idAutor')
        socket!.emit('userExit', id)
        setValueAutor('')
        setMensagens([])
    };

    const handleGetNumeroUser = async (uuid :string) => {
        try{
            const response : IApiResponse =  (await axios.get(`http://localhost:3333/getNumber?id=${uuid}`)).data

            if(!response.sucesso){
                alert(response.mensagemErro)
            }else{
                const bytes  = CryptoJS.AES.decrypt(response.resultado, 'hash123');
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                const MensagemWhats = 'Ola'
                window.open(`https://api.whatsapp.com/send?phone=${originalText}&text=${MensagemWhats}`)
                //alert(response.resultado)
            }
        }
        catch(erro){
            console.log('Erro requisição', erro)
        }

    }

    

    return (
        <>
            {autorMsg.length === 0 &&
                <Login valueAutor={valueAutor} setValueAutor={setValueAutor} numeroTel={numeroTel} setNumeroTel={setNumeroTel} handleAdicionarAutor={handleAdicionarAutor} />
            }

            {autorMsg.length > 0 && 
            <div className="container">
                    <div id='chatbox' >
                        <ListarMesagens handleLimparConversa={handleLimparConversa} idAutor={id!} getNumber={handleGetNumeroUser} handleSairrAutor={handleSairrAutor} mensagens={mensagens!} autorMsg={autorMsg}/>
                    </div>
                    <SendMensage texto={texto!} setTexto={setTexto} handleAdicionarMsg={handleAdicionarMsg}/>
            </div>
            }
        </>
    );
}


export default App;