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
```
import { DnnSxcModule } from '@2sic.com/dnn-sxc-angular'
```  
and this module to the @NgModule

```typescript
@NgModule({
    // your stuff
  imports: [ // in here, you should add...
    DnnSxcModule, //...this module
    // more of your stuff
  ],
    // more of your stuff
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

That's it. 




**build solution for npm**
- change version number
- npm publish
