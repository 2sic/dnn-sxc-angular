# dnn-sxc-angular
Connector for angular 4.3+ ([git](https://github.com/angular/angular) | [web](https://angular.io/)) if you're using
1. the open source platform DNN 7+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](http://dnnsoftware.com/)) 
1. and/or the open source CMS 2sxc 7+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 

This is a helper system which
1. automatically provides all important dnn-parameters (module ID, security token, etc.) to angular
2. adds an Http Interceptor for the HttpClient which automatically applies these parameters to all requests

It uses observables to make it happen, thereby avoiding timing / async problems common in this scenario. 

## How to get this package
It's published on [npm](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular), so the most common way is to get it using npm install:

* `npm install -d @2sic.com/dnn-sxc-angular`

## How To Use
Make sure your application uses the Http Interceptor by adding the important providers to app.module.ts, so you'll need to add:

```typescript
import { DnnSxcModule } from '@2sic.com/dnn-sxc-angular'
```  

and this module to the @NgModule - here's an example from the [Angular Directory App](https://github.com/2sic/app-directory-angular/blob/master/src/app/app.module.ts), yours will look a bit different.

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DnnSxcModule,     // DnnSxc module ensures all connectors are available
    HttpClientModule, // important - this changed in Angular 4.3
    BrowserModule,
    FormsModule,
    DirectoryModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now, make sure initializations happen, by changing your app.component.ts from

```typescript
export class AppComponent {...}
```  
to  

```typescript
export class AppComponent extends DnnAppComponent {
  constructor(
    element: ElementRef,
    context: Context,
  ) {
    super(element, context);
  }
}
```

Again you can compare it with the example from the [Angular Directory App](https://github.com/2sic/app-directory-angular/blob/master/src/app/app.component.ts). That's it!



## Internal Notes
* read [npm instructions](npm-instructions) to see how to publish a release