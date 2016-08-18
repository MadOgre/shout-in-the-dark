(function() {
  'use strict';
  angular.module('app').service('textify', Textify);

  function Textify() {
    var vm = this;
    vm.toSend = '';

    vm.drawText = function(canvas, ctx, text) {
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var formatted = [];

        // Format user input into line breaks that fit the shout
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            formatted.push(line);
            line = words[n] + ' ';
          }
          else {
            line = testLine;
          }
        }
        formatted.push(line);

        // Centers content based on number of lines in message
        y -= ((formatted.length - 1) / 2) * lineHeight - (lineHeight/4);

        // Draws text from formatted string array
        for (var i = 0; i < formatted.length; i++) {
          context.fillText(formatted[i], x, y);
          context.strokeText(formatted[i], x, y);
          y += lineHeight;
        }
      }

      // Define font and style (can be passed in later for different styles)
      ctx.font = 'bold 64px Arial'
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';

      // Add text
      var maxWidth = canvas.width;
      var lineHeight = 64;
      var x = ((canvas.width) / 2) + 10;
      var y = (canvas.height) / 2;
      wrapText(ctx, text, x, y, maxWidth, lineHeight);
    }

    vm.drawFull = function drawMe(imgSrc, text) {
      // Load images
      function loadImages(imgSrc, cb) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        var intv = setInterval(function(){
          if(img.complete) {
            clearInterval(intv);
            cb(img);
          }
        }, 100);
        img.src = '/proxy/' + imgSrc;
      }
      // Define Canvas
      var canvas = document.getElementById('finished-canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      loadImages(imgSrc, function(img) {

        function getDim(img) {
          var dim = {
            width: img.width,
            height: img.height
          }
          var ratio = canvas.height / dim.height;
          dim.height *= ratio;
          dim.width *= ratio;
          if (dim.width < canvas.width) {
            ratio = canvas.width / dim.width;
            dim.width *= ratio;
            dim.height *= ratio;
          }
          return dim;
        }

        function getCoords(dim) {
          var result = {
            x: 0,
            y: 0
          };
          if (dim.width !== canvas.width) {
            result.x = canvas.width / 2 - dim.width / 2;
          }
          if (dim.height !== canvas.width) {
            result.y = canvas.height / 2 - dim.height / 2;
          }
          return result;
        }

        var dimensions = getDim(img);
        var coords = getCoords(dimensions);

        ctx.drawImage(img, 0,0, img.width, img.height, coords.x, coords.y, dimensions.width, dimensions.height);

        // Adds text
        vm.drawText(canvas, ctx, text);

        // Store ImageURL into a div on DOM
        vm.toSend = canvas.toDataURL('image/jpeg', 0.5);
        angular.element('#dataHolder').data("imageData", vm.toSend);
      });
    }

    vm.drawPreview = function(text) {
      // Define Canvas
      var canvas = document.getElementById('preview-canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw text on blank canvas, set preview in DOM
      vm.drawText(canvas, ctx, text);
      document.getElementById('canvasImage').src = canvas.toDataURL();
    }

  }

}());
