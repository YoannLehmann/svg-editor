// **** SVG MENU ****
let btnShowMenu = document.getElementById('btn-show-menu');
let btnFillCanvas = document.getElementById('btn-fill-canvas');
let btnDeleteElement = document.getElementById('btn-delete-element');
let btnAddElement = document.getElementById('btn-add-element');
let btnDeleteAllElements = document.getElementById('btn-delete-all-elements')
let btnSelectAllElements = document.getElementById('btn-select-all-elements');
let selectSVGElements = document.getElementById('select-svg-elements'); 
let imgMenuSvgArrow = document.getElementById('img-menu-svg-arrow');
let optionSelectAll = document.getElementById('option-select-all');
// ------ SQUARE MENU ------
let squareTitle = document.getElementById('square-title');
let inputSquareSide = document.getElementById('input-square-side');
let inputSquareColor = document.getElementById('input-square-color');
let inputSquareRadioCutting = document.getElementById('radio-square-cutting');
let inputSquareRadioEngrave = document.getElementById('radio-square-engrave');
// ------ TEXT MENU --------
let textTitle = document.getElementById('text-title');
let selectTextFontFamily = document.getElementById('select-text-font-family');
let inputTextFontSize = document.getElementById('input-text-font-size');
let inputTextContent = document.getElementById('input-text-content');
let inputTextRadioCutting = document.getElementById('radio-text-cutting');
let inputTextRadioEngrave = document.getElementById('radio-text-engrave');
// ----- PATH MENU --------
let pathTitle = document.getElementById('path-title');
let inputPathRadioCutting = document.getElementById('radio-path-cutting');
let inputPathRadioEngrave = document.getElementById('radio-path-engrave');
let inputPathContent = document.getElementById('input-path-content');
// ----- POLYLINE MENU --------
let polylineTitle = document.getElementById('polyline-title');
let inputPolylineRadioCutting = document.getElementById('radio-polyline-cutting');
let inputPolylineRadioEngrave = document.getElementById('radio-polyline-engrave');
let inputPolylineContent = document.getElementById('input-polyline-content');
// ----- SELECT ALL ------
let inputSelectAllRadioCutting = document.getElementById('radio-select-all-cutting');
let inputSelectAllRadioEngrave = document.getElementById('radio-select-all-engrave');
// **** CANVAS MENU ****
let inputGridCellSize = document.getElementById('input-grid-cell-size')
let inputCanvasWidth = document.getElementById('input-canvas-width');
let inputCanvasHeight = document.getElementById('input-canvas-height');
let labelGridCellSize = document.getElementById('label-grid-cell-size');
let btnAddGrid = document.getElementById('btn-add-grid');
let btnRemoveGrid = document.getElementById('btn-remove-grid');
let imgMenuCanvasArrow = document.getElementById('img-menu-canvas-arrow');
let imgMenuGridArrow = document.getElementById('img-menu-grid-arrow');
// **** CONTAINERS ****
let menuContainer = document.getElementById('menu-container');
let canvasContainer = document.getElementById('canvas-container');
let squareMenuContainer = document.getElementById('square-menu-container');
let textMenuContainer = document.getElementById('text-menu-container');
let pathMenuContainer = document.getElementById('path-menu-container');
let svgMenuContainer = document.getElementById('svg-menu-container');
let canvasMenuContainer = document.getElementById('canvas-menu-container');
let gridMenuContainer = document.getElementById('grid-menu-container');
let fileMenuContainer = document.getElementById('file-menu-container');
let selectAllMenuContainer = document.getElementById('select-all-menu-container');

let polylineMenuContainer = document.getElementById('polyline-menu-container');
let canvasBackground = null;
let mainCanvas = null;
// **** EXPORT/IMPORT MENU ****
let inputImportSVGFile = document.getElementById('input-import-svg-file');
let btnExportCanvas = document.getElementById('btn-export');
let btnPrint = document.getElementById('btn-print');
let btnImport = document.getElementById('btn-import');
let imgMenuFileArrow = document.getElementById('img-menu-file-arrow');
// **** VARIABLES ****
let mousePressed = false;
let gridActive = false;
let selectedShape = null;
let listOfShape = [];
let listOfGridLine = [];
let oldListOfShape = null;
let importFileContent = null;
let menuShow = false;

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
        selectedShape.setFontFamily(selectTextFontFamily.value);
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
        selectedShape.setWidth(inputSquareSide.value);
        selectedShape.setHeight(inputSquareSide.value);
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
        selectedShape.setFontSize(inputTextFontSize.value);
    }
}

function InputTextContentChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        selectedShape.setTextContent(inputTextContent.value);
    }
}

function InputSquareRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'square')
    {
        let printType = (inputSquareRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.setPrintType(printType);
    }
}

function InputSelectAllChangeCallback(event)
{
    let printType = (inputSelectAllRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        
    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].setPrintType(printType);
    }
}

function InputTextRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'text')
    {
        let printType = (inputTextRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.setPrintType(printType);
    }
}

function InputPathRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'path')
    {
        let printType = (inputPathRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.setPrintType(printType);
    }
}

function InputPolylineRadioPrintTypeChangeCallback(event)
{
    if(selectedShape !== null && selectedShape.type === 'polyline')
    {
        let printType = (inputPolylineRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
        selectedShape.setPrintType(printType);
    }
}

function BtnAddElementClickCallback()
{
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
        case 'path' :
            let pathPrintType = (inputPathRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE)
            addNewPath(inputPathContent.value, null, null, pathPrintType);
            break;    
        case 'polyline' : 
            let polylinePrintType = (inputPolylineRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE)
            addNewPolyline(inputPolylineContent.value, null, null, polylinePrintType);
            break;
        default:
            break;
    }

    optionSelectAll.style.display = 'block';
    btnSelectAllElements.style.display = 'block';
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
    console.log("Avant suppression : ");
    console.log(listOfShape);
    if(selectedShape !== null)
    {
        let shapeIndex = 0;
        for(let i = 0; i < listOfShape.length; i++)
        {
            if(listOfShape[i] === selectedShape)
            {
                shapeIndex = i;
            }
        }
        selectedShape.Unselect();
        selectedShape.SVGElement.remove();
        listOfShape.splice(shapeIndex);
    }

    console.log("Après suppression");
    console.log(listOfShape);
    btnDeleteElement.style.display = 'none';
    (listOfShape && listOfShape.length ? null : btnDeleteAllElements.style.display = 'none');
    (listOfShape && listOfShape.length ? null : btnSelectAllElements.style.display = 'none');
    (listOfShape && listOfShape.length ? null : optionSelectAll.style.display = 'none');
}

function BtnDeleteAllElementsClickCallback(event)
{
    UnselectAllElement();
    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].SVGElement.remove();
    }
    listOfShape = [];
    btnDeleteAllElements.style.display = 'none';
    optionSelectAll.style.display = 'none';
    btnSelectAllElements.style.display = 'none';
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
        oldListOfShape = listOfShape;

        var svgHTML = new DOMParser().parseFromString(importFileContent, "text/xml");
        console.log(svgHTML);
        // Test if first child is a comment.
        let contentIndex = 0;
        let svgContent = svgHTML.childNodes[contentIndex];
        while(!(svgContent instanceof SVGElement))
        {
            contentIndex++;
            svgContent = svgHTML.childNodes[contentIndex];
        }
        
        console.log("SVG CONTENT");
        console.log(svgHTML.firstChild instanceof SVGElement);
        console.log(svgHTML.childNodes[1] instanceof SVGElement);
        console.log(svgHTML.childNodes[2] instanceof SVGElement);
        //svgContent.id = 'main-canvas';
        //console.log(svgContent);
        //mainCanvas.remove();
        importFileContent = svgContent;
        //canvasContainer.appendChild(svgContent);
        //mainCanvas.svg(svgContent);
        //mainCanvas = document.getElementById('main-canvas');
        
        initImportedFile();
    }

}

function BtnShowMenuClickCallback(event)
{
    (menuShow  ? menuContainer.style.display = 'none' : menuContainer.style.display = 'block');
    (menuShow ? btnShowMenu.innerText = 'Afficher le menu' : btnShowMenu.innerText = 'Cacher le menu');
    menuShow = !menuShow;
}

