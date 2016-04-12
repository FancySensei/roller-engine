/// <reference path="../typings/pixi.js/pixi.js.d.ts" />
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

class Engine
{
	private renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer;
	private stage:Container;
	private candy:Sprite;
	
	constructor(width:number = 800, height:number = 600)
	{
		this.renderer = PIXI.autoDetectRenderer(width, height);
		document.body.appendChild(this.renderer.view);
		
		this.stage = new Container();
		
		this.candy = Sprite.fromImage("./assets/candy.png", false);
		this.candy.anchor.set(0.5, 0.5);
		this.candy.position.set(400, 300);
		
		this.stage.addChild(this.candy);
		
		this.onFrameRequestCallback(0);
	}
	
	private update():void
	{
		this.candy.rotation += 0.1;
	}
	
	private render():void
	{
		this.renderer.render(this.stage);
	}
	
	private onFrameRequestCallback = (timeStamp:number):void =>
	{
		requestAnimationFrame(this.onFrameRequestCallback);
		
		this.update();
		this.render();
	}
}

var engine = new Engine();