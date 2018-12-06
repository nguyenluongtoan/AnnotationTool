import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Draw} from '../class/draw';
import {ControlDraw} from '../class/draw';
import {DrawPolygon} from '../class/draw';
import {DrawRact} from '../class/draw';
import {DrawPolyLine} from '../class/draw';
import {SystemConfig} from '../class/config';
import {PropertyForImage} from '../class/draw';
declare var saveAs: any;
@Component({
  selector: 'app-annotator',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit { 
	public drawPolygon: DrawPolygon = new DrawPolygon();
	public drawRact: DrawRact  = new DrawRact();
	public drawPolyLine: DrawPolyLine  = new DrawPolyLine();
	public canvas;
	public ctx;
	public doneOneShape = false;
	public shapeChooseLastest = null;
	public listImagesBase = [];
	public listImages = [];
	public configData;
	public properties;
	public keyFilter: string = '';
	public imageChooseDraw;
	constructor() { 
		this.loadConfig();
	}
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
	loadConfig(){
		this.configData = {}
		this.properties = PropertyForImage.properties
	}
	ShowImage(obj){
		this.imageChooseDraw = obj
		ControlDraw.RefreshControl();
		$("#imageCar").attr("src",obj.fakePath);
		Draw.xStart = 0;
		Draw.yStart = 0;
		var img = new Image();
		img.src = $("#imageCar").attr("src");
		Draw.widthImageDraw = img.width;
		Draw.heightImageDraw= img.height;
		this.DrawImage(true);
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
	ChooseShapeDraw(index){
		console.log(index)
	}
	SaveProperty(){
		var json1 =JSON.stringify( this.GetJsonData());
		console.log(json1)
		var filename = this.imageChooseDraw.webkitRelativePath.split('/')[1].split('.')[0]
		var blob = new Blob([json1], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename+".txt");
	}
	GetJsonData(){
		var data = [];
		if(this.drawPolygon.datas != null && this.drawPolygon.datas.length > 0){
			data.push({
				type: 'drawPolygon',
				data: this.drawPolygon.datas
			})
		}
		if(this.drawRact.datas != null && this.drawRact.datas.length > 0){
			data.push({
				type: 'drawRact',
				data: this.drawRact.datas
			})
		}
		if(this.drawPolyLine.datas != null && this.drawPolyLine.datas.length > 0){
			data.push({
				type: 'drawPolyLine',
				data: this.drawPolyLine.datas
			})
		}
		return data;
	}

	//----------------------------
	
	DrawImage(newImage = false){
		console.log(' Draw Image');
		if(newImage) // nếu ảnh mới thì xác tịnh tọa độ vẽ về điểm gốc
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
		console.log('MouseWheelUpFunc');
		// nếu giữ phìm shiftKey thì mới tiếp tục vẽ
		if(!event.shiftKey)
			return;
		ControlDraw.zoom = 1; // gán nhãn phóng to
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
		ControlDraw.zoom = -1; // gán nhãn phóng nhỏ
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
		this.doneOneShape = false;
		var x = event.layerX < 0? 0: event.layerX;
		var y = event.layerY < 0? 0: event.layerY;
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
				this.doneOneShape = this.drawRact.MouseDownInCanvas(x,y);
				this.StartInputProperty();
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
			this.doneOneShape = true;
			break;
			case 3:
			this.drawPolyLine.MouseDoubleClick();
			this.doneOneShape = true;
			break;
		}
		this.StartInputProperty();
	}
	MouseUpInCanvas(event){
		ControlDraw.acceptMoveImage = false;
		ControlDraw.pointMouseUp.x = event.layerX < 0? 0: event.layerX ;
		ControlDraw.pointMouseUp.y = event.layerY < 0? 0: event.layerY;
	} 
	MouseMoveInCanvas(event){
		var xCurrent = event.layerX < 0? 0: event.layerX ;
		var yCurrent = event.layerY < 0? 0: event.layerY;
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
			console.log('if(event.ctrlKey && event.keyCode == 90){');
			var inCaseRemoveObject=0;
			switch(Draw.typeDraw){
				case 1:
				inCaseRemoveObject = this.drawPolygon.Keyup();
				this.LoadData();
				this.drawPolygon.ReloadShape(this.drawPolygon.points,false);
				break;
			}
			// cài đặt quá trình vẽ mới với khối đã được redo
			// cập  nhật lại điểm đầu của khối và điểm gần nhất được cập nhật của khối
			this.SetUpFirstPointDraw();
			this.SetUpEndPointDraw();
			if(inCaseRemoveObject==1){
				this.properties.splice(this.properties.length - 1,1);
			}
			
		}
	}
	StartInputProperty(){
		console.log('StartInputProperty(){');
		if(this.doneOneShape){
			this.configData = JSON.parse(JSON.stringify(SystemConfig.data[0]));
			switch(Draw.typeDraw){
				case 1:
				this.shapeChooseLastest = this.drawPolygon.datas[this.drawPolygon.datas.length - 1];
				break;
				case 2:
				this.shapeChooseLastest = this.drawRact.datas[this.drawRact.datas.length - 1];
				break;
				case 3:
				this.shapeChooseLastest = this.drawPolyLine.datas[this.drawPolyLine.datas.length - 1];
				break;
			}
			this.shapeChooseLastest = JSON.parse(JSON.stringify(this.shapeChooseLastest));
			this.properties.push({
				data: this.configData,
				type: Draw.typeDraw,
				shape: this.shapeChooseLastest
			});
			this.MarkShape()
		}
	}
	MarkShape(){
		if(this.shapeChooseLastest == null)
			return;
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.MarkShape(this.shapeChooseLastest)
			break;
			case 2:
			this.drawRact.ctx.strokeStyle = '#daca0e';
			//this.drawRact.MarkShape(shape)
			this.drawRact.ctx.strokeStyle = '#ff0000';
			break;
			case 3:
			this.drawPolyLine.ctx.strokeStyle = '#daca0e';
			//this.drawPolyLine.MarkShape(shape)
			this.drawPolyLine.ctx.strokeStyle = '#ff0000';
			break;
		}
	}
	///
	KeyPress(event){
		if(this.doneOneShape){
			var keyDown = event.key;
			var indexProperty = this.configData.properties.findIndex(x=>x.key == keyDown)
			if(indexProperty < 0)
				return;
			var property = this.configData.properties[indexProperty];
			if(!property.option)
				return;
			var currentIndexValue = property.values.findIndex(x=>x == property.value);
			var newIndexValue = currentIndexValue + 1;
			if(newIndexValue >= property.values.length)
				newIndexValue = 0;
			property.value = property.values[newIndexValue];
		}
	}

}
