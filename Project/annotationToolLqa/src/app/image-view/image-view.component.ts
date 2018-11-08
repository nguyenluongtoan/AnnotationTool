import { Component, OnInit} from '@angular/core';
import {Draw} from '../draw'
import {Point} from '../draw'

@Component({
	selector: 'app-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
	public draw: Draw = new Draw();
	acceptMoveImage = false;
	statusDrawLine = 0;
	changeCanvas = true;
	public points: Array<Point> = [];
	public datas: Array<Array<Point>> = [];
	firstPoint = new Point(0,0);
	constructor() { }
	ngOnInit() {
		this.DrawImage(this.draw.zoom,this.draw.zoom)
	}
	ReloadImage(){
		var newSize = (this.draw.zoom + Draw.countMouseWhell);
		this.DrawImage(newSize,newSize);
	}
	ReloadShape(points,round = true){
		if(points.length == 1){
			this.DrawLine(points[0].x,points[0].y,points[0].x,points[0].y);
		}
		else if(points.length > 1){
			for(var j=0;j< points.length - 1;j++){
				this.DrawLine(points[j].x,points[j].y,points[j+1].x,points[j+1].y);
			}
			if(round)
				this.DrawLine(points[points.length - 1].x,points[points.length - 1].y,points[0].x,points[0].y);
		}
	}
	ReloadLineDraw(datas){
		for(var i = 0;i < datas.length;i++){
			var points = datas[i];
			this.ReloadShape(points);
		}	
	}
	LoadData(){
		this.ReloadImage();
		this.ReloadLineDraw(this.datas);
	}
	DrawLine(x,y,x2,y2){
		var c= <HTMLCanvasElement>document.getElementById("myCanvas");
		var ctx=c.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = "red"
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
		this.DrawRat(x-2,y-2,4,4);
		this.DrawRat(x2-2,y2-2,4,4);
	}
	DrawRat(x,y,width,height){
		var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.strokeRect(x,y,width,height);
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
		var widthImageDraw = img.width * width/100;
		var heightImageDraw= img.height * height/100;
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		ctx.fillText(Draw.xStart+":"+Draw.yStart,Draw.xStart,Draw.yStart);
		ctx.drawImage(img, Draw.xStart, Draw.yStart,widthImageDraw ,heightImageDraw);
		ctx.strokeRect(Draw.xStart, Draw.yStart,widthImageDraw,heightImageDraw);
		/*setTimeout(function () {
			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
			ctx.fillText(Draw.xStart+":"+Draw.yStart,Draw.xStart,Draw.yStart);
			ctx.drawImage(img, Draw.xStart, Draw.yStart,widthImageDraw ,heightImageDraw);
			ctx.strokeRect(Draw.xStart, Draw.yStart,widthImageDraw,heightImageDraw);
		}, 1);*/
	}
	MouseWheelUpFunc(event) {
		if(!event.shiftKey)
			return;
		Draw.countMouseWhell+=3;
		var newSize = (this.draw.zoom + Draw.countMouseWhell);
		if(newSize > 500){
			Draw.countMouseWhell = 400;
			newSize = 500;
		}
		else
			this.LoadData()
	}
	MouseWheelDownFunc(event) {
		if(!event.shiftKey)
			return;
		Draw.countMouseWhell-=3;
		var newSize = (this.draw.zoom + Draw.countMouseWhell);
		if(newSize < 10){
			Draw.countMouseWhell = -90;
			newSize = 10;
		}
		else
			this.LoadData()
	}
	MouseDownInCanvas(event){
		var x = event.clientX < 0? 0: event.clientX;
		var y = event.clientY < 0? 0: event.clientY;
		if(event.shiftKey)
		{
			this.acceptMoveImage = true;
		}
		else{
			if(this.statusDrawLine == 0){
				this.points = []
				this.firstPoint = new Point(x,y);
				this.points.push(this.firstPoint);
				this.statusDrawLine = 1;
				this.DrawLine(x,y,x,y);
			}
			else if(this.statusDrawLine == 1){
				var point = new Point(x,y);
				this.points.push(point);
				this.DrawLine(this.draw.pointMouseDown.x,this.draw.pointMouseDown.y,x,y);	
			}
		}
		this.draw.pointMouseDown.x = x;
		this.draw.pointMouseDown.y = y;
	} 
	MouseDoubleClick(){
		var x = this.firstPoint.x;
		var y = this.firstPoint.y;
		this.DrawLine(this.draw.pointMouseDown.x,this.draw.pointMouseDown.y,x,y);
		this.draw.pointMouseDown.x = x;
		this.draw.pointMouseDown.y = y;
		this.statusDrawLine = 0;
		this.datas.push(this.points);
		console.log(this.datas)
		this.changeCanvas = true;
	}
	MouseUpInCanvas(event){
		this.acceptMoveImage = false;
		this.draw.pointMouseUp.x = event.clientX < 0? 0: event.clientX ;
		this.draw.pointMouseUp.y = event.clientY < 0? 0: event.clientY;
	} 
	MouseMoveInCanvas(event){
		var xCurrent = event.clientX < 0? 0: event.clientX ;
		var yCurrent = event.clientY < 0? 0: event.clientY;
		if(this.acceptMoveImage){
			Draw.xStart = xCurrent - this.draw.pointMouseDown.x + Draw.xStart;
			Draw.yStart = yCurrent - this.draw.pointMouseDown.y + Draw.yStart;
			this.LoadData()
			this.draw.pointMouseDown.SetPoint(xCurrent,yCurrent);
			this.statusDrawLine = 0;
		}
	} 
	Keyup(event){
		if(event.ctrlKey && event.keyCode == 90){
			if(this.points.length == 0 && this.datas.length > 0){
				this.points = this.datas[this.datas.length - 1];
			}
			if(this.points.length > 0)
				this.points.splice(this.points.length -1,1)

			if(this.changeCanvas && this.points.length >= 0){
				this.datas.splice(this.datas.length - 1,1);
			}
			/*else{
				this.datas[this.datas.length - 1] = this.points;
			}*/
			this.LoadData();
			this.ReloadShape(this.points,false)
			this.changeCanvas = false;
			if(this.points.length == 1)
				this.draw.pointMouseDown.SetPoint(this.points[0].x,this.points[0].y);
			else if(this.points.length > 1){
				this.draw.pointMouseDown.SetPoint(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y);
			}
			this.statusDrawLine = 1;
		}
	}
}