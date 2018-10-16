import {Component, OnInit} from '@angular/core';
import {StudentService} from 'app/features/services/student.service';
import {IStudent, Student} from 'app/shared/model/student.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from 'app/features/services/quiz.service';
import {QuizResolveService} from 'app/features/services/quiz-resolve.service';
import {faArrowRight, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-quiz-start',
    templateUrl: './quiz-start.component.html',
    styleUrls: ['./quiz-start.component.scss']
})
export class QuizStartComponent implements OnInit {
    student: IStudent;
    quizUrl: string;
    faUser = faUser;
    faArrowRight = faArrowRight;

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
                this.router.navigate([`/quiz/${this.quizUrl}/start/0`]);
            },
            res => {}
        );
    }
}
