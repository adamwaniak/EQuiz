import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/features/services/quiz.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-quiz-password-check',
    templateUrl: './quiz-password-check.component.html',
    styles: []
})
export class QuizPasswordCheckComponent implements OnInit {
    password: string;

    constructor(private quizService: QuizService, private router: Router) {}

    ngOnInit() {}

    submit() {
        this.quizService.checkPassword(this.password).subscribe(
            res => {
                this.router.navigate([0]);
            },
            res => {}
        );
    }
}
