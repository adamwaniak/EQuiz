import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskSet } from 'app/shared/model/task-set.model';

@Component({
    selector: 'jhi-task-set-detail',
    templateUrl: './task-set-detail.entity.component.html'
})
export class TaskSetDetailEntityComponent implements OnInit {
    taskSet: ITaskSet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taskSet }) => {
            this.taskSet = taskSet;
        });
    }

    previousState() {
        window.history.back();
    }
}
