import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';



import { Module4Component } from './module4.component';


describe('Module4Component', () => {
  let component: Module4Component;
  let fixture: ComponentFixture<Module4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module4Component ],
      imports:[HttpClientModule, TranslateModule.forRoot()],
      providers:[TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Module4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("place order",()=>{

    const plaeBtn = fixture.debugElement.nativeElement.querySelector('#place-order');
    let selectedProduct = fixture.componentInstance.selectedProduct;
    selectedProduct = 1;

    let selectedUser = fixture.componentInstance.selectedUser;
    selectedUser = 1;

    plaeBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    setTimeout(()=>{
      expect(fixture.componentInstance.rewards).not.toBeNull();
    },500);
  })


});
