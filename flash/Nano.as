/*
╠═ f4.Player Sample ═══════════════════════════════════════════════════════
  Software: f4.Player - flash video player sample
   Version: beta 1.0
   Support: http://f4player.org
    Author: f4OS
   Contact: http://f4player.org
 -------------------------------------------------------------------------
   License: Distributed under the Lesser General Public License (LGPL)
            http://www.gnu.org/copyleft/lesser.html
 This program is distributed in the hope that it will be useful - WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.
═══════════════════════════════════════════════════════════════════════════ */
package {
	import flash.display.MovieClip;
	import flash.net.NetConnection;
	import flash.net.NetStream;	
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.media.Video;
	import flash.display.StageAlign;
  import flash.display.StageScaleMode;
  import flash.display.Loader;
	import flash.events.Event;
	import flash.events.ContextMenuEvent;
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;
	import flash.external.ExternalInterface;


	public class Nano extends MovieClip {
		private var nc:NetConnection;
		private var vid:Video;
		private var ns:NetStream;
		//defaults
		private var W:int = 480;
		private var H:int = 270;

		private var video:String;
		private var thumbnail:String;
		private var autoplay:Boolean;
		private var fullscreen:Boolean=false;

		public function Nano() {
			this.Log("init....");
			this.video = this.loaderInfo.parameters.video;
			this.thumbnail = this.loaderInfo.parameters.thumbnail;
			this.autoplay = this.loaderInfo.parameters.autoplay == 1;
			this.fullscreen = this.loaderInfo.parameters.fullscreen;
			this.Log(this.video);

			this.addContextMenu();
			this.addPlayer();
		}
		public function addPlayer():void{
			nc = new NetConnection(); 
			nc.connect(null);
			this.Log(stage.stageWidth);
			vid= new Video(stage.stageWidth,stage.stageHeight); 
			stage.addChild(vid);
			ns = new NetStream(nc); 
			vid.attachNetStream(ns);
			ns.play(this.video); 
		}
		public function addContextMenu():void{
			// CUSTOMIZE RIGHT CLICK CONTEXT MENU
			var menu:ContextMenu = new ContextMenu();
			menu.hideBuiltInItems();
			var signature:* = new ContextMenuItem("NanoPlayer");
			function openLink(e:ContextMenuEvent):void{
				navigateToURL(new URLRequest("http://techumber.com"));
			}
			signature.addEventListener(ContextMenuEvent.MENU_ITEM_SELECT, openLink);
			menu.customItems.push(signature);
			contextMenu = menu;
		}
		public function Log(log:*):void {
			trace(log);
			ExternalInterface.call("console.log",log);
    }

    public function play():void{
    	this.Log("Start Playing Video");
    }
    public function pause():void{
    	this.Log("Pause the video player");
    }

	}
}