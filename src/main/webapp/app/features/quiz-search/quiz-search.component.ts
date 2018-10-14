import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/features/services/quiz.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-quiz-search',
    templateUrl: './quiz-search.component.html',
    styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent implements OnInit {
    query: string;
    faSearch = faSearch;

    constructor(private quizService: QuizService) {}

    ngOnInit() {}

    public search() {}
}
