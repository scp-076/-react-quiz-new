import { IFinish } from '../types';
import { connect } from "react-redux";
import { RootState } from '../App';
import { NavLink, Redirect } from 'react-router-dom';

const Finish: React.FC<IFinish> = ({success, correctAnswers, wrongAnswers, location}) => {
    const pathAllowed = location.state === 'quiz' || location.state === 'answer-modal';
    return (
        pathAllowed ? (
            <div className="finish-wrapper">
                <h1 className="finish-result">{success ? 'You win!' : 'You lose!'}</h1>
                <span className="finish-answers">Correct answers: {correctAnswers}</span>
                <span className="finish-answers">Wrong answerd: {wrongAnswers}</span>
                <NavLink className="quiz-link" to={{pathname: "/", state: 'finish'}}>Start again</NavLink>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}

const mapStateToProps = (state: RootState) => {
	return {
        correctAnswers: state.quiz.correctAnswers,
        wrongAnswers: state.quiz.wrongAnswers,
        success: state.quiz.success,
	}
}

export default connect(mapStateToProps, null)(Finish);