// **** SVG MENU ****
let btnFillCanvas = document.getElementById('btn-fill-canvas');
let btnDeleteElement = document.getElementById('btn-delete-element');
let btnAddElement = document.getElementById('btn-add-element');
let btnDeleteAllElements = document.getElementById('btn-delete-all-elements')
let selectSVGElements = document.getElementById('select-svg-elements'); 
// ------ SQUARE MENU ------
let inputSquareSide = document.getElementById('input-square-side');
let inputSquareColor = document.getElementById('input-square-color');
let inputSquareRadioCutting = document.getElementById('radio-square-cutting');
let inputSquareRadioEngrave = document.getElementById('radio-square-engrave');
// ------ TEXT MENU --------
let selectTextFontFamily = document.getElementById('select-text-font-family');
let inputTextFontSize = document.getElementById('input-text-font-size');
let inputTextContent = document.getElementById('input-text-content');
let inputTextRadioCutting = document.getElementById('radio-text-cutting');
let inputTextRadioEngrave = document.getElementById('radio-text-engrave');
// **** CANVAS MENU ****
let inputGridCellSize = document.getElementById('input-grid-cell-size')
let inputCanvasWidth = document.getElementById('input-canvas-width');
let inputCanvasHeight = document.getElementById('input-canvas-height');
let labelGridCellSize = document.getElementById('label-grid-cell-size');
let btnAddGrid = document.getElementById('btn-add-grid');
let btnRemoveGrid = document.getElementById('btn-remove-grid');
// **** CONTAINERS ****
let canvasContainer = document.getElementById('canvas-container');
let squareMenuContainer = document.getElementById('square-menu');
let textMenuContainer = document.getElementById('text-menu');
let canvasBackground = null;
let mainCanvas = null;
// **** EXPORT/IMPORT MENU ****
let inputImportSVGFile = document.getElementById('input-import-svg-file');
let btnExportCanvas = document.getElementById('btn-export');
let btnPrint = document.getElementById('btn-print');
let btnImport = document.getElementById('btn-import');
// **** VARIABLES ****
let mousePressed = false;
let gridActive = false;
let selectedShape = null;
let listOfShape = [];
let listOfGridLine = [];
let importFileContent = null;

// Initialisation.
window.onload = function(event)
{
    // SVG canvas creation.
    mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
    mainCanvas.attr({
        'id': 'main-canvas',
        'max-width' : '630px'
    });
    canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({
        fill:'#ddd',
        id : 'canvas-background'
    });
    bindEventListener();
}

// Listener Callback.
function SelectSVGElementsChangeCallback(event)
{
    hideMenus();
    showMenu(this.value);
}

function SelectTextFontFamilyChangeCallback(event)
{
    
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        selectedShape.changeFontFamily(selectTextFontFamily.value);
        console.log(selectedShape);
    }
}

function InputCanvasWidthChangeCallback(event)
{
    mainCanvas.attr({width: this.value});
    canvasBackground.attr({width: this.value});
    (gridActive ? refreshGrid() : null)

    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].updateContainerSize(inputCanvasWidth.value, inputCanvasHeight.value);
    }
}

function InputCanvasHeightChangeCallback(event)
{
    mainCanvas.attr({height: this.value});
    canvasBackground.attr({height: this.value});
    (gridActive ? refreshGrid() : null)

    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].updateContainerSize(inputCanvasWidth.value, inputCanvasHeight.value);
    }
}

function InputGridCellSizeChangeCallback(event)
{
    (gridActive ? refreshGrid() : null)
}

function InputSVGFileChangeCallback(event)
{
    let file = event.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            importFileContent = evt.target.result;
            (importFileContent !== null ? btnImport.style.display = 'block' : btnImport.style.display = 'none') 
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
}

function InputSquareSideChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'square')
    {
        selectedShape.changeSideLength(inputSquareSide.value);
    }
}

function InputSquareColorChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'square')
    {
        selectedShape.changeColor(inputSquareColor.value);
    }
}

function InputTextFontSizeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        selectedShape.changeFontSize(inputTextFontSize.value);
    }
}

function InputTextContentChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        selectedShape.changeTextContent(inputTextContent.value);
    }
}

function InputSquareRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'square')
    {
        let printType = (inputSquareRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.changePrintType(printType);
    }
}

function InputTextRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        let printType = (inputTextRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.changePrintType(printType);
    }
}

