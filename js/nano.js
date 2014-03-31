var Nano = function (el, tracks, config) {
  var _default = {
    videoWidth: 600,
    videoHeight: 480,
    autoplay: false,
    controls: false,
    draggable: true,
  };
  this.el = el;
  this.tracks = tracks;
  Nano.Obj.extend(_default, config);
  this.config = _default;
  this.muted = false;
  this.fullscreen = false;
  this.isplaying = _default.autoplay;
  this.dragReady = false;
  this.dragoffset = {
    x: 0,
    y: 0
  };
  this.player = document.createElement("video");
  this.init();
};
Nano.prototype = {
  init: function () {
    this.buildUI();
    this.events();
    this.load();
  },
  events: function () {
    var self = this,
      play = Nano.find('.nano-play-pause'),
      mute = Nano.find('.nano-mute'),
      wrap = Nano.find('.nano-wrap'),
      volume = Nano.find('.nano-volumeslider'),
      fs = Nano.find('.nano-fullscreen');

    self.draggablePlayer();
    Nano.on(play, 'click', function () {
      self.play(play);
    });
    Nano.on(mute, 'click', function () {
      self.mute(mute);
    });

    Nano.on(fs, 'click', function () {
      self.fullScreen();
    });
    //player events
    Nano.on(self.player, 'timeupdate', function () {
      self.updateTime();
      self.updateProgress();
    });
  },
  buildUI: function () {
    var uihtml, ui = document.createElement('div'),
      wrap = document.createElement("div");
    wrap.className = "nano-wrap";
    // wrap.draggable = this.config.draggable;
    wrap.id = "nano-player";
    wrap.style.width = this.config.videoWidth + "px";
    wrap.style.height = this.config.videoHeight + "px";
    ui.className = "nano-ui";
    this.player.width = this.config.videoWidth;
    this.player.height = this.config.videoHeight;
    this.player.controls = false;
    uihtml = '<div class="nano-controls">';
    uihtml += '<div class="nano-timeline" id="nano-timeline">';
    uihtml += '<div class="nano-buffer" style="width: 53.425665096933315%;"></div>';
    uihtml += '  <div class="nano-progress" style="width: 36.3%;"></div>';
    uihtml += '</div>';

    uihtml += '<a class="nano-play-pause nano-play"></a>';
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
    // this.controlsUiAuto();
  },
  play: function (p) {
    if (this.isplaying) {
      this.isplaying = false;
      this.player.pause();
      p.className += ' nano-play';
      Nano.dom.removeClass(p, 'nano-pause');
    } else {
      this.isplaying = true;
      this.player.play();
      p.className += ' nano-pause';
      Nano.dom.removeClass(p, 'nano-play');
    }
  },
  load: function (i) {
    var self = this;
    i = i || 0;
    this.player.src = this.tracks[i].src;
    this.player.load();
    //this.timeRest();
  },
  mute: function (mute) {
    if (this.muted) {
      this.muted = false;
      Nano.dom.removeClass(mute, "active");
      this.player.muted = false;
    } else {
      this.muted = true;
      mute.className += " active";
      this.player.muted = true;
    }
  },
  volume: function () {
    if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
    else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
  },
  fullScreen: function () {
    if (this.fullscreen) {
      this.fullscreen = false;
      Nano.dom.exitFullscreen();
    } else {
      this.fullscreen = true;
      Nano.dom.requestFullscreen(this.player);
    }
    return this;
  },
  controlsUiAuto: function () {
    var tline = document.getElementById('nano-timeline');
    if (this.config.videoWidth >= 320) {
      tline.style.width = (((this.config.videoWidth - 225) / this.config.videoWidth) * 100) + "%";
    }
  },
  updateTime: function () {
    console.log(this.player.currentTime);
    var current = Nano.find('.nano-elapsed'),
      total = Nano.find('.nano-duration');
    progress = Nano.find('.nano-progress');
    current.innerHTML = Nano.util.formatTime(this.player.currentTime);
    total.innerHTML = Nano.util.formatTime(this.player.duration);
  },
  updateProgress: function () {
    var self = this;
    progress = Nano.find('.nano-progress'),
    buffer = Nano.find('.nano-buffer'),
    progressval = Math.floor((100 / self.player.duration) *
      self.player.currentTime),
    bufferval = self.player.buffered.end(self.player.buffered.length - 1)
    progress.style.width = progressval + '%';
    buffer.style.width = bufferval + '%';
  },
  timeRest: function () {
    this.player.currentTime = 0;
    this.player.duration = 0;
  },
  draggablePlayer: function () {
    var self = this,
      wrap = Nano.find('.nano-wrap');
    Nano.on(wrap, 'mousedown', function (e) {
      self.dragReady = true;
      self.dragoffset.x = e.pageX - wrap.offsetLeft;
      self.dragoffset.y = e.pageY - wrap.offsetTop;
    });
    Nano.on(document.body, 'mouseup', function () {
      self.dragReady = false;
      Nano.off(wrap, 'mousemove');
    });
    Nano.on(document.body, 'mousemove', function (e) {
      if (self.dragReady) {
        wrap.style.top = (e.pageY - self.dragoffset.y) + "px";
        wrap.style.left = (e.pageX - self.dragoffset.x) + "px";
      }
    });
  }
};
//Obect Related functions 
Nano.Obj = {};
Nano.Obj.extend = function (a, b) {
  var key;
  for (key in b) {
    if (b.hasOwnProperty(key)) {
      a.key = b[key];
    }
  }
};
//Events:
Nano.on = function (el, event, fn) {
  el.addEventListener(event, fn, false);
};
Nano.off = function (el, event) {
  el.removeEventListener(event);
};
Nano.find = function (el) {
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
Nano.dom.removeClass = function (el, cn) {
  el.classList.remove(cn);
}
Nano.dom.requestFullscreen = function (el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}
Nano.dom.exitFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

//utilities          
Nano.util = {};
Nano.util.formatTime = function (seconds) {
  var date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  date.getMinutes();
  date.getSeconds();
  date.getHours();
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}