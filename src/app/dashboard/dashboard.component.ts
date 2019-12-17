import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  heroes: Hero[] = [];
  heroes1: Hero[] = [];
  heroes2: Hero[] = [];

  getHeroes2(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 5));
  }

  getHeroes3(): void {
    this.heroService.getHeroes2()
      .subscribe(heroes1 => this.heroes1 = heroes1.slice(0, 5));
  }

  getHeroes4(): void {
    this.heroService.getHeroes3()
      .subscribe(heroes2 => {
      this.heroes2 = heroes2.slice(0, 5);
      console.log(this.heroes2);
      });
  }

ngOnInit() {
    this.getHeroes4();
    this.getHeroes3();
    this.getHeroes2();
  }

}
