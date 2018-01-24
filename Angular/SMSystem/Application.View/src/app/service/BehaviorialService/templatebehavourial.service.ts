import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TemplateCrudService } from './template.service';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class TemplateEditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient,private templateCrudService:TemplateCrudService) {
        super([]);
    }

    private allexams: any[] = [];

    public read(apiUrl:string) {
        if (this.allexams.length) {
            return super.next(this.allexams);
        }

        this.fetch(apiUrl)
            .do(data => {
                this.allexams = data;
            })
            .subscribe(data => {
                super.next(data);
                
            });
    }

    public save(getApi:string,crudApi:string,dataItemToAdd: any) {

        this.reset();

        this.fetch(getApi,crudApi,CREATE_ACTION, dataItemToAdd)
    }

    public update(getApi:string,crudApi:string,dataItemToUpdate: any) {

        this.reset();

        this.fetch(getApi,crudApi,UPDATE_ACTION, dataItemToUpdate)
    }

    public remove(getApi:string,crudApi:string,dataItemToRemove: any) {
        this.reset();

         this.fetch(getApi,crudApi,REMOVE_ACTION, dataItemToRemove)
    }

    public resetItem(dataItemToReset: any) {
        if (!dataItemToReset) { return; }

        // find orignal data item
        const originalstudent = this.allexams.find(item => item.Id === dataItemToReset.Id);

        // revert changes
        Object.assign(originalstudent, dataItemToReset);

        super.next(this.allexams);
    }

    private reset() {
        this.allexams = [];
    }

    private fetch(getApi:string,crudApi:string='',action: string = '',data?: any): Observable<any[]>  {
        if(action == CREATE_ACTION){
            this.templateCrudService.ReturnReponse(data,crudApi)
            .subscribe(()=> {this.reset();this.read(getApi)})
        }
        else if(action == UPDATE_ACTION){
            this.templateCrudService.ReturnReponse(data,crudApi)
            .subscribe(()=> {this.reset();this.read(getApi)})
        }
        else if(action == REMOVE_ACTION){
            this.templateCrudService.ReturnReponse(data,crudApi)
            .subscribe(()=> {this.reset();this.read(getApi)})
        }
        else
        return this.templateCrudService.ReturnObject(getApi)
        .map(res => <any[]>res);
    }


}