import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getData() {
    const fullUrl = environment.baseUrl;
    return this.http.get(fullUrl);
  }

  private extractMediumImage(content: string): string {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : '';
  }

  /**
   * Fetches blog posts from Medium (via RSS-to-JSON proxy) and Dev.to public API.
   * Both are free, no API key needed.
   */
  getBlogPosts(): Observable<any[]> {
    const medium$ = this.http.get<any>(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@RamkumarMrj'
    ).pipe(
      map(res => (res.items || []).map((item: any) => ({
        title: item.title,
        description: item.description?.replace(/<[^>]+>/g, '').substring(0, 120) + '...',
        // thumbnail is unreliable — fall back to parsing content HTML
        image: item.thumbnail || this.extractMediumImage(item.content || ''),
        url: item.link,
        pubDate: item.pubDate,
        source: 'medium'
      }))),
      catchError(() => of([]))
    );

    const devto$ = this.http.get<any[]>(
      'https://dev.to/api/articles?username=RamkumarMrj'
    ).pipe(
      map(items => (items || []).map((item: any) => ({
        title: item.title,
        description: item.description || item.title,
        image: item.cover_image || item.social_image,
        url: item.url,
        pubDate: item.published_at,
        source: 'dev.to'
      }))),
      catchError(() => of([]))
    );

    return forkJoin([medium$, devto$]).pipe(
      map(([m, d]) => [...m, ...d].sort((a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      ))
    );
  }
}
