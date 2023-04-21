(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"final_atlas_1", frames: [[0,0,1963,1298]]},
		{name:"final_atlas_2", frames: [[0,0,2025,1231]]},
		{name:"final_atlas_3", frames: [[0,0,2025,1231]]},
		{name:"final_atlas_4", frames: [[0,0,1550,1046]]},
		{name:"final_atlas_5", frames: [[0,0,1275,1056]]},
		{name:"final_atlas_6", frames: [[0,0,942,1127],[0,1536,1556,404],[0,1129,1556,405]]},
		{name:"final_atlas_7", frames: [[0,0,1556,404],[0,406,1556,404],[0,812,1556,404],[0,1218,1556,404],[0,1624,1556,404]]},
		{name:"final_atlas_8", frames: [[1558,1044,403,404],[0,0,1556,404],[0,406,1556,404],[0,812,1556,404],[0,1218,1556,404],[0,1624,1556,404],[1558,0,473,1042]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_21 = function() {
	this.initialize(ss["final_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["final_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["final_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["final_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["final_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["final_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["final_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["final_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["final_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["final_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["final_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["final_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["final_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["final_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AM9PcQABgTALgWQCckuBClNQh1AAiSAcQhQAPi0AsQinAphdAQQiQAZh2gEQgZgBgJgJQgSgUAagpQD/mJCTm9QkaCQj2CFQlKCwjGB4QgTALgJgGQgLgHAEgYICWsVQg6AUhIArQgqAZhTA1QiZBfhuADQCtj9BWklQiRAIiLAYQgGgWAZgQQAVgNAegCIDQgPQAdgCAIANQAFAKgGATQhREGiQDvQBcgWBzhIQCAhWBBgnQAxgcAWAXQAOAOgIAlIiHLqQKvlxEsimQAYgOAVgDQAagEANAQQAQAVgRAsQihGtjvGJQC+AHE0hKID3g7QCOggBsgLQA6gGATAZQARAXgOAxQhXFRiaE8QgRgHABgYg");
	this.shape.setTransform(109.1957,101.8871);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,218.4,203.8), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgbPuQgJgDgGgHQgHgKgEgYQgMhFgbhVQgQgyglhkIgehQQgYhAAegVQAQAiARAuIAbBRIA/DFQAAh1gTiQQgLhYgfiqIgbiWQghi3gThcQgRhZgFghQgIg5gChIQgCgrAAhWIACnzQAAgTAFgIQAEgFAHgCQAIgBAEAFQAFEcgDExQgBBqAHA1QAFAmAOA5IAXBgQAMA6ALBfQAPB6AFAhQAOBZAoCxQAhCfgDBsIgDBbQAAAmAFAdIAKgHQAXgUAMgVIALgZIALgZQAGgLALgPIATgYQAUgaARgmIAbhFIAehUQAEgMAGgDQAHgDAHAEQAIAFACAIQACALgIAUIguB0QgPAmgJASQgMAXgcArIg3BRQgPAXgKAKQgNAOgNAGQACAYgKAHQgFADgFAAIgHgBg");
	this.shape.setTransform(22.0548,100.7273);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,44.1,201.5), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhoZAJvQivgRhmARQAdiWgfiYQgGgeAJgMQAJgMAZgCQAhgCAsAIQAaAFAyALQCvAmCxgaIAMgBQAHgHAMgEQARgGAaACQCwALBOAMQB5ASDvA8QDXAuCSgRQAXgDAtgIIBDgKIBFgHQAqgEAagFQA2gJBNgeICAgyQBLgaBtgUQAbgFARABQAYABAOAMQAMAJAHARQAEAMAFAVQAGAYABAPQABAVgGAQQgJAVgYAPQgQAKgfALQhZAggvAHQgWAEgrADQgtADgVADQggAFg9ARQg+ARgfAFQgbAFgiACIg+ABQi9ADhegEQidgGh8gZIhagUQg6gNghgGQhJgNiFgKIjagQIAACjQAAAagKAJQgHAGgTABIgUAAQhOAAi0gSgEBsTgJlIgCAAIgDgCIgGgJIAGgKQAEgEAGACIAAgEIAPADIAEABQACABACAEIAEAHIgFAIIgDADIgDAAg");
	this.shape.setTransform(696.318,64.0941);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,1392.7,128.2), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ay2E0QgDgGgBgIQgBgfAOgzQAQg8ACgWQACgPAAgaIABgpQADgjAPguQAUg0AIgbQAdhYgXg6IgCABIhmBTQgsAkgWAXQgiAkgQAkIgHASQgFAKgHAFQgIAGgLgCQgLgCgCgJQAdhPBVhOQAZgXAxgoQA0gqAXgUQAQgPALABQAOACAKAVQAGAPAJAsQAPBSAoBNIAMAYQAGAOACALQACAOgDAMQgEAOgKAIIgPgJQABgbgOghIgcg6QgOgdgJgeQgGAhgNAnQgiBmgFAjQgEAbgCA2QgGBOgdBcQgEAPgIAAIgBAAQgFAAgEgGgAvADzQgLgCgCgKQAIgZAQgqQAUgxAGgSQAUhDAMgfQAMgdAYgtQAeg3AIgTQAUgpAOguQgQgHgLgXIgJAOQgSAYgKAWQgJAVgIAGIgIAGIgHAGQgEADgFAKQgMAQgVgCQgJgFADgMQACgIAIgIIAXgXQANgOAHgKQAFgIAHgOIALgWQAGgLAJgKQAIgKAHAAQAFAAAEADIANgIIAaAcIAAgCQAFgVAMAAQAIABAEAKQAHANgDASIgEAPIAFAHQAeApALAnIAGAaQADAQAEAJIANAYQAHAOACAKQADANgHANQgHANgNgBQgRgygKgZQgHgQgCgIQgCgWgDgLQgEgNgWgeIgGgJQghBQgmBMIgfA+QgOAfgTA4QgWA/gJAjQgDANgCAGQgEAKgHAFQgGAFgHAAIgFgBgALuCxQgHgEAAgPIAAihIgFANQgHASgJAGQgGAEgIAAQgIgBgDgGIAuh4IAAhtQAAgMAFgEQAEgFAHACQAHACADAFQACADABAEIAGgDIAEgOQABgNgKgFQAEgHAJgEQAJgDAIACQAIACAGAIQAFAHAAAJQgBAGgDAIIgHANIgEARIgDAPQADANAAAfIgCB4QAAAVABAMQADASAIANIgLAHQgKgBgIgHQgHgHgEgKQgCgFgBgKIAAB2QAAAQgEAHQgDAFgGACIgFABQgDAAgDgCgAMGhPIAAAqIABgtgAVCB9QgXgygBg3QAAgfgDgMQgIgUgCgLQgEgOABggQABgZgCgPIgIgKIgFgKIgBADQgDAKgDAGIgFAIIgEAJIgBANQAAAIgCAEQgBAFgHAHIgLAMQgGAHgEANIgGAVQgFAMgIAIQgKAIgKgCQgGgDgCgIQgCgHADgHQAKgQADgJQABgOADgHQACgGAHgIIAMgNQAGgJADgUQAEgVAFgJQALgQADgJIgEgGQgHgKAFgIIABgBQgCgCgCAAQADgOANgFQALgBAKAHQAHAFACAIIAFgBIARAnIAEANIASAUQAPAQAEAIIAGASQADAFAHAJQAHAKACAFQAEAJgCAJQgDAKgIACQgQgKgQgYIgQgZQAAARADAKIAHAWQAFANACAIQACANgCAcQgCAbAEAPQABAGAHAQQAGANABAIQABANgHAKQgGAKgKAAIgCAAg");
	this.shape.setTransform(139.5614,31.3984);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,279.1,62.8), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhiAjQABgLAHgHQALgKAbgBQAcgBALgFQAIgEAIgKIARgQQAJgGARgGIAXgIQAJgDAJAEQAJAFAEAIQgCAHgJAFIgRAFQgTAFgaAWQgcAYgPAGQgMAFgZADQgaACgMAEQgIgFABgMg");
	this.shape.setTransform(206.0985,36.6769);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EhQRAOMQgHgPALgcQANgggBgMQgBgJgGgOQgHgQgCgHQgCgJACgUQABgTgDgJIgHgOQgEgIgCgGQgDgJACgQQADgTgBgGQgBgIgMgdIgDgIQhpAdg6AMQhuAYhaAFIhYADQgzACgkAGQgdAFg7ARQg6ARgeAGQglAGgvACIhUgBQisgCisAHQjbAJiVAbQh3AXh1ApIAAgnQBygkB0gWQClggDIgKQCagIDXAEQBFABAfgCQA4gDArgMIA0gTQAigMAUgFQAagGAjgCIA/gCQDlgFDXhHQgxgwhSgVQg4gOhhgHQgwgCgHgZQBkgMBkAaQBkAaBRA8QARANAAALQAAATggAIIgCABQAJAaACANQABAIABAVQABASACAKIAGAVIAGAUIABAWQABAOACAIIAGAQIAGAPQAFARgHAaIgMAtQgCANgCAFQgEAKgIACgEBhqANCQgIgDgPgIIgXgMQgJgDgngGQgVgEgmgNIhWgdQhEgXgkgDQgUgCgHgFQgGgDgCgHQgDgIAFgFQAGgHASADQA6ALB2AiIBgAaQArAMAVAJQAjAPAeAXQgIAJgPACIgGABQgJAAgLgEgEBbsAKfQAAgLAIgGQAKgIAagCQA7gFBsghQBvghA3gGIAhgDQATgDANgEIAagKQAQgGALgCQAMgDAVAAIAhgBQAVgCAcgJIAwgQQAygRCJgYQB4gUA/geIAYgKQAOgGAKgCQAOgDAMAEQAOADAIAJQgHAKgPAFIgbAHQgJADgMAGIgUALQgWALgcAIQgRAFgjAIIudDIQgIgEABgLgEBbNAKbQgEgVAbgYQAmgkBAggIAggQQASgKAMgKQANgKAZgZQAXgUAVABQAGADABAHQAAAHgDAGQgDAGgQAMIgnAjQgPAMgZAMIgqAVQhDAjgxA3gEBjQgHQQhhgSgugRIg4gXQhAgahHgJQgPgBgHgCQgNgDgHgHQAEgRAfAAQBCACA+AWIBKAeQAsATAfAEIAdAEQASACALADQAiALAJAZQgHADgKAAQgJAAgLgCgEBdCgJOIgDAAQgfADgGgQQAMgOAUgJQgBgMAAgQQAAgVAFgJQAEgJAOgOIBHhGQAighAVgKQAIgEAIAAQAIABADAGQADAJgNAMIhYBRQggAcgKAXQgGAOACAQIARgDIAtgBQAbAAARgDQAYgFAwgUQBDgbA7gPIAwgMQAbgHAUgHQAOgFA0gYQAogSAbgHQAUgEAogGQAjgHAVgNIAQgLQAJgGAIgDQAIgCAPgBQAQAAAIgDQAHgCAJgGIARgKQAOgHAhgDQBogLBhghIAMAMQgMAeg4APQhIAThFAGQglADgOAIQgTAOgKAEQgHACgQABQgPABgHADQgFACgIAGIgNAKQgJAGgOAEIgYAEQg1AJhkAiIjyBSQhAAWgWAFQgtALhVAKIgGACQgGACgFAAIgJgBgEhMegJdQgSgFgZgCIgvgBIxIgHQgZAAgBgLQAHgMAYgBIP8gLQgugbg4gLQgjgHgKgHQAGgKAPgFQAMgEANAAQAnACAzAWQBBAcATAFQA4AJAaAGQAuAKARAXQgDAHgJAGQgJAGgIABIgEAAQgJAAgPgEg");
	this.shape_1.setTransform(699.825,91.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,1399.7,183.4), null);


(lib.controller1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.controller1, new cjs.Rectangle(0,0,775,523), null);


(lib.controller = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.controller1();
	this.instance.setTransform(387.6,261.4,1,1,0,0,0,387.6,261.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.controller, new cjs.Rectangle(0,0,775,523), null);


// stage content:
(lib._final = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"Credits ":0,"Thank you":48,"open scene w me ":72,"show controller":134,"crappy drawn scuff controller":214," show crowd booing ":245,"me infront of crowd ":275,"show crowd cheering ":314,"show side buttons ":342,"show paddles ":369,"adjustable lengths ":386,"Faster response time":405,breath:428,"cartoon telling friend ":441,"30% off":491,"show ways to contact and customer service screen ":552};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,719];
	this.streamSoundSymbolsList[0] = [{id:"advert",startFrame:0,endFrame:720,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("advert",0);
		this.InsertIntoSoundStreamData(soundInstance,0,720,1);
	}
	this.frame_719 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(719).call(this.frame_719).wait(1));

	// face
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(361.75,-81,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-202.2,249.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-197.2,252.5,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_5();
	this.instance_3.setTransform(-197.2,253.5,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(-197.2,253.5,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_7();
	this.instance_5.setTransform(-197.2,252.5,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_8();
	this.instance_6.setTransform(-197.2,253.5,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_9();
	this.instance_7.setTransform(-197.2,261.5,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_10();
	this.instance_8.setTransform(-197.2,262.5,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_11();
	this.instance_9.setTransform(379.3,267,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_12();
	this.instance_10.setTransform(-197.2,268.5,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_13();
	this.instance_11.setTransform(-197.2,268.5,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_14();
	this.instance_12.setTransform(-197.2,268.5,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_15();
	this.instance_13.setTransform(-197.2,268.5,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_16();
	this.instance_14.setTransform(-415.1,-73.05,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_17();
	this.instance_15.setTransform(-415.1,-73.05,0.5,0.5);

	this.text = new cjs.Text("Theres this really cool controller", "15px 'Times'");
	this.text.lineHeight = 17;
	this.text.lineWidth = 204;
	this.text.parent = this;
	this.text.setTransform(302.55,329.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AUhF2QiEgGhfheQhkhlAAiOQAAiNBkhlQBlhlCOAAQCOAABkBlQBmBlAACNQAACOhmBlQhOBPhpARA0gF2QiRgFhphpQhuhtAAibQAAiaBuhuQBuhtCbAAQCbAABtBtQBuBuAACaQAAAhgFAgAvECtQgbAxgqAqQhYBZh2AS");
	this.shape.setTransform(425.65,411.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3300CC").s().p("AhMFPQgPgGgVgaIgCgCQgagkgNgVQgSgigCgeQgDgbAKgnQAPgsAFgXQAIgmgFh+QgEhmAdg3IAHgMQAOgUASAAQANgBALALQAGAFAEAHQADAEACAGQAFAUgIAjQAMgLAHgUIAMglQAGgUALgOQAOgPASgBQAQgBAPAOQAGAGAEAIIAAgCQApAAAYAHQAKAEAHAFQAOAMABAVQAAATgJATQgQAggBAFIgDAbQgCAkgNAaIgeAGIAPBGQANA0ARAmQAUAuAEAOQAKAigLAZQgLAegsAUQhFAggFAEQgHAFgKAKIgJAJIgZAXQgZATgWAAQgJAAgJgDgAgHjQQgNAMAAAjIAABLQACArgJAXQgEAOgOAaQgHAVAAAsIAAB2QAAAzAQAUIAtgHQASgjgDhBQgChOAGgaQADgMAJgaQAJgYADgNQAEgUAAggIgBg2IABgjQgBgVgGgNQgHgQgSgIQgIgDgHAAQgJAAgHAGgAhCjGIAAAvIAPggIABgBQAAgQAHgGQgMAAgLAIg");
	this.shape_1.setTransform(571.3798,496.1912);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#003300").s().p("AAsEGQgYgDglgjIgbgaIgWgTQglgigNgWQgXgmAMgjQAFgRAYgaIAHgHIAFABQAVALA3AKQAlAGAOAOQAqAHAxABIAABTQACBHgYAfIgJALQgJAHgLAFQgNAFgNAAIgLgBgAAqCbIAJAGIACgQQgHAEgEAGgAAQg2QgdgGgOgKIgYgUIgGgGIAIgOQAIgPACgHQAGgQgBgzQgCgqAQgTQAHgDAJABQAFAAAHACQANAGAJAMQAPAVAAAjQAAANgCAQQgDAVgHAbIADAAQAKADAIAIQAAg1AfgEQAMgCALAHQALAHAFAMQAIAQAAAhIAAAwQgogDhMgRg");
	this.shape_2.setTransform(294.8377,488.6786);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AzuHSQAAgkgPgVQgJgLgOgGQgHgCgGAAIAAh+IAAgLQiRgFhphpQhthtAAiaQAAibBthuQBuhtCcAAQCaAABuBtQBuBugBCbQAAAhgEAgQg3gBAGAXQACAFAEAEQgEAHABAKIAAAGIgpABQgTAAgOALQgPAMAJAMQAGAIAQACQAmAEAeADQgbAxgqAqQhYBYh2ATQACANAAARIAACgQAAAagFALQgJAPgOADQACgQABgNgAV6GvQgMgLgNABQgSAAgOAUIAAgIQAAgZgDgNQgCgJgGgLIgKgWQgMgZAAg6IABgRQiEgGhfheQhkhmgBiMQABiPBkhkQBlhlCOAAQCOAABlBlQBkBkABCPQgBCMhkBmQhPBOhqASIADAcQABAVADAKQADAKAJARQAJASACAJQAKAegPAyQgFgGgFgFg");
	this.shape_3.setTransform(425.65,423.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("EhECAVbQg+AAgfgDQgigFg4gNQhCgQgYgFQhBgLhSACQg2ADhfAKQgsAFgcgDQgngEgYgVQDcg7DfAoQDmAXDbAKQGpATKUgUIGVgOIAAgDQAAgRABgNIA5AAIgBABQgEALgBAIIgCALIBXgDQE/gLDggCIC7AAQADgUAEgNQAOgdAEgPQAGgUABgpIAAiwQgBgtgIgUQgPgXgEgOQgDgJAEgKQADgLAKgEIAEgCIAbAbQAlAiAZADQASADATgHQAKgFAKgHIABAbQADAbASAyQALAoAABVQAABEgCAiQgCApgGAiIC/ADIIBAHIABgLIgBgQIAyAAQAAAOgBAOIAGAAQFSACHSgGQEKgEIYgJICEgCIAAgMQgDgeAEgRQADgNAIgWIAOgjQAIgfgFhCQgDgaAEgOQAVAaAPAGQAeALAjgbIAagXIAJgJQADAOgBAUIAADDQgBAXAGAIQAFAIALALIAAABQI5gHKhgBQIJAAQTAEQGLABDGAEQFJAHEGAVMhc5AAkIgGABIgDgBMgs2AARQi6ACiDgDIgFACQgMAFgRAAgA6lSDQACBKgMAmIgJAZIAiAAIAAgCQgDgOABgaIADhqQAAg9gHguQgFgbgFgYgAPHTPQgIAJgCAFQgDAKABAdIASAAQgCgLAAgNIAAgiIgEAFgAs8URQgHgBgEgEQgJgEgDgMIA+AAIgBAFQgDAIgGADQgHAFgLAAIgLAAgEgoiAT8IArAAIgDAPIgfAFQgHgIgCgMgAPJOXIAAh1QAAgtAIgUQANgbAFgPQAIgXgBgqIgBhMQAAgjANgMQAOgLASAJQASAHAHAQQAGAOABAUIgBAjIABA2QAAAggEAVQgDANgJAYQgIAagDAMQgHAaADBPQACBBgRAiIguAIQgQgVgBgzgA6lKsQgOgPgmgGQg3gKgVgLIgFgCQglgXgBglQAAgUAQgQQAQgOATADQAKADAKAIIAHAGIAXAUQAPAKAdAHQBNAQAoADQA6ADBUgRQAvgJBfgVQAdgFAPAJQATANgFAbQgFAagVANQgXAQg0AHQhuAQg4AEQgoADgjABQgxgCgqgGgA13AoQgegCgmgFQgQgCgGgIQgJgMAPgLQAOgLATgBIApAAIBDgBQA+gEAogWQArgXAgg0QASgdAghIQAfhFAUgfQAhgyAsgVQAbgNAmgFQAZgEArAAQCngCBTACQCLAEBtASQBdAPC8AnQCiAZBzgeQBCgSAjggQAbgYATgoQAMgbAPgwQAhhqAah+QARhVgEg6QgFhQgpgxQgggog9gYQgngPhLgPIkfg8QmBhPjGgbQlGgskFAUQhuAHhOAWQhkAahFA1Qg0ApgUAsQgMAdgFAoQgCAYAAAvQABBLAGAnQAJBAAaArQAdAzBGAzQAnAdBRA3QBpBSBPCZQBDCBgZBZQgQA5g4AfQg4AggwgeIgHgEQgEgEgCgFQgGgYA3ABIADAAQAhABAbgbQAZgaAGgkQAJg1glhPQgrhbhBhLQhDhMhSg2IhDgrQglgagXgZQg0g3gQheQgMg+AChvQABgzADgYQAFgqAMgfQAehIBeg9QBcg9BegTQAygKBEgBIB3ADICsADQBqABBBADQCRAICyAfQBsASDTAtIHJBhQBGAOAkARQAmARAdAdQAdAdATAkQAlBMgLB9QgIBRgaBjQgPA5gmB2IgSA1QgNAdgPASQgfAng/AZQhQAghlADQhTADhmgRQgjgHiVgfQhvgYhIgHQhHgGiNABIi/ADQgsABgVAEQgkAGgXASQgaAUgaA4Qg2B3gSAeQgwBRg/AfQgxAZhFABIgIABQgVAAgcgDg");
	this.shape_4.setTransform(469.15,424.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,1,1).p("AUhF2QiEgGhfhfQhkhlAAiOQAAiNBkhlQBlhkCOAAQCOAABkBkQBmBlAACNQAACOhmBlQhOBPhpARA0gF2QiRgFhphpQhuhtAAibQAAiaBuhuQBuhtCbAAQCbAABtBtQBuBuAACaQAAAhgFAfAvECtQgaAxgrAqQhYBYh2AS");
	this.shape_5.setTransform(438.65,413.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AzvHSQAAgkgOgUQgJgMgNgGQgIgCgGAAIgBh+IABgLQiRgFhohpQhthtAAiaQAAibBthuQBuhtCaAAQCcAABtBtQBuBuAACbQgBAhgFAgQg3gBAIAXQABAFAEAEQgEAHABAKIAAAHIgpAAQgSAAgOALQgQAMAJAMQAFAIASABQAlAFAdADQgaAxgqAqQhYBYh1ATQACANAAARIAACgQAAAagHALQgIAPgNADQABgRAAgMgAV5GvQgLgLgNABQgRAAgOAUIgBgIQAAgZgCgNQgDgIgGgMIgLgWQgLgZAAg6IABgRQiEgGhfhfQhlhlABiNQgBiOBlhlQBlhkCOAAQCOAABkBkQBlBlAACOQAACOhlBkQhPBPhoASIACAcQAAAVAEAKQADAKAJARQAJASADAJQAJAegQAyQgDgGgHgFg");
	this.shape_6.setTransform(438.65,425.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("EgsMATJIjCgRQh8gLhHgFQj8gQlSALQl7ARi9ACQlFADjugoIGRgKQHMgLDmgJIEvgLQCqgECEAJQBJAEB3ANIDAAUQDdAUFnABQDcABEGgFQABgPAEgKQAOgdAEgQQAHgTgBgqIAAivQABgtgKgUQgOgYgEgNQgDgKAEgKQADgKAKgEIADgCIAcAaQAmAjAYADQATADARgHQAMgFAIgHIACAbQADAbATAxQAKApAABVQAABEgCAiQgCAhgEAcQDVgFFfgKIGCgMQHagODsAAQEYgBIqAPQAAgPACgLQACgNAKgWIAMgjQAJgfgEhCQgEgaAEgOQAVAaAPAGQAeALAjgbIAagXIAJgJQACAOgBAUIAADDQAAAQADAJICOAEQHOgEIPgBQIJAAQTADQGLACDGAEQFJAHEGAVMgwuAASIAAAFIhXAAQAOAIAMAJIoUgOIhugDI9rAAIjvAGIpCANQlEAGj/AAQmMAAj/gUgA6ZQjQABBKgMAmIgFAPIAcgBQgBgNABgTIADhqQAAg8gHguQgFgcgFgXgAPRRvQgGAIgDAGIgCAJIAQABIAAgdIgFAFgEgqZASJIArAAIgDAPIgfAFQgHgIgCgMgAPUM3IAAh2QABgsAGgVQAOgbAEgOQAJgXgCgrIAAhLQAAgjANgMQANgLATAIQASAIAHAQQAGANABAVIgBAjIABA2QAAAggEAUQgDAOgIAYQgJAagEAMQgFAaABBOQADBBgSAjIguAHQgQgUAAgzgA6aJLQgOgOgmgGQg3gKgWgLIgEgCQglgYgBgkQAAgUAQgQQAQgPATAEQAKACALAJIAGAGIAYAUQAOAKAeAGQBMARAoADQA6ADBUgRQAvgJBfgVQAdgFAOAJQAUAMgFAcQgFAagVANQgWAQg2AHQhuAQg4AEQgmADgkAAQgxgBgqgHgAIlAXIingCQguAAgWgKQgcgLgcgoQglg1gLgLQgnglhOgNQhagJgqgKQAAAJgHAGQlPhfk9iEQhBgbgegLQg2gTgsgGQgMgBhbgFQg+gDgmgOQgbgJglgYQgzgggLgGQgpgWhFgVQhdgcgUgIQhBgZg1glQgxghgUgiQgTgkAAhFQAAh/AphZQAYg0AmgnQAogqAzgTQAmgPA0gEQAegDA+ABILbAOQDdAEBxAIQC5AOCPAjQAeAICEAmQBiAcBBAMIBCALQAmAHAaALQAiANAYAWQAaAZAJAfQAMAtgaAyQgVApgsAnQh6ByigAxQgbAIgJgMQgHgJAHgNQAGgLAMgIQAfgWA1gaIBXgrQBng2AlhBQAYgsgNggQgIgVgZgNQgRgJgggIIjgg9IibgoQhXgVhEgMQh6gViYgIQhfgFi0gDIrhgKQg3gBgeADQguAGghARQg+AiguBiQg5B2AXBSQAOA0AsAqQAnAlA4AYQAfANBzAhQBcAZAxAgIAvAiQAcATAWAHQAVAIAhAAQASAAAlgBQBqAACNA4QBRAgCfBGQAfALCoA0QBrAgBEAhQABgNAKgGQAIgGAOADQAIABARAHQAdAMB1ASQBbANAoApQAHAIAjA0QAZAlAZAMQATAIAnACIB4AHIgLgFQg8glgphTQgPgfgMgkQgRgzgUhgQgNg/gGgqQgFgwgHgTIgJgYQgFgOgBgLQAAgOAJgLQAIgMAMABQAYABAIAsIAuD7QAJA3AMAZQAFAJAQAZQANAWAGAOIAGAYQAFAPAEAJQAKAPAbARQAeATAJAMQAMARgFANQgDAIgIADQARACAGAFQAHAEADAIQADAIgDAHQgGALgWAAIgEAAg");
	this.shape_7.setTransform(481.05,436.0857);

	this.instance_16 = new lib.controller1();
	this.instance_16.setTransform(374.95,476.2,0.0742,0.0742,0,0,0,387.4,261.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("AUhF2QiEgGhfhfQhkhlAAiOQAAiNBkhlQBlhkCOAAQCOAABkBkQBmBlAACNQAACOhmBlQhOBPhpARA0gF2QiRgFhphpQhuhtAAibQAAiaBuhuQBuhtCbAAQCbAABtBtQBuBuAACaQAAAhgFAfAvTDGQgXAjgfAfQhYBYh2AS");
	this.shape_8.setTransform(438.65,413.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC99").s().p("AzvHSQAAgkgOgUQgJgMgNgGQgIgCgGAAIgBh+IABgLQiRgFhohpQhthtAAiaQAAibBthuQBuhtCaAAQCcAABtBtQBuBuAACbQgBAhgFAgQgtgBgDAQQgOgGgLgLIg1A6IAGALQgNAMAIALQAFAIASABIAIABQATATAZANQgXAjgfAfQhYBYh1ATQACANAAARIAACgQAAAagHALQgIAPgNADQABgRAAgMgAV5GvQgLgLgNABQgRAAgOAUIgBgIQAAgZgCgNQgDgIgGgMIgLgWQgLgZAAg6IABgRQiEgGhfhfQhlhlABiNQgBiOBlhlQBlhkCOAAQCOAABkBkQBlBlAACOQAACOhlBkQhPBPhoASIACAcQAAAVAEAKQADAKAJARQAJASADAJQAJAegQAyQgDgGgHgFg");
	this.shape_9.setTransform(438.65,425.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("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");
	this.shape_10.setTransform(481.05,289.4402);

	this.text_1 = new cjs.Text("ONTONIX", "120px 'Times'", "#FF0000");
	this.text_1.lineHeight = 122;
	this.text_1.lineWidth = 556;
	this.text_1.parent = this;
	this.text_1.setTransform(190.05,81.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},72).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},7).to({state:[{t:this.instance_9}]},2).to({state:[{t:this.instance_10}]},6).to({state:[{t:this.instance_11}]},7).to({state:[{t:this.instance_12}]},7).to({state:[{t:this.instance_13}]},5).to({state:[]},5).to({state:[{t:this.instance_14}]},138).to({state:[{t:this.instance_15}]},44).to({state:[]},28).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{x:294.8377,y:488.6786}},{t:this.shape_1,p:{x:571.3798,y:496.1912}},{t:this.shape},{t:this.text,p:{x:302.55,y:329.4,text:"Theres this really cool controller",font:"15px 'Times'",lineHeight:17,lineWidth:204,color:"#000000"}}]},99).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2,p:{x:307.8377,y:490.5786}},{t:this.shape_1,p:{x:584.3798,y:498.0912}},{t:this.shape_5},{t:this.text,p:{x:345.15,y:333.8,text:"Oh really? what's it called ",font:"19px 'Times'",lineHeight:21,lineWidth:190,color:"#000000"}}]},17).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_2,p:{x:307.8377,y:490.5786}},{t:this.shape_1,p:{x:584.3798,y:498.0912}},{t:this.shape_8},{t:this.instance_16},{t:this.text,p:{x:190.05,y:81.8,text:"ONTONIX",font:"120px 'Times'",lineHeight:122,lineWidth:556,color:"#FF0000"}}]},17).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_2,p:{x:307.8377,y:490.5786}},{t:this.shape_1,p:{x:584.3798,y:498.0912}},{t:this.shape_8},{t:this.instance_16},{t:this.text_1},{t:this.text,p:{x:230.05,y:200.1,text:"Get 30% off your controller ",font:"44px 'Times'",lineHeight:46,lineWidth:500,color:"#FF0000"}}]},8).to({state:[]},8).wait(229));

	// crowd_cheering
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(1,1,1).p("EAnigGjMAk4AAAIAANHMiYzAAAIAAtHIR2AAEg6dgDbMBi7AAA");
	this.shape_11.setTransform(479.025,366.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("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");
	this.shape_12.setTransform(479.025,268.2397);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11}]},314).to({state:[]},28).wait(378));

	// crowd_booing_
	this.instance_17 = new lib.CachedBmp_18();
	this.instance_17.setTransform(-10.45,-9.45,0.5,0.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFFF00").ss(1,1,1).p("EAniAAAQAAGMrlEXQrlEYwYAAQwXAArlkYQrlkXAAmMQAAmKLlkYQLlkYQXAAQQYAALlEYQLlEYAAGKg");
	this.shape_13.setTransform(455,543.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,1,1).p("EBK2ggpIAyAAIAABaAMUi8QgTgFAAgGQAAgEAGgDQAHgEAQgDQAegFApAAQAqAAAdAFQAdAGAAAIQAAAIgdAFQgdAGgqAAQgpAAgegGQgFgBgFgBgAMHjOQgPgbAAghQAAgzAkgjQAjgkAyAAQABAAAAAAQAQAAAOADQAgAIAZAZQAkAjAAAzQAAAygkAkQgkAlgzAAQgyAAgkglQgEgEgEgEA1am1QAAAMgbAJQgbAJgmAAQgmAAgbgJQgHgCgFgDQgPgHAAgJQAAgEAEgEQAGgHARgFQAbgJAmAAQAmAAAbAJQAbAJAAALgEg5BgFmQAAAxgjAjQgjAkgyAAQgxAAgkgkQgMgMgIgOQgNgGAAgHQAAgEAEgEQgGgRAAgUQAAgyAjgjQAgggArgDQAFAAAFAAQALAAALABQAkAGAbAcQAjAjAAAygEBBngGsQgKgYAAgbQAAg4AogoQAhghAugFQAIgBAIAAQAHAAAIABQAuAEAjAiQAnAoAAA4QAAA4gnAoQgoAng4AAQg4AAgngnQgJgKgHgJEBBngGsQAIgGAUgFQAigIAxAAQAwAAAiAIQAjAIAAANQAAALgjAJQgiAIgwAAQgxAAgigIQgIgCgGgCQgUgHAAgJQAAgGAGgEgEAqkgIOQgVgcAAgmQAAguAhgiQAcgbAmgFQAHgBAHAAQAIAAAIACQAlAEAbAbQAhAiAAAuQAAAvghAhQghAigvAAQgvAAghgiQgDgCgCgDQgMgCAAgEQAAgBAFgCQAGgCAPgDQAagCAlAAQAkAAAaACQAaAEAAAEQAAAFgaADQgaADgkAAQglAAgagDQgIgBgGgBEBMaATiIAANIMiYzAAAIAAtIEhLngfPIAAhaIAyAA");
	this.shape_14.setTransform(479.025,200);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF33").s().p("AIRCrIgKgCQgTgFAAgGQAAgEAGgEQAHgDAQgEQAegFApAAQApAAAeAFQAdAGAAAJQAAAIgdAFQgeAGgpAAQgpAAgegGgEhAdAA+QgLgDgHgDQgNgFgBgIQABgEAEgDQAHgGAUgFQAggIAsAAQAtAAAfAIQAfAIAAAKQAAALgfAIQgfAHgtAAQgsAAgggHgEA92gApIgPgEQgTgHgBgJQAAgFAHgEQAIgHAUgFQAigHAwgBQAxABAiAHQAiAJAAAMQAAAMgiAIQgiAJgxAAQgwAAgigJgA8Eg6IgMgFQgPgHAAgJQAAgEAEgEQAGgHARgGQAbgJAmAAQAmAAAbAJQAbAJAAAMQAAAMgbAJQgbAJgmAAQgmAAgbgJgEAmsgCdIgOgDQgMgCAAgDQAAgCAFgBQAGgDAPgCQAagDAkAAQAlAAAaADQAaADAAAFQAAAFgaADQgaADglAAQgkAAgagDg");
	this.shape_15.setTransform(505.95,164.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("EggFAtjQrlkYAAmLQAAmMLlkYQLlkXQYAAQQXAALlEXQLlEYAAGMQAAGLrlEYQrlEXwXABQwYgBrlkXgAMD1eIgIgIIAKACQAeAGApAAQAqAAAdgGQAdgFAAgJQAAgIgdgGQgdgFgqAAQgpAAgeAFQgQAEgHADQgPgaAAghQAAgzAkgkQAjgkAyAAIABAAQAQAAAOADQgOgDgQAAIgBAAQgCiPAdiJIAShPIAShKQADgMAEgGMglRAAAQAGAEgBAPIgODvQAoACAcAdQAfAeAAAsIAAAGQgCAogdAcQgfAfgrABIAAAAQgsAAgfggQgJgIgGgKIAMAFQAbAJAmAAQAmAAAbgJQAbgJAAgMQAAgMgbgJQgbgJgmAAQgmAAgbAJQgRAGgGAHQgFgPAAgRQAAgsAfgeQAWgWAcgHIACgoIADg4QAFhgAGgvQACgMAEgGIAEgDMgjdAAAIABANIABBaQAAAugFAWIgHAbIgHAaQgEASABAfQABAlgCAOQgCAQgHAXQgLgCgLAAIgJAAQALgbABgwQAAg9AEgSIANgwQAEgXAAgtQgBg5gFgYIgCgKIxcAAIAAyIIAeAAMCXPAAAIAdAAIAAFeIAzAAIAAMqIpcAAQAMANADAXQACAOgCAjQgCApAIBRIACATIgPAAIgQAAIAAgIIgHibQgBgggJgPIgGgLIgCgFI2sAAQAIAEADAPQADAOgEAWIgHAmQgDARABAaIgQgBIgOABIAOgBIAQABQAlAFAbAbQAhAhAAAvQAAAvghAhQghAhgvAAQgvAAghghIgFgGIAOADQAaADAlAAQAkAAAagDQAagDAAgFQAAgFgagDQgagDgkAAQglAAgaADQgPACgGADQgVgdAAglQAAgvAhghQAcgcAmgEIAAgOQgBggAFgRQAGgRgBgHQgBgEgGgLQgGgRAIgLQACgEAEgCI8nAAQACAHgFANQgpB9gPCDQgJBRgBBhQAgAIAZAZQAkAkAAAzQAAAygkAkQgkAkgzAAQgyAAgkgkgEg8ngW8QgMgNgIgOQAHADALADQAgAHAsAAQAtAAAfgHQAggIAAgLQAAgKgggIQgfgIgtAAQgsAAggAIQgUAFgHAGQgGgSAAgUQAAgyAjgjQAgggAsgDIAJAAQALAAALACQAkAGAbAbQAjAjAAAyQAAAxgjAkQgjAjgyAAQgxAAgkgjgEBBsgYqQgJgJgHgKIAOAEQAiAJAxAAQAwAAAigJQAjgIAAgMQAAgMgjgJQgigHgwgBQgxABgiAHQgUAFgIAHQgKgYAAgbQAAg4AogoQAhgiAugFIAQAAIAPAAQAuAFAjAiQAnAoAAA4QAAA3gnAoQgoAog4AAQg4AAgngog");
	this.shape_16.setTransform(481.525,319.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_17}]},245).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},69).to({state:[]},28).wait(378));

	// stage_idn
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#330000").ss(1,1,1).p("EhORgSbMCcjAAAMAAAAk3MicjAAAg");
	this.shape_17.setTransform(491,526.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#330000").s().p("EhORAScMAAAgk3MCcjAAAMAAAAk3g");
	this.shape_18.setTransform(491,526.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_18},{t:this.shape_17}]},245).to({state:[]},97).wait(378));

	// scuff
	this.instance_18 = new lib.CachedBmp_19();
	this.instance_18.setTransform(196.35,26.35,0.5,0.5);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(214).to({_off:false},0).to({_off:true},31).wait(475));

	// contorller
	this.instance_19 = new lib.controller();
	this.instance_19.setTransform(479.65,317.85,1,1,0,0,0,387.6,261.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999999").s().p("ANYQAQgTgGgUgWIgggmIgegfQgSgSgGgPQgIgSAAgZQABgRAEgbQAciPAMhIQAUh8ABhcQAAhdgThzQgMhHgfiGQgfiFgPg1IgZhTQgPgxgGgkQgIgsgDg4QgBgkAAhBIACluIBYgYQAagGAagEQAvADAvgBQAvDKgBDQIgBBqQAAA/AGAsQADAbAJAuQALA1ADAUQAPBegHCEQgCAnABARQACAeALAWQASAhBAAiQBEAkAUAcQAKAOAJAXIAOAnIAUAuQAMAbADAUQAFAbgGAoIgKBCQgEAlAGBCQAHBIgCAeQgEBMgiBDQgOAcgRALQgOAJgbACQglADgHABQgVAFgYAQIgpAdQgpAdggAAQgLAAgKgDgAv6P2QhRgTgkg/QgPgbgGgmQgEgYgDguQgGhpAFg1IAHhIQAEgqgFgeQgCgLgYhLQgQgzAGgiQAHgoAkgkQAagaAvgbQA7giATgOQApgeARgjQAMgXAEghQADgSABgnIARpMQAChNAEgjQAHg+AQguIAdhHQAPgpAAggICYAAQAvAKA5AEQAGAMgCAWQgMCegkCgIgWBbQgMA1gFAoQgFAsAAA9IABBpQABB1gPDKQgQDlgCBcQgCBbAMA1QAFAUAPAsQANApAFAXQAGAggBApQgBAYgEAxQgCAZgEAOQgFAVgMANQgMAOgWAJIgpAOQgXAIgmAUQgrAVgSAIQgvASgwAAQgcAAgcgGgAoEPBQgXgQgLgkQgEgMgJg2QgJg0gmhrQgXhAgMguIgEgUIgCgHIgEgWQgKhPAUh4QAPhXAVgzIAghBQAUgoAJgaQAOgrACg8IgBhrQgBhRAQihIA4o6IBIgBIClgFQgEBDgaBqQggCGgEA7QgCAbABA0QAAA1gBAZQgDAsgNBEQgRBZgDAVQgUCSAeCOQAGAdAOA5QAMAzACAjQABAPgBA0QAAApAEAZQADASAJAkQAKAjADASQAEAcgDA5QgDA4AEAcQAEAbAOA1QAIAugMAeQgJAVgYAWIgrAjIgrAoQgaAZgUAMQgaARgeADIgKABQgZAAgUgOgAGEOeQg8gGgkggQgjgggLg6QgJgrAGg/QASjgBcjRQAbg6AHgbQAIgiAAgsQAAgcgFg0IgmmiQgglegUitQAsAEAiAAQBVABBCgNIAPgEQAGFbAaFMQAHBsAQA9IAZBVQAQAyADAjQACARAAAxQgBAqAFAYQADARANAoQAMAjACAVQAGArgUBAQgeBegCAMQgGAcgCArIgDBHQgEA0gVBiQgFAXgEALQgHASgKALQgNAMgVAHQgNAEgaADQgyAHgjAAIgZgBgAI9vdQAAgagJgLIAQAHQAMAIACAZIgUAFIgBgIgAJxvvIAgAEIggAJgAnJv2ICAAMIgoACQgvACgqAAg");
	this.shape_19.setTransform(434.0194,185.1782);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AZ5U/Qg0grhkhYQhwhig8gtQhkhLhbgoIhEgdQgogRgagQIgPgJQAHgIgIgGQgEgCgHAAI48gNQiDgBhBABQhuAChXAIQgpADgsAGQgCgCgDgBQgGgDgJAAQhOABhLAYQhLAYhBAsQgpAdgtArQgcAag0A3IiPCZIBKj0QAsiRAUhJQAhh6AShjQAaizARhZQAfiZA4hiQANgYAsg/IABgBQACAVAGAZIAaBqQAEAbgCAlIgEA/QgFBOAHCBQADAwAFAaQAJAoAUAaQAgAqBQAYQBjAdBFgWQAXgIAngXQArgYATgIIA1gSQAegLAQgQQAcgdAHhAQADggABgfQAIAiAGAjIAKA4QAIAfAPAUQAdApA4AFQA3AGAsgeQASgMAcgdQAfggANgLQAOgLAggWQAagVAJgVQAJgUgBgcQgBgLgGgmQgGglgJhzQgJiAgajdQgJhPgHgnIgQhGQgJgpgEgdQgJhNATh5QAaimACghQABgZABg9QABg3ACgfQAGg5AfiBQAchzAEhDQBRgBAbABQBFAECiAYQBCAKA1AGQAHAdAFAhQAEAhAGBEIBIMNQAEAyAAAXQABAogIAfQgFAXgLAcIgWAxQhnDogFEBQgCBJATAnQAQAjAjAZQAgAWAoAKQA/APBfgPQAegEASgGQAZgJAPgPQAOgPAIgXQAFgPAGgdQAShhADgsIADhKQACgsAGgeQAFgUARgvQAPgrAFgZQAIgrgKg+IgShqQgEgZgFgxQgFgzgEgYQgFgjgOg5IgVhbQgPhHgJhbQgFg5gFhrQgMjrgGj9IAVgFQACCEgDCQQgCBZABAgQAABFAHA1QAHA3ASBJIAiB+QAfB0AZB1QAVBlAJBOQAMBhgCBTQgCBMgPBeQgIA3gXByQgJAsgCAYQgDAmAIAeQAKAlAfAkQATAXArAlQARAQAKAHQAQALAPADQAnAJA4goQBCgvAcgFQAIgBAjgBQAagBAPgHQAUgJAOgXQAKgPALgeQAOglAGgVQAKghACgcQADgdgFgvQgHg6AAgSQgBgeAIhLQAHhCgEgmQgEghgNgmQgIgXgTguQgMgcgIgPQgOgXgQgNQgQgMgkgMQglgNgPgKQgYgRgNgeQgMgagCghQgCgYADgkIAEg9QADhFgYh5QgbiGgDg4QgBgkAHhvQAGhbgIg3QgCgKgXhgQgPhAAEgqIABgXQAAgJgCgGQAwgCA0ADQBwAECrAcQgQGqAJDXQAOFkBKESQAqCYBiD0QB3EnAhBiQA1CdA5DqIBEEbIg7gwgAr2kXQAKh9ABhRIAAiUQAAhYAGg7QAGhAAvjVQAliqgGhrIAAgDIAxABIgXFKQgJCFgNBBIgKAyIgJAyQgIA0ACBKIADB+QABBMgNAvQgIAdgWApQgdA5gFAMQgKAYgIAcIALiJgAzTlRQAChkgciFQgjiZgPhMQgZiFAFhiQACg0ANhMQAQhWAGgrQAFghADgfQAOAEAQACQArAFAzgMQAegGA8gRQA3gPAlAAQAVgBAaAEIgBAAQgZAAgJAJQgHAGgCALIgCAVQgDAdgSArQgZA8gDAKQgJAegEAnQgCAXgCAvIgSJhQgCA4gFAdQgIAugVAfQgZAmhlA8QgVANgRAMQAbhNABhfgADs0sQgYgBgdgCIAAgEID3gsIABAfIgDAAQhZAUhaAAIgNAAg");
	this.shape_20.setTransform(445.3125,222.274);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("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");
	this.shape_21.setTransform(434.711,213.6441);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AujC4QiugRhmARQAciWgeiXQgHgeAKgMQAIgMAZgCQAhgCAsAIQAaAFAzALQCuAmCygaIAMgBQAGgHAMgEQASgGAZACQCwALBPAMQB5ASDuA8QDXAuCSgRQAWgDAtgIIBEgKIBEgHQArgEAZgFQA2gJBNgeICAgyQBMgaBtgUQAbgFAQABQAYABAPAMQALAJAHARQAFAMAFAVQAGAYABAPQABAVgHAQQgIAVgZAPQgQAKgeAKQhZAggvAHQgWAEgsADQgsADgVADQggAFg9ARQg+ARgfAFQgbAFgjACIg+ABQi9ADhegEQidgGh6gZIhbgUQg6gNgggGQhJgNiFgKIjagPIAACiQAAAagLAJQgHAGgSABIgVAAQhOAAi0gSg");
	this.shape_22.setTransform(251.7246,369.7608);

	this.instance_20 = new lib.CachedBmp_20();
	this.instance_20.setTransform(-5.55,80.6,0.5,0.5);

	this.instance_21 = new lib.controller1();
	this.instance_21.setTransform(480.15,406.15,0.602,0.602,0,0,0,387.6,261.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19,p:{x:479.65,y:317.85}}]},134).to({state:[]},80).to({state:[{t:this.instance_19,p:{x:429.05,y:294.4}}]},128).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},27).to({state:[]},17).to({state:[{t:this.shape_22}]},19).to({state:[{t:this.instance_20}]},23).to({state:[]},13).to({state:[{t:this.instance_21}]},111).wait(168));

	// tweening2
	this.instance_22 = new lib.Symbol4();
	this.instance_22.setTransform(284.65,-100.75,1,1,0,0,0,22.1,100.7);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(405).to({_off:false},0).wait(1).to({x:289.05,y:-55.35},0).wait(1).to({x:293.45,y:-10},0).wait(1).to({x:297.85,y:35.35},0).wait(1).to({x:302.25,y:80.7},0).wait(1).to({x:306.65,y:126},0).wait(1).to({x:311.05,y:171.35},0).wait(1).to({x:315.45,y:216.7},0).wait(1).to({x:319.85,y:262.1},0).wait(14).to({_off:true},1).wait(292));

	// tweening
	this.instance_23 = new lib.Symbol1();
	this.instance_23.setTransform(407.5,182.35,1,1,0,0,0,699.8,91.7);
	this.instance_23._off = true;

	this.instance_24 = new lib.Symbol2();
	this.instance_24.setTransform(390.05,705.5,1,1,0,0,0,139.6,31.4);
	this.instance_24._off = true;

	this.instance_25 = new lib.Symbol3();
	this.instance_25.setTransform(819.65,269.65,1,1,0,0,0,696.2,64.1);
	this.instance_25._off = true;

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgKAOIgCgBIgCgCIgHgJIAHgJQADgEAHACIAAgEIANADIAEABQADACABADIAFAGIgGAJIgDACIgCABg");
	this.shape_23.setTransform(1390.5,1.35);

	this.instance_26 = new lib.Symbol5();
	this.instance_26.setTransform(373.95,518.05,1,1,0,0,0,109.2,101.9);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23}]},342).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.instance_26}]},8).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[]},1).wait(292));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(342).to({_off:false},0).wait(1).to({scaleX:0.9798,scaleY:0.9798,x:407.55},0).wait(1).to({scaleX:0.9595,scaleY:0.9595,x:407.5},0).wait(1).to({scaleX:0.9393,scaleY:0.9393,x:407.55},0).wait(1).to({scaleX:0.919,scaleY:0.919,x:407.5,y:182.3},0).wait(1).to({scaleX:0.8988,scaleY:0.8988},0).wait(1).to({scaleX:0.8785,scaleY:0.8785,x:407.55},0).wait(1).to({scaleX:0.8583,scaleY:0.8583,x:407.5},0).wait(1).to({scaleX:0.838,scaleY:0.838},0).wait(1).to({scaleX:0.8178,scaleY:0.8178,x:407.55,y:182.35},0).wait(1).to({scaleX:0.7975,scaleY:0.7975,x:407.5},0).wait(1).to({scaleX:0.7773,scaleY:0.7773,x:407.55},0).wait(1).to({scaleX:0.757,scaleY:0.757,x:407.5,y:182.3},0).wait(1).to({scaleX:0.7368,scaleY:0.7368},0).wait(1).to({scaleX:0.7165,scaleY:0.7165,x:407.55},0).wait(1).to({scaleX:0.6963,scaleY:0.6963,x:407.5},0).wait(1).to({scaleX:0.6761,scaleY:0.6761},0).wait(10).to({_off:true},1).wait(351));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(369).to({_off:false},0).wait(1).to({x:396.8,y:646.05},0).wait(1).to({x:403.6,y:586.65},0).wait(1).to({x:410.35,y:527.25},0).wait(1).to({x:417.15,y:467.85},0).wait(1).to({x:423.9,y:408.45},0).wait(1).to({x:430.7,y:349.05},0).wait(10).to({_off:true},1).wait(334));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(386).to({_off:false},0).wait(1).to({regX:696.3,scaleX:1.0099,x:829.6},0).wait(1).to({scaleX:1.0197,x:839.5},0).wait(1).to({scaleX:1.0296,x:849.4},0).wait(1).to({scaleX:1.0394,x:859.35},0).wait(1).to({scaleX:1.0493,x:869.25},0).wait(1).to({scaleX:1.0591,x:879.15},0).wait(1).to({scaleX:1.069,x:889.05},0).wait(1).to({scaleX:1.0788,x:898.95},0).wait(1).to({scaleX:1.0887,x:908.9},0).wait(1).to({scaleX:1.0985,x:918.8},0).wait(1).to({scaleX:1.1084,x:928.7},0).wait(1).to({scaleX:1.1182,x:938.6},0).wait(1).to({scaleX:1.1281},0).wait(1).to({scaleX:1.1379},0).wait(1).to({scaleX:1.1478},0).wait(1).to({scaleX:1.1576},0).wait(1).to({scaleX:1.1675},0).wait(1).to({scaleX:1.1773},0).to({_off:true},1).wait(315));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(413).to({_off:false},0).wait(1).to({x:422.1,y:563.35},0).wait(1).to({x:470.25,y:608.7},0).wait(1).to({x:518.4,y:654.05},0).wait(1).to({x:566.55,y:699.4},0).wait(1).to({x:614.7,y:744.75},0).wait(9).to({_off:true},1).wait(292));

	// backround
	this.text_2 = new cjs.Text("  Music by \n Liam Gull", "81px 'Times'", "#FFFFFF");
	this.text_2.lineHeight = 83;
	this.text_2.lineWidth = 409;
	this.text_2.parent = this;
	this.text_2.setTransform(286,415.15);

	this.text_3 = new cjs.Text("Animated by\n  Liam Gull", "81px 'Times'", "#FFFFFF");
	this.text_3.lineHeight = 83;
	this.text_3.lineWidth = 475;
	this.text_3.parent = this;
	this.text_3.setTransform(270,211.3);

	this.text_4 = new cjs.Text(" Directed by \n  Liam Gull", "81px 'Times'", "#FFFFFF");
	this.text_4.lineHeight = 83;
	this.text_4.lineWidth = 404;
	this.text_4.parent = this;
	this.text_4.setTransform(280,8.3);

	this.text_5 = new cjs.Text("", "81px 'Times-Roman'");
	this.text_5.lineHeight = 83;
	this.text_5.parent = this;
	this.text_5.setTransform(143.05,-217.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("EhV2A1XMAAAhqtMCrtAAAMAAABqtg");
	this.shape_24.setTransform(494.55,329.575);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("EhSkA0qMAAAhpTMClJAAAMAAABpTg");
	this.shape_25.setTransform(431.475,336.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(1,1,1).p("Ehdgg6lMC7BAAAMAAAB1LMi7BAAAg");
	this.shape_26.setTransform(526.5,352.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CCCCCC").s().p("EhdfA6mMAAAh1LMC6/AAAMAAAB1Lg");
	this.shape_27.setTransform(526.5,352.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,1,1).p("Ehdgg6lMC6jAAAIAeAAMAAAB1LIgeAAMi6jAAA");
	this.shape_28.setTransform(526.5,352.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999999").s().p("EhdBA6mIgfAAMAAAh1LIAfAAMC6hAAAMAAAB1LgAlIOPQgLAHgCAHQgDAKAIAIQAHAIAKAAQAFgBAIgDQAIgEAEAAQAHgBAOACQATADATgCQAUgBAKgHQAGgEACgIQADgJgEgGQgHgKgbACQgOACgOgBQgTgDgKgBIgDAAQgUAAgQAMg");
	this.shape_29.setTransform(523.5,352.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFCC99").s().p("AhCASQgIgIADgKQACgGALgHQARgNAWABQAKABASADQAOABAOgCQAbgCAHAKQAEAGgDAIQgCAIgGAEQgKAHgUABQgTACgTgDQgNgCgHABQgEAAgIAEQgIADgFABIgCAAQgJAAgGgIg");
	this.shape_30.setTransform(496.5418,444.5227);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(1,1,1).p("EhRkg9GMCjJAAAMAAAB6NMijJAAAg");
	this.shape_31.setTransform(468.125,327.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999999").s().p("EhRkA9HMAAAh6NMCjJAAAMAAAB6Ng");
	this.shape_32.setTransform(468.125,327.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(1,1,1).p("EhvlhJmMDfLAAAMAAACTNMjfLAAAg");
	this.shape_33.setTransform(428.125,305.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#999999").s().p("EhvlBJnMAAAiTNMDfLAAAMAAACTNg");
	this.shape_34.setTransform(428.125,305.075);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CC9900").s().p("AEOFhQAIgWACgLQAIgeAAgeIAAgeQAAgSADgMQAWAQABAnQABAJgCAVIAAAfQAAAOAFAHQADAEADACIgfANIgeANIAHgQgAisBgIgQgUQgKgLgHgGQgPgNgfgMIhGgbQgDgHACgKIAAgGQAcgcgChLQgCgvgPgXIACgEIAWgwQAWg0gDgdQgDgSgPgcIAEAEIANAIQAQAOgDAjIgOB6QgIBJAOAuQAMAnAeAmQATAZAqApQAWAYASAOIgGADIgEAAQgTAAgUgWg");
	this.shape_35.setTransform(465.1219,509.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AnHMWQghgHhDgSQgvgPgRgQQgkgjARhIIAGgcQACgQgDgLQgEgMgPgNIgWgXQgUgZABgvQABgaAFg2QAAghgOg4QgQhAgDgaQgEgxAWgpQAYguArgFQgYgugIgyQgHg0ALgyQAHgkAUgNQALgGAcgBIGEgFQAFgFAFAAQAFAAAGAFIAUAAQguhvgEhcQgCg1APhnQAHg0AGgYQAKgqAQgeQATgjAegXQAhgYAlgCQASgBAYAGIAqALQAYAFAJAEQASAGAJAMQAMANAFAjIAdC9QAPBfAQAxQAZBOAvAuQAWAVAgATQASAMApAVIEzCcQAZANAJAJQASAUADAwQADBLgTCbQgTCXAFBOIACAjQgCATgHANQgLAVgcALQgJADgSAEIgaAHQgqAIg4AWIhgAmQhHAchRAUQgRADgOgCQgRgEgDgNQi9gSi7ArIhWAVQgwAKgmACIgLAAQgpAAgygJgApVJtQgMAmAHAUQAKAhA5ASQB2AkB6gRQAogFBPgVQBQgUApgGQA1gHCsAEQCNADBQgcIAUgIQgCgEAAgFQAAgIAIgPQAdg8gDhFQgCghACgKQAGgZAUgGQASgGAWAUQAVATAIAcQAEAQAAAjIgBA0QAAALgDAHQAXgHATgDQAdgFAHgCIACgBQASgGAJgLQAIgKACgSQAAgJgBgXQgGhLAVinQAUidgMhUIg7gfQg9gghYgoQh0g1g4gmQhag6gshJQggg0gPhDQgJgogHhRQgHhTgJgnQgIgogSgXQgVgcgogHQglgGgkAPQgzAWgSAsQgJAVgCAhIgDA5QgCATgJAmQgIAmgCATQgIBWAvBjQALAXACAJQAGATgEAOQgFAWgWALQAXAbAYAkQgBgJAJgIQANgNAPAFQAZAIAKAmQAKAsgOBeQgNBdAOAuQALAkAbAkQARAWAoAoQAZAZAQAMQAZARAXAFQAhAGAAAOQAAAHgIAGQgHAEgIABQgWACgXgIQgDAEgHAEQgYANgcgDQgcgDgUgSQgGgHgPgSQgMgRgKgHQgMgJgTgHIgUgGQANAaACAcQAFBBguA+QgEAGgEAEQATAKARAWQASAYAFAWQAGAcgPAWQgDAGgHAHIgLAMQgJAMgFAEQgLAJgJgFQgKgGACgQQADgKAQgVQAQgTgBgNQgBgNgJgNQgSgVgbgJQgFAGgNAEQhFAThHgQQgVgFgqgMQgmgJgaABQgUACgtAPQgoAPgYgBQgIAAgGgDQgBARgHAZgAHfH3IAAAfQAAAdgIAfQgCAKgIAWIgHAQIAegNIAfgNQgDgCgDgEQgFgHAAgOIAAgfQACgUgBgKQgBgngWgQQgDAMAAASgAqRGYQgCA5AVAgQADAGAXAZQAMANAFAKIANgGIBLgXQAngNAYgBQAXgBAkAKIBVAVQAxAKAlgKIALgDQACgJAMgEQAFgBAIAAQADgGAIgEIAOgIQANgJAKgfQAKgpAAgZQAAglgWgUQgQgPgcgEQgRgCghADQjNAQjHgHQgJgBgGgCQAAAYgEA4gAhPgxQADAegWAyIgWAwIgCAFQAPAWACAwQACBKgcAcIAAAHQgCAKADAHIBGAcQAfALAPANQAHAGAJAMIAQATQAVAYAWgCIAGgDQgSgOgWgXQgpgqgTgZQgegngMgmQgOgvAIhJIAOh5QADgjgQgOIgNgIIgEgEQAPAcADASgApuBcIgdARQgUAPgHAdQgGAZAFAdQACAPAMAlQAHAZADARQALgGAOAAQC9AAC0gRQApgDAQAAQAUAAAPAEIgBgNQgEgCgCgFQgDgJAOgSQAUgcADgkQACghgOgcQgEgBgDgEQjYALjYgTQgPgBgFgGIgJAFgApBA8QBVAEBwAAIDFgCQAPAAALABQAHgTAKgTIAPgcQAIgQAAgOQAAgTgUggQgagogiglQgMACgQAAImHAAQgRAnABAqQABAqASAlIAQAjQAEANgCALIAIAAIAKAAg");
	this.shape_36.setTransform(446.0146,482.0819);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFCC00").s().p("AoWLbQg5gRgLgiQgGgTALgnQAIgZAAgRQAHADAIAAQAXABApgOQAtgPAUgCQAagCAlAJQAqANAVAFQBHAPBFgSQAOgFAFgGQAbAKARAVQAKANABAMQAAANgPATQgRAVgCALQgDAPAKAGQAJAGALgJQAGgEAJgMIALgNQAHgHADgFQAOgXgGgbQgEgXgSgXQgRgXgUgJQAFgEAEgGQAtg+gEhBQgCgdgNgZIAUAGQATAHAMAJQAJAHANARQAOASAGAHQAUARAdADQAcADAXgNQAHgEAEgEQAWAJAWgDQAJAAAHgFQAIgFAAgIQAAgNghgHQgYgEgZgSQgPgLgZgZQgogogRgWQgcglgKgjQgOgvANhcQAOhfgLgsQgKgmgZgHQgPgFgMAMQgJAJABAIQgYgjgYgcQAWgLAGgVQADgPgFgSQgDgKgKgWQgwhkAIhVQACgUAJgmQAIglADgUIADg4QACghAIgVQASgsA0gWQAjgPAmAGQAnAHAWAcQARAWAIApQAJAnAIBSQAHBRAJApQAPBDAfAzQAsBJBbA7QA4AlBzA1QBYApA+AfIA7AgQAMBUgVCcQgVCnAGBLQACAXgBAJQgBASgJALQgJALgRAGIgDAAQgGADgeAEQgSADgYAIQAEgHAAgLIABg1QAAgjgFgQQgHgbgVgUQgWgTgTAGQgUAFgFAaQgCAJABAhQADBFgdA9QgHAPAAAIQAAAFACAEIgUAIQhRAbiNgDQisgEg1AIQgoAFhQAUQhPAVgpAGQgmAFgmAAQhTAAhQgZgApjISQgXgagEgGQgVgfADg6QADg4AAgYQAGADAJAAQDIAIDNgRQAggCASACQAcAEAPAPQAWATABAlQAAAagLAoQgJAggOAJIgOAHQgIAFgCAFQgJAAgFACQgMAEgCAJIgLADQgkAJgxgJIhVgWQglgJgWABQgYABgnANIhLAXIgOAGQgFgLgLgMgAqZEEQgLglgDgOQgFgeAGgZQAIgcAUgPIAdgRIAJgGQAFAHAPABQDYATDYgMQACAEAFABQAOAcgDAhQgCAlgVAbQgOATAEAIQACAFAEADIABAMQgQgDgTgBQgRAAgoADQi1ASi8AAQgPAAgKAFQgDgRgIgZgApBA+QgKgBgHABQACgLgFgOIgPgjQgSgkgCgrQAAgqAQgmIGHgBQAQAAANgCQAiAmAZAoQAUAfAAAUQAAAOgHAQIgPAcQgLATgHATQgLgCgPAAIjFADQhvAAhWgEg");
	this.shape_37.setTransform(445.9829,481.9236);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999999").s().p("EhvlBJnMAAAiTNMDfLAAAMAAACTNgAgeYaImEAFQgcABgLAGQgUANgHAkQgLAyAHA0QAIAzAYAuQgrAFgYAuQgWApAEAxQADAaAQBAQAOA4AAAhQgFA2gBAaQgBAvAUAZIAWAXQAPANAEAMQADALgCAQIgGAcQgRBIAkAjQARAQAvAPQBDASAhAHQA5ALAtgCQAmgCAwgKIBWgVQC7grC9ASQADANARAEQAOACARgDQBRgUBHgcIBggmQA4gWAqgIIAagHQASgEAJgDQAcgLALgVQAHgNACgTIgCgjQgFhOATiXQATibgDhLQgDgwgSgUQgJgKgZgNIkzicQgpgVgSgMQgggTgWgVQgvgugZhOQgQgxgPhfIgdi9QgFgjgMgNQgJgMgSgGQgJgEgYgFIgrgLQgYgGgSABQglACghAYQgeAXgTAjQgPAegKAqQgGAYgHA0QgPBnACA1QAEBcAtBvIgTAAQgGgFgFAAQgFAAgFAFg");
	this.shape_38.setTransform(428.125,305.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.text_5},{t:this.text_4,p:{x:280,y:8.3,text:" Directed by \n  Liam Gull",font:"81px 'Times'",color:"#FFFFFF",lineHeight:83,lineWidth:404}},{t:this.text_3,p:{x:270,y:211.3,text:"Animated by\n  Liam Gull",font:"81px 'Times'",color:"#FFFFFF",lineHeight:83,lineWidth:475}},{t:this.text_2,p:{x:286,y:415.15,text:"  Music by \n Liam Gull",font:"81px 'Times'",lineHeight:83,lineWidth:409,color:"#FFFFFF"}}]}).to({state:[{t:this.shape_25},{t:this.text_2,p:{x:73.05,y:206.2,text:"Thank you ",font:"170px 'Times'",lineHeight:172,lineWidth:805,color:"#FFFFFF"}}]},48).to({state:[{t:this.shape_27},{t:this.shape_26}]},24).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.text_2,p:{x:126.5,y:2,text:"ONTONIX",font:"150px 'Times'",lineHeight:152,lineWidth:685,color:"#FF0000"}}]},17).to({state:[{t:this.shape_32},{t:this.shape_31}]},45).to({state:[]},80).to({state:[{t:this.shape_34},{t:this.shape_33}]},128).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_33},{t:this.text_4,p:{x:50,y:21,text:"   30% Off",font:"170px 'Times'",color:"#FF0000",lineHeight:172,lineWidth:724}},{t:this.text_3,p:{x:74,y:195,text:"\"Thats an amazing deal\"- ",font:"60px 'Times'",color:"#FF0000",lineHeight:62,lineWidth:608}},{t:this.text_2,p:{x:686.15,y:218.55,text:"some dude in New York",font:"26px 'Times'",lineHeight:28,lineWidth:268,color:"#FF0000"}}]},149).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.text_4,p:{x:6,y:2,text:"www.ONTONIX.com",font:"96px 'Times'",color:"#CC0000",lineHeight:98,lineWidth:952}},{t:this.text_3,p:{x:6,y:168.05,text:"Share with a friend to redeem 30%",font:"67px 'Times'",color:"#CC0000",lineHeight:69,lineWidth:964}},{t:this.text_2,p:{x:94,y:605.9,text:"If you actually go to this site I don't know what happens so for your safety don't go to it. ",font:"20px 'Times'",lineHeight:22,lineWidth:724,color:"#CC0000"}}]},61).wait(168));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(64.9,100.1,1693.6,746.5);
// library properties:
lib.properties = {
	id: 'F08CCC77259F43EC8A5451384C7FCE90',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/final_atlas_1.png", id:"final_atlas_1"},
		{src:"images/final_atlas_2.png", id:"final_atlas_2"},
		{src:"images/final_atlas_3.png", id:"final_atlas_3"},
		{src:"images/final_atlas_4.png", id:"final_atlas_4"},
		{src:"images/final_atlas_5.png", id:"final_atlas_5"},
		{src:"images/final_atlas_6.png", id:"final_atlas_6"},
		{src:"images/final_atlas_7.png", id:"final_atlas_7"},
		{src:"images/final_atlas_8.png", id:"final_atlas_8"},
		{src:"sounds/advert.mp3", id:"advert"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F08CCC77259F43EC8A5451384C7FCE90'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;