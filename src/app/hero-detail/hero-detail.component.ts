import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  // With Injection enabled in heroes.component.html i.e, <app-hero-detail [hero]="selectedHero"></app-hero-detail>
  @Input() hero: Hero;

  heroes3: Hero[];
  // getHeroes(): void {
  //   this.heroes3 = this.heroService.getHeroes();
  // }
  hero1: Hero;


  // Observables
  getHeroes(): void {
    this.heroService.getHeroes2().subscribe(heroes => this.heroes3 = heroes);
  }


  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('----------------' + id);
    this.heroService.getHero(id).subscribe(hero1 => this.hero1 = hero1);
  }

  getHero2(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('----------------' + id);
    this.heroService.getHero2(id).subscribe(hero1 => this.hero1 = hero1);
  }

  // COMBINED getHero() AND getHero2()
  getHero3(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('----------------' + id);
    if (id < 11) {
      this.heroService.getHero(id).subscribe(hero1 => this.hero1 = hero1);
    } else if (id >= 31 && id <= 34) {
      this.heroService.getHero3(id).subscribe(hero1 => this.hero1 = hero1);
    } else {
      this.heroService.getHero2(id).subscribe(hero1 => this.hero1 = hero1);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('save: ' + JSON.stringify(this.hero1));
    this.heroService.updateHero(this.hero1)
      .subscribe(() => this.goBack());
  }


  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.getHeroes();
    // this.getHero();
    // this.getHero2();
    this.getHero3();
  }

}
