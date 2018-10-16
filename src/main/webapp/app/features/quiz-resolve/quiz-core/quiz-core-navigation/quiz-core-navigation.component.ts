import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-quiz-core-navigation',
    templateUrl: './quiz-core-navigation.component.html',
    styles: []
})
export class QuizCoreNavigationComponent implements OnInit, OnChanges {
    @Input()
    quizUrl: string;
    @Input()
    numberOfTask: number;
    arrayOfNumber: any;

    @Output() notifyParent: EventEmitter<number> = new EventEmitter();

    sendNotification(activeTaskNumber: number) {
        this.notifyParent.emit(activeTaskNumber);
    }

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.arrayOfNumber = new Array(this.numberOfTask);
    }

}
