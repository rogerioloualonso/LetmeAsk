import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import deleteImg from  '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';


import '../styles/room.scss';
import { database } from '../services/firebase';


type RoomParams = {
    id: string;
}


export function AdminRoom(){

    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
        
    }


    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={ logoImg } alt="Letmeask"/>
                    <div>
                        <RoomCode code={roomId} />
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                                key={question.id} //Aparece erro se não colocar
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                                >
                                
                                {!question.isAnswered &&(

                                    <>
                                        
                                        <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAnswered(question.id)}    
                                    >
                                        <img src={checkImg} alt ="Marcar como respondida"/>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}    
                                    >
                                        <img src={answerImg} alt ="Dar destaque à pergunta"/>
                                    </button>

                                    </>
                                    
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}    
                                >
                                    <img src={deleteImg} alt ="Remover pergunta"/>
                                </button>
                            </Question>
                        )
                    })} 
                </div>

            </main>
            
        </div>
    );
}