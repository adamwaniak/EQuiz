import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizResolveService} from 'app/features/services/quiz-resolve.service';
import {Student} from 'app/shared/model/student.model';

@Component({
    selector: 'jhi-quiz-core',
    templateUrl: './quiz-core.component.html',
    styles: []
})
export class QuizCoreComponent implements OnInit {
    activeTask: number;
    quizUrl: string;
    student: Student;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute, private quizResolveService: QuizResolveService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.activeTask = params['active-task'];
        });
        this.activatedRoute.params.subscribe(params => {
            this.quizUrl = params['code'];
        });
        this.student = JSON.parse(localStorage.getItem('student'));
        this.quizResolveService.getQuizForResolve(this.student.quizId, this.student.id).subscribe(resQuiz => {
            localStorage.setItem('quiz', JSON.stringify(resQuiz.body));
            this.router.navigate([`/quiz/${this.quizUrl}/start/1`]);
        });
    }
}
