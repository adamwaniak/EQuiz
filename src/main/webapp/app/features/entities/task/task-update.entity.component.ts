import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from '../../services/task.service';
import { ITaskSet } from 'app/shared/model/task-set.model';
import { TaskSetService } from 'app/features/services/task-set.service';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.entity.component.html'
})
export class TaskUpdateEntityComponent implements OnInit {
    private _task: ITask;
    isSaving: boolean;

    tasksets: ITaskSet[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private taskService: TaskService,
        private taskSetService: TaskSetService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
        this.taskSetService.query().subscribe(
            (res: HttpResponse<ITaskSet[]>) => {
                this.tasksets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
        result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTaskSetById(index: number, item: ITaskSet) {
        return item.id;
    }
    get task() {
        return this._task;
    }

    set task(task: ITask) {
        this._task = task;
    }
}
