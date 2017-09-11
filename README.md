# dnn-sxc-angular
Connector for angular 4.3+ ([git](https://github.com/angular/angular) | [web](https://angular.io/)) if you're using
1. the open source platform DNN 7+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](http://dnnsoftware.com/)) 
1. and/or the open source CMS 2sxc 7+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 

This is a helper system which
1. automatically provides all important dnn-parameters (module ID, security token, etc.) to angular
2. overrides the HttpClient service to automatically use these parameters

It uses observables to make it happen, thereby avoiding timing / async problems common in this scenario. 

## How To Use
It's published on NPM, so the most common way is to 

1. get it using `npm install -d @2sic.com/dnn-sxc-angular`
1. make sure your application uses the enhanced HttpClient by adding the provider to main.ts, so you'll need to add  
`...todo`  
and  
`...todo`
1. make sure initializations happen, by changing your app.component.ts from  
`todo`  
to  
`todo`

That's it. 




**build solution for npm**
- change version number
- npm publish