function BtnAddElementClickCallback()
{
    console.log("add element click");
    switch(selectSVGElements.value)
    {
        case 'square' : 
            let squarePrintType = (inputSquareRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
            addNewSquare(inputSquareSide.value, inputSquareColor.value, 0, 0, squarePrintType);
            break;
        case 'text' : 
            let textPrintType = (inputTextRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
            addNewText(inputTextFontSize.value, selectTextFontFamily.value, inputTextContent.value, 0,0,textPrintType);
            break;
        default:
            break;
    }
}

function BtnRemoveGridClickCallback(event)
{
    removeGrid();
}

function BtnRefreshGridClickCallback(event)
{
    refreshGrid();
}

function BtnFillCanvasClickCallback(event)
{
    switch(selectSVGElements.value)
    {
        case 'square' : 
            fillCanvasWithSquares();
            break;
        case 'text' : 
            fillCanvasWithText();
            break;
        default: 
            break;
    }
}

function BtnDeleteElementClickCallback(event)
{
    if(selectedShape !== null)
    {
        selectedShape.SVGElement.remove();
        UnselectAllElement();
    }

    (listOfShape.length > 0 ? btnDeleteAllElements.style.display = 'block' : btnDeleteAllElements.style.display = 'none')
}

function BtnDeleteAllElementsClickCallback(event)
{
    UnselectAllElement();
    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].SVGElement.remove();
    }
    btnDeleteAllElements.style.display = 'none';
}

function BtnExportCanvasClickCallback(event)
{
    saveSvg();
}

function BtnPrintCanvasClickCallback(event)
{
    printCanvas();
}

function BtnImportClickCallback(event)
{
    if(importFileContent !== null)
    {
        var svgHTML = new DOMParser().parseFromString(importFileContent, "text/xml");
        console.log(svgHTML);
        // Test if first child is a comment.
        let svgContent = svgHTML.firstChild;
        //console.log(svgHTML.childNodes[1]);
        //console.log(svgHTML.childNodes[2]);
        //(typeof svgContent === 'object' ? svgContent = svgHTML.childNodes[2] : null)
        svgContent.id = 'main-canvas';
        //console.log(svgContent);
        mainCanvas.remove();
        importFileContent = svgContent;
        //canvasContainer.appendChild(svgContent);
        //mainCanvas.svg(svgContent);
        //mainCanvas = document.getElementById('main-canvas');
        initImportedFile();
    }

}

function initImportedFile()
{
    mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
    mainCanvas.attr({
        'id': 'main-canvas',
        'max-width' : '630px'
    });
    canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({
        fill:'#ddd',
        id: 'canvas-background'
    });
    bindEventListener();
    /*
    mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
    mainCanvas.attr({
        'id': 'main-canvas',
        'max-width' : '630px'
    });
    canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({fill:'#ddd'});
    */

    for(let i = 0; i < importFileContent.childNodes.length; i++)
    {
        let node = importFileContent.childNodes[i];
        console.log(node.getAttribute('id') === 'canvas-background');
        (node.getAttribute('id') === 'canvas-background' ? node.setAttribute('node-type', 'other') : null)
        console.log(node.getAttribute('node-type'));
        switch(node.getAttribute('node-type'))
        {
            case 'text' : 
                addNewText(node.getAttribute('font-size'), node.getAttribute('font-family'), node.textContent, parseInt(node.getAttribute('x')), parseInt(node.getAttribute('y')), node.getAttribute('print-type'));
                break;
            case 'square' :
                addNewSquare(node.getAttribute('width'), node.getAttribute('color'), parseInt(node.getAttribute('x')), parseInt(node.getAttribute('y')), node.getAttribute('print-type'));
                break;
        }
    }
    
}

function CanvasBackgroundClickCallback(event)
{
    UnselectAllElement();
}

function ShapeClickCallback(event, shape)
{
    hideMenus();
    showMenu(shape.type);
    selectedShape = shape;
    updateMenuWithShape(shape);
    btnDeleteElement.style.display = 'block';
    btnDeleteAllElements.style.display = 'block';
}

