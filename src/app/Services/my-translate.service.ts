import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _PLATFORM_ID=inject(PLATFORM_ID)
  private readonly _Renderer2=inject(RendererFactory2).createRenderer(null , null)
 
  
   constructor(private _TranslateService: TranslateService) { 
 if(isPlatformBrowser(this._PLATFORM_ID)){
       //logic
     //1- get lang --->localstorage
   
     this._TranslateService.setDefaultLang('en');
     //3- use lang------> local
   this.setLang()
    
 }
   }
 
 
 setLang():void{
     let savedLang =localStorage.getItem('lang');
     if(savedLang !== null){
       this._TranslateService.use(savedLang !);
      }
 if (savedLang === 'en') {
   this._Renderer2.setAttribute( document.documentElement , 'dir' , 'ltr');
   this._Renderer2.setAttribute( document.documentElement , 'lang' , 'en');
 
 
   
 } else if( savedLang === 'ar'){
   this._Renderer2.setAttribute( document.documentElement , 'dir' , 'rtl');
   this._Renderer2.setAttribute( document.documentElement , 'lang' , 'ar');
 
 
 }
   }
 
   changeLang(lang:string):void{
  if(isPlatformBrowser(this._PLATFORM_ID)){
   localStorage.setItem('lang' , lang); // save lang in localstorage
 
 this.setLang()
  }
 
   }
 
}
