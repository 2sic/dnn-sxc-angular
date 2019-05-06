# dnn-sxc-angular
Connector for Angular 6 / 7 ([git](https://github.com/angular/angular) | [web](https://angular.io/)) for developers using
1. the open source platform DNN 7+ ([git](https://github.com/dnnsoftware/Dnn.Platform) | [web](http://dnnsoftware.com/)) 
1. and/or the open source CMS 2sxc 7+ ([git](https://github.com/2sic/2sxc/) | [web](https://2sxc.org/)) 

This is a helper system which
1. automatically provides all dnn-parameters (module ID, security token, etc.) to Angular
2. adds an Http Interceptor for the HttpClient which automatically applies these parameters to all requests
3. prevents the enter-key from causing DNN form submits (optional, you can override this)

It uses observables to make it happen, thereby avoiding timing / async problems common in this scenario. 

## How to get this package
It's published on [npm](https://www.npmjs.com/package/@2sic.com/dnn-sxc-angular), so the most common way is to get it using npm:

* `npm install "@2sic.com/dnn-sxc-angular" --save`

## Setup

1. Follow the [quickstart guide](https://azing.org/2sxc/r/9qdbjvl_) to start using dnn-sxc-angular.
1. To develop locally using `ng serve` follow [these instructions](https://azing.org/2sxc/r/VLo7GwRo)

## Using DNN or 2sxc WebAPIs
This will now work automatically, because all headers etc. are now automatically added by the system. 

## Using 2sxc Content-Items, Queries and APIs
This package contains a `Data` object, which provides 3 observable streams

* `content$`
* `query$`
* `api$`

To use them, best check out the [demo app](https://github.com/2sic/app-dnn-sxc-angular-dev) or simply work through TypeScript intelisense - we documented all the commands. 

## Get ModuleId, TabId, etc. and the `sxc` Instance
There is a `Context` object which provides these properties as streams (observables). Just inject `Context` and access it from there. Note that you almost never need this, as the HttpClient is already configured and ready to go, including the headers it needs. 

* `moduleId$`
* `tabId$`
* `sxc$`
* etc.


## Internal Notes
* read [npm instructions](https://azing.org/2sxc/r/ItPxPh9D) to see how to publish a release

## Todo
* enhance the content-manager to provide write commands (ATM read-only)
