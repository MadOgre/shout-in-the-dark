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
        y -= ((formatted.length - 1) / 2) * lineHeight - (lineHeight/4);
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
        // img.onload = cb(img);
        img.src = imgSrc;
      }
      // Define Canvas
      var canvas = document.getElementById('finished-canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define Image
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = imgSrc;

      // // Draw image
      // if(img.complete) {
      //   ctx.drawImage(img, 0, 0, img.width,    img.height,
      //                      0, 0, canvas.width, canvas.height);
      //   vm.drawText(canvas, ctx, text);
      //   vm.toSend = canvas.toDataURL("image/jpeg", 0.5);
      //
      // } else {
      //     img.onload = function () {
      //       ctx.drawImage(img, 0, 0, img.width,    img.height,
      //                          0, 0, canvas.width, canvas.height);
      //       vm.drawText(canvas, ctx, text);
      //       vm.toSend = canvas.toDataURL('image/jpeg', 0.5);
      //     };
      // }
      loadImages(imgSrc, function() {
        var hRatio = canvas.width / img.width    ;
        var vRatio = canvas.height / img.height  ;
        var ratio  = Math.max( hRatio, vRatio )
        ctx.drawImage(img, 0,0, img.width, img.height, img.width-canvas.width, 0, img.width*ratio, img.height*ratio);
        // ctx.drawImage(img, 0, 0, img.width,    img.height,
        //                    0, 0, canvas.width, canvas.height);
        vm.drawText(canvas, ctx, text);
        vm.toSend = canvas.toDataURL('image/jpeg', 0.5);
        angular.element('#dataHolder').data("foo", vm.toSend);
        return vm.toSend;
      });
    }

    vm.drawPreview = function(text) {
      // Define Canvas
      var canvas = document.getElementById('preview-canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      vm.drawText(canvas, ctx, text);
      document.getElementById('canvasImage').src = canvas.toDataURL();
    }

  }

}());
