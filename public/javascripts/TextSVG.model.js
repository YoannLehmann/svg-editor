class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, containerWidth, containerHeight, fontSize, textContent, fontFamily, xPos, yPos, color, printType)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, fontSize, fontSize, xPos, yPos, color, 'text', printType);

        this.textContent = textContent;
        this.SVGElement = container.plain(textContent);
        this.SVGElement.attr({
            "text-anchor": "middle",
            "dominant-baseline" : "central"
        });
        this.SVGElement.x(xPos);
        this.SVGElement.y(yPos);
        this.setFontSize(fontSize);
        this.setFontFamily(fontFamily);
        super.setPrintType(printType);
        this.updateAttr();
    }

    setFontSize(newFontSize)
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

    setFontFamily(newFontFamily)
    {
        this.fontFamily = newFontFamily;
        this.SVGElement.font({
            family: newFontFamily
        });
    }

    setTextContent(newTextContent)
    {
        this.textContent = newTextContent;
        this.SVGElement.plain(this.textContent);
    }

    updateAttr()
    {
        super.updateAttr();
        this.SVGElement.attr({
            'font-family' : this.fontFamily,
            'font-size' : this.fontSize,
        });
    }
}