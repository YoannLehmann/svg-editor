class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, xPos, yPos, color, fontFamily)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color, 'text');
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;

        //let textContainer = container.group();
        //this.SVGElement = textContainer.plain("B");

        //textContainer.attr({
            //transform: "translate(100,100)"
        //});
        this.SVGElement = container.plain("B");
        this.SVGElement.attr({
            "text-anchor": "middle",
            "dominant-baseline" : "central"
        });
        //this.SVGElement = container.plain("A");
        

        this.SVGElement.font({
            family:   this.fontFamily
          , size:     this.fontSize
          , anchor:   'top'
          })
        this.SVGElement.css('cursor', 'pointer');
        this.SVGElement.css('background-color', 'red');
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
    }
}