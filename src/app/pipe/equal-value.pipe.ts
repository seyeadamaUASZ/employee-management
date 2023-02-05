import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name:'equal'
})
export class EqualPipe implements PipeTransform{
    transform(value: string):string {
        if(value ==='PERMANENT'){
            value='Personnel';
        }
        if(value==='NON_PERMANENT'){
            value='Prestataire';
        }
        return value;
    }
}