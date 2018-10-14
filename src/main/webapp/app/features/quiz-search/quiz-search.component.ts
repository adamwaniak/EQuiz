import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/features/services/quiz.service';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IQuiz } from 'app/shared/model/quiz.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core';

@Component({
    selector: 'jhi-quiz-search',
    templateUrl: './quiz-search.component.html',
    styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent implements OnInit {
    query: string;
    faSearch = faSearch;
    faArrowRight = faArrowRight;
    quizzes: IQuiz[];
    quizzesAuthorName = new Map();

    constructor(private quizService: QuizService, private jhiAlertService: JhiAlertService, private userService: UserService) {}

    ngOnInit() {}

    public search() {
        this.quizService.findByContainsQuizCode(this.query).subscribe(
            (res: HttpResponse<IQuiz[]>) => {
                this.quizzes = res.body;
                this.quizzes.forEach(quiz => {
                    this.userService.getUserNameById(quiz.ownerId).subscribe(userRes => {
                        this.quizzesAuthorName.set(quiz.id, userRes.body);
                    });
                });
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
            }
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
