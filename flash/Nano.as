package {
	import flash.display.StageAlign;
  import flash.display.StageScaleMode;
	import flash.display.MovieClip;
	import flash.display.Loader;
	import flash.display.Stage;
	import flash.display.StageDisplayState;
	import flash.display.Bitmap;
	import flash.net.NetConnection;
	import flash.net.NetStream;	
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.media.Video;
	import flash.media.SoundTransform
	import flash.events.NetStatusEvent;
	import flash.events.TimerEvent;

	public class Nano{
			private var connection:NetConnection;
			private var stream:NetStream;
			private var video:Video;
			private var stage:*;
		function Nano(){
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
	 		// first let's create the NetConnection
			connection = new NetConnection();
			// let set it to HTTP "streaming" mode, the null is to specify we are NOT connecting to a media server
			connection.connect(null);
			// now let's create the NetStream
			stream = new NetStream(connection);
			// the set it's client to receive certain events 
			//stream.client = this;
			// create a video object, set it to 425x320 as default size, this holds the visual representation of the video
			 video = new Video(425, 320);
			// add it to the stage
			stage.addChild(video);
			// attach the NetStream to the video object
			video.attachNetStream(stream);
			// let's set the default buffer time to 1 second
			stream.bufferTime = 1;
			// tell the stream to receive the audio
			stream.receiveAudio(true);
			// tell the stream to receive the video
			stream.receiveVideo(true);
			// play a FLV file on a HTTP server
			stream.play("http://localhost:8080/learn/github/NanoPlayer/flash/bin/willie.mp4");
		}
	}
	
}