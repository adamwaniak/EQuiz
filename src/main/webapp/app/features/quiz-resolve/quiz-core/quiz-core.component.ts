import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizResolveService} from 'app/features/services/quiz-resolve.service';
import {Student} from 'app/shared/model/student.model';
import {AnswerForResolve, QuizResolve, TaskForResolve} from 'app/shared/model/quiz-resolve.model';
import {StudentAnswer} from 'app/shared/model/student-answer.model';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-quiz-core',
    templateUrl: './quiz-core.component.html',
    styles: []
})
export class QuizCoreComponent implements OnInit {
    activeTaskNumber: number;
    activeTask: TaskForResolve;
    quizUrl: string;
    student: Student;
    quiz: QuizResolve;
    numberOfTask: number;
    faEdit = faEdit;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute, private quizResolveService: QuizResolveService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.activeTaskNumber = params['active-task'];
        });
        this.activatedRoute.params.subscribe(params => {
            this.quizUrl = params['code'];
        });
        this.student = JSON.parse(localStorage.getItem('student'));
        this.quizResolveService.getQuizForResolve(this.student.quizId, this.student.id).subscribe(resQuiz => {
            localStorage.setItem('quiz', JSON.stringify(resQuiz.body));
            this.quiz = resQuiz.body;
            this.numberOfTask = this.quiz.tasks.length;
            this.activeTask = this.quiz.tasks[this.activeTaskNumber];
        });
    }

    getNotificationChangeActiveTaskNumber(event: number) {
        this.activeTaskNumber = event;
        this.activeTask = this.quiz.tasks[this.activeTaskNumber];
    }

    getNotificationChangeAnswer($event: AnswerForResolve) {
        const answerToChange = this.quiz.tasks[this.activeTaskNumber].answers.find(answer => answer.answerId === $event.answerId);
        answerToChange.studentAnswer = !answerToChange.studentAnswer;
    }

    submit() {
        const answers: StudentAnswer[] = [];
        for (const task of this.quiz.tasks) {
            for (const answer of task.answers) {
                answers.push(new StudentAnswer(answer.studentAnswerId, this.student.id, answer.answerId, task.taskId, answer.studentAnswer));
            }
        }
        this.quizResolveService.submit(this.quiz.quizId, answers, this.student.id).subscribe(res => {
            this.router.navigate([`/quiz/${this.quizUrl}/result/${this.student.id}`]);
        });
    }
}