function BtnSelectAllClickCallback(event)
{
    hideMenus();
    showMenu('select-all');
    selectSVGElements.value = 'select-all';
}

function CanvasBackgroundClickCallback(event)
{
    UnselectAllElement();
}

// Use to prevent the shape to stop moving when the mouse is not over the shape and pressed.
function CanvasBackgroundMousemoveCallback(event)
{
    for(let i = 0; i < listOfShape.length; i++)
    {
        let shape = listOfShape[i];
        console.log("Moving " + shape.mousePressed);
        if(shape.mousePressed)
        {
            shape.OnMouseMoveCallback(event);
        }
    }
}

function CanvasBackgroundMouseupCallback(event)
{
    UnselectAllElement();
}

function ShapeClickCallback(event, shape)
{
    hideMenus();
    selectedShape = shape;
    showMenu(shape.type);
    updateMenuWithShape(shape);
    btnDeleteElement.style.display = 'block';
    btnDeleteAllElements.style.display = 'block';
}

function ImgMenuArrowCallback(event)
{
    let menuType = this.getAttribute('menu');
    let menuShow = (this.getAttribute('menu-show') === 'true' ?  true : false);
    (menuShow ? this.setAttribute('src', '/images/right-arrow.png') : this.setAttribute('src', '/images/down-arrow.png'));
    (menuShow ? this.setAttribute('menu-show', 'false') : this.setAttribute('menu-show', 'true'));
    (menuShow ? hideMenuContainer(menuType) : showMenuContainer(menuType));
    this.setAttribute('menu-show', !menuShow);
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
    btnSelectAllElements.addEventListener('click', BtnSelectAllClickCallback);
    inputSquareSide.addEventListener('change', InputSquareSideChangeCallback);
    inputSquareColor.addEventListener('change', InputSquareColorChangeCallback);
    inputSquareRadioEngrave.addEventListener('change', InputSquareRadioPrintTypeChangeCallback);
    inputSquareRadioCutting.addEventListener('change', InputSquareRadioPrintTypeChangeCallback);
    inputTextRadioEngrave.addEventListener('change', InputTextRadioPrintTypeChangeCallback);
    inputTextRadioCutting.addEventListener('change', InputTextRadioPrintTypeChangeCallback);
    inputPathRadioEngrave.addEventListener('change', InputPathRadioPrintTypeChangeCallback);
    inputPathRadioCutting.addEventListener('change', InputPathRadioPrintTypeChangeCallback);
    inputPolylineRadioEngrave.addEventListener('change', InputPolylineRadioPrintTypeChangeCallback);
    inputPolylineRadioCutting.addEventListener('change', InputPolylineRadioPrintTypeChangeCallback);
    inputSelectAllRadioCutting.addEventListener('change', InputSelectAllChangeCallback);
    inputSelectAllRadioEngrave.addEventListener('change', InputSelectAllChangeCallback);
    inputTextFontSize.addEventListener('change', InputTextFontSizeChangeCallback);
    inputTextContent.addEventListener('change', InputTextContentChangeCallback);
    inputGridCellSize.addEventListener('change', InputGridCellSizeChangeCallback);
    inputCanvasWidth.addEventListener('change', InputCanvasWidthChangeCallback);
    inputCanvasHeight.addEventListener('change', InputCanvasHeightChangeCallback);
    inputImportSVGFile.addEventListener('change', InputSVGFileChangeCallback);
    selectSVGElements.addEventListener('change', SelectSVGElementsChangeCallback);
    selectTextFontFamily.addEventListener('change', SelectTextFontFamilyChangeCallback);
    canvasBackground.on(['click'], CanvasBackgroundClickCallback);
    canvasBackground.on(['mousemove'], CanvasBackgroundMousemoveCallback);
    canvasBackground.on(['mouseup'], CanvasBackgroundMouseupCallback);
    imgMenuSvgArrow.addEventListener('click', ImgMenuArrowCallback);
    imgMenuCanvasArrow.addEventListener('click', ImgMenuArrowCallback);
    imgMenuGridArrow.addEventListener('click', ImgMenuArrowCallback);
    imgMenuFileArrow.addEventListener('click', ImgMenuArrowCallback);
    btnShowMenu.addEventListener('click', BtnShowMenuClickCallback);
}

