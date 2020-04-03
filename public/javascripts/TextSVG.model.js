class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, textContent, fontFamily, xPos, yPos, color)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color, 'text');

        this.textContent = textContent;
        this.SVGElement = container.plain(textContent);
        this.SVGElement.attr({
            "text-anchor": "middle",
            "dominant-baseline" : "central"
        });
        this.SVGElement.x(xPos);
        this.SVGElement.y(yPos);
        this.changeFontSize(fontSize);
        this.changeFontFamily(fontFamily);
    }

    changeFontSize(newFontSize)
    {
        this.fontSize = newFontSize;
        this.SVGElement.font({
            size: newFontSize
        });

        if(this.SVGElement.x() < 0 || this.SVGElement.y() < 0)
        {
            this.SVGElement.move(0,0);
        }
    }

    changeFontFamily(newFontFamily)
    {
        this.fontFamily = newFontFamily;
        this.SVGElement.font({
            family: newFontFamily
        });
    }

    changeTextContent(newTextContent)
    {
        this.textContent = newTextContent;
        this.SVGElement.plain(this.textContent);
    }
}