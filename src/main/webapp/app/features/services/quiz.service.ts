import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuiz } from 'app/shared/model/quiz.model';

type EntityResponseType = HttpResponse<IQuiz>;
type EntityArrayResponseType = HttpResponse<IQuiz[]>;

@Injectable({ providedIn: 'root' })
export class QuizService {
    private resourceUrl = SERVER_API_URL + 'api/quizzes';

    constructor(private http: HttpClient) {}

    create(quiz: IQuiz): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(quiz);
        return this.http
            .post<IQuiz>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(quiz: IQuiz): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(quiz);
        return this.http
            .put<IQuiz>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQuiz>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQuiz[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findCurrentUserQuizzes(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQuiz[]>(`${this.resourceUrl}/current-user`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    newEdition(quizID: number) {
        return this.http.get(`${this.resourceUrl}/new-edition/${quizID}`, { observe: 'response' });
    }

    findByContainsQuizCode(code: string) {
        return this.http
            .get<IQuiz[]>(`${this.resourceUrl}/by-code/${code}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findByUrl(url: string): Observable<EntityResponseType> {
        return this.http
            .get<IQuiz>(`${this.resourceUrl}/by-url/${url}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    checkPassword(password: string, url: string): Observable<EntityResponseType> {
        return this.http.post(`${this.resourceUrl}/password`, { 'password': password, 'url': url }, { observe: 'response' });
    }

    private convertDateFromClient(quiz: IQuiz): IQuiz {
        const copy: IQuiz = Object.assign({}, quiz, {
            startDate: quiz.startDate != null && quiz.startDate.isValid() ? quiz.startDate.toJSON() : null,
            endDate: quiz.endDate != null && quiz.endDate.isValid() ? quiz.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((quiz: IQuiz) => {
            quiz.startDate = quiz.startDate != null ? moment(quiz.startDate) : null;
            quiz.endDate = quiz.endDate != null ? moment(quiz.endDate) : null;
        });
        return res;
    }
}
