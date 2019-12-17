import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import * as MOD_HEROES from 'src/assets/json_mock_heroes.json';

import demodata from '../assets/json_mock_heroes.json';
import sampleData from 'src/assets/json_mock_heroes.json';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api
  private jsonURL = 'assets/json_mock_heroes.json';
  constructor(private messageService5: MessageService, private http: HttpClient) { }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  hero3: Hero;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // getting data from the server with the RxJS of() function.
  getHeroes(): Observable<Hero[]> {
    this.messageService5.add('HeroService: fetched heroes');
    console.log('hdsfsdfsdfsffsfdf');
    return of(HEROES);
  }
  // Convert getHeroes() method to use HttpClient as follows:
  getHeroes2(): Observable<Hero[]> {
    // HttpClient.get() returns the body of the response as an untyped JSON object by default.
    // Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap((_: any) => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    this.messageService5.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** GET hero by id. Will 404 if id not found */
  /**  getHero2() returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays getHeroes2() */
  getHero2(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService5.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    console.log('To update Hero Info' + JSON.stringify(hero));
    // The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id. i.e, class Hero {id, name}
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated Hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updatedHero'))
    );
  }

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`Found heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('Search heroes', []))
    );
  }

  getHero3(id: number): Observable<Hero> {
    let h = [];
    h = MOD_HEROES['default'];
    console.log(h);
    this.messageService5.add(`HeroService: fetched hero id=${id}`);
    console.log('length' + h.length);
    /* Simple For Loop */
    for (let i = 0; i < h.length; i++) {
      console.log(h[i]);
      // debugger;
      if (h[i].id == id) {
        // debugger;
        const person = {
          id: h[i].id,
          name: h[i].name
        };
        return of(person);
      }
    }
  }

  getHeroes3(): Observable<Hero[]> {
    this.messageService5.add('HeroService: fetched heroes');
    console.log(this.jsonURL);
    return this.http.get<Hero[]>(this.jsonURL)
      .pipe(
         tap(_ => this.log('fetched heroes')),
         catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }



}