// Functions
function bindEventListener()
{
    btnRemoveGrid.addEventListener('click', BtnRemoveGridClickCallback);
    btnAddGrid.addEventListener('click', BtnRefreshGridClickCallback);
    btnFillCanvas.addEventListener('click', BtnFillCanvasClickCallback);
    btnDeleteElement.addEventListener('click', BtnDeleteElementClickCallback);
    btnAddElement.addEventListener('click', BtnAddElementClickCallback);
    btnDeleteAllElements.addEventListener('click', BtnDeleteAllElementsClickCallback);
    btnExportCanvas.addEventListener('click', BtnExportCanvasClickCallback);
    btnPrint.addEventListener('click', BtnPrintCanvasClickCallback);
    btnImport.addEventListener('click', BtnImportClickCallback);
    inputSquareSide.addEventListener('change', InputSquareSideChangeCallback);
    inputSquareColor.addEventListener('change', InputSquareColorChangeCallback);
    inputSquareRadioEngrave.addEventListener('change', InputSquareRadioPrintTypeChangeCallback);
    inputSquareRadioCutting.addEventListener('change', InputSquareRadioPrintTypeChangeCallback);
    inputTextRadioEngrave.addEventListener('change', InputTextRadioPrintTypeChangeCallback);
    inputTextRadioCutting.addEventListener('change', InputTextRadioPrintTypeChangeCallback);
    inputTextFontSize.addEventListener('change', InputTextFontSizeChangeCallback);
    inputTextContent.addEventListener('change', InputTextContentChangeCallback);
    inputGridCellSize.addEventListener('change', InputGridCellSizeChangeCallback);
    inputCanvasWidth.addEventListener('change', InputCanvasWidthChangeCallback);
    inputCanvasHeight.addEventListener('change', InputCanvasHeightChangeCallback);
    inputImportSVGFile.addEventListener('change', InputSVGFileChangeCallback);
    selectSVGElements.addEventListener('change', SelectSVGElementsChangeCallback);
    selectTextFontFamily.addEventListener('change', SelectTextFontFamilyChangeCallback);
    canvasBackground.on(['click'], CanvasBackgroundClickCallback);
}

function showMenu(menuName)
{
    // Display the add buttons.
    btnAddElement.style.display = 'block';
    btnFillCanvas.style.display = 'block';

    switch(menuName)
    {
        case "square":
            squareMenuContainer.style.display = 'block';
            break;
        case "text" : 
            textMenuContainer.style.display = 'block';
            break;
        default: 
            // Remove the add buttons by default.
            btnAddElement.style.display = 'none';
            btnFillCanvas.style.display = 'none';
            break;
    }

    
}

function hideMenus()
{
    squareMenuContainer.style.display = 'none';
    textMenuContainer.style.display = 'none';
}

function removeGrid()
{
    gridActive = false;
    inputGridCellSize.style.display = 'none';
    btnAddGrid.style.display = 'block';
    btnRemoveGrid.style.display = 'none';
    labelGridCellSize.style.display = 'none';

    for(let i = 0; i < listOfGridLine.length; i++)
    {
        listOfGridLine[i].remove();
    }
}

function refreshGrid()
{
    removeGrid();
    gridActive = true;
    btnAddGrid.style.display = 'none';
    btnRemoveGrid.style.display = 'block';
    inputGridCellSize.style.display = 'block';
    labelGridCellSize.style.display = 'block';
    
    let cellSize = parseInt(inputGridCellSize.value);
    let horizontalLineCount = Math.round(inputCanvasHeight.value / (cellSize - 5));
    for(let i = 1; i < horizontalLineCount; i++)
    {
        let horizontalLine = mainCanvas.line(0, i * cellSize, inputCanvasWidth.value, i * cellSize);
        horizontalLine.stroke({ color: 'black', width: 0.5, linecap: 'round' });
        horizontalLine.attr({
            class: 'grid-line'
        });
        listOfGridLine.push(horizontalLine);
    }

    let verticalLineCount = Math.round(inputCanvasWidth.value / (cellSize - 5))
    for(let i = 1; i < verticalLineCount; i++)
    {
        let verticalLine = mainCanvas.line(i * cellSize, 0, i * cellSize, inputCanvasHeight.value);
        verticalLine.stroke({ color: 'black', width: 0.5, linecap: 'round' });
        verticalLine.attr({
            class: 'grid-line'
        });
        listOfGridLine.push(verticalLine);
    }
}

function UnselectAllElement()
{
    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].Unselect();
        listOfShape[i].OnMouseUpCallback();
    }

    selectedShape = null;
    btnDeleteElement.style.display = 'none';
}

function bindShapeListener(shape)
{
    shape.SVGElement.on(['click'], function(event){
        shape.OnClickCallback(event);
        ShapeClickCallback(event, shape);
    });
    shape.SVGElement.on(['mouseup'], function(event){
        shape.OnMouseUpCallback(event);
    });
    shape.SVGElement.on(['mousedown'], function(event){
        UnselectAllElement();
        shape.OnMouseDownCallback(event);
    });
    shape.SVGElement.on(['mousemove'], function(event){
        shape.OnMouseMoveCallback(event);
    });
    shape.SVGElement.on(['mouseover'], function(event){
        shape.OnMouseOverCallback(event);
    });
}

