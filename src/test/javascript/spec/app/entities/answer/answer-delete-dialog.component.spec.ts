/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EQuizTestModule } from '../../../test.module';
import { AnswerDeleteDialogEntityComponent, AnswerService } from 'app/features/entities/answer';

describe('Component Tests', () => {
    describe('Answer Management Delete Component', () => {
        let comp: AnswerDeleteDialogEntityComponent;
        let fixture: ComponentFixture<AnswerDeleteDialogEntityComponent>;
        let service: AnswerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [AnswerDeleteDialogEntityComponent]
            })
                .overrideTemplate(AnswerDeleteDialogEntityComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnswerDeleteDialogEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerService);
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
