import {Component, OnInit} from '@angular/core';
import {StudentService} from 'app/features/services/student.service';
import {Student} from 'app/shared/model/student.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-quiz-result',
    templateUrl: './quiz-result.component.html',
    styles: []
})
export class QuizResultComponent implements OnInit {
    student: Student;
    studentId: number;

    constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.studentId = params['student-id'];
        });
        this.studentService.find(this.studentId).subscribe(res => {
            this.student = res.body;
        });
    }

}
