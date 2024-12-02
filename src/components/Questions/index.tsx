import {default as Answer, AnswerType} from './Answer'
import './style.css'

type QuestionObj = {
  questionText: string;
  choices: AnswerType[];
  correctAnswer: string;
}

export default function QuestionComponent({ question }: {question:QuestionObj}) {
  const {questionText, choices, correctAnswer} = question

  return (
    <div className="questions">
      <div className="question-text">{questionText}</div>
      <div>
        {choices.map((answer, i) => <Answer key={'answer' + i} answer={{ answerText: answer }} />)}
      </div>
    </div>
  )
}
