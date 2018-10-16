import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerForResolve, TaskForResolve} from 'app/shared/model/quiz-resolve.model';

@Component({
    selector: 'jhi-quiz-core-content',
    templateUrl: './quiz-core-content.component.html',
    styles: []
})
export class QuizCoreContentComponent implements OnInit {

    @Input()
    task: TaskForResolve;

    @Output() notifyParent: EventEmitter<AnswerForResolve> = new EventEmitter();

    sendNotification(answer: AnswerForResolve) {
        this.notifyParent.emit(answer);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
