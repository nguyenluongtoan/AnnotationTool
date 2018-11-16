import { Component, OnInit} from '@angular/core';
import {Draw} from '../draw'
import {Point} from '../draw'
import {ControlDraw} from '../draw'
import {DrawPolygon} from '../draw'
import {DrawRact} from '../draw'

@Component({
	selector: 'app-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
	public drawPolygon: DrawPolygon = new DrawPolygon();
	public drawRact: DrawRact  = new DrawRact();
	canvas;
	ctx;
	constructor() { }
	ngOnInit() {
		this.canvas= <HTMLCanvasElement>document.getElementById("myCanvas");
		this.ctx=this.canvas.getContext("2d");
		this.ctx.strokeStyle = '#ff0000';
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		Draw.widthImageDraw = img.width;
		Draw.heightImageDraw= img.height;
		this.drawPolygon.ctx = this.ctx;
		this.drawPolygon.canvas = this.canvas;
		this.drawRact.ctx = this.ctx;
		this.drawRact.canvas = this.canvas;
		this.DrawImage()
	}
	DrawImage(newImage = false){
		if(newImage)
		{
			Draw.xStart = 0;
			Draw.yStart = 0;
		}
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		this.ctx.save();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
		this.ctx.fillText(Draw.xStart+":"+Draw.yStart,Draw.xStart,Draw.yStart);
		this.ctx.drawImage(img, Draw.xStart, Draw.yStart,Draw.widthImageDraw ,Draw.heightImageDraw);
		this.ctx.strokeRect(Draw.xStart, Draw.yStart,Draw.widthImageDraw,Draw.heightImageDraw);
	}
	DrawShape(){
		this.drawPolygon.ReloadLineDraw();
		this.drawRact.ReloadAllData();
	}
	LoadData(){
		this.DrawImage();
		this.DrawShape();
	}
	TranslateAllData(x,y){
		this.drawPolygon.TranslateAllData(x,y);
	}
	ZoomPoint(points){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.ZoomPoint(points);
			break;
		}
		this.SetUpEndPointDraw();
	}
	ZoomAllData(){
		this.drawPolygon.ZoomAllData();
		this.drawRact.ZoomAllData();
	}
	SetUpFirstPointDraw(){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.SetUpFirstPointDraw();
			break;
		}
	}
	SetUpEndPointDraw(){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.SetUpEndPointDraw();
			break;
		}
	}
	MouseWheelUpFunc(event) {
		if(!event.shiftKey)
			return;
		ControlDraw.zoom = 1;
		Draw.widthImageDraw *= (100 + ControlDraw.zoom)/100 ;
		Draw.heightImageDraw *= (100 + ControlDraw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.ReloadShape(this.drawPolygon.points,false);
			this.SetUpEndPointDraw();
			break;
		}
	}
	MouseWheelDownFunc(event) {
		if(!event.shiftKey)
			return;
		ControlDraw.zoom = -1;
		Draw.widthImageDraw *= (100 + ControlDraw.zoom)/100 ;
		Draw.heightImageDraw *= (100 + ControlDraw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.ReloadShape(this.drawPolygon.points,false);
			this.SetUpEndPointDraw();
			break;
		}
	}
	MouseDownInCanvas(event){
		var x = event.clientX < 0? 0: event.clientX;
		var y = event.clientY < 0? 0: event.clientY;
		if(event.shiftKey)
		{
			ControlDraw.acceptMoveImage = true;
		}
		else{
			switch(Draw.typeDraw){
				case 1:
				this.drawPolygon.MouseDownInCanvas(x,y);
				break;
				case 2:
				this.drawRact.MouseDownInCanvas(x,y);
				break;
			}
		}

		ControlDraw.pointMouseDown.x = x;
		ControlDraw.pointMouseDown.y = y;
		ControlDraw.changeCanvas = false;
		console.log(ControlDraw.pointMouseDown)
	} 
	MouseDoubleClick(){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.MouseDoubleClick();
			break;
		}
	}
	MouseUpInCanvas(event){
		ControlDraw.acceptMoveImage = false;
		ControlDraw.pointMouseUp.x = event.clientX < 0? 0: event.clientX ;
		ControlDraw.pointMouseUp.y = event.clientY < 0? 0: event.clientY;
	} 
	MouseMoveInCanvas(event){
		var xCurrent = event.clientX < 0? 0: event.clientX ;
		var yCurrent = event.clientY < 0? 0: event.clientY;
		if(ControlDraw.acceptMoveImage){
			console.log(ControlDraw.pointMouseDown);
			var translateX = xCurrent - ControlDraw.pointMouseDown.x;
			var translateY = yCurrent - ControlDraw.pointMouseDown.y;
			Draw.xStart = translateX + Draw.xStart;
			Draw.yStart = translateY + Draw.yStart;
			this.drawPolygon.MouseMoveInCanvas(translateX,translateY);
			this.drawRact.MouseMoveInCanvas(translateX,translateY);
			ControlDraw.pointMouseDown.SetPoint(xCurrent,yCurrent);
			this.LoadData();
			this.drawPolygon.ReloadShape(this.drawPolygon.points,false);
		}
	} 
	Keyup(event){
		// kiểm tra thao tác redo ctrl + z
		if(event.ctrlKey && event.keyCode == 90){
			switch(Draw.typeDraw){
				case 1:
				this.drawPolygon.Keyup();
				this.LoadData();
				this.drawPolygon.ReloadShape(this.drawPolygon.points,false);
				break;
			}
			// cài đặt quá trình vẽ mới với khối đã được redo
			// cập  nhật lại điểm đầu của khối và điểm gần nhất được cập nhật của khối
			this.SetUpFirstPointDraw();
			this.SetUpEndPointDraw();
		}
	}
}