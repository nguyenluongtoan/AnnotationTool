import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ImageViewComponent} from '../image-view/image-view.component'
import {Draw} from '../class/draw'
import {ControlDraw} from '../class/draw'
import {SystemConfig} from '../class/config'
import {PropertyForImage} from '../class/draw'

@Component({
	selector: 'app-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {	
	public imageViewComponent: ImageViewComponent = new ImageViewComponent();
	public listImagesBase = [];
	public listImages = [];
	public configData;
	public keyFilter: string = '';
	constructor() { 
		this.loadConfig();
	}
	ngOnInit() {}
	loadConfig(){
		PropertyForImage.currentProperty = SystemConfig.data[0];
		this.configData = PropertyForImage.currentProperty
	}
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
		{
			this.listImages= JSON.parse(data.toString())
			this.listImagesBase= JSON.parse(data.toString())
		}
		$("#fileUpload").val('')
	}
	FilterData(searchValue : string){
		this.listImages = this.listImagesBase.filter(x=>x.webkitRelativePath.indexOf(searchValue)>= 0)
	}
	ChangeTypeDraw(type){
		Draw.typeDraw = type;
		ControlDraw.statusDrawLine = 0
	}
}

