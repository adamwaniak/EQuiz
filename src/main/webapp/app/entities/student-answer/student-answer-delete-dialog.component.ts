import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentAnswer } from 'app/shared/model/student-answer.model';
import { StudentAnswerService } from './student-answer.service';

@Component({
    selector: 'jhi-student-answer-delete-dialog',
    templateUrl: './student-answer-delete-dialog.component.html'
})
export class StudentAnswerDeleteDialogComponent {
    studentAnswer: IStudentAnswer;

    constructor(
        private studentAnswerService: StudentAnswerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentAnswerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentAnswerListModification',
                content: 'Deleted an studentAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-answer-delete-popup',
    template: ''
})
export class StudentAnswerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentAnswer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentAnswerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.studentAnswer = studentAnswer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
