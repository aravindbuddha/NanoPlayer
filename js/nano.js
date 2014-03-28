var Nano = function(el, tracks, config) {
  var _default = {
    videoWidth: 900,
    videoHeight: 480,
    autoplay: false,
    controls: true,
    draggable: true,
  };
  this.el = el;
  this.tracks = tracks;
  Nano.Obj.extend(_default, config);
  this.config = _default;
  this.muted = false;
  this.dragReady = false;
  this.dragoffset = {
    x: 0,
    y: 0
  };
  this.player = document.createElement("video");
  this.init();
};
Nano.prototype = {
  init: function() {
    this.buildUI();
    this.uiOnDemand();
    this.play();
    this.events();
  },
  events: function() {
    var self = this,
      play = Nano.find('.nano-play'),
      mute = Nano.find('.nano-mute'),
      wrap = Nano.find('.nano-wrap');

    $(wrap).draggable({
      helper: function() {
        // Create an invisible div as the helper. It will move and
        // follow the cursor as usual.
        return $('<div></div>').css('opacity', 0);
      },
      drag: function(event, ui) {
        // During dragging, animate the original object to
        // follow the invisible helper with custom easing.
        var p = ui.helper.position();
        $(this).stop().animate({
          top: p.top,
          left: p.left
        }, 1000, 'easeOutCirc');
      }
    });
    console.log(mute);
    Nano.on(play, 'click', function() {

    });
    Nano.on(mute, 'click', function() {
      alert("hi");
      self.mute(mute);
    });
    Nano.on(wrap, 'mousedown', function(e) {
      self.dragReady = true;
      wrap.className += " active";
      self.dragoffset.x = e.pageX - wrap.offsetLeft;
      self.dragoffset.y = e.pageY - wrap.offsetTop;
    });
    Nano.on(wrap, 'mouseup', function() {
      self.dragReady = false;
    });
    Nano.on(wrap, 'mousemove', function(e) {
      if (self.dragReady) {
        // console.log(e.x);
        // var y = wrap.offsetTop;
        // var x = wrap.offsetLeft;
        // console.log(self.dragoffset);
        // wrap.style.top = e.pageY - self.dragoffset.y;
        // wrap.style.left = e.pageX - self.dragoffset.x;
        // console.log(wrap);
        // setTimeout(function() {
        //   var y = wrap.offsetTop;
        //   var x = wrap.offsetLeft;
        //   wrap.style.top = y + e.clientY;
        //   wrap.style.left = x + e.clientX;
        // }, 3000);
      }
    });
  },
  buildUI: function() {
    var uihtml, ui = document.createElement('div'),
      wrap = document.createElement("div");
    wrap.className = "nano-wrap";
    wrap.draggable = this.config.draggable;
    wrap.id = "nano-player";
    wrap.style.width = this.config.videoWidth + "px";
    wrap.style.height = this.config.videoHeight + "px";
    ui.className = "nano-ui";
    this.player.width = this.config.videoWidth;
    this.player.height = this.config.videoHeight;
    uihtml = '<div class="nano-controls">';
    uihtml += '<a class="nano-play">&#9658;</a>';
    uihtml += '<div class="nano-timeline" id="nano-timeline">';
    uihtml += '<div class="nano-buffer" style="width: 53.425665096933315%;"></div>';
    uihtml += '  <div class="nano-progress" style="width: 36.3%;"></div>';
    uihtml += '</div>';
    uihtml += ' <div class="nano-time">';
    uihtml += '   <b class="nano-elapsed">00:14</b>';
    uihtml += '   <b>/</b>';
    uihtml += '   <b class="nano-duration">00:40</b>';
    uihtml += ' </div>'
    uihtml += '<div class="nano-volume">';
    uihtml += '  <a class="nano-mute"></a>';
    uihtml += '  <div class="nano-volumeslider">';
    uihtml += '    <div class="nano-volumelevel" style="width: 50%;"></div>';
    uihtml += '  </div>';
    uihtml += '</div>';
    uihtml += '<div class="nano-fullscreen"></div>';
    uihtml += '</div>';
    ui.innerHTML = uihtml;
    wrap.appendChild(ui);
    wrap.appendChild(this.player);
    document.body.appendChild(wrap);
    this.uiOnDemand();
  },
  play: function() {
    this.player.src = this.tracks[0].src;
    // this.player.play();
  },
  pause: function() {
    this.player.pause();
  },
  mute: function(mute) {
    if (this.muted) {
      this.muted = false;
      mute.className = "active";
    } else {
      this.muted = true;
    }
  },
  uiOnDemand: function() {
    var tline = document.getElementById('nano-timeline');
    if (this.config.videoWidth >= 320) {
      tline.style.width = (((this.config.videoWidth - 225) / this.config.videoWidth) * 100) + "%";
    }
  },
  playerPosition: function() {

  }
};
//Obect Related functions 
Nano.Obj = {};
Nano.Obj.extend = function(a, b) {
  var key;
  for (key in b) {
    if (b.hasOwnProperty(key)) {
      a.key = b[key];
    }
  }
};
//Events:
Nano.on = function(el, event, fn) {
  el.addEventListener(event, fn, false);
};
Nano.off = function(el, event) {
  el.removeEventListener(event, fn);
};
Nano.find = function(el) {
  var
  sbl = el.slice(0, 1);
  el = el.slice(1);
  if (sbl == "#") {
    return document.getElementById(el);
  } else if (sbl == ".") {
    return document.getElementsByClassName(el)[0];
  } else {
    return document.getElementsByTagName(el);
  }
}
//Dom Realted operations
Nano.dom = {};
Nano.dom.removeClass = function(el, cn) {
  el.classList.remove(cn);
}