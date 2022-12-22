import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Module3Component } from './module3.component';

describe('Module3Component', () => {
  let component: Module3Component;
  let fixture: ComponentFixture<Module3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module3Component ],
      imports:[ReactiveFormsModule, HttpClientModule, TranslateModule.forRoot()],
      providers:[TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Module3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have autoselect input",()=>{
    const inputElement = fixture.debugElement.nativeElement.querySelector('#ship-autoselect');
    expect(inputElement).toBeTruthy();

  });


  it('should display film list and Pilot list',()=>{
    const componentInst = fixture.componentInstance;

    let selectedList = {"name":"Naboo fighter","model":"N-1 starfighter","manufacturer":"Theed Palace Space Vessel Engineering Corps","cost_in_credits":"200000","length":"11","max_atmosphering_speed":"1100","crew":"1","passengers":"0","cargo_capacity":"65","consumables":"7 days","hyperdrive_rating":"1.0","MGLT":"unknown","starship_class":"Starfighter","pilots":["https://swapi.dev/api/people/11/","https://swapi.dev/api/people/35/","https://swapi.dev/api/people/60/"],"films":["https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/"],"created":"2014-12-19T17:39:17.582000Z","edited":"2014-12-20T21:23:49.917000Z","url":"https://swapi.dev/api/starships/39/"};

    componentInst.selectedShip(selectedList);
    fixture.detectChanges();

    setTimeout(()=>{
      expect(componentInst.filmList).not.toBeNull();
      expect(componentInst.pilotList).not.toBeNull();
    },200);
  });

});
