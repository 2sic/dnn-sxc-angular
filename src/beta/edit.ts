import { Injectable } from "@angular/core";
import { Context } from "../context/context.service";



@Injectable()
export class Edit {

    constructor(
        private context: Context,
      ) { 
          console.log('creating edit');

      }

      toolbarMaker(){
          return `<h1>test</h1>`;
      }
    
}