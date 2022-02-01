export type Action = {
    type: string,
    payload?: any;
}

export type Quiz = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
};

export type quizState = {
    currentQuestion: number,
    correctAnswers: number,
    wrongAnswers: number,
    quizFinished: boolean,
    success: boolean,
    isLoading: boolean,
    questionsAmount: number,
}

export interface IQuiz {
    quizList: Quiz[],
    correctAnswers: number,
    wrongAnswers: number,
    location: {state: string},
    quizFinished: boolean,
    isLoading: boolean,
    questionsAmount: number,
    loadQuiz: (amount: number) => Quiz[],
    correctAnswerGiven: () => void,
    wrongAnswerGiven: () => void,
    finishQuiz: (success: boolean) => void,
}

export interface IMain {
    location: {state: string},
    quizFinished: boolean,
	loadQuiz: (amount: number) => Quiz[],
    clearResults: () => {},
    setAmount: (amount: number) => void,
}

export interface IAnswerModal {
    isAnswerCorrect: boolean | undefined,
    rightAnswer: string,
    quizFinished: boolean,
    onModalClose: (button: string) => void,
    nextQuestion: () => void,
}

export interface IFinish {
    correctAnswers: number,
    wrongAnswers: number,
    success: boolean,
    location: {state: string},
}

export type selectOption = {
    value: number,
    label: string,
}