import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule ,HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  token:any;
  //serviceurl = environment.apiUrl;
  serviceurl = "https://annapurnafarms.net/api/"
   apiUrl = '/proxyapi'; // Proxy path
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  public loginapi(authentication: any) {
    //let params = new HttpParams().set("authentication", encodeURIComponent(authentication))
    //return this.http.get(`${this.apiUrl}/data`);
   // return this.http.post( `${this.apiUrl}/authentication`,authentication );
    return this.http.post(this.serviceurl+'authentication', authentication,this.options );
  }

  public getproduct() {
  const obj ={
    "wid": JSON.parse(localStorage.getItem('wid')||'null'),
  "cid":0
  }
    return this.http.post(this.serviceurl+'product', obj,this.options );
  }
  public getfproduct() {
    const obj ={
      "wid": JSON.parse(localStorage.getItem('wid')||'null'),
    "cid":0
    }
      return this.http.post(this.serviceurl+'featureproduct', obj,this.options );
    }
  public category () {
    const obj ={
      "wid":JSON.parse(localStorage.getItem('wid')||'null'),
    }
      return this.http.post(this.serviceurl+'category ', obj,this.options );
    }

    public order (obj:any) {
        return this.http.post(this.serviceurl+'sale ', obj,this.options );
      }

      public saveapplicationform (emp:any) {
        // var option = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data ') };
        
        return this.http.post(this.serviceurl+'employee ', emp,this.options );
      }
      public getwearehouse () {
        return this.http.get(this.serviceurl+'warehouse ',this.options );
      }
      public assignuser (val:any) {
    
        const obj ={
          "uid":val
        }
        return this.http.post(this.serviceurl+'assignuser ',obj,this.options );
      }

      public emplist () {
   // var d =JSON.parse(localStorage.getItem('profile')||'null')
    // d[0].data[0].id
        const obj ={
          "uid":JSON.parse(localStorage.getItem('wid')||'null') 
        }
        return this.http.post(this.serviceurl+'employees',obj,this.options );
      }

      public getorder(){
         var d =JSON.parse(localStorage.getItem('profile')||'null')
        const obj ={
          "uid": d[0].data[0].id
        }
        return this.http.post(this.serviceurl+'orders',obj,this.options );
      }

      public recentproduct(){
        const obj ={
          "wid":JSON.parse(localStorage.getItem('wid')||'null') 
        }
        return this.http.post(this.serviceurl+'recentproduct',obj,this.options );
      }
       public popularproduct(){
        const obj ={
          "wid":JSON.parse(localStorage.getItem('wid')||'null') 
        }
        return this.http.post(this.serviceurl+'popularproduct',obj,this.options );
      }

      public getbrands(){
        // const obj ={
        //   "wid":JSON.parse(localStorage.getItem('wid')||'null') 
        // }
        return this.http.get(this.serviceurl+'brands',this.options );
      }
      // public saleinvoice(id:any){
      
      //   return this.http.post(this.serviceurl+'saleinvoice',id,this.options );
      // }
}
