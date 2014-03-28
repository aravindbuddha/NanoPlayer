var Nano = function(el, tracks, config) {
  var _default = {
    videoWidth: 600,
    videoHeight: 480,
    autoplay: false,
    controls: true,
    draggable: true,
  };
  this.el = el;
  this.tracks = tracks;
  Nano.Obj.extend(_default, config);
  this.config = _default;
  this.player = document.createElement("video");
  this.init();
};
Nano.prototype = {
  init: function() {
    this.buildUI();
    this.uiOnDemand();
    this.play();
  },
  events: function() {

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
  mute: function() {

  },
  uiOnDemand: function() {
    var tline = document.getElementById('nano-timeline');
    if (this.config.videoWidth >= 320) {
      tline.style.width = (((this.config.videoWidth - 225) / this.config.videoWidth) * 100) + "%";
    }
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
Nano.on = function() {

};