import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ITaskSet } from 'app/shared/model/task-set.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { TaskSetService } from '../../../services/task-set.service';
import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from 'app/features/services/quiz.service';

@Component({
    selector: 'jhi-task-set',
    templateUrl: './task-set-list.component.html',
    styleUrls: ['./task-set-list.component.scss']
})
export class TaskSetListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    taskSets: ITaskSet[];
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
    sumMaxPoints: number;

    constructor(
        private taskSetService: TaskSetService,
        private quizService: QuizService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
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
        this.quizService.find(this.quizID).subscribe(res => {
            this.quiz = res.body;
        });
        this.taskSetService
            .findByQuizID(this.quizID, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ITaskSet[]>) => {
                    this.paginateTaskSets(res.body, res.headers);
                    this.sumMaxPoints = this.taskSets.reduce((prev, curr) => prev + curr.maxPoint * curr.requiredTaskAmount, 0);
                },
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
        this.router.navigate(['/task-set'], {
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
            '/task-set',
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
        this.registerChangeInTaskSets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaskSet) {
        return item.id;
    }

    registerChangeInTaskSets() {
        this.eventSubscriber = this.eventManager.subscribe('taskSetListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateTaskSets(data: ITaskSet[], headers: HttpHeaders) {
        console.log('Data: ' + data);
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.taskSets = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
