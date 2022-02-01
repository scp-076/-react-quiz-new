import { Quiz } from "../types";


export async function getAllQuestions(amount: Number): Promise<Quiz[]> {
    let quizList: Quiz[] = [];
    try {
        const res = await fetch(`/quiz-list/?amount=${amount}`);
        if (res.status === 200) {
            quizList = await res.json().then(res => res.results);
        }
    } catch (e) {
        console.log(e);
    }

    return quizList;
}