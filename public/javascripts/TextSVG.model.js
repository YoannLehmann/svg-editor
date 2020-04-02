class TextSVG extends Shape 
{
    constructor(container, containerBoundingRect, fontSize, textContent, xPos, yPos, color, fontFamily)
    {
        super(container, containerBoundingRect, fontSize, fontSize, xPos, yPos, color, 'text');

        this.textContent = this.textContent;
        this.SVGElement = container.plain(textContent);
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

    changeTextContent(newTextContent)
    {
        this.textContent = newTextContent;
        this.SVGElement.plain(this.textContent);
    }
}