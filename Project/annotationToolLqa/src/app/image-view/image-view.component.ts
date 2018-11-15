import { Component, OnInit} from '@angular/core';
import {Draw} from '../draw'
import {Point} from '../draw'
import {ControlDraw} from '../draw'

@Component({
	selector: 'app-image-view',
	templateUrl: './image-view.component.html',
	styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
	canvas;
	ctx;
	Draw : Draw = new Draw();
	constructor() { }
	ngOnInit() {
		this.canvas= <HTMLCanvasElement>document.getElementById("myCanvas");
		this.ctx=this.canvas.getContext("2d");
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		Draw.widthImageDraw = img.width;
		Draw.heightImageDraw= img.height;
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
	LoadData(){
		this.DrawImage();
		this.Draw.ReloadLineDraw(this.ctx)
	}
	TranslatePoint(x,y){
		for(var j=0; j< ControlDraw.points.length;j++){
			ControlDraw.points[j].x += x;
			ControlDraw.points[j].y += y;
		}
	}
	TranslateAllData(x,y){
		for(var i = 0;i < ControlDraw.datas.length;i++){
			for(var j=0; j< ControlDraw.datas[i].length;j++){
				ControlDraw.datas[i][j].x += x;
				ControlDraw.datas[i][j].y += y;
			}
		}	
	}
	ZoomPoint(points){
		for(var j=0; j< points.length;j++){
			points[j].x = (points[j].x - Draw.xStart) * (100 + ControlDraw.draw.zoom)/100 + Draw.xStart;
			points[j].y = (points[j].y - Draw.yStart) * (100 + ControlDraw.draw.zoom)/100 + Draw.yStart;
		}
		this.SetUpEndPointDraw();
	}
	ZoomAllData(){
		for(var i = 0;i < ControlDraw.datas.length;i++){
			for(var j=0; j< ControlDraw.datas[i].length;j++){
				ControlDraw.datas[i][j].x = (ControlDraw.datas[i][j].x - Draw.xStart) * (100 + ControlDraw.draw.zoom)/100 + Draw.xStart;
				ControlDraw.datas[i][j].y = (ControlDraw.datas[i][j].y - Draw.yStart) * (100 + ControlDraw.draw.zoom)/100 + Draw.yStart;
			}
		}	
		this.ZoomPoint(ControlDraw.points);
	}
	SetUpFirstPointDraw(){
		if(ControlDraw.points.length == 1) 
		{
			ControlDraw.firstPoint.SetPoint(ControlDraw.points[0].x,ControlDraw.points[0].y);
		}
		else if(ControlDraw.points.length > 1){ 
			ControlDraw.firstPoint.SetPoint(ControlDraw.points[0].x,ControlDraw.points[0].y);
		}

	}
	SetUpEndPointDraw(){
		if(ControlDraw.points.length == 1)
		{
			ControlDraw.draw.pointMouseDown.SetPoint(ControlDraw.points[0].x,ControlDraw.points[0].y);
		}
		else if(ControlDraw.points.length > 1){ 
			ControlDraw.draw.pointMouseDown.SetPoint(ControlDraw.points[ControlDraw.points.length - 1].x,ControlDraw.points[ControlDraw.points.length - 1].y);
		}

	}
	MouseWheelUpFunc(event) {
		if(!event.shiftKey)
			return;
		ControlDraw.draw.zoom = 1;
		Draw.widthImageDraw *= (100 + ControlDraw.draw.zoom)/100 ;
		Draw.heightImageDraw *= (100 + ControlDraw.draw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		this.Draw.ReloadShape(this.ctx,ControlDraw.points,false)
	}
	MouseWheelDownFunc(event) {
		if(!event.shiftKey)
			return;
		ControlDraw.draw.zoom = -1;
		Draw.widthImageDraw *= (100 + ControlDraw.draw.zoom)/100 ;
		Draw.heightImageDraw *= (100 + ControlDraw.draw.zoom)/100 ;
		this.ZoomAllData();
		this.LoadData();
		this.Draw.ReloadShape(this.ctx,ControlDraw.points,false)
	}
	MouseDownInCanvas(event){
		var x = event.clientX < 0? 0: event.clientX;
		var y = event.clientY < 0? 0: event.clientY;
		if(event.shiftKey)
		{
			ControlDraw.acceptMoveImage = true;
		}
		else{
			this.Draw.MouseDownInCanvas(x,y);
		}
		this.Draw.ReloadShape(this.ctx,ControlDraw.points,false);

		ControlDraw.draw.pointMouseDown.x = x;
		ControlDraw.draw.pointMouseDown.y = y;
		ControlDraw.changeCanvas = false;
	} 
	MouseDoubleClick(){
		this.Draw.MouseDoubleClick(this.ctx);
	}
	MouseUpInCanvas(event){
		ControlDraw.acceptMoveImage = false;
		ControlDraw.draw.pointMouseUp.x = event.clientX < 0? 0: event.clientX ;
		ControlDraw.draw.pointMouseUp.y = event.clientY < 0? 0: event.clientY;
	} 
	MouseMoveInCanvas(event){
		var xCurrent = event.clientX < 0? 0: event.clientX ;
		var yCurrent = event.clientY < 0? 0: event.clientY;
		if(ControlDraw.acceptMoveImage){
			var translateX = xCurrent - ControlDraw.draw.pointMouseDown.x;
			var translateY = yCurrent - ControlDraw.draw.pointMouseDown.y
			Draw.xStart = translateX + Draw.xStart;
			Draw.yStart = translateY + Draw.yStart;
			this.TranslateAllData(translateX,translateY)
			this.LoadData()
			ControlDraw.draw.pointMouseDown.SetPoint(xCurrent,yCurrent);
			this.TranslatePoint(translateX,translateY)
			this.Draw.ReloadShape(this.ctx,ControlDraw.points,false);
			if(ControlDraw.points.length == 0)
			{
				ControlDraw.statusDrawLine = 0;
			}
			else 
			{
				ControlDraw.statusMoveImage = true;
				ControlDraw.statusDrawLine = 1;
			}
			if(ControlDraw.points.length == 0)
				ControlDraw.changeCanvas = true;
		}
	} 
	Keyup(event){
		// kiểm tra thao tác redo ctrl + z
		if(event.ctrlKey && event.keyCode == 90){
			// Nếu khối không có điểm nào và trong danh sách các khối có dữ liệu 
			//=> lấy khối cuối cùng được thêm vào để thực hiên thao tác redo
			if(ControlDraw.points.length == 0 && ControlDraw.datas.length > 0){
				ControlDraw.points = ControlDraw.datas[ControlDraw.datas.length - 1];
			}
			// Nếu có sự thay đổi theo chiều tiến của canvas 
			// => xóa khối cuối cùng được thêm và tiếp tục xử lý khối đó
			if(ControlDraw.changeCanvas && ControlDraw.datas.length > 0){ //(*)
				ControlDraw.datas.splice(ControlDraw.datas.length - 1,1);
			}
			// Nếu khối có các điểm thì xóa điểm cuối cùng được thêm ( đường thằng)
			if(ControlDraw.points.length > 0)
				ControlDraw.points.splice(ControlDraw.points.length -1,1)
			// Nếu redo vào trường hợp không còn điểm và trong danh sách khối có dữ liệu thì cập nhật lại khối cuỗi cùng
			// trong danh sách và loại bỏ khối cuối trong danh sách ( tương tự (*) )
			if(ControlDraw.points.length == 0 && ControlDraw.datas.length > 0){
				ControlDraw.points = ControlDraw.datas[ControlDraw.datas.length - 1];
				ControlDraw.datas.splice(ControlDraw.datas.length - 1,1);
			}
			// tải lại dữ liệu cũ ( đã loại bỏ khối cuối cùng được thêm)
			this.LoadData();
			// tải lại dữ liệu khối cuối cùng để tiếp tục thực hiện
			this.Draw.ReloadShape(this.ctx,ControlDraw.points,false)
			// Trạng thái thay đổi canvas theo chiều ngược lại.
			ControlDraw.changeCanvas = false;
			// cài đặt quá trình vẽ mới với khối đã được redo
			// cập  nhật lại điểm đầu của khối và điểm gần nhất được cập nhật của khối
			this.SetUpFirstPointDraw();
			this.SetUpEndPointDraw();
			// cài đật trạng thái vẽ ( điểm kế tiếp là điểm đầu/ điểm cuối)
			if(ControlDraw.datas.length == 0 && ControlDraw.points.length == 0) // toàn bộ dữ liệu trống
				ControlDraw.statusDrawLine = 0;
			else // dữ liệu không trống => tiếp tục vẽ
				ControlDraw.statusDrawLine = 1;
		}
	}
}