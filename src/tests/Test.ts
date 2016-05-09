/// <reference path="../Engine.ts" />

import Time = Roller.Time;

class Test extends Roller.Scene {

	private candy: PIXI.Sprite;

	constructor() {
		super();
		
		let options = PIXI.DEFAULT_RENDER_OPTIONS;
		options.backgroundColor = 0x000000;
		
		var engine = new Roller.Engine(window.innerWidth, window.innerHeight, options);
		engine.autoResize = true;
		
		this.candy = PIXI.Sprite.fromImage("./assets/candy.png", false);
		this.candy.anchor.set(0.5, 0.5);
		this.candy.position.set(engine.renderer.width / 2.0, engine.renderer.height / 2.0);
		this.addChild(this.candy);

		engine.start(this);
	}

	public update(): void {
		super.update();
		this.candy.rotation += Time.deltaTime;
	}

	public onResize(width: number, height: number): void {
		this.candy.position.set(width / 2.0, height / 2.0);
	}
}

let test = new Test();