/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { TaskSet } from 'app/shared/model/task-set.model';
import { TaskSetDetailComponent } from 'app/features/entities/task-set';

describe('Component Tests', () => {
    describe('TaskSet Management Detail Component', () => {
        let comp: TaskSetDetailComponent;
        let fixture: ComponentFixture<TaskSetDetailComponent>;
        const route = ({ data: of({ taskSet: new TaskSet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskSetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskSetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskSetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taskSet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