function initImportedFile()
{
    /*
    mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
    mainCanvas.attr({
        'id': 'main-canvas',
        'max-width' : '630px'
    });
    canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({
        fill:'#ddd',
        id: 'canvas-background',
        width: inputCanvasWidth.value,
        height: inputCanvasHeight.value
    });
    */

    bindEventListener();
    let canvasWidth = 0;
    let canvasHeight = 0;

    console.log("IMPORTED FILE : ");
    console.log(importFileContent);
    console.log("IMPORTED FILE SECOND CHILD");
    console.log(importFileContent.childNodes[1]);

    for(let i = 0; i < importFileContent.childNodes.length; i++)
    {
        let node = importFileContent.childNodes[i];
        (node.id === 'canvas-background' ? node.setAttribute('node-type', 'other') : null)
        if(node instanceof SVGElement)
        {
            let nodeType = null;
            (node.getAttribute('node-type') === null ? nodeType = node.tagName : nodeType = node.getAttribute('node-type'));
            console.log("Node type : " + nodeType);
            console.log(node);

            // Faire une fonction récursive.
            if(nodeType == 'g')
            {
                console.log("inside g");
                console.log(node.childNodes);
                node = node.childNodes[1];
                nodeType = node.tagName;
                console.log("New node type after g : " + nodeType);
                console.log(node);
            }

            switch(nodeType)
            {
                case 'text' : 
                    addNewText(node.getAttribute('font-size'), node.getAttribute('font-family'), node.textContent, parseInt(node.getAttribute('x')), parseInt(node.getAttribute('y')), node.getAttribute('print-type'));
                    break;
                case 'square' :
                    addNewSquare(node.getAttribute('width'), node.getAttribute('color'), parseInt(node.getAttribute('x')), parseInt(node.getAttribute('y')), node.getAttribute('print-type'));
                    break;
                case 'path' : 
                    addNewPath(node.getAttribute('d'), node.getAttribute('x'), node.getAttribute('y'), node.getAttribute('print-type'));    
                    break;
                case 'polyline' :
                    addNewPolyline(node.getAttribute('points'), node.getAttribute('x'), node.getAttribute('y'), node.getAttribute('print-type'));
                    break;    
                default :
                    console.log("Other");
                    console.log(node);
                    canvasWidth = node.getAttribute('width');
                    canvasHeight = node.getAttribute('height');
            }
        }
    }
    // Import active shapes before import.
    console.log(oldListOfShape);
    
}

function showMenuContainer(menuName)
{
    switch(menuName)
    {
        case 'menu-svg':
            svgMenuContainer.style.display = 'block';
            break;
        case 'menu-canvas':
            canvasMenuContainer.style.display = 'block';
            break;
        case 'menu-grid' :
            gridMenuContainer.style.display = 'block';
            break;
        case 'menu-file' : 
            fileMenuContainer.style.display = 'block';
            break;
    }
}

