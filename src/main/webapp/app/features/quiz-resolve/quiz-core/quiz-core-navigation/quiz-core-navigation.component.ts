import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faGreaterThan, faLessThan} from '@fortawesome/free-solid-svg-icons';

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
    activeTaskNumber: number;
    faGreaterThan = faGreaterThan;
    faLessThan = faLessThan;

    @Output() notifyParent: EventEmitter<number> = new EventEmitter();

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }

    sendNotificationAndNavigate(newActiveTaskNumber: number) {
        if (newActiveTaskNumber < 0) {
            newActiveTaskNumber = 0;
        }
        if (newActiveTaskNumber > this.numberOfTask - 1) {
            newActiveTaskNumber = this.numberOfTask - 1;
        }
        this.activeTaskNumber = newActiveTaskNumber;
        this.router.navigate([`/quiz/${this.quizUrl}/start/${this.activeTaskNumber}`]);
        this.notifyParent.emit(this.activeTaskNumber);
    }

    ngOnInit() {
        this.activeTaskNumber = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.arrayOfNumber = new Array(this.numberOfTask);
    }

}
