class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, xPos, yPos, color)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color);

        this.SVGElement = container.text("A");
        
        this.SVGElement.font({
            family:   'Helvetica'
          , size:     144
          , anchor:   'middle'
          , leading:  '1.5em'
          })
        this.SVGElement.css('cursor', 'pointer');
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
    }
}