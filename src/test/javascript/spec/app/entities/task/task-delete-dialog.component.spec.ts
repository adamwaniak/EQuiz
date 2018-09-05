/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EQuizTestModule } from '../../../test.module';
import { TaskDeleteDialogEntityComponent, TaskService } from 'app/features/entities/task';

describe('Component Tests', () => {
    describe('Task Management Delete Component', () => {
        let comp: TaskDeleteDialogEntityComponent;
        let fixture: ComponentFixture<TaskDeleteDialogEntityComponent>;
        let service: TaskService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskDeleteDialogEntityComponent]
            })
                .overrideTemplate(TaskDeleteDialogEntityComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskDeleteDialogEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
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
                )
            );
        });
    });
});
