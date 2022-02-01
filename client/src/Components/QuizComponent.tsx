import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { correctAnswerGiven, loadQuiz, wrongAnswerGiven, finishQuiz } from "../actions";
import { RootState } from "../App";
import { IQuiz } from "../types";
import AnswerModal from "./AnswerModal";
import { Preloader } from "./Preloader";

interface Object {
    [idx: string]: any;
}

const htmlEntities: Object = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };


const QuizComponent: React.FC<IQuiz> = props => {
    const pathAllowed = props.location.state === 'main';

    const [question, setQuestion] = useState<number>(0);
    const [answer, setAnswer] = useState<boolean>(false);
    const [answerGiven, setAnswerGiven] = useState<boolean>(false);
    const [modalShowed, setModalShowed] = useState<boolean>(false);

    useEffect(() => {
        props.loadQuiz(props.questionsAmount);
    }, []);
    useEffect(() => {
        if (document.querySelector('.modal-wrapper')) document.body.classList.add('body-no-scroll');
        else document.body.classList.remove('body-no-scroll');
    });
    useEffect(() => {
        if (!props.isLoading && !props.quizList[question + 1] && question > 8) props.finishQuiz(isQuizSuccessful());
    });

    const isQuizSuccessful = () => (props.correctAnswers - +props.wrongAnswers) > 0;

    const getNextQuestion = (index: number) => {
        if (!props.quizList[index]) return;
        setQuestion(index);
        setAnswerGiven(false);
    }

    let answers: Array<string> = props.quizList[question]?.incorrect_answers;
    if (answers?.indexOf(props.quizList[question]?.correct_answer) === -1) answers.push(props.quizList[question].correct_answer);
    answers = answers?.sort(() => Math.random() - 0.5);

    const answerHandler = (answer: string) => {
        if (answerGiven) return;
        if (props.quizList[question]?.correct_answer === answer) {
            setAnswer(true);
            props.correctAnswerGiven();
        } else {
            setAnswer(false);
            props.wrongAnswerGiven();
        }
        setModalShowed(true);
        setAnswerGiven(true);
    }

    const htmlDecode = (input: string): string | null => {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    const modalCloseHandler = (button: string) => {
        setModalShowed(false);
        button === 'next' && getNextQuestion(question + 1);
    }

    return (
        pathAllowed && props.quizList.length? (
            <div className="quiz-wrapper">
                {props.isLoading ? <Preloader /> : (
                    <>
                        <h1>{question + 1} question</h1>
                        <p className="quiz-question">{htmlDecode(props.quizList[question]?.question)}</p>
                        <div>
                            <ul className="quiz-answerList">
                                {answers?.map((answer: string, index: number) => {
                                    return <li className="quiz-answer" value={answer} key={index} onClick={() => answerHandler(answer)}>{answer}</li>
                                })}
                                {modalShowed &&
                                    <AnswerModal
                                        isAnswerCorrect={answer}
                                        rightAnswer={props.quizList[question]?.correct_answer}
                                        onModalClose={(button: string) => modalCloseHandler(button)}
                                        quizFinished={props.quizFinished}
                                        nextQuestion={() => getNextQuestion(question + 1)}
                                    />
                                }
                            </ul>
                        </div>
                        {!props.quizFinished 
                            ? <button className={"modal-next-question--quiz" + (!answerGiven ? ' disabled' : '')} onClick={() => getNextQuestion(question + 1)} disabled={!answerGiven}>Next question</button> 
                            : <NavLink className={"modal-next-question--quiz" + (!answerGiven ? ' disabled' : '')} to={{pathname: "/finish", state: "quiz"}}>Finish</NavLink>
                        }
                        <div className="answers">
                            <span>Correct answers: {props.correctAnswers}</span>
                            <span>Wrong answers: {props.wrongAnswers}</span>
                        </div>
                    </>
                )}
            </div>
        ) : <Redirect to="/" />
        
    )
};

const mapStateToProps = (state: RootState) => {
	return {
		quizList: state.base,
        correctAnswers: state.quiz.correctAnswers,
        wrongAnswers: state.quiz.wrongAnswers,
        quizFinished: state.quiz.quizFinished,
        isLoading: state.quiz.isLoading,
        questionsAmount: state.quiz.questionsAmount,
	}
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        correctAnswerGiven: () => dispatch(correctAnswerGiven()),
        wrongAnswerGiven: () => dispatch(wrongAnswerGiven()),
        loadQuiz: (amount: number) => dispatch(loadQuiz(amount)),
        finishQuiz: (success: boolean) => dispatch(finishQuiz(success)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);