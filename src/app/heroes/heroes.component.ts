import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // constructor() { }
  constructor(private heroService: HeroService) { }

  hero1 = 'Nishanth J';

  hero: Hero = {
    id : 1,
    name : 'SuperMan'
  };

  heroes = HEROES;


  selectedHero: Hero;

  heroes2: Hero[];
  heroes3: Hero[] = [];
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(hero);
  }

  // getHeroes(): void {
  //   this.heroes2 = this.heroService.getHeroes();
  // }

  // The HeroService.getHeroes method used to return a Hero[]. Now it returns an Observable<Hero[]>.
  getHeroes(): void {
    this.heroService.getHeroes2()
        .subscribe(heroes2 => this.heroes2 = heroes2);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes2.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes2 = this.heroes2.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    // There's really nothing for the component to do with the Observable returned by heroService.delete() but it must subscribe anyway.
    // If you neglect to subscribe(), the service will not send the delete request to the server.
    // As a rule, an Observable does nothing until something subscribes.
  }

  delete1(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes2(): void {
    this.heroService.getHeroes3()
        .subscribe(heroes3 => {
          this.heroes3 = heroes3;
          console.log(this.heroes3);
      });
  }

  ngOnInit() {
    this.getHeroes();
    this.getHeroes2();
  }

}
