import { Link, useHistory } from 'react-router-dom' 

import illustrationImg from '../assets/images/illustration.svg' //Importar a imagem
import logoImg from '../assets/images/logo.svg';
import { database } from  '../services/firebase'


import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

import { FormEvent, useState } from 'react';



export function NewRoom(){

    const { user } = useAuth()
    const history = useHistory()

    const [ newRoom, setNewRoom ] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() == ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`) //Crase e não aspas
    }

    return(

        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main className="main-content">
                <div>
                    <img src={logoImg} alt="letmask"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit = { handleCreateRoom }>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value = { newRoom }
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>

            </main>


        </div>
    )
}