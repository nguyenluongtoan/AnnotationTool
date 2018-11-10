export class Draw{
	public zoom = 100; //
	public static xStart = 0;
	public static yStart = 0;
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