let btnNewSquare = document.getElementById('btn-new-square');
let btnExport = document.getElementById('btn-export');
let inputSvgFile = document.getElementById('input-svg-file');
let mousePressed = false;
let canvasContainer = document.getElementById('canvas-container');
let mainCanvas = SVG().addTo('#canvas-container').size(1000, 800);
mainCanvas.attr('id', 'main-canvas');
let canvasBackground = mainCanvas.rect(1000,800).attr({fill:'#eee'});
let listOfShape = [];

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