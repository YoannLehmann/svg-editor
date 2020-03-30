let btnNewSquare = document.getElementById('btn-new-square');
let btnExport = document.getElementById('btn-export');
let btnAddGrid = document.getElementById('btn-add-grid');
let btnRemoveGrid = document.getElementById('btn-remove-grid');
let inputSvgFile = document.getElementById('input-svg-file');
let inputGridCellSize = document.getElementById('input-grid-cell-size')
let inputCanvasWidth = document.getElementById('input-canvas-width');
let inputCanvasHeight = document.getElementById('input-canvas-height');
let mousePressed = false;
let canvasContainer = document.getElementById('canvas-container');
let mainCanvas = SVG().addTo('#canvas-container').size(inputCanvasWidth.value, inputCanvasHeight.value);
mainCanvas.attr('id', 'main-canvas');
let canvasBackground = mainCanvas.rect(inputCanvasWidth.value,inputCanvasHeight.value).attr({fill:'#ddd'});
let listOfShape = [];
let listOfGridLine = [];

btnRemoveGrid.addEventListener('click', RemoveGrid);

inputCanvasWidth.addEventListener('change', function(event){
    mainCanvas.attr({width: this.value});
    canvasBackground.attr({width: this.value});
    RefreshGrid();
});

inputCanvasHeight.addEventListener('change', function(event){
    mainCanvas.attr({height: this.value});
    canvasBackground.attr({height: this.value});
    RefreshGrid();
});

function RemoveGrid()
{
    for(let i = 0; i < listOfGridLine.length; i++)
    {
        listOfGridLine[i].remove();
    }
}

inputGridCellSize.addEventListener('change', RefreshGrid);

function RefreshGrid()
{
    RemoveGrid();
    
    let cellSize = parseInt(inputGridCellSize.value);
    let horizontalLineCount = Math.round(inputCanvasHeight.value / (cellSize - 1));
    for(let i = 1; i < horizontalLineCount; i++)
    {
        let horizontalLine = mainCanvas.line(0, i * cellSize, inputCanvasWidth.value, i * cellSize);
        horizontalLine.stroke({ color: 'black', width: 1, linecap: 'round' })
        listOfGridLine.push(horizontalLine);
    }

    let verticalLineCount = Math.round(inputCanvasWidth.value / (cellSize - 1))
    for(let i = 1; i < verticalLineCount; i++)
    {
        let verticalLine = mainCanvas.line(i * cellSize, 0, i * cellSize, inputCanvasHeight.value);
        verticalLine.stroke({ color: 'black', width: 1, linecap: 'round' });
        listOfGridLine.push(verticalLine);
    }
}

btnAddGrid.addEventListener('click', RefreshGrid);

canvasBackground.on(['click'], function(event){
    console.log("Canvas clicked.");
    UnselectAllElement();
});

inputSvgFile.addEventListener('click', function(event){
    console.log("SVG File click");
});

inputSvgFile.addEventListener('change', function(event){
    console.log("Change input file.");

    let file = event.target.files[0];

    console.log(event.target.files[0]);

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
});

btnExport.addEventListener('click', function(){
    if(draw !== null)
    {
        console.log(draw.svg());
        
    }
});

function UnselectAllElement()
{
    for(let i = 0; i < listOfShape.length; i++)
    {
        listOfShape[i].Unselect();
        listOfShape[i].OnMouseUpCallback();
    }
}

function bindShapeListener(shape)
{
    shape.SVGElement.on(['click'], function(event){
        shape.OnClickCallback(event);
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

btnNewSquare.addEventListener('click', BtnAddNewSquareCallback);

function BtnAddNewSquareCallback()
{
    console.log("Add new square !");

    let square = new Square(mainCanvas, canvasContainer.getBoundingClientRect(), 150, 300, 300, "red");
    bindShapeListener(square);
    listOfShape.push(square);
    console.log(listOfShape);
}