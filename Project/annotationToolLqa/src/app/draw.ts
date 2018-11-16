
//resultDraw: 
// 0: Vẽ điểm tại chính vị trí x,y
// 1: vẽ điểm từ điểm cuối cùng trong danh sách đến điểm hiện tại
// 2. Vẽ điểm từ sự kiện trước đến điểm hiện tại
export class DrawPolygon{
	public ctx;
	public canvas;
	public firstPoint = new Point(0,0);
	public points: Array<Point> = [];
	public datas: Array<Array<Point>> = [];
	public ReloadShape(points,round = true){
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
		console.log(points)
	}
	public ReloadLineDraw(){
		for(var i = 0;i < this.datas.length;i++){
			var points = this.datas[i];
			this.ReloadShape(points);
		}	
	}
	public DrawRat(x,y,width,height){
		this.ctx.strokeRect(x,y,width,height);
	}
	public DrawLine(x,y,x2,y2){
		this.ctx.beginPath();
		this.ctx.fillStyle = "red"
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x2,y2);
		this.ctx.strokeStyle = '#ff0000';
		this.ctx.stroke();
		this.DrawRat(x-2,y-2,4,4);
		this.DrawRat(x2-2,y2-2,4,4);
	}
	public MouseDownInCanvas(x,y){
		if(ControlDraw.statusDrawLine == 0){
			this.firstPoint = new Point(x,y);
			this.points.push(this.firstPoint);
			ControlDraw.statusDrawLine = 1;
			this.DrawLine(x,y,x,y);
		}
		else{
			var point = new Point(x,y);
			if(ControlDraw.statusMoveImage)
				this.DrawLine(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y,x,y);	
			else
				this.DrawLine(ControlDraw.pointMouseDown.x,ControlDraw.pointMouseDown.y,x,y);
			this.points.push(point);
		}
	}
	public MouseDoubleClick(){
		var x = this.firstPoint.x;
		var y = this.firstPoint.y;
		this.DrawLine(ControlDraw.pointMouseDown.x,ControlDraw.pointMouseDown.y,x,y);
		ControlDraw.pointMouseDown.x = x;
		ControlDraw.pointMouseDown.y = y;
		ControlDraw.statusDrawLine = 0;
		this.datas.push(this.points);
		this.points = [];
		ControlDraw.changeCanvas = true;
		ControlDraw.statusMoveImage = false;
	}
	public TranslatePoint(x,y){
		for(var j=0; j< this.points.length;j++){
			this.points[j].x += x;
			this.points[j].y += y;
		}
	}
	public TranslateAllData(x,y){
		for(var i = 0;i < this.datas.length;i++){
			for(var j=0; j< this.datas[i].length;j++){
				this.datas[i][j].x += x;
				this.datas[i][j].y += y;
			}
		}	
	}
	public ZoomPoint(points){
		for(var j=0; j< points.length;j++){
			points[j].x = (points[j].x - Draw.xStart) * (100 + ControlDraw.zoom)/100 + Draw.xStart;
			points[j].y = (points[j].y - Draw.yStart) * (100 + ControlDraw.zoom)/100 + Draw.yStart;
		}
	}
	public ZoomAllData(){
		for(var i = 0;i < this.datas.length;i++){
			for(var j=0; j< this.datas[i].length;j++){
				this.datas[i][j].x = (this.datas[i][j].x - Draw.xStart) * (100 + ControlDraw.zoom)/100 + Draw.xStart;
				this.datas[i][j].y = (this.datas[i][j].y - Draw.yStart) * (100 + ControlDraw.zoom)/100 + Draw.yStart;
			}
		}	
		this.ZoomPoint(this.points);
	}
	public SetUpFirstPointDraw(){
		if(this.points.length == 1) 
		{
			this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
		}
		else if(this.points.length > 1){ 
			this.firstPoint.SetPoint(this.points[0].x,this.points[0].y);
		}
	}
	public SetUpEndPointDraw(){
		if(this.points.length == 1)
		{
			ControlDraw.pointMouseDown.SetPoint(this.points[0].x,this.points[0].y);
		}
		else if(this.points.length > 1){ 
			ControlDraw.pointMouseDown.SetPoint(this.points[this.points.length - 1].x,this.points[this.points.length - 1].y);
		}
	}
	public MouseMoveInCanvas(xCurrent,yCurrent){
		var translateX = xCurrent - ControlDraw.pointMouseDown.x;
		var translateY = yCurrent - ControlDraw.pointMouseDown.y
		Draw.xStart = translateX + Draw.xStart;
		Draw.yStart = translateY + Draw.yStart;
		this.TranslateAllData(translateX,translateY)
		ControlDraw.pointMouseDown.SetPoint(xCurrent,yCurrent);
		this.TranslatePoint(translateX,translateY)
		this.ReloadShape(false);
		if(this.points.length == 0)
		{
			ControlDraw.statusDrawLine = 0;
		}
		else 
		{
			ControlDraw.statusMoveImage = true;
			ControlDraw.statusDrawLine = 1;
		}
		if(this.points.length == 0)
			ControlDraw.changeCanvas = true;
	}
	public Keyup(){
		// Nếu khối không có điểm nào và trong danh sách các khối có dữ liệu 
		//=> lấy khối cuối cùng được thêm vào để thực hiên thao tác redo
		if(this.points.length == 0 && this.datas.length > 0){
			this.points = this.datas[this.datas.length - 1];
		}
		// Nếu có sự thay đổi theo chiều tiến của canvas 
		// => xóa khối cuối cùng được thêm và tiếp tục xử lý khối đó
		if(ControlDraw.changeCanvas && this.datas.length > 0){ //(*)
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
		// Trạng thái thay đổi canvas theo chiều ngược lại.
		ControlDraw.changeCanvas = false;
		// cài đật trạng thái vẽ ( điểm kế tiếp là điểm đầu/ điểm cuối)
		if(this.datas.length == 0 && this.points.length == 0) // toàn bộ dữ liệu trống
			ControlDraw.statusDrawLine = 0;
		else // dữ liệu không trống => tiếp tục vẽ
			ControlDraw.statusDrawLine = 1;
	}
}
export class DrawRact{
	public ctx;
	public canvas;
	public firstRact = new Ract(0,0,0,0);
	public datas: Array<Ract> = [];
}

export class Draw{
	public ctx;
	public canvas;
	public static xStart = 0;
	public static yStart = 0;
	public static widthImageDraw = 0;
	public static heightImageDraw = 0;
	public static typeDraw = 1;
}
export class Point{
	public x = 0;
	public y = 0;
	constructor(_x,_y) { 
		this.x = _x;
		this.y = _y;
	}
	public SetPoint(_x,_y){
		this.x = _x;
		this.y = _y;
	}
}

export class Ract{
	public pointStart: Point = new Point(0,0);
	public pointEnd: Point = new Point(0,0);
	constructor(x,y,x2,y2){
		this.pointStart = new Point(x,y);
		this.pointEnd = new Point(x2,y2);
	}
}

export class ControlDraw{
	public static zoom = 100; //
	public static draw: Draw = new Draw();
	public static acceptMoveImage = false;
	public static statusDrawLine = 0;
	public static statusMoveImage = false;
	public static changeCanvas = true;
	public static pointMouseDown: Point = new Point(0,0);
	public static pointMouseUp: Point = new Point(0,0);
	public static RefreshControl(){
		this.draw = new Draw();
		this.acceptMoveImage = false;
		this.statusDrawLine = 0;
		this.statusMoveImage = false;
		this.changeCanvas = true;
	}
}
