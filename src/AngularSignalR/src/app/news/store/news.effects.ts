import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of , Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as newsAction from './news.action';
import { NewsService } from '../news.service';

@Injectable()
export class NewsEffects {

    @Effect()
    sendNewItem$: Observable<Action> = this.actions$.pipe(
        ofType<newsAction.SendNewsItemAction>(newsAction.SEND_NEWS_ITEM),
        switchMap((action: newsAction.SendNewsItemAction) => {
            this.newsService.send(action.newsItem);
            return of(new newsAction.SendNewsItemActionComplete(action.newsItem));
        })
    );

    @Effect()
    joinGroup$: Observable<Action> = this.actions$.pipe(
        ofType<newsAction.JoinGroupAction>(newsAction.JOIN_GROUP),
        switchMap((action: newsAction.JoinGroupAction ) => {
            this.newsService.joinGroup(action.group);
            return of(new newsAction.JoinGroupActionComplete(action.group));
        })
    );

    @Effect()
    leaveGroup$: Observable<Action> = this.actions$.pipe(
        ofType<newsAction.LeaveGroupAction>(newsAction.LEAVE_GROUP),
        switchMap((action: newsAction.LeaveGroupAction) => {
            this.newsService.leaveGroup(action.group);
            return of(new newsAction.LeaveGroupActionComplete(action.group));
        })
    );

    @Effect()
    getAllGroups$: Observable<Action> = this.actions$.pipe(
        ofType(newsAction.SELECTALL_GROUPS),
        switchMap(() => {
            return this.newsService.getAllGroups().pipe(
                map((data: string[]) => {
                    return new newsAction.SelectAllGroupsActionComplete(data);
                }),
                catchError((error: any) => of(error)
                ));
        })
    );

    constructor(
        private newsService: NewsService,
        private actions$: Actions
    ) { }
}
