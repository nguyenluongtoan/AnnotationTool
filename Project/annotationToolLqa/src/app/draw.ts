export class Draw{
	public zoom = 100; //
	public static xStart = 0;
	public static yStart = 0;
	public static widthImageDraw = 0;
	public static heightImageDraw = 0;
	public pointMouseDown: Point = new Point(0,0);
	public pointMouseUp: Point = new Point(0,0);
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