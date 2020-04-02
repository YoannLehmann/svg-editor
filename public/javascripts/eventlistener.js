// **** SVG MENU ****
let btnFillCanvas = document.getElementById('fill-canvas');
let btnDeleteElement = document.getElementById('delete-element');
let btnAddElement = document.getElementById('add-element');
let selectSVGElements = document.getElementById('select-svg-elements'); 
// ------ SQUARE MENU ------
let inputSquareSide = document.getElementById('input-square-side');
let inputSquareColor = document.getElementById('input-square-color');
// ------ TEXT MENU --------
let selectTextFontFamily = document.getElementById('select-text-font-family');
let inputTextFontSize = document.getElementById('input-text-font-size');
// **** CANVAS MENU ****
let inputGridCellSize = document.getElementById('input-grid-cell-size')
let inputCanvasWidth = document.getElementById('input-canvas-width');
let inputCanvasHeight = document.getElementById('input-canvas-height');
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
// **** VARIABLES ****
let mousePressed = false;
let selectedShape = null;
let listOfShape = [];
let listOfGridLine = [];

// Initialisation.
window.onload = function(event)
{
    // SVG canvas creation.
    mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
    mainCanvas.attr('id', 'main-canvas');
    canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({fill:'#ddd'});
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
    // @TODO Make the function.
}

function InputCanvasWidthChangeCallback(event)
{
    mainCanvas.attr({width: this.value});
    canvasBackground.attr({width: this.value});
    refreshGrid();
}

function InputCanvasHeightChangeCallback(event)
{
    mainCanvas.attr({height: this.value});
    canvasBackground.attr({height: this.value});
    refreshGrid();
}

function InputSVGFileChangeCallback(event)
{
    let file = event.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
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
    // @TODO Make the function.
}

function BtnAddElementClickCallback()
{
    switch(selectSVGElements.value)
    {
        case 'square' : 
            addNewSquare(inputSquareSide.value, inputSquareColor.value);
            break;
        case 'text' : 
            addNewText(inputTextFontSize.value, selectTextFontFamily.value);
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
    // @TODO Make the function.
}

function BtnDeleteElementClickCallback(event)
{
    // @TODO Make the function.
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
}

// Functions
function bindEventListener()
{
    btnRemoveGrid.addEventListener('click', BtnRemoveGridClickCallback);
    btnAddGrid.addEventListener('click', BtnRefreshGridClickCallback);
    btnFillCanvas.addEventListener('click', BtnFillCanvasClickCallback);
    btnDeleteElement.addEventListener('click', BtnDeleteElementClickCallback);
    btnAddElement.addEventListener('click', BtnAddElementClickCallback);
    inputSquareSide.addEventListener('change', InputSquareSideChangeCallback);
    inputSquareColor.addEventListener('change', InputSquareColorChangeCallback);
    inputTextFontSize.addEventListener('change', InputTextFontSizeChangeCallback);
    inputGridCellSize.addEventListener('change', refreshGrid);
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
    for(let i = 0; i < listOfGridLine.length; i++)
    {
        listOfGridLine[i].remove();
    }
}

function refreshGrid()
{
    removeGrid();
    
    let cellSize = parseInt(inputGridCellSize.value);
    let horizontalLineCount = Math.round(inputCanvasHeight.value / (cellSize - 5));
    for(let i = 1; i < horizontalLineCount; i++)
    {
        let horizontalLine = mainCanvas.line(0, i * cellSize, inputCanvasWidth.value, i * cellSize);
        horizontalLine.stroke({ color: 'black', width: 1, linecap: 'round' })
        listOfGridLine.push(horizontalLine);
    }

    let verticalLineCount = Math.round(inputCanvasWidth.value / (cellSize - 5))
    for(let i = 1; i < verticalLineCount; i++)
    {
        let verticalLine = mainCanvas.line(i * cellSize, 0, i * cellSize, inputCanvasHeight.value);
        verticalLine.stroke({ color: 'black', width: 1, linecap: 'round' });
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
}

function addNewSquare(squareSideLength, squareColor)
{
    let square = new Square(mainCanvas, canvasContainer.getBoundingClientRect(), squareSideLength, 20, 20, squareColor);
    bindShapeListener(square);
    listOfShape.push(square);
}

function addNewText(textFontSize, textFontFamily)
{
    let text = new TextSVG(mainCanvas, canvasContainer.getBoundingClientRect(), textFontSize, 50, 50, 'yellow');
    bindShapeListener(text);
    listOfShape.push(text);
}