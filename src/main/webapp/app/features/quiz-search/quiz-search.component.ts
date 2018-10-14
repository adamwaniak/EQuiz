import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/features/services/quiz.service';

@Component({
    selector: 'jhi-quiz-search',
    templateUrl: './quiz-search.component.html',
    styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent implements OnInit {
    query: string;

    constructor(private quizService: QuizService) {}

    ngOnInit() {}
}
