
import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule ,HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminservicetwoService {
  token:any;
  //serviceurl = environment.apiUrl;
  serviceurl = "https://annapurnafarms.net/api/"
 
   apiUrl = '/proxyapi'; // Proxy path
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  public changepassword(authentication: any) {
  
    return this.http.post(this.serviceurl+'changepassword', authentication,this.options );
  }

  public subcategory(cat: any) {
 const obj={
    cid:cat
  }
    return this.http.post(this.serviceurl+'subcategory', obj,this.options );
  }
  public orderdetails(cat: any) {
    const obj={
       sid:cat
     }
       return this.http.post(this.serviceurl+'orderdetail  ', obj,this.options );
     }

     public forgotpass(data: any) {
    //  var d =JSON.parse(localStorage.getItem('profile')||'null')
    
     
      const obj={
        
         email:data
       }
         return this.http.post(this.serviceurl+'forgotpassword  ', obj,this.options );
       }
       public getnotifications() {
             return this.http.get(this.serviceurl+'notifications  ',this.options );
           }

           public innovice(da:any) {
            
            const obj={
        
              id:da
            }
            return this.http.post('https://annapurnafarms.net/api/saleinvoice',obj,this.options );
          }
          public getCoupon(){
            var d =JSON.parse(localStorage.getItem('profile')||'null')
        const obj ={
          "uid":1    //d[0].data[0].id
        }
              return this.http.post(this.serviceurl+'coupons', obj,this.options );
            }
          
            public rateus(r:any){
              return this.http.post(this.serviceurl+'coupons', r,this.options );
            }
            public setprofilepic(r:any){
              var d =JSON.parse(localStorage.getItem('profile')||'null')
        const obj ={
          "uid":d[0].data[0].id,
          "image":r
        }
              return this.http.post(this.serviceurl+'userprofile', obj,this.options );
            }
}
