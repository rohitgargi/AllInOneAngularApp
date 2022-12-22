import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient){

    }
    
    skiptoMain$ = new Subject<boolean>();

    toggleSwitch$ = new Subject<boolean>();

    languageSelection$ = new BehaviorSubject<string>('en');

    initiateSkipToMain = () =>{
        this.skiptoMain$.next(true);
    }

    getSeoTagJson(): Observable<any> {
        return this.http.get("./assets/seoTags.json");
    }

}
