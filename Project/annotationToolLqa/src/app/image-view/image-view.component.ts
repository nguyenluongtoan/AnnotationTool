import { Component, OnInit} from '@angular/core';
import {Draw} from '../draw'

@Component({
	selector: 'app-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
	public draw: Draw = new Draw();
	acceptMoveImage = false;
	constructor() { }
	ngOnInit() {
		this.DrawImage(this.draw.zoom,this.draw.zoom)
	}
	DrawImage(width,height,newImage = false){
		if(newImage)
		{
			Draw.countMouseWhell = 0;
			Draw.xStart = 0;
			Draw.yStart = 0;
		}
		var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		var drawClone = this.draw;
		var widthImageDraw = img.width * width/100;
		var heightImageDraw= img.height * height/100;
		setTimeout(function () {
			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
			ctx.drawImage(img, Draw.xStart, Draw.yStart,widthImageDraw ,heightImageDraw);
			ctx.strokeRect(Draw.xStart, Draw.yStart,widthImageDraw,heightImageDraw);
		}, 1);
	}
	MouseWheelUpFunc() {
		Draw.countMouseWhell+=3;
		var newSize = (this.draw.zoom + Draw.countMouseWhell);
		if(newSize > 500){
			Draw.countMouseWhell = 400;
			newSize = 500;
		}
		else
			this.DrawImage(newSize,newSize);
	}

	MouseWheelDownFunc() {
		Draw.countMouseWhell-=3;
		var newSize = (this.draw.zoom + Draw.countMouseWhell);
		if(newSize < 10){
			Draw.countMouseWhell = -90;
			newSize = 10;
		}
		else
			this.DrawImage(newSize,newSize);
	}

	MouseDownInCanvas(event){
		this.draw.pointMouseDown.x = event.offsetX < 0? 0: event.offsetX ;
		this.draw.pointMouseDown.y = event.offsetY < 0? 0: event.offsetY;
		this.acceptMoveImage = true;
	} 
	MouseUpInCanvas(event){
		this.acceptMoveImage = false;
		this.draw.pointMouseUp.x = event.offsetX < 0? 0: event.offsetX ;
		this.draw.pointMouseUp.y = event.offsetY < 0? 0: event.offsetY;
	} 
	MouseMoveInCanvas(event){
		var xCurrent = event.offsetX < 0? 0: event.offsetX ;
		var yCurrent = event.offsetY < 0? 0: event.offsetY;
		if(this.acceptMoveImage){
			console.log(xCurrent + " : " + yCurrent)
			Draw.xStart = xCurrent - this.draw.pointMouseDown.x + Draw.xStart;
			Draw.yStart = yCurrent - this.draw.pointMouseDown.y + Draw.yStart;
			var newSize = (this.draw.zoom + Draw.countMouseWhell);
			this.DrawImage(newSize,newSize)
			this.draw.pointMouseDown.SetPoint(xCurrent,yCurrent);
		}
	} 
}