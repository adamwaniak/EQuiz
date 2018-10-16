import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from 'app/features/services/answer.service';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IQuiz } from 'app/shared/model/quiz.model';
import { ITaskSet } from 'app/shared/model/task-set.model';
import { ITask } from 'app/shared/model/task.model';
import { QuizService } from 'app/features/services/quiz.service';
import { TaskSetService } from 'app/features/services/task-set.service';
import { TaskService } from 'app/features/services/task.service';

@Component({
    selector: 'jhi-answer-list',
    templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit, OnDestroy {
    currentAccount: any;
    answers: IAnswer[];
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
    taskSetID: number;
    taskSet: ITaskSet;
    taskID: number;
    task: ITask;

    constructor(
        private answerService: AnswerService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private dataUtils: JhiDataUtils,
        private router: Router,
        private eventManager: JhiEventManager,
        private quizService: QuizService,
        private taskSetService: TaskSetService,
        private taskService: TaskService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.activatedRoute.params.subscribe(params => {
            this.quizID = params['quiz-id'];
            this.taskSetID = params['task-set-id'];
            this.taskID = params['task-id'];
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
        this.taskSetService.find(this.taskSetID).subscribe(res => {
            this.taskSet = res.body;
        });
        this.taskService.find(this.taskID).subscribe(res => {
            this.task = res.body;
        });
        this.answerService
            .findByTaskId(this.taskID, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAnswer[]>) => this.paginateAnswers(res.body, res.headers),
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
        this.router.navigate(['/answer'], {
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
            '/answer',
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
        this.registerChangeInAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnswer) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('answerListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateAnswers(data: IAnswer[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.answers = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
