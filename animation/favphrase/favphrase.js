(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"favphrase_atlas_1", frames: [[0,0,800,450]]}
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



(lib.CachedBmp_22 = function() {
	this.initialize(img.CachedBmp_22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2184,1332);


(lib.hellothere = function() {
	this.initialize(ss["favphrase_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



// stage content:
(lib.favphrase = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {hello:49,there:54};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"hellothere7iewav",startFrame:0,endFrame:62,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("hellothere7iewav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,62,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(62));

	// mouth
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660000").s().p("AmiCeQg2gGhSgSIh9gcIAFAFIAJAIQAFAFACAGQACAHgEAEIgCADQgGAEgMgEQgHgDgGgEQgJgHgGgLIgDgJQgEgPAAgYIABgfIACgIQABgEACgDQACgGAHgGIAJgHIADgEQAEgFAAgNQgBgOACgFQADgKAMgKQAPgNADgGQAFgNAFgFQAEgEAEgCQAEgCAFABQAFABAEADIACAEIAJgCIAogKIAGALIASgDQACgGAAgGIAAgBQA4gNAfgDIAkgEQAVgCAQgEQAQgEAfgLQAWgFAtgBIGIgHQBLgCA8ABQBTABCRAOQAoADAVAGQAaAJAgAXIApAeIAKAHIAFAJIAOAeIALAVIAEAHIAPAYIACAFQADALgBATIgBAtQgBARgFAHQgDAFgHACQgHACgEgEIgCgDQgFgGACgOIACgPIgJACQgPAGghAQQgeAPgRAGQgnAOg0AFQggADg9ABIp3AEIgeAAQhkAAg1gGgAqkAlIgIADIAAAHIAKAGQAPALAIACIAPACIAZAAQAUABAMgDQAQgGAFgMQAQgDAYAAIH+AAQDyAAB6gDQCvgFCRgNIgDgDQgNgPgDgIIgCgHIgPABIhVAIQgwADhMABIiIACQkOAFiXABQjpACi9gFQgeAAgLAKQgGAGgBAIQgMADgQAAIgMgBQgEgBgFgDIgJgGIgHgEQgFAKgKAGg");
	this.shape.setTransform(475.0053,453.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AmHDCQg4gFhwgXIhrgWIACgDQAEgEgCgHQgCgGgFgFIgJgIIgFgFIB9AcQBSASA2AGQA8AHB7gBIJ3gEQA9gBAggDQA0gFAngOQARgGAegPQAhgQAPgGIAJgDIgCAQQgCAOAFAGQgwAXgbALQgwATgpAHQgYAEgfACIg2ABIqMAEQhnAAgsgEgArHCCQgFgFgBgHQgBgFADgEIADAKQAGALAJAGQgKgDgEgDgApnBEIgZAAIgPgCQgIgCgPgLIgKgGIAAgHIAIgDQAKgGAFgKIAHAEIAJAGQAFADAEABIAMABQAQAAAMgDQABgJAGgFQALgKAeAAQC9AFDpgCQCXgBEOgFICIgCQBMgBAwgDIBVgIIAPgBIACAHQADAIANAPIADADQiRANivAFQh6ADjyAAIn+AAQgYAAgQADQgFAMgQAGQgKACgOAAIgIAAgArbAYQgJgIACgJQACgHAJgCQAIgCAIADQAGABAJAGIABAAIgJAHQgIAGgBAGQgCACgBAFQgLgFgEgDgAK0gDIgEgHQASABAPACQAQACACAHQACAIgIAFQgHAEgKABIgJABIgPgYgAKWhDIgEgEIgKgHIgpgdQgggXgagJQgVgGgogDQiRgOhTgBQg8gBhLACImIAHQgtABgWAFQgfALgQAEQgQAEgVACIgkAEQgfADg4ANIAAABQAAAGgCAGIgSADIgGgLIgoAKIgJACIgCgEQgEgDgFgBQgFgBgEACIgBgDQgCgHAHgHQAGgFAJgDQBQgdBUgHIAkgDQAVgCAPgEIAXgIIAYgHQATgFAhAAIHJgIIBpAAQA5ABBfAKIBKAGQAmAFAOAEQAVAGAbAQQAsAaAoAjQAIAIAAAFQABAGgFAEQgFAEgGAAIgBAAQgHAAgNgHg");
	this.shape_1.setTransform(475.4178,453.4917);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjJDPQh4gFhtgeQgtgOgGgSIgCgIQAeACAcgCQAdgBAygIQA6gKAUgCQArgFBKABIEZAEQBlACA4AGIBaAMIAfAEIgJAIQgLAMgEAJQgCAFAAAFQgUAIgZAEQgjAGg/AEQisAJisACIg1AAIgrAAgAHzByQgDgGgEgDQAGADACAGIAAAAIABADIgCgDgAHTBsQADgFAEABIADAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAgBAAIAJABQgGAAgIAFIgHAEIACgFgAk1hRQiRgHhegpQAwgaAZgLQArgTAogHQAbgEArAAIBHgBQARgBAtgEQAngEAXAAQAZgBAjADIA5AEQANACCOAFQBfADA7ALQAmAIBCATIB+AkIAEgCQAEABADAEIAJAGQhYgCiOALQiwAOg7ACIhIABIhHAAIh9ACIgYAAQg7AAgqgCg");
	this.shape_2.setTransform(478.6,451.5333);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660000").s().p("Ag5FIQgYAAglgEIg9gHIhFgEQgrgDgagDQhCgJhHgaQg3gUg7geQg6gfgigcQgrglgIgnQgDgggHgPQgCgGgOgTQgLgPgCgKQgFgYAhgkQB0h8C0hNQAzgWAsgLQAtgKA7gDQAkgBBIABQAYAAANACQAVACAOAHIAPAJIAQAIQAlARA7gUIAtgRQAagLAUgEQAsgIA8AOIBlAeIBkAdQA5ASAeAXIAlAdQAVAPAXACQAHBJA9A7QAXAVAHAJQANARgEAPQgDALgMALIgJAJQABgJgDgIQgEgKgMgMIgXgTQgjgcgbgiQgQgSgMgGQAAgDgEgEIgRgMQgJgMgIgFQgMgJgiABQgggQhAgQQhQgUgsgHQg4gJhmgFIitgKQhNgFgnACIhbAGIhPABQgwABgeAGQgdAFggANQgUAHgkARQgjAQgPAMQgIAHgRAUIg1BBQgaAhgJATQgNAfAKAYQANAeAtATQAlAQA3AIIAVAEQgCACAAAEQgCAWAoAVQAmAUA2AMQAqAJA6AFQBeAJB2AAQBJgBCKgFIBOgDQBQgDAqgHQAhgFAagJIAGAGIANARQALAKAKgGQAIgFgCgLQAAgGgHgKQAGgGANgDQAPgEAFgDQAIgEAKgQQAHgLADgIQBTgDBJgfIAZgNIgKAQQgZApgNAPQgQASgZASIgxAhQgdATgQAIQgaAPgYAHQggAKgpACQgeADgvgCQhjgBgkACQgYAChXALQg9AIgoAAIgJAAg");
	this.shape_3.setTransform(478.4851,450.5444);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhKFeQhtgEg8gGQhegJhHgRQhRgThHgiQhHgjg3gtQgsgkgMggQgEgKgEgWQgDgVgFgLIgLgVQgJgNgCgIQgWg3BUhLQByhmCghEQBBgcAzgKQArgJA5gBQAigBBFACQAxABAYAHQAQAFAeAMQAaAKAUgCQARgBAUgJIAhgRQA+gbBbARQAfAFArANIBIAWIBOAWQAsAOAaARQAEACAhAaQAXARAUAHIARAGQALAEAEAEQAHAEACAIIADAOQAJA3AaAeQAOASAlAiQAaAegKAYQgEAKgLALIgWATQgTAUgaApQgbAsgRASQgRASgcATIg0AjQgiAWgNAHQgbAQgZAIQg0AShegEQh5gEggADIg3AIQgkAGgSACQgYADgkAAQgdAAgmgCgAjkk8Qg7ADgtAKQgsALgzAWQi0BNh0B8QghAkAEAYQACAJALAQQAOATADAGQAGAPADAgQAIAnAsAlQAhAcA6AfQA8AeA2AUQBHAaBDAJQAZADAsADIBFAEIA9AHQAkAEAZAAQAqABBDgJQBXgLAYgCQAlgCBjABQAvACAdgDQAqgCAggKQAYgHAagPQAQgIAdgTIAwghQAagSAPgSQANgPAagpIAJgQIgZANQhIAfhUADQgDAIgGALQgLAQgHAEQgFADgQAEQgNADgGAGQAHAKABAGQACALgJAFQgKAGgKgKIgOgRIgFgGQgbAJggAFQgrAHhQADIhNADQiKAFhKABQh2AAhdgJQg7gFgqgJQg1gMgmgUQgogVACgWQAAgEACgCIgVgEQg3gIglgQQgugTgNgeQgKgYAOgfQAJgTAaghIA1hBQAQgUAJgHQAOgMAjgQQAkgRAUgHQAhgNAcgFQAfgGAvgBIBQgBIBagGQAngCBNAFICuAKQBmAFA4AJQAsAHBQAUQA/AQAhAQQAigBAMAJQAIAFAJAMIAQAMQAEAEABADQAMAGAPASQAcAiAjAcIAXATQAMAMADAKQAEAIgCAJIAKgJQAMgLADgLQADgPgNgRQgGgJgXgVQg9g7gIhJQgWgCgWgPIgkgdQgfgXg4gSIhkgdIhmgeQg7gOgtAIQgTAEgbALIgsARQg8AUgkgRIgQgIIgQgJQgNgHgVgCQgNgCgYAAIg0gBIg4ABgAnhCXQAGASAtAOQBtAeB3AFQAnABA6gBQCrgCCtgJQA+gEAkgGQAZgEAUgIQAAgFACgFQAEgJALgMIAIgIIgegEIhagMQg4gGhlgCIkZgEQhKgBgrAFQgUACg7AKQgxAIgeABQgbACgegCIACAIgAHzB9IABADIAAgDIAAAAQgCgGgHgDQAFADADAGgAHTB3IgDAFIAHgEQAJgFAGAAIgJgBQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgDAAIgBAAQgEAAgCAEgAh/jDQgXAAgnAEQgtAEgRABIhHABQgrAAgcAEQgnAHgrATQgZALgwAaQBdApCRAHQA0ADBKgBIB9gCIBHAAIBHgBQA8gCCvgOQCPgLBYACIgJgGQgDgEgEgBIgFACIh9gkQhDgTglgIQg7gLhfgDQiPgFgMgCIg6gEQgdgCgVAAIgJAAg");
	this.shape_4.setTransform(478.6429,450.426);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#663300").s().p("AgNAAIAAgCIABgBIAEgGIADgBQAFgCACAAIAEABIACABIADAEIACACIAAADQAAAFgCAGIgRADQgEgIgDgFg");
	this.shape_5.setTransform(1084,160.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#663300").s().p("AHnEwQgGgBgIgFQgNgJAAgKIAAgDQAAgKAHgGQAFgDAHgDQAIgDATgEIABgFQAHgbAIgzIAViAQALhAADgfQAGg2gFgrQgCgVgJgtIANAHIAOAHQgOgRgMgHQgNgGgFgFQgDgEgBgFQgBgFADgEIAEgDQgCgGgBgHQAAgIACgGIADgFQAHgIANABQARAAAcAUQAkAbALATIAJAUQAGAMAHAGQAEAEAIAFIANAIQANAKAJAZQANAjAEAHIAPAUQAKANAFAIQAKAUAAAqIAAAXQAFAIACAHQAFAOgFASQgDAKgKAVIgXAsQgIAQgGAHQgIALgQAIIgMAGQgGAKgOALQgiAcggATQglAWgZADQgNACgHgGIgCgEQgKAEgIABQAFAFgDAHQgCAHgHADQgEABgEAAIgDAAgAIXDiQgHACgEAGQgDADAAADIAJgGIAPgKIgKACgAJlC7IgKAFIAKgEIAAgBIAAAAgAJ3iOIASARIARARIADAEQgBgIgDgGQgFgKgOgJIgVgNIAGAIgAnIESQgCgDgBgOQAAgXgIgbIgGgUIgDABQghAJgSgCQgUgCgegSQgigVgPgFQABAFALAUQAIAOgGAIQgEAGgKgBQgJgBgFgHQgFgFgEgIIgHgPQgGgLgNgMIgXgUQghgbgXgfQgVgdgEgWQgDgNADgOQADgPAKgKQAKgLAPgCQAHgBAGABQACgHADgFQAMgUAkgLQA2gQAGgDIAlgZQAWgPASABQAFAAANADQAMACAGAAIADgBIANgCQAKgDAFAAQAIAAAHAGQAGAHgDAHQgBADgGAEQgHBKAJBUQAFAuANBAIADAEIACAGQACADABADQACAGgEAFQgDAFgGACIADALIAFASQALAmgFAZQgDARgMAAQgJAAgDgKgAq0BdQAJAKAMAAIgGgFIgFgDIgLgEIABACgAqeA2IAAAAIgBAAgArogRQgFAGgBAJQgBAMAGAMIAKgnIABgFQgFAAgFAFgAqegsIgGAFIAGgFIACgCIgCACg");
	this.shape_6.setTransform(471.4816,455.8312);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyG4QgQAAgRgGQgvgOg0gfQA/AKBKAGQAuAEBUAFQgvANg2AKQgUAEgMAAIgCgBgAA7kdIg4gLQghgHgXgDQg4gHhkAAQg0AAgeAEQgbADgXAIQAHgeAggYQAVgQAzgUIA6gVIA1gNIA2gMQAbgGAPAAQANABAVAFQAaAHAJABIAUACQAKACAJADQAIADANAJQAPALAGADQANAHAcAHQASAHAdAVIB8BXIACACIAAAAIgmABQh1AAh/gYg");
	this.shape_7.setTransform(476.8,454.4509);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AhpI7QgSgCgOgDQgcgIgugiIhyhUIgigbQgSgQgLgPQgRgagPg7QgtitgLhhQgQiXAlh1QAJgcAYg4QAdhCAXgdQAKgNAZgZQAZgYALgOIAXgfQAOgRAOgHQAQgHAlABICuAGQgIACADALQADAKAIABQAIACAIgFIAPgJQAngbA9gEQAmgCBGAIQAhAEAOAKQAMAIAJAQIAQAdQAPAdAvA0QAtAyAQAgQALAXANA1QATBNAFAoQAIBBgMAzIgLAlQgHAYgCAOQgDAQgBAXIgCAnQgEBGgaBBQgHAGgBAJIAAADIgBACQgPAigZAmQgPAXghAuQgUAagKAMQgTAVgSALQgUALglAKQgsALgPAHQgIADgYANQgUALgMAEQgVAHgsAAIhTAAIggAAgAgqniQgQABgXAFQgyALgYAGQgSAFg9AWQg1AUgYARQgWARgQAZQgPAZgFAbIgBAJQgPAJgHALQgDAFgJATQgHASgQAiQgYA3AAA+QABA+AYA3IAOAfQAJATADAOIAFAvQAJBOAuBBQAIAKAGAFQA9BCB0A6QArAVAYAFQAsALBBgOQBNgOBDgeQBOgiAtgrQAXgWAIgUQAHgPAAgVQAEABAFAAQAMgBAJgHQALgIASgaIARgZQAJgPAFgMQAGgPACgVIABgnIAAiTQAAgdgBgOQgDgYgHgSIgcguQgQgbADgVQACgQgCgFIgCgEIAFgDQAGgFAAgHQgBgIgLgIIgvgfIhKgzQgtgfgggRQhWgthcgKQgQgDgOAAIgMABgACMF6QhZgKgjgCIgtgBQgbgBgSgDIhGgMQgpgGgcAFIgIACQgagSgagVQgSgPgLgLIgKgRQgPgaASgmQAEgIAMgVQAKgTAEgLIAKgiQAHgTAKgKQAUgTAlAFQAKACATAFIAeAHQAPACAfAAIBGABQBYAAAuAEQBLAHA3AVQA9AYAFAnIAAATIgBABQgGAEgCAHQgBAGABAIIACAOQADAfgWAdQgQAVghAUQglAXgtASQgFgCgIgBg");
	this.shape_8.setTransform(476.3347,455.5716);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("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");
	this.shape_9.setTransform(471.1,455.6196);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AmXDKQgdgHgQgJIASAGQAZAIA1AKIAEAAQgdgDgagFgAhQDLIh3gFIhEgFQgagEgvgKQhCgNgjgKQghgKgNgOQAPgDAmgBQAigBATgFQAPgDAWgLIAlgPQAcgKAlgDQAXgCArAAIBAABQAgAAAPACQALACAOAEIAZAGQAwAMBCAAIB0gEQBNgDBMADQAtACALAVQguAbgYALQgpATgiAGQgXAEgjACQimAKhlAAIgiAAgAH2BwIALgCIAAABIgLACIAAgBgAEghWInUgEQiggChUgHQiIgLhnghQAMgMAQgIQAngJAmgHIAfgBIDIAAQBWAAApgLIAZgIQAQgFAKgCQAQgDAgAAICpAAQBEAAAiADQBBAEB+AXIEkA0IALABIAAABIgJADQgUAAgZAFIg4ANQg6ANhKAEQghABg2AAIgvAAg");
	this.shape_10.setTransform(478.725,446.8375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("Aj5F2QgtgJhQggQg+gZghgQQgogTghgUIAAgBQgFgHgOgJIgtgeQgwgogqg4IgFgGIgGgLIgJgKQgqg7gohNQgPgdABgSQAAgVAWgYIBbg6IA8gmIALgFQAygXBkgkQBRgeAkgLQBCgUA2gIQCMgUBkA2QAJAGAJABQAJAFARgJQAigQAugGQAegEA2AAIA9AAIAOAAQAOALAHADIALAEIAGAHQALAJAWAFIAjAJQAUAGAdATQAiAXANAGIApAQIAaAOQARAKAJAEQAOAHAWAGIAkAKQAiALBAAgQAXAMAOAKIAHAHIACABQAQAQADASIABAKIgBAEQg3CYhyBwQh2B2iWAnQgaAHgdAEIi3gDQg2gBgaAGQgSAFgFAKIicADIgiABQg8AAghgGgAmHA8QAOACAcAHIg6AHQhHAJgjAcQgIAHgDAIQgEAKAFAGQADADAFACIAIACQAJADARANQAXAPAfALQAQAJAdAHQAaAFAdADIBDALIA7AEQBzAHA5ACQCEAEB6gIQAzgDAfgGQAygKA6gcQAhgRBDgnQAMgHAAgHIALgDIAAAAIgLABIAAgBQgCgFgJgEQg0gWg6gIQg7gJh/AGQh7AGg+gLQgzgLgagDQgXgDguAAQgugBgXgDIgegEQgRgCgNABQgLABgPAFIgYAJIACgDIgCgEQgBgGAFgFQAFgFAHgBIAGAAQAlgkBGgFQAWgCAoABQAqABATgBIBdgNQA4gJAlAGQAYAEAfAMIA1AVQAuAUBhAdQAlALATAEQAfAGAaAAQBFgCA7gyQA4gvAWhGQhaAVgrAIQhLAOg8AEQgiAChDAAIotAAQhoAAg5gGQgZgDhNgOQhAgLgngCIhBgDQglgFgYgQIgEgDIAAABQgWAOgFAcQgFAcAQAVQANARAnASIBVAnQAoASAIAWQArgaAZgKQAfgMAcAAIARABgAqqiZQgPALAAALQABAMAXAIQBwAjCSANQBbAICtACIH4AGQBdABAugEQAugEA6gMQAigIBEgRQALgEABgFQACgGgGgFQgGgEgIAAIgMgBIAJgDIAAAAQAJABAGgDQAGgDADgHQADgHgFgFQgDgEgKgCIlFg6QhqgTg2gEQgsgDhBgBIiKgDQhBgBggAFIgjAIIgiAIQgyALhJgBQhSgEgqAAIgKAAQiTAAhOA6gAo/ioQAQgDAagBQgnAHgmAJQAPgIAUgEg");
	this.shape_11.setTransform(476.2367,446.1508);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#663300").s().p("AxYD/IAAgDIAAgCIAEgFIADgBQAFgCAEAAIADABIACABIAEAEIABACIABADQAAAFgDAHIgRACQgFgHgCgFgAGyDPIgNAAQgHgBgEgEQgEgFAAgHQABgHAEgGQAGgHARgHQgGgDgNgCIgFgBIA0gBQBQgBAogCQBDgFA0gLQCDgeByhZQBahGBChgIAGAEQAGAFgBAGQgBAHgJAIQgWAVgHAPIgHAPIgGAPQgGAPgPAUQg5BRhZAyQhaAzhjAHQgTACglAAIg5ACQgxADgkAPQgYALgKABQgHACgMAAIgUgBgAGRBtQAagHA2ABIC3AEQgiAFgmAEQgtADhUACIhVACQAFgKASgEgAl8AMQgSgNgVghQg5hbgShqQgCgNADgKQAEgMAKAAQAJAAAFALQAEAIAAANQABAyAbAIQAGABALgBQATAdARAYQA5BLA+AwQAUAOAXAPIgBAAQg6AAgrglQAUARgJANQgEAFgKACIgLAAQgXAAgXgRgAjYgKQgYgQgWgTIAtAeQAOAJAEAGIABAAIgSgKgAl0ioIAIAJIAHALIgPgUg");
	this.shape_12.setTransform(441.8769,471.449);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AkHGXQgcgFg6gWQhbgjgqgTQgrgVgkgWQgXgOgUgQQg/gwg4hLQgSgYgSgdQgbgpgeg0QgbgvAAgdQAAgxA2gwQA4gyBfgmQA3gXBxglIBhglQA4gVArgJQBKgOBLAKQBMAJBDAiIAHADIAFgDQAUgMAYgIQAZgHAfgCQAUgBAmABIBaABQAgAAAOALQAEADAIAKQAHAIAFADQAGADAJACIAQACQAOADAeAOIBMAqQAtAZAhAOIBpAmQA/AWAlAXQAdASAQAWQATAagDAbIAAAEIgBADQgKA8gvBLIgaAoQhDBhhZBGQhzBZiCAeQg1ALhCAFQgoAChRABIgzABIjjACIgQAAQg3AAgggGgAjxl0Qg2AHhCAVQgkALhRAdQhkAlgyAXIgLAFQhKAjg1AnQgOALgKALQgWAXAAAWQgBASAPAdQAoBNAqA7IAPAUIAFAGQArA4AvApQAXATAYAQIARALQAhAUAoATQAhAQA+AZQBQAhAtAIQAqAIBVgCICdgEIBVgCQBUgCAtgDQAmgDAigGQAdgFAZgHQCWgnB2h1QByhxA3iXIACgFIgCgJQgDgTgQgQIgFgEIgDgDQgOgLgYgMQhAgggigKIgkgLQgWgGgOgGQgJgEgRgKIgagOIgpgQQgNgGgigXQgdgUgUgGIgjgIQgWgFgLgKIgFgHQgJgJgHgEQgGgEgLgBIgOAAIg9ABQg2AAgeADQguAGgiARQgRAJgIgGQgKgBgJgFQhJgoheAAQgjAAgmAGgAgdDyQg5gBhzgHIg7gFIhDgLIgEAAQg1gKgZgIIgSgGQgfgLgXgPQgRgMgJgDIgIgDQgFgCgDgCQgFgGAEgKQADgJAIgHQAjgcBHgIIA6gIQgcgGgOgDQgjgFgpARQgZAKgrAaQgIgWgogTIhVgnQgngSgNgRQgQgVAFgcQAFgbAWgPIAAAAIAEADQAYAQAlAEIBBAEQAnACBAALQBNANAZADQA5AHBoAAIItAAQBDAAAigCQA8gEBLgPQArgIBagVQgWBHg4AuQg7AzhFABQgaABgfgHQgTgEglgLQhhgdgugTIg1gVQgfgMgYgEQglgGg4AIIhdANQgTABgqAAQgogBgWACQhGAEglAkIgGAAQgHABgFAFQgFAGABAFIACAFIgCACIAYgIQAPgFALgBQANgCARACIAeAFQAXADAuAAQAuABAXACQAaAEAzALQA+ALB7gGQB/gGA7AIQA6AJA0AVQAJAEACAFIAAACIAAABQAAAHgMAHQhDAoghAQQg6AcgyAKQgfAGgzADQhRAGhWAAIhXgCgAjZBYQglADgcAKIglAPQgWALgPADQgTAFgiABQgmABgPADQANAOAhAKQAjAKBCANQAvAKAaAEIBEAFIB3AFQBqACDDgMQAjgCAXgEQAigGApgTQAYgLAugbQgLgVgtgCQhMgDhNADIh0AEQhCAAgxgMIgYgGQgOgEgLgCQgPgCggAAIhAgBIgQAAQggAAgSACgAFhgtIn4gHQitgChbgIQiSgMhwgkQgXgHgBgNQAAgLAPgLQBQg8CbACQAqABBSADQBJABAygKIAigJIAjgHQAggFBBABICKACQBBABAsAEQA2AEBqATIFFA6QAKACADAEQAFAFgDAHQgDAHgGADQgGACgJgBIgLgBIkkg0Qh+gXhBgEQgigDhEAAIipAAQggAAgQADQgKACgQAFIgZAIQgpALhWAAIjIAAIgfABQgZABgRAEQgTAEgQAHQgQAIgMAMQBnAhCIALQBUAHCgACIHUAEQBXABAvgCQBKgEA6gNIA4gNQAZgFAUAAIAMAAQAIABAGAEQAGAFgCAGQgBAFgLADQhEASgiAHQg6AMguAFQglADhDAAIgjAAg");
	this.shape_13.setTransform(476.2198,446.0272);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCC99").s().p("AkkBuQgBgDgFgFQgEgFgBgEIABgDQACAIALACIAEAAIgEAGIgDAEIAAAAgAhiAbIgJAAIgHgCQgFgCgCgEIgBABQAWgQAJgEQAIgDAQgEQARgEAHgDQALgFAUgQQARgOAMgFQALgEApgEIAOgCQgCAGgGAGQgTAYgvAiIgMAJQgQAKgLACQgFABgSAAgACcgDQgFgCgDgEIgBgDQgCgIANgNIARgOQAKgGAPgFQApgOAqgBQANAAAEAEQAFAFgCAIQgCAHgHAEQgFADgIABIgOACQgMABgeAIQgYAHgIAGIgKAHQgIAFgFACIgHABIgHgBgAAfhfIAGgEIgBABIAAADIACACIgKABIADgDgAA4hrIgEgBIgCAAIAEgBIAHAAIAAABIgFABg");
	this.shape_14.setTransform(434.9045,435.5782);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#663300").s().p("AjIBrQgHgKgBgMQgBgNAGgKQAIgPAUgJQAKgEAbgIQAvgOArgbQANgJAIgBQAHgBAFADIADADQADADAAADQABAHgHAGIgOAIQgNAHgYATQgPAKgjAJQgjALgPAIQgJAFgCAGIAAADQABAEAEAFQAFAFABADIAAAAQABAGgEAFQgEAFgGABIgBAAQgMAAgIgMgADAhZIgKgBIgCgBIgBgBIgKABIgGgJIgBgDIAAgDIAAgBIABgBIAEgFIADgBIAGgBIACgBIAEABIAAAAIAFgBIAAgBIAAgBIAHABQAFAAADACIAFAEIACADIAAADIAAABQAAAHgCADQgCACgFACIgEABg");
	this.shape_15.setTransform(422.3423,436.351);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AmHDvQg4gFhwgXIhrgWIACgCQAEgFgCgHQgCgGgFgEIgJgJIgFgEIB9AbQBSATA2AGQA8AHB7gBIJ3gFQA9AAAggDQA0gFAngOQARgHAegOQAhgQAPgGIAJgDIgCAQQgCANAFAHQgwAWgbALQgwATgpAHQgYAFgfABIg2ABIqMAEQhnAAgsgEgArHCvQgFgEgBgHQgBgGADgDIADAJQAGALAJAHQgKgDgEgEgApnByIgZgBIgPgBQgIgDgPgKIgKgGIAAgHIAIgEQAKgGAFgJIAHADIAJAGQAFAEAEABIAMABQAQAAAMgDQABgJAGgGQALgJAeAAQC9AEDpgBQCXgBEOgFICIgCQBMgBAwgEIBVgIIAPgBIACAHQADAJANAOIADAEQiRANivAEQh6ADjyAAIn+AAQgYAAgQADQgFAMgQAGQgKADgOAAIgIAAgArbBGQgJgIACgJQACgIAJgCQAIgDAIADQAGACAJAGIABABIgJAHQgIAGgBAFQgCADgBAFQgLgFgEgDgAK0AqIgEgHQASAAAPADQAQACACAIQACAHgIAGQgHAEgKABIgJABIgPgZgAKWgWIgEgDIgKgHIgpgdQgggYgagIQgVgHgogDQiRgNhTgCQg8AAhLABImIAIQgtABgWAFQgfAKgQAEQgQAEgVADIgkADQgfAEg4AMIAAACQAAAFgCAHIgSACIgGgKIgoAKIgJABIgCgDIgGgEIgWAKIgZAIQgKADgJAAIgEgBQgLgCgCgIQABgGAJgEQAPgJAjgKQAjgKAPgKQAYgSANgIIAOgIQAHgGgBgHQAAgEgCgDQAOgLAMgFQAJgEAUgFQATgFAJgEQAKgFAUgQQASgQANgEQAHgDAPgBIAKgBIAFAKIAKgCIABABIACABIAKACIAEAAIAEgBQAFgCACgDQACgDAAgGIAAgCIAIgDIAMgGQAHgDAFACQAIADgBALQgBAJgHAHQgKAKgVAEIgOACQgpADgLAFQgMAEgSAPQgUAQgLAEQgHAEgRAEQgQAEgIADQgJAEgWAQIgIAGIgKAIIAhgHIAJABIAtABQASAAAFgBQALgDAQgKQAPgCAMgDIAXgIIAYgHQATgEAhAAIAagBQADAFAFACQAHACAHgCQAFgCAIgFIGMgHIBpgBQA5ACBfAJIBKAHQAmAEAOAEQAVAGAbARQAsAaAoAjQAIAIAAAFQABAFgFAEQgFAEgGABIgBAAQgHAAgNgIg");
	this.shape_16.setTransform(475.4178,448.9432);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#660000").s().p("EgztAGsIAAgCIABgCIAEgFIADgBQAFgCADAAIAEAAIACACIADADIACACIAAADQAAAGgCAGIgSADQgFgHgCgGgEAh/gB1Qg1gGhTgSIh8gcIAEAFIAKAIQAFAFABAGQACAHgDAEIgDADQgGAEgLgEQgIgDgGgFQgJgGgGgLIgDgKQgEgOABgYIABgfIABgIQABgFACgCQACgGAIgGIAIgHIAEgEQAEgGgBgNQAAgOABgFQADgKANgKQAOgNAEgGQADgKAEgFIAXgJIAFADIADAEIAJgCIAogKIAGALIARgDQADgGAAgGIgBgBQA4gNAfgDIAlgEQAVgCAPgEQAQgEAggLQAWgFAtgBIGJgHQBLgCA8ABQBTABCRAOQAnADAWAGQAZAJAhAXIAoAdIAKAHIAGAKIANAeIALAVIAEAHIAPAZIACAFQAEALgBATIgBAtQgBARgFAHQgEAFgGACQgHACgFgEIgCgDQgEgGABgOIACgQIgJADQgPAGggAQQgeAPgSAGQgnAOgzAFQghADg9ABIp4AEIgeAAQhkAAg1gGgAd9juIgIADIABAHIAKAGQAPALAIACIAPACIAYAAQAUABAMgDQARgGAFgMQAPgDAZAAIH9AAQD0AAB5gDQCvgFCRgNIgCgDQgNgPgEgJIgCgHIgOABIhWAIQgwAEhMABIiHACQkOAFiYABQjqACi8gFQgfAAgLAKQgGAFgBAJQgMADgPAAIgNgBQgEgBgFgDIgIgGIgIgEQgFAKgKAGg");
	this.shape_17.setTransform(215.5861,481.0938);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},49).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},3).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},7).wait(1));

	// character
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-139.5,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(62));

	// backround
	this.instance_1 = new lib.hellothere();
	this.instance_1.setTransform(-3,-9,1.3327,1.4542);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(62));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(340.5,311,744.9000000000001,348);
// library properties:
lib.properties = {
	id: 'F2E5FF8DA92B4C9688564EC99F46F494',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_22.png", id:"CachedBmp_22"},
		{src:"images/favphrase_atlas_1.png", id:"favphrase_atlas_1"},
		{src:"sounds/hellothere7iewav.mp3", id:"hellothere7iewav"}
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
an.compositions['F2E5FF8DA92B4C9688564EC99F46F494'] = {
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