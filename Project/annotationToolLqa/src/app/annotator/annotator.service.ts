import {Injectable} from '@angular/core';
import {Http, Response,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnnotatorService{
	constructor(private _http: Http){}
	urlGetData = 'http://localhost:8080/infiniq-tool/annotationInfo/findOne?identifier=drive_data/Kia1.2017_09_11_1200.highway805and5.1hr/generated/CAM-TFN20/preprocessed/frame_0022657.undistorted.png';
	urlPostData = 'http://localhost:8080/infiniq-tool/annotationInfo/insertOne';
	getData(): Observable<string>{
		var data = this._http.get(this.urlGetData)
		.map((response: Response)=>{
			var item = response.json();
			return item;
		});
		return data;
	}

	postData(data: string):Observable<string>{
        var jsonData = JSON.parse(data);
        console.log("101---")
        console.log(jsonData)
        return this._http.put(this.urlPostData, jsonData)
                   .map((response: Response)=>{
						var item = response.toString();
						return item;
					});
	}
	private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }	
}

