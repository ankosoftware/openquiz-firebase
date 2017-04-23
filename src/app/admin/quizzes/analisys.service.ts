import {QuizResult, ResultAnswer} from "../../common/model/quizresult.model";
import {QuestionService} from "../../common/firebase/services/question.service";
import {Question} from "../../common/model/question.model";
import {TopicService} from "../../common/firebase/services/topic.service";
import {QuizService} from "../../common/firebase/services/quiz.service";
import {QuizResultService} from "../../common/firebase/services/quizresult.service";

export class AnalisysServices {

  constructor(protected questionService: QuestionService,
              protected topicService: TopicService,
              protected quizresultService: QuizResultService,
              protected quizService: QuizService) {
  }

  processResult(result: QuizResult): Promise<void> {
    if (!result) {
      return;
    }

    return this.quizService.get(result.quiz).first().toPromise().then(quiz => {
      let score = 0;
      let maxScore = 0;
      let questionPromises = result.answers.map(answ =>
        this.questionService.get(answ.question).first().toPromise().then(question => {
            if (!question) {
              return;
            }
            return this.topicService.get(question.topicId).first().toPromise().then(topic => {
              answ.correct = AnalisysServices.isCorrect(question, answ);
              let questionScore = topic && topic.pointsPerQuestion || 1;
              questionScore = questionScore > 0 ? questionScore : 1;
              maxScore += questionScore;
              if (answ.correct) {
                answ.score = questionScore;
                score += questionScore;
              } else {
                answ.score = 0;
              }
            });
          }
        ));
      return Promise.all(questionPromises).then(() => {
        result.score = score;
        result.maxScore = maxScore;
        result.passScore = quiz.passScore;
        result.pass = score > quiz.passScore;
        this.quizresultService.update(result);
      });
    });
  }

  static isCorrect(question: Question, answ: ResultAnswer) {
    if (!question || !answ || !answ.entered) {
      return false;
    }
    switch (question.answerType) {
      case 'single_select':
        if (answ.entered.length <= 0) {
          return false;
        }
        let entered = answ.entered[0];
        return question.correctAnswer && question.correctAnswer.findIndex(q => q && q.id === entered.id) >= 0;
      case 'multi_select':
        if (answ.entered.length !== question.correctAnswer.length) {
          return false; // all answers must be entered
        }
        if (answ.entered.length <= 0) {
          return question.correctAnswer && question.correctAnswer.length === 0;
        }
        for (let i = 0; i < answ.entered.length; i++) {
          let entered = answ.entered[i];
          if (!question.correctAnswer && question.correctAnswer.findIndex(q => q && q.id === entered.id) >= 0) {
            return false;
          }
        }
        return true;
      case 'text':
        if (!answ.entered || answ.entered.length <= 0 || !question.correctAnswer) {
          return false;
        }
        let enteredEntry = answ.entered[0];
        let enteredText = enteredEntry && enteredEntry.value && enteredEntry.value.trim().toLowerCase();
        let correctEntry = question.correctAnswer[0];
        let correctText = correctEntry && correctEntry.value && correctEntry.value.trim().toLowerCase();
        return enteredText === correctText;
    }
    throw new Error('Unknown question answer type ' + question.answerType);
  }
}
