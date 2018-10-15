import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/features/services/student.service';
import { IStudent, Student } from 'app/shared/model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'app/features/services/quiz.service';

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
                console.log(localStorage.getItem('student'));
                this.router.navigate([`/quiz/${this.quizUrl}/1`]);
            },
            res => {}
        );
    }
}
