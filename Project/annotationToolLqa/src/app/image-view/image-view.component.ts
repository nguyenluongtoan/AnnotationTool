import { Component, OnInit} from '@angular/core';
import {Draw} from '../class/draw'
import {Point} from '../class/draw'
import {ControlDraw} from '../class/draw'
import {DrawPolygon} from '../class/draw'
import {DrawRact} from '../class/draw'
import {DrawPolyLine} from '../class/draw'
@Component({
	selector: 'app-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
	public drawPolygon: DrawPolygon = new DrawPolygon();
	public drawRact: DrawRact  = new DrawRact();
	public drawPolyLine: DrawPolyLine  = new DrawPolyLine();
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
		this.drawPolyLine.ctx = this.ctx;
		this.drawPolyLine.canvas = this.canvas;
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
		this.drawPolyLine.ReloadLineDraw();
	}
	LoadData(){
		this.DrawImage();
		this.DrawShape();
	}
	ZoomAllData(){
		this.drawPolygon.ZoomAllData();
		this.drawRact.ZoomAllData();
		this.drawPolyLine.ZoomAllData();
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
			case 3:
			this.drawPolyLine.ReloadShape(this.drawPolygon.points);
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
			case 3:
			this.drawPolyLine.ReloadShape(this.drawPolygon.points);
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
				case 3:
				this.drawPolyLine.MouseDownInCanvas(x,y);
				break;
			}
		}

		ControlDraw.pointMouseDown.x = x;
		ControlDraw.pointMouseDown.y = y;
		ControlDraw.changeCanvas = false;
	} 
	MouseDoubleClick(){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.MouseDoubleClick();
			break;
			case 3:
			this.drawPolyLine.MouseDoubleClick();
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
			var translateX = xCurrent - ControlDraw.pointMouseDown.x;
			var translateY = yCurrent - ControlDraw.pointMouseDown.y;
			Draw.xStart = translateX + Draw.xStart;
			Draw.yStart = translateY + Draw.yStart;
			this.drawPolygon.MouseMoveInCanvas(translateX,translateY);
			this.drawRact.MouseMoveInCanvas(translateX,translateY);
			this.drawPolyLine.MouseMoveInCanvas(translateX,translateY);
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