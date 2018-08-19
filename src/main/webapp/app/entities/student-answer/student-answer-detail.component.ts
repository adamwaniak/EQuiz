import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentAnswer } from 'app/shared/model/student-answer.model';

@Component({
    selector: 'jhi-student-answer-detail',
    templateUrl: './student-answer-detail.component.html'
})
export class StudentAnswerDetailComponent implements OnInit {
    studentAnswer: IStudentAnswer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentAnswer }) => {
            this.studentAnswer = studentAnswer;
        });
    }

    previousState() {
        window.history.back();
    }
}
