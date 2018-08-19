/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EQuizTestModule } from '../../../test.module';
import { TaskSetDeleteDialogComponent } from 'app/entities/task-set/task-set-delete-dialog.component';
import { TaskSetService } from 'app/entities/task-set/task-set.service';

describe('Component Tests', () => {
    describe('TaskSet Management Delete Component', () => {
        let comp: TaskSetDeleteDialogComponent;
        let fixture: ComponentFixture<TaskSetDeleteDialogComponent>;
        let service: TaskSetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskSetDeleteDialogComponent]
            })
                .overrideTemplate(TaskSetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskSetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskSetService);
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
