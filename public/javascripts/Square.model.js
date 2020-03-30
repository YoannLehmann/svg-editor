class Square extends Shape
{
    constructor(container, containerBoundingRect, sideLength, xPos, yPos, color)
    {
        super(container, containerBoundingRect, sideLength, sideLength, xPos, yPos, color);

        this.square = this;

        this.SVGElement = container.rect(sideLength, sideLength);
        this.SVGElement.attr({
            fill: this.color
        })
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        /*
        this.shape.on(['mousedown'], function(event){
            this.OnMouseDownCallback(event);
        });
        this.shape.on(['mousemove'], function(event){
            this.OnMouseMoveCallback(event);
        });
        */

        //this.shape.addEventListener('mousemove', this.OnMouseMoveCallback(event));
        //this.shape.addEventListener('mouseup', this.OnMouseUpCallback(event));
        //this.shape.addEventListener('mousedown', this.OnMouseDownCallback(event));
    }
}