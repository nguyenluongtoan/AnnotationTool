import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ImageViewComponent} from '../image-view/image-view.component'
import {Draw} from '../draw'
import {ControlDraw} from '../draw'
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
		ControlDraw.RefreshControl();
		$("#imageCar").attr("src",obj.fakePath);
		Draw.xStart = 0;
		Draw.yStart = 0;
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		Draw.widthImageDraw = img.width;
		Draw.heightImageDraw= img.height;
		this.imageViewComponent.DrawImage(true);
	}
	ShowListImage(){
		var data = $("#fileUpload").val();
		if(data != null && data != "")
			this.listImages= JSON.parse(data.toString())
	}
}

