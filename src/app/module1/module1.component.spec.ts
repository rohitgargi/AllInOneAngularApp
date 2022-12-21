import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Module1Component } from './module1.component';

describe('Module1Component', () => {
  let component: Module1Component;
  let fixture: ComponentFixture<Module1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module1Component ],
      imports:[ReactiveFormsModule,HttpClientModule, TranslateModule.forRoot()],
      providers:[TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Module1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Testing a formgroup count',()=>{
    const formElement = fixture.debugElement.nativeElement.querySelector('#userForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(4);
  });

  it('Check initial form values',()=>{
    const userFormGrp = component.userForm;
    const userFormValues ={
      name:'',
      email:'',
      gitUrl:'',
      technologies:['']
    }
    expect(userFormGrp.value).toEqual(userFormValues);
  });

  it('Check name value before entering some value and validations',()=>{
    const nameInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    const userNameValueFromGrp = component.userForm.get('name');

    expect(nameInput.value).toEqual(userNameValueFromGrp?.value);
    expect(userNameValueFromGrp?.errors).not.toBeNull();
    expect(userNameValueFromGrp?.errors?.['required']).toBeTruthy();
  });

  it('Check name value post entering some value',()=>{
    const nameInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    nameInput.value = 'Rohit Sharma';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      const userNameValueFromGrp = component.userForm.get('name');
      expect(nameInput.value ).toEqual(userNameValueFromGrp?.value);
      expect(userNameValueFromGrp?.errors).toBeNull();

    });

  });

  it('Check whole userform to be valid',()=>{
    const nameInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    const emailInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#emailId');
    const gitInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#gitUrlId');
    const technologyInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('#technologyGrp input')[0];
    
    nameInput.value = 'Rohit Sharma';
    emailInput.value = 'Rohit@mail.com';
    gitInput.value = 'https://github.com'
    technologyInput.value = 'Angular';

    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    gitInput.dispatchEvent(new Event('input'));
    technologyInput.dispatchEvent(new Event('input'));


    const isUserFormValid = component.userForm.valid;
    fixture.whenStable().then(()=>{
      expect(isUserFormValid).toBeTruthy();
    })

  })


});