function hideMenuContainer(menuName)
{
    switch(menuName)
    {
        case 'menu-svg':
            svgMenuContainer.style.display = 'none';
            break;
        case 'menu-canvas':
            canvasMenuContainer.style.display = 'none';
            break;
        case 'menu-grid' :
            gridMenuContainer.style.display = 'none';
            break;
        case 'menu-file' : 
            fileMenuContainer.style.display = 'none';
            break;
    }
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
        case "path" :
            pathMenuContainer.style.display = 'block';
            break;
        case "polyline" :
            polylineMenuContainer.style.display = 'block';  
            break;      
        case "select-all":
            selectAllMenuContainer.style.display = 'block';
            btnAddElement.style.display = 'none';
            btnFillCanvas.style.display = 'none';
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
    pathMenuContainer.style.display = 'none';
    polylineMenuContainer.style.display = 'none';
    selectAllMenuContainer.style.display = 'none';
    textTitle.innerText = 'Menu du texte';
    squareTitle.innerText = 'Menu du carré';
    polylineTitle.innerText = 'Menu de la polyligne';
    pathTitle.innerText = 'Menu du tracé';
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
    textTitle.innerText = 'Menu du texte';
    squareTitle.innerText = 'Menu du carré';
    polylineTitle.innerText = 'Menu de la polyligne';
    pathTitle.innerText = 'Menu du tracé';
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

function addNewText(textFontSize, textFontFamily, textContent, textPosX = 20, textPosY = 20, printType = PrintType.NO_TYPE, pathContent)
{
    let text = new TextSVG(mainCanvas, canvasContainer.getBoundingClientRect(), inputCanvasWidth.value, inputCanvasHeight.value, textFontSize, textContent, textFontFamily, textPosX, textPosY, 'yellow', printType);
    text.SVGElement.move(textPosX, textPosY);
    bindShapeListener(text);
    listOfShape.push(text);
    btnDeleteAllElements.style.display = 'block';
}

function addNewPath(pathContent, pathPosX = 50, pathPosY = 50, printType = PrintType.NO_TYPE)
{
    let path = new Path(mainCanvas, canvasContainer.getBoundingClientRect(), inputCanvasWidth.value, inputCanvasHeight.value, 50, 50, pathPosX, pathPosY, 'yellow', printType, pathContent);
    path.width = 100;
    path.height = 100;
    bindShapeListener(path);
    listOfShape.push(path);
    btnDeleteAllElements.style.display = 'block';
}

function addNewPolyline(polylineContent, polylinePosX = 50, polylinePosY = 50, printType = PrintType.NO_TYPE)
{
    let polyline = new Polyline(mainCanvas, canvasContainer.getBoundingClientRect(), inputCanvasWidth.value, inputCanvasHeight.value, 50, 50, polylinePosX, polylinePosY, 'yellow', printType, polylineContent);
    polyline.width = 100;
    polyline.height = 100;
    bindShapeListener(polyline);
    listOfShape.push(polyline);
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
            let squarePrintType = (inputSquareRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
            addNewSquare(squareSideLength, squareColor, i * (squareSideLength + elementSpacing), j * (squareSideLength + elementSpacing), squarePrintType);
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
            let textPrintType = (inputTextRadioCutting.checked ? PrintType.CUTTING : PrintType.ENGRAVE);
            addNewText(textFontSize, textFontFamily, textContent, i * (textFontSize + elementSpacing), j * (textFontSize + elementSpacing), textPrintType);
        }
    }
    
}

function updateMenuWithShape(shape)
{
    switch(shape.type)
    {
        case 'square' : 
            squareTitle.innerText = 'Menu du carré (élément sélectionné)';
            inputSquareColor.value = shape.color;
            inputSquareSide.value = shape.width;
            selectSVGElements.value = 'square';
            (shape.getPrintType() === 'cutting' ? inputSquareRadioCutting.checked = 'checked' : inputSquareRadioEngrave.checked = 'checked')
            break;
        case 'text' : 
            textTitle.innerText = 'Menu du texte (élément sélectionné)';
            inputTextContent.value = shape.textContent;
            inputTextFontSize.value = shape.fontSize;
            selectTextFontFamily.value = shape.fontFamily;
            selectSVGElements.value = 'text';
            (shape.getPrintType() === 'cutting' ? inputTextRadioCutting.checked = 'checked' : inputTextRadioEngrave.checked = 'checked')
            break;
        case 'path' :
            pathTitle.innerText = 'Menu du tracé (élément sélectionné)';
            selectSVGElements.value = 'path';
            (shape.getPrintType() === 'cutting' ? inputPathRadioCutting.checked = 'checked' : inputPathRadioEngrave.checked = 'checked')
            
            break;
        case 'polyline':
            polylineTitle.innerText = 'Menu de la polyligne (élément sélectionné)';
            selectSVGElements.value = 'polyline';
            (shape.getPrintType() === 'cutting' ? inputPolylineRadioCutting.checked = 'checked' : inputPolylineRadioEngrave.checked = 'checked')
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