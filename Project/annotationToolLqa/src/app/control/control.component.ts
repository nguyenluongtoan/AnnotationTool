import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ImageViewComponent} from '../image-view/image-view.component'
@Component({
	selector: 'app-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {	
	public imageViewComponent: ImageViewComponent = new ImageViewComponent();
	public listImages = [];
	constructor() { }
	ngOnInit() {}
	ShowImage(obj){
		$("#imageCar").attr("src",obj.fakePath);
		this.imageViewComponent.DrawImage(true);
	}
	ShowListImage(){
		var data = $("#fileUpload").val();
		if(data != null && data != "")
			this.listImages= JSON.parse(data.toString())
	}
}

