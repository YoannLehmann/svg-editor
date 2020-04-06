class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, textContent, fontFamily, xPos, yPos, color, printType)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color, 'text', printType);

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
        this.changePrintType(printType);
    }

    changePrintType(newPrintType)
    {
        this.printType = newPrintType;
        if(this.printType === PrintType.CUTTING)
        {
            this.SVGElement.attr({
                'fill-opacity' : 0
            });
            this.SVGElement.stroke({
                color: 'red',
                width: 1
            });
        }
        else if(this.printType === PrintType.ENGRAVE)
        {
            this.color = 'black';
            this.SVGElement.attr({
                'fill-opacity' : 1
            });
            this.SVGElement.stroke({
                color: 'red',
                width: 0
            });
        }
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