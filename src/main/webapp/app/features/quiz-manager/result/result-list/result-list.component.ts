import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from 'app/features/services/student.service';
import {IStudent} from 'app/shared/model/student.model';
import {ITEMS_PER_PAGE} from 'app/shared';
import {Subscription} from 'rxjs/index';
import {IQuiz} from 'app/shared/model/quiz.model';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {ActivatedRoute, Router} from '@angular/router';
import {Principal} from 'app/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {QuizService} from 'app/features/services/quiz.service';

@Component({
    selector: 'jhi-result-list',
    templateUrl: './result-list.component.html',
    styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    students: IStudent[];
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
    quizID: number;
    quiz: IQuiz;

    constructor(private studentService: StudentService, private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager, private quizService: QuizService) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.activatedRoute.params.subscribe(quizID => {
            this.quizID = quizID['quiz-id'];
        });
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.quizService.find(this.quizID).subscribe(value => this.quiz = value.body);
        this.studentService
            .findByQuizId(this.quizID, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IStudent[]>) => this.paginateStudents(res.body, res.headers),
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
        this.router.navigate(['/student'], {
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
            '/student',
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
        this.registerChangeInStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudent) {
        return item.id;
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe('studentListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateStudents(data: IStudent[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.students = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

}
