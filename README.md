# dnn-sxc-angular
Connector for angular 4.3+ ([git](https://github.com/angular/angular) | [web](https://angular.io/)) if you're using
1. the open source platform DNN 7+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](http://dnnsoftware.com/)) 
1. and/or the open source CMS 2sxc 7+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 

This is a helper system which
1. automatically provides all important dnn-parameters (module ID, security token, etc.) to angular
2. adds an Http Interceptor for the HttpClient which automatically applies these parameters to all requests
3. prevents the enter-key from causing DNN form submits (you can override this)

It uses observables to make it happen, thereby avoiding timing / async problems common in this scenario. 

## How to get this package
It's published on [npm](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular), so the most common way is to get it using npm:

* `npm install "@2sic.com/dnn-sxc-angular" --save`

## How To Use
### Setup
Follow the [quickstart guide](https://github.com/2sic/dnn-sxc-angular/blob/master/quickstart.md) to start using dnn-sxc-angular.

### Using WebAPIs inside DNN
This will now work automatically, because all headers etc. are now automatically added by the system. 

### Using 2sxc Content-Items, Queries and APIs
This package contains a `Data` object, which provides 3 observable streams

* `content$`
* `query$`
* `api$`

To use them, best check out the demo app or simply work through TypeScript intelisense - we documented all the commands. 

### Getting ModuleId, TabId, etc. and the `sxc` Instance
There is a `Context` object which provides these properties as streams (observables). Just inject `Context` and access it from there. Note that you almost never need this, as the HttpClient is already configured and ready to go, including the headers it needs. 

* `moduleId$`
* `tabId$`
* `sxc$`
* etc. (there are about 3 more...)


## Internal Notes
* read [npm instructions](npm-instructions) to see how to publish a release

## Todo
* create & test simple app-api access
* enhance the content-manager to provide write commands (ATM read-only)
