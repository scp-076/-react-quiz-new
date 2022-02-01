import { NavLink } from 'react-router-dom';
import { IAnswerModal } from '../types';

const AnswerModal: React.FC<IAnswerModal> = ({isAnswerCorrect, rightAnswer, onModalClose, nextQuestion, quizFinished}) => {
    const nextQuestionHanlder = () => {
        nextQuestion();
        onModalClose('next');
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-window">
                <p className="modal-text">{isAnswerCorrect ? 'Correct!' : 'Incorrect!'}</p>
                {!isAnswerCorrect && <p className="modal-text">Right answer is {rightAnswer}</p>}
                <span className="modal-close" onClick={() => onModalClose('')}>&#10006;</span>
                {quizFinished 
                    ? <NavLink className="modal-next-question" to={{pathname: "/finish", state: 'answer-modal'}}>Finish</NavLink> 
                    : <button className="modal-next-question" onClick={nextQuestionHanlder}>Next question</button>
                }
            </div>
        </div>
    )
}

export default AnswerModal;