/// <reference path="../Engine.ts" />
/// <reference path="../core/Camera.ts" />


import Time = Roller.Time;

class Test extends Roller.Scene {

	private candy: PIXI.Sprite;
	private camera: Roller.Camera;

	constructor() {
		super();

		let options = PIXI.DEFAULT_RENDER_OPTIONS;
		options.backgroundColor = 0x000000;

		var engine = new Roller.Engine(window.innerWidth, window.innerHeight, options);
		engine.autoResize = true;

		let measurere = PIXI.Sprite.fromImage("./assets/debug/measurer_centred_coloured.png", false);
		measurere.anchor.set(0.5, 0.5);
		this.addChild(measurere);

		this.candy = PIXI.Sprite.fromImage("./assets/candy.png", false);
		this.candy.anchor.set(0.5, 0.5);
		this.addChild(this.candy);

		this.camera = new Roller.Camera(this);
		this.camera.target = this.candy.position;
		this.addComponent(this.camera);

		engine.start(this);
	}

	public update(): void {
		super.update();
		this.candy.position.x = Math.sin(Time.timeSinceStart) * 100;
		this.candy.position.y = Math.cos(Time.timeSinceStart) * 150;
		this.candy.rotation += Math.PI * Time.deltaTime;
		this.camera.zoom = Math.sin(Time.timeSinceStart * 1.5) * 1.5 + 2.0;
	}

	public onResize(width: number, height: number): void {
		this.camera.centre.set(width / 2.0, height / 2.0);
	}
}

let test = new Test();