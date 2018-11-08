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
		// kiểm tra thao tác redo ctrl + z
		if(event.ctrlKey && event.keyCode == 90){
			// Nếu khối không có điểm nào và trong danh sách các khối có dữ liệu 
			//=> lấy khối cuối cùng được thêm vào để thực hiên thao tác redo
			if(this.points.length == 0 && this.datas.length > 0){
				this.points = this.datas[this.datas.length - 1];
			}
			// Nếu có sự thay đổi theo chiều tiến của canvas 
			// => xóa khối cuối cùng được thêm và tiếp tục xử lý khối đó
			if(this.changeCanvas && this.datas.length > 0){ //(*)
				this.datas.splice(this.datas.length - 1,1);
			}
			// Nếu khối có các điểm thì xóa điểm cuối cùng được thêm ( đường thằng)
			if(this.points.length > 0)
				this.points.splice(this.points.length -1,1)
			// Nếu redo vào trường hợp không còn điểm và trong danh sách khối có dữ liệu thì cập nhật lại khối cuỗi cùng
			// trong danh sách và loại bỏ khối cuối trong danh sách ( tương tự (*) )
			if(this.points.length == 0 && this.datas.length > 0){
				this.points = this.datas[this.datas.length - 1];
				this.datas.splice(this.datas.length - 1,1);
			}
			// tải lại dữ liệu cũ ( đã loại bỏ khối cuối cùng được thêm)
			this.LoadData();
			// tải lại dữ liệu khối cuối cùng để tiếp tục thực hiện
			this.ReloadShape(this.points,false)
			// Trạng thái thay đổi canvas theo chiều ngược lại.
			this.changeCanvas = false;
			// cài đặt quá trình vẽ mới với khối đã được redo
			// cập  nhật lại điểm đầu của khối và điểm gần nhất được cập nhật của khối
			if(this.points.length == 1) // khối có 1 điểm => điểm đầu = điểm cuối
			{
				this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
				this.draw.pointMouseDown.SetPoint(this.points[0].x,this.points[0].y);
			}
			else if(this.points.length > 1){ // khối có nhiều điểm => điểm đầu = đầu ds, điểm cuối = cuối ds
				this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
				this.draw.pointMouseDown.SetPoint(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y);
			}
			// cài đật trạng thái vẽ ( điểm kế tiếp là điểm đầu/ điểm cuối)
			if(this.datas.length == 0 && this.points.length == 0) // toàn bộ dữ liệu trống
				this.statusDrawLine = 0;
			else // dữ liệu không trống => tiếp tục vẽ
				this.statusDrawLine = 1;

		}
	}
}