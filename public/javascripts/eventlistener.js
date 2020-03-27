let btnNewShape = document.getElementById('new-shape');


btnNewShape.addEventListener('mouseover', function(){
    console.log("btn new shape mouse over");
});

btnNewShape.addEventListener('click', function(){
    console.log("btn new shape clicked !");
    var draw = SVG().addTo('body').size(300, 300);
    draw.attr('id', 'main');
    var rect = draw.rect(100, 100).attr({ fill: '#f06' });
    
    rect.mouseover(function(){
        console.log("Over the rect");
        this.attr({fill: '#ddd'});
    });

    rect.on(['mousedown'], function(){
        rect.on(['mousemove'], function(){
            let bodyBoundingRect = document.body.getBoundingClientRect();
            let drawBoundingRect = document.getElementById('main').getBoundingClientRect();
    
            let drawXPos = drawBoundingRect.left - bodyBoundingRect.left;
            let drawYPos = drawBoundingRect.top - bodyBoundingRect.top;
            
            
            this.attr({
                x : event.clientX - (rect.width() / 2) - drawXPos,
                y : event.clientY - (rect.height() / 2) - drawYPos
            });
        });
    });
})