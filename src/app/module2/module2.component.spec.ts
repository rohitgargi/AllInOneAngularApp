import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Module2Component } from './module2.component';

describe('Module2Component', () => {
  let component: Module2Component;
  let fixture: ComponentFixture<Module2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module2Component ],
      imports:[HttpClientModule, TranslateModule.forRoot()],
      providers:[TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Module2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have search inputbox',()=>{
    const searchInput = fixture.debugElement.nativeElement.querySelector('#search-tree');

    expect(searchInput).toBeDefined();
  })

  it('Should contain 3 Grand parent accordion item',()=>{
    const accordionItems = fixture.debugElement.nativeElement.querySelectorAll('#accordionExample>.accordion-item');
    expect(accordionItems.length).toEqual(3);

  });

  it('Searching Parent in searchbox should open Parent accordion',()=>{

    const searchInput = fixture.debugElement.nativeElement.querySelector('#search-tree');
    searchInput.value = 'Parent';

    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      const parent1 = fixture.debugElement.nativeElement.querySelectorAll('#accordionExample>.accordion-item')[0];
      const collapseDiv1 = parent1.querySelector('div.accordion-collapse.show');

      const parent2 = fixture.debugElement.nativeElement.querySelectorAll('#accordionExample>.accordion-item')[1];
      const collapseDiv2 = parent2.querySelector('div.accordion-collapse.show');

      const parent3 = fixture.debugElement.nativeElement.querySelectorAll('#accordionExample>.accordion-item')[2];
      const collapseDiv3 = parent3.querySelector('div.accordion-collapse.show');
      expect(collapseDiv1).not.toBeNull();
      expect(collapseDiv2).not.toBeNull();
      expect(collapseDiv3).not.toBeNull();
    })

  });


});
