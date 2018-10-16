import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-quiz-core-navigation',
    templateUrl: './quiz-core-navigation.component.html',
    styles: []
})
export class QuizCoreNavigationComponent implements OnInit {
    @Input()
    quizUrl: string;
    @Input()
    taskNumber: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

}
