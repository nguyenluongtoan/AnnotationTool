import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
	selector: 'app-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
	widthOld = 100; // %
	heightOld = 100;
	listImages = [];
	constructor() { }
	ngOnInit() {}
	DrawImage(width,height){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		setTimeout(function () {
			ctx.drawImage(img, 0, 0,img.width * width/100,img.height * height/100);
			ctx.strokeRect(0, 0,img.width * width/100,img.height * height/100);
		}, 100);
		this.widthOld = width;
		this.heightOld = height;
	}
	ShowImage(obj){
		console.log(obj)
		console.log(obj.fakePath)
		$("#imageCar").attr("src",obj.fakePath);
		this.DrawImage(this.widthOld,this.heightOld);
	}
	ShowListImage(){
		this.listImages= JSON.parse($("#fileUpload").val())
	}
}
