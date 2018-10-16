import {Component, OnInit} from '@angular/core';
import {QuizService} from 'app/features/services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowRight, faKey} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-quiz-password-check',
    templateUrl: './quiz-password-check.component.html',
    styleUrls: ['./quiz-password-check.component.scss']
})
export class QuizPasswordCheckComponent implements OnInit {
    password: string;
    quizUrl: string;
    isError = false;
    faKey = faKey;
    faArrowRight = faArrowRight;

    constructor(private quizService: QuizService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.quizUrl = params['code'];
        });
    }

    ngOnInit() {}

    submit() {
        this.quizService.checkPassword(this.password, this.quizUrl).subscribe(
            res => {
                console.log(res.body);
                this.router.navigate([`/quiz/${this.quizUrl}/start`]);
            },
            () => {
                this.isError = true;
            }
        );
    }
}
