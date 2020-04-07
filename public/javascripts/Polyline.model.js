class Polyline extends Shape {
    constructor(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, printType = PrintType.NO_TYPE, polylineContent)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, 'path', printType);
        this.SVGElement = container.polyline(polylineContent);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        
        this.updateAttr();
        super.setPrintType(printType);
    }


    updateAttr()
    {
        super.updateAttr();
        this.SVGElement.attr({
            'polyline-content' : this.polylineContent
        });
    }
}