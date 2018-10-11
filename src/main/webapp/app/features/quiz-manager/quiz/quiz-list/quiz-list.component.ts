import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from 'app/features/services/quiz.service';
import { IQuiz } from 'app/shared/model/quiz.model';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/index';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';

@Component({
    selector: 'jhi-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    quizzes: IQuiz[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private quizService: QuizService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.quizService
            .findCurrentUserQuizzes({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQuiz[]>) => this.paginateQuizzes(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/quiz-manager'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/quiz-manager',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQuizzes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuiz) {
        return item.id;
    }

    registerChangeInQuizzes() {
        this.eventSubscriber = this.eventManager.subscribe('quizListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    newEdition(quizID: number) {
        this.quizService
            .newEdition(quizID)
            .subscribe((res: HttpResponse<any>) => this.loadAll(), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private paginateQuizzes(data: IQuiz[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.quizzes = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
