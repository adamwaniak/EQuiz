/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { Task } from 'app/shared/model/task.model';
import { TaskDetailEntityComponent } from 'app/features/entities/task';

describe('Component Tests', () => {
    describe('Task Management Detail Component', () => {
        let comp: TaskDetailEntityComponent;
        let fixture: ComponentFixture<TaskDetailEntityComponent>;
        const route = ({ data: of({ task: new Task(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskDetailEntityComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskDetailEntityComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskDetailEntityComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
