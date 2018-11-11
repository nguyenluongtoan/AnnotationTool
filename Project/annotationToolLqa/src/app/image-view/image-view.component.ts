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
	statusMoveImage = false;
	changeCanvas = true;
	public points: Array<Point> = [];
	public datas: Array<Array<Point>> = [];
	public pointsClone: Array<Point> = [];
	public datasClone: Array<Array<Point>> = [];
	firstPoint = new Point(0,0);
	firstPointMove = new Point(0,0);
	endPointMove = new Point(0,0);
	statusFirstPointMove = true;
	widthImageDraw = 0;
	heightImageDraw = 0;
	constructor() { }
	ngOnInit() {
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		this.widthImageDraw = img.width;
		this.heightImageDraw= img.height;
		this.DrawImage()
	}
	ReloadImage(){
		this.DrawImage();
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
	TranslatePoint(x,y){
		for(var j=0; j< this.points.length;j++){
			this.points[j].x += x;
			this.points[j].y += y;
		}
	}
	TranslateAllData(x,y){
		for(var i = 0;i < this.datas.length;i++){
			for(var j=0; j< this.datas[i].length;j++){
				this.datas[i][j].x += x;
				this.datas[i][j].y += y;
			}
		}	
	}
	ZoomPoint(points){
		for(var j=0; j< points.length;j++){
			points[j].x = (points[j].x - Draw.xStart) * (100 + this.draw.zoom)/100 + Draw.xStart;
			points[j].y = (points[j].y - Draw.yStart) * (100 + this.draw.zoom)/100 + Draw.yStart;
		}
	}
	ZoomAllData(){
		for(var i = 0;i < this.datas.length;i++){
			for(var j=0; j< this.datas[i].length;j++){
				this.datas[i][j].x = (this.datas[i][j].x - Draw.xStart) * (100 + this.draw.zoom)/100 + Draw.xStart;
				this.datas[i][j].y = (this.datas[i][j].y - Draw.yStart) * (100 + this.draw.zoom)/100 + Draw.yStart;
			}
		}	
		this.ZoomPoint(this.points);
	}
	SetUpFirstPointDraw(){
		if(this.points.length == 1) 
		{
			this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
		}
		else if(this.points.length > 1){ 
			this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
		}

	}
	SetUpEndPointDraw(){
		if(this.points.length == 1)
		{
			this.draw.pointMouseDown.SetPoint(this.points[0].x,this.points[0].y);
		}
		else if(this.points.length > 1){ 
			this.draw.pointMouseDown.SetPoint(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y);
		}

	}
	DrawRat(x,y,width,height){
		var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.strokeRect(x,y,width,height);
	}
	DrawImage(newImage = false){
		if(newImage)
		{
			Draw.xStart = 0;
			Draw.yStart = 0;
		}
		var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		ctx.fillText(Draw.xStart+":"+Draw.yStart,Draw.xStart,Draw.yStart);
		ctx.drawImage(img, Draw.xStart, Draw.yStart,this.widthImageDraw ,this.heightImageDraw);
		ctx.strokeRect(Draw.xStart, Draw.yStart,this.widthImageDraw,this.heightImageDraw);
	}
	MouseWheelUpFunc(event) {
		if(!event.shiftKey)
			return;
		this.draw.zoom = 1;
		this.widthImageDraw *= (100 + this.draw.zoom)/100 ;
		this.heightImageDraw *= (100 + this.draw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		this.ReloadShape(this.points,false)
	}
	MouseWheelDownFunc(event) {
		if(!event.shiftKey)
			return;
		this.draw.zoom = -1;
		this.widthImageDraw *= (100 + this.draw.zoom)/100 ;
		this.heightImageDraw *= (100 + this.draw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		this.ReloadShape(this.points,false)
	}
	MouseDownInCanvas(event){
		var x = event.clientX < 0? 0: event.clientX;
		var y = event.clientY < 0? 0: event.clientY;
		if(event.shiftKey)
		{
			if(this.statusFirstPointMove){
				this.statusFirstPointMove = false;
			}
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
				if(this.statusMoveImage)
					this.DrawLine(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y,x,y);	
				else
					this.DrawLine(this.draw.pointMouseDown.x,this.draw.pointMouseDown.y,x,y);
				this.points.push(point);
			}
		}
		this.draw.pointMouseDown.x = x;
		this.draw.pointMouseDown.y = y;
		this.changeCanvas = false;
	} 
	MouseDoubleClick(){
		var x = this.firstPoint.x;
		var y = this.firstPoint.y;
		this.DrawLine(this.draw.pointMouseDown.x,this.draw.pointMouseDown.y,x,y);
		this.draw.pointMouseDown.x = x;
		this.draw.pointMouseDown.y = y;
		this.statusDrawLine = 0;
		this.datas.push(this.points);
		this.points = []
		console.log(this.datas)
		this.changeCanvas = true;
		this.statusMoveImage = false;
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
			var translateX = xCurrent - this.draw.pointMouseDown.x;
			var translateY = yCurrent - this.draw.pointMouseDown.y
			Draw.xStart = translateX + Draw.xStart;
			Draw.yStart = translateY + Draw.yStart;
			this.TranslateAllData(translateX,translateY)
			this.LoadData()
			this.draw.pointMouseDown.SetPoint(xCurrent,yCurrent);
			this.TranslatePoint(translateX,translateY)
			this.ReloadShape(this.points,false);
			if(this.points.length == 0)
			{
				this.statusDrawLine = 0;
			}
			else 
			{
				this.statusMoveImage = true;
				this.statusDrawLine = 1;
			}
			if(this.points.length == 0)
				this.changeCanvas = true;
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
			this.SetUpFirstPointDraw();
			this.SetUpEndPointDraw();
			// cài đật trạng thái vẽ ( điểm kế tiếp là điểm đầu/ điểm cuối)
			if(this.datas.length == 0 && this.points.length == 0) // toàn bộ dữ liệu trống
				this.statusDrawLine = 0;
			else // dữ liệu không trống => tiếp tục vẽ
				this.statusDrawLine = 1;
		}
	}
}