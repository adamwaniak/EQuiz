import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/features/services/student.service';
import { IStudent, Student } from 'app/shared/model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'app/features/services/quiz.service';
import { QuizResolveService } from 'app/features/services/quiz-resolve.service';

@Component({
    selector: 'jhi-quiz-start',
    templateUrl: './quiz-start.component.html',
    styles: []
})
export class QuizStartComponent implements OnInit {
    student: IStudent;
    quizUrl: string;

    constructor(
        private studentService: StudentService,
        private quizService: QuizService,
        private quizResolveService: QuizResolveService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.quizUrl = params['code'];
        });
        this.student = new Student();
    }

    ngOnInit() {
        this.quizService.findByUrl(this.quizUrl).subscribe(res => {
            this.student.quizId = res.body.id;
        });
    }

    start() {
        this.studentService.create(this.student).subscribe(
            res => {
                localStorage.setItem('student', JSON.stringify(res.body));
                this.quizResolveService.getQuizForResolve(this.student.quizId).subscribe(resQuiz => {
                    localStorage.setItem('quiz', JSON.stringify(resQuiz.body));
                    this.router.navigate([`/quiz/${this.quizUrl}/1`]);
                });
            },
            res => {}
        );
    }
}
