import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuiz } from 'app/shared/model/quiz.model';

@Component({
    selector: 'jhi-quiz-detail',
    templateUrl: './quiz-detail.entity.component.html'
})
export class QuizDetailEntityComponent implements OnInit {
    quiz: IQuiz;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.quiz = quiz;
        });
    }

    previousState() {
        window.history.back();
    }
}
