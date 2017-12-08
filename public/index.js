var app = function() {
  var canvas = document.getElementById('main-canvas');
  // console.log('canvas', canvas);
  var context = canvas.getContext('2d');

// Meme stuff
  var url = 'https://api.imgflip.com/get_memes'

  var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener('load', callback);
    request.send();
  }



  var requestComplete = function() {
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var memeData = JSON.parse(jsonString);
    global_memes = memeData.data.memes;
    populateMemes(memeData);
  }

  var populateMemes = function(memeData) {
    var memeSelect = document.getElementById("meme-selector");
    memeData.data.memes.forEach(function(meme) {
      var option = document.createElement('option');
      option.innerText = meme.name;
      memeSelect.appendChild(option);
    });
  }

  var displayMeme = function() {
    var pic = document.getElementById('meme-pic');
    var jsonString = JSON.stringify(this.value);
    var memeName = JSON.parse(jsonString);
    var target;
    global_memes.forEach(function(meme) {
      if (meme.name === memeName) {
        target = meme;
      };
    });
    pic.src = target.url
  };

  var select = document.querySelector('select');
  select.addEventListener("change", displayMeme);

  makeRequest(url, requestComplete);

  var getPic = document.querySelector('img');



  canvas.addEventListener('dblclick', function(event) {
    // var img = document.getElementById('meme-pic');
    // var imgDraw = img.src
    context.drawImage(getPic, event.layerX, event.layerY, 100, 100);
  });




// DRAWING FUNCTIONALITY

// How this works is that it populates the x and y array with the coordinates that the mouse drags over when paint is true. Paint is true when the mouse is clicked, and changes to false when the mouse leaves the canvas, or is not clicked anymore. Once the mouse leaves the canvas or is unclicked, the arrays are emptied. dragArray takes in 'true' when x and y coordinates are recorded. Add stroke function does the pushing of the coordinates/boolean.
  var paint = false;
  var dragArray = [];
  var xArray = [];
  var yArray = [];
  var lineWidth = 5
  var strokeStyle;

  var addStroke = function(x, y, drag) {
    xArray.push(x);
    yArray.push(y);
    dragArray.push(drag);
  }

// This draws lines, which sets the current index of the arrays as the moveTo, and then draws the lineTo the next index of the array.

  var draw = function() {
    context.lineJoin = "round";
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    for (var i=0; i < xArray.length; i++) {
      context.beginPath();
      if (dragArray[i] && i) {
        context.moveTo(xArray[i-1], yArray[i-1])
      } else {
        context.moveTo(xArray[i]-1, yArray[i-1])
      }
      context.lineTo(xArray[i], yArray[i]);
      context.closePath();
      context.stroke();
    }
  }

// This one empties the arrays and sets the paint to false.

  var reset = function() {
    paint = false;
    xArray = [];
    yArray = [];
    dragArray = [];
  }

  // DRAWING EVENTS

  canvas.addEventListener('mousedown', function(event) {
    paint = true;
  })

  canvas.addEventListener('mousemove', function(event) {
    if (paint) {
      addStroke(event.layerX, event.layerY, true);
      draw();
    }
  });

  canvas.addEventListener('mouseup', reset);

  canvas.addEventListener('mouseleave', reset);


  // OPTIONS FUNCTIONALITY
  var clearCanvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  var changeColour = function() {
    strokeStyle = this.value;
  };

  var changeBrush = function() {
    lineWidth = this.value;
  };


  // OPTIONS EVENTS
  var brushPicker = document.getElementById('brush-thickness');
  brushPicker.addEventListener('change', changeBrush);

  var colourPicker = document.getElementById('color-picker');
  colourPicker.addEventListener('change', changeColour);

  var clear = document.getElementById('clear-canvas');
  clear.addEventListener('click', clearCanvas);

}

window.addEventListener('load', app)
