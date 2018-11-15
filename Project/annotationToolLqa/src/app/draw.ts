
//resultDraw: 
// 0: Vẽ điểm tại chính vị trí x,y
// 1: vẽ điểm từ điểm cuối cùng trong danh sách đến điểm hiện tại
// 2. Vẽ điểm từ sự kiện trước đến điểm hiện tại
export class DrawPolygon{
	public ReloadShape(ctx,points,round = true){
		if(points.length == 1){
			this.DrawLine(ctx,points[0].x,points[0].y,points[0].x,points[0].y);
		}
		else if(points.length > 1){
			for(var j=0;j< points.length - 1;j++){
				this.DrawLine(ctx,points[j].x,points[j].y,points[j+1].x,points[j+1].y);
			}
			if(round)
				this.DrawLine(ctx,points[points.length - 1].x,points[points.length - 1].y,points[0].x,points[0].y);
		}
	}
	public ReloadLineDraw(ctx,datas){
		for(var i = 0;i < datas.length;i++){
			var points = datas[i];
			this.ReloadShape(ctx,points);
		}	
	}
	public DrawRat(ctx,x,y,width,height){
		ctx.strokeRect(x,y,width,height);
	}
	public DrawLine(ctx,x,y,x2,y2){
		ctx.beginPath();
		ctx.fillStyle = "red"
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
		this.DrawRat(ctx,x-2,y-2,4,4);
		this.DrawRat(ctx,x2-2,y2-2,4,4);
	}
	public MouseDownInCanvas(x,y){
		if(ControlDraw.statusDrawLine == 0){
			ControlDraw.points = []
			ControlDraw.firstPoint = new Point(x,y);
			ControlDraw.points.push(ControlDraw.firstPoint);
			ControlDraw.statusDrawLine = 1;
		}
		else{
			var point = new Point(x,y);
			ControlDraw.points.push(point);
		}
	}
	public MouseDoubleClick(ctx){
		var x = ControlDraw.firstPoint.x;
		var y = ControlDraw.firstPoint.y;
		this.DrawLine(ctx,ControlDraw.draw.pointMouseDown.x,ControlDraw.draw.pointMouseDown.y,x,y);
		ControlDraw.draw.pointMouseDown.x = x;
		ControlDraw.draw.pointMouseDown.y = y;
		ControlDraw.statusDrawLine = 0;
		ControlDraw.datas.push(ControlDraw.points);
		ControlDraw.points = []
		ControlDraw.changeCanvas = true;
		ControlDraw.statusMoveImage = false;
	}
}

export class Draw{
	public zoom = 100; //
	public static xStart = 0;
	public static yStart = 0;
	public static widthImageDraw = 0;
	public static heightImageDraw = 0;
	public pointMouseDown: Point = new Point(0,0);
	public pointMouseUp: Point = new Point(0,0);
	public drawPolygon: DrawPolygon = new DrawPolygon();
	public static typeDraw = 1;
	public MouseDownInCanvas(x,y){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.MouseDownInCanvas(x,y);
			break;
		}
	};
	public MouseDoubleClick(ctx){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.MouseDoubleClick(ctx);
			break;
		}
	}
	public ReloadShape(ctx,points,round = true){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.ReloadShape(ctx,points,round);
			break;
		}
	}
	public ReloadLineDraw(ctx){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.ReloadLineDraw(ctx,ControlDraw.datas);
			break;
		}
	}
	public DrawLine(ctx,x,y,x2,y2){
		switch(Draw.typeDraw){
			case 1:
			this.drawPolygon.DrawLine(ctx,x,y,x2,y2);
			break;
		}
	}
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
export class ControlDraw{
	public static draw: Draw = new Draw();
	public static acceptMoveImage = false;
	public static statusDrawLine = 0;
	public static statusMoveImage = false;
	public static changeCanvas = true;
	public static points: Array<Point> = [];
	public static datas: Array<Array<Point>> = [];
	public static firstPoint = new Point(0,0);
	public static RefreshControl(){
		this.draw = new Draw();
		this.acceptMoveImage = false;
		this.statusDrawLine = 0;
		this.statusMoveImage = false;
		this.changeCanvas = true;
		this.points = [];
		this.datas = [];
		this.firstPoint = new Point(0,0);
	}
}
