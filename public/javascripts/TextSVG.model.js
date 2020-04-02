class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, xPos, yPos, color, fontFamily)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color, 'text');

        this.SVGElement = container.plain("420");
        this.SVGElement.attr({
            "text-anchor": "middle",
            "dominant-baseline" : "central"
        });
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        this.changeFontSize(fontSize);
        this.changeFontFamily(fontFamily);
    }

    changeFontSize(newFontSize)
    {
        this.fontSize = newFontSize;
        this.SVGElement.font({
            size: newFontSize
        });
    }

    changeFontFamily(newFontFamily)
    {
        this.fontFamily = newFontFamily;
        this.SVGElement.font({
            family: newFontFamily
        });
    }
}