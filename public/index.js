var app = function() {
  var canvas = document.getElementById('main-canvas');
  // console.log('canvas', canvas);
  var context = canvas.getContext('2d');
  console.log(context);
  // context.fillStyle = 'red';
  // context.fillRect(10, 10, 50, 50);
  //
  // context.beginPath();
  // context.moveTo(100, 100);
  // context.lineTo(100, 200);
  //
  // context.setLineDash([5, 15])
  // context.stroke();
  //
  // context.beginPath();
  // context.moveTo(200, 200);
  // context.lineTo(200, 300);
  // context.lineTo(100, 300);
  // context.closePath();
  // context.stroke();
  //
  // context.beginPath();
  //
  // context.arc(300, 100, 75, 0, Math.PI, true);
  //
  // context.stroke();

  // canvas.addEventListener('click', function(event) {
  //   console.log('location', event.layerX, event.layerY);
  //   // These clicks are the x and y relative to the canvas. if it's event.x and event.y, it's relative to the window.
  // })







// 'mousemove'


  // canvas.addEventListener('mousemove', function(event) {
  //   draw(event.layerX, event.layerY);
  // });

    // Skimmed an online tutorial, and they use an array to store values, so will try that

  // var start = [];
  // var end = [];
  // var path = [];
  //
  // canvas.addEventListener('onmousedown', function(event) {
  //   start.push({x: event.layerX, y: event.layerY})
  // })
  //
  // canvas.addEventListener('onmouseup', function(event) {
  //   end.push({x: event.layerX, y: event.layerY})
  // })
  //
  // canvas.add
  //


  // canvas.addEventListener('ondrag' function(event) {
  //   draw
  // })

  var radius = 3;
  var paint = false;

  var drawCircle = function(x, y) {
    if (paint) {
      context.beginPath();
      context.arc(x, y, radius, 0, 2*Math.PI, true)
      context.fill();
    }
  }

  canvas.addEventListener('mousedown', function(event) {
    paint = true;
    canvas.addEventListener('mousemove', function(event) {
      drawCircle(event.layerX, event.layerY);
    });

  })

  canvas.addEventListener('mouseup', function() {
    paint = false;
  })

  // canvas.addEventListener('mouseup', function(event) {
  //   drawCircle(event.layerX, event.layerY);
  // })

  var clearCanvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  var changeColour = function() {
    context.fillStyle = this.value;
  };

  var changeBrush = function() {
    radius = this.value;
  };

  var brushPicker = document.getElementById('brush-thickness');
  brushPicker.addEventListener('change', changeBrush);

  var colourPicker = document.getElementById('color-picker');
  colourPicker.addEventListener('change', changeColour);

  var clear = document.getElementById('clear-canvas');
  clear.addEventListener('click', clearCanvas);
}

window.addEventListener('load', app)
