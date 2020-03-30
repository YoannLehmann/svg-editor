let btnNewShape = document.getElementById('btn-new-shape');
let btnExport = document.getElementById('btn-export');
let inputSvgFile = document.getElementById('input-svg-file');
let mousePressed = false;
let canvasContainer = document.getElementById('canvas-container');
let mainCanvas = SVG().addTo('#canvas-container').size(1000, 800);
mainCanvas.attr('id', 'main-canvas');

inputSvgFile.addEventListener('click', function(){
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

function bindShapeListener(shape)
{
    shape.SVGElement.on(['mouseup'], function(event){
        shape.OnMouseUpCallback(event);
    });
    shape.SVGElement.on(['mousedown'], function(event){
        shape.OnMouseDownCallback(event);
    });
    shape.SVGElement.on(['mousemove'], function(event){
        shape.OnMouseMoveCallback(event);
    });
}

btnNewShape.addEventListener('click', function(){
    console.log("btn new shape clicked !");
    console.log()

    //let shape = new Shape(mainCanvas, 50, 100, 100, 100, '#eee');
    //shape.printDescription();

    let square = new Square(mainCanvas, canvasContainer.getBoundingClientRect(), 150, 300, 300, "red");
    bindShapeListener(square);
    let square2 = new Square(mainCanvas, canvasContainer.getBoundingClientRect(), 150, 150, 400, "red");
    bindShapeListener(square2);
    /*
    square.shape.on(['mouseup'], function(event){
        square.OnMouseUpCallback(event);
    });
    
    square.shape.on(['mousedown'], function(event){
        square.OnMouseDownCallback(event);
    });
    square.shape.on(['mousemove'], function(event){
        square.OnMouseMoveCallback(event);
    });
    */
    /*
    rect = mainCanvas.rect(100, 100).attr({ fill: '#f06' });

    rect.on(['mousedown'], function(){
        mousePressed = true;
    });

    rect.on(['mouseup'], function(){
        mousePressed = false;
    });

    rect.on(['mousemove'], function(){
        if(mousePressed)
        {
            let drawBoundingRect = canvasContainer.getBoundingClientRect();
    
            let drawXPos = drawBoundingRect.left;
            let drawYPos = drawBoundingRect.top;
            
            
            this.attr({
                x : event.clientX - (rect.width() / 2) - drawXPos,
                y : event.clientY - (rect.height() / 2) - drawYPos
            });
        }
    });
    */
})