/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EQuizTestModule } from '../../../test.module';
import { StudentAnswerDeleteDialogComponent } from 'app/entities/student-answer/student-answer-delete-dialog.component';
import { StudentAnswerService } from 'app/entities/student-answer/student-answer.service';

describe('Component Tests', () => {
    describe('StudentAnswer Management Delete Component', () => {
        let comp: StudentAnswerDeleteDialogComponent;
        let fixture: ComponentFixture<StudentAnswerDeleteDialogComponent>;
        let service: StudentAnswerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [StudentAnswerDeleteDialogComponent]
            })
                .overrideTemplate(StudentAnswerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentAnswerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentAnswerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
