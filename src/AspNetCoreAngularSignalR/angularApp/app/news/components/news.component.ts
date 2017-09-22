import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NewsState } from '../store/news.state';
import * as NewsActions from '../store/news.action';
import { NewsItem } from '../models/news-item';

@Component({
    selector: 'app-news-component',
    templateUrl: './news.component.html'
})

export class NewsComponent implements OnInit {
    public async: any;
    newsItem: NewsItem;
    newsItems: NewsItem[];
    group = 'group';
    newsState$: Observable<NewsState>;

    constructor(private store: Store<any>) {
        this.newsState$ = this.store.select<NewsState>(state => state.news.newsitems);

        this.store.select<NewsState>(state => state.news.newsitems).subscribe((o: NewsState) => {
            this.newsItems = o.newsItems;
        });

        this.newsItem = new NewsItem();
        this.newsItem.AddData('', '', 'me', this.group);
    }

    public sendNewsItem(): void {
        this.newsItem.NewsGroup = this.group;
        this.store.dispatch(new NewsActions.SendNewsItemAction(this.newsItem));
    }

    public join(): void {
        this.store.dispatch(new NewsActions.JoinGroupAction(this.group));
    }

    public leave(): void {
        this.store.dispatch(new NewsActions.LeaveGroupAction(this.group));
    }

    ngOnInit() {
    }
}