function addNewSquare(squareSideLength, squareColor, squarePosX = 20, squarePosY = 20, printType = PrintType.NO_TYPE)
{
    let square = new Square(mainCanvas, canvasContainer.getBoundingClientRect(), inputCanvasWidth.value, inputCanvasHeight.value, squareSideLength, squarePosX, squarePosY, squareColor, printType);
    bindShapeListener(square);
    listOfShape.push(square);
    btnDeleteAllElements.style.display = 'block';
}

function addNewText(textFontSize, textFontFamily, textContent, textPosX = 20, textPosY = 20, printType = PrintType.NO_TYPE)
{
    let text = new TextSVG(mainCanvas, canvasContainer.getBoundingClientRect(), inputCanvasWidth.value, inputCanvasHeight.value, textFontSize, textContent, textFontFamily, textPosX, textPosY, 'yellow', printType);
    text.SVGElement.move(textPosX, textPosY);
    bindShapeListener(text);
    listOfShape.push(text);
    btnDeleteAllElements.style.display = 'block';
}

function fillCanvasWithSquares()
{
    let squareSideLength = parseInt(inputSquareSide.value);
    let squareColor = inputSquareColor.value;
    const elementSpacing = 3;

    let horizontalLineCount = Math.floor(inputCanvasWidth.value / (squareSideLength));
    // Tester si la les carrés + les espaces sont plus grand que la taille totale
    while((horizontalLineCount * elementSpacing + horizontalLineCount * squareSideLength) > inputCanvasWidth.value)
    {
        horizontalLineCount--;
    }
    
    for(let i = 0; i < horizontalLineCount; i++)
    {
        let verticalLineCount = Math.floor(inputCanvasHeight.value / (squareSideLength))
        while((verticalLineCount * elementSpacing + verticalLineCount * squareSideLength) > inputCanvasHeight.value)
        {
            verticalLineCount--;
        }
        for(let j = 0; j < verticalLineCount; j++)
        {
            addNewSquare(squareSideLength, squareColor, i * (squareSideLength + elementSpacing), j * (squareSideLength + elementSpacing));
        }
    }
}

function fillCanvasWithText()
{
    let textFontSize = parseInt(inputTextFontSize.value);
    let textFontFamily = selectTextFontFamily.value;
    let textContent = inputTextContent.value;
    const elementSpacing = 0;

    let horizontalLineCount = Math.floor(inputCanvasWidth.value / (textFontSize));
    // Tester si la les carrés + les espaces sont plus grand que la taille totale
    while((horizontalLineCount * elementSpacing + horizontalLineCount * textFontSize) > inputCanvasWidth.value)
    {
        horizontalLineCount--;
    }
    
    for(let i = 0; i < horizontalLineCount; i++)
    {
        let verticalLineCount = Math.floor(inputCanvasHeight.value / (textFontSize))
        while((verticalLineCount * elementSpacing + verticalLineCount * textFontSize) > inputCanvasHeight.value)
        {
            verticalLineCount--;
        }
        for(let j = 0; j < verticalLineCount; j++)
        {
            addNewText(textFontSize, textFontFamily, textContent, i * (textFontSize + elementSpacing), j * (textFontSize + elementSpacing));
        }
    }
    
}

function updateMenuWithShape(shape)
{
    switch(shape.type)
    {
        case 'square' : 
            inputSquareColor.value = shape.color;
            inputSquareSide.value = shape.width;
            break;
        case 'text' : 
            inputTextContent.value = shape.textContent;
            inputTextFontSize.value = shape.fontSize;
            selectTextFontFamily.value = shape.fontFamily;
            break;
        default : 

            break;    
    }
}

function printCanvas()
{
    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<html><head><title>my div</title>');
    /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(getSvgCanvas());
    mywindow.document.write('</body></html>');
    mywindow.print();
    mywindow.close();
}

function getSvgCanvas()
{
    // Unselect all elements.
    UnselectAllElement();
    
    // Hide the background.
    canvasBackground.attr({
        visibility: 'hidden'
    });

    // Hide the grid.
    let gridLines = document.getElementsByClassName('grid-line');
    for(let i = 0; i < gridLines.length; i++)
    {
        gridLines[i].style.display = 'none';
    }

    // Save the canvas.
    let canvas = mainCanvas.svg();

    // Show the background.
    canvasBackground.attr({
        visibility: 'visible'
    });

    // Show the grid.
    for(let i = 0; i < gridLines.length; i++)
    {
        gridLines[i].style.display = 'block';
    }

    return canvas;
}

function saveSvg() 
{
    var svgData = getSvgCanvas();
    var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = Math.floor(Math.random() * 100000000) + ".svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}