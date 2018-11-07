export class Draw{
	public zoom = 100; //
	public static xStart = 0;
	public static yStart = 0;
	public static countMouseWhell = 0;
	public pointMouseDown: Point = new Point();
	public pointMouseUp: Point = new Point();
}
export class Point{
	public x = 0;
	public y = 0;
	public SetPoint(_x,_y){
		this.x = _x;
		this.y = _y;
	}
}