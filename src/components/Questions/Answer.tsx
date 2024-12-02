export interface AnswerType {
  answerText: string;
}
export default function AnswerComponent({answer}:{answer:AnswerType}) {
  const { answerText } = answer;
  return (
    <div className="answer">
      {answerText}
    </div>
  )
}
