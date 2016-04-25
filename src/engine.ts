/// <reference path="../typings/pixi.js/pixi.js.d.ts" />
/// <reference path="system/Time.ts" />

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

namespace Roller {

	export class Engine {

		private _renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
		get renderer(): PIXI.CanvasRenderer | PIXI.WebGLRenderer {
			return this._renderer;
		}
		private stage: Container;
		private candy: Sprite;

		constructor(width: number = 800, height: number = 600) {
			this._renderer = PIXI.autoDetectRenderer(width, height);
			document.body.appendChild(this.renderer.view);
			this.renderer.autoResize = true;

			window.addEventListener("resize", this.onResize);

			this.stage = new Container();

			this.candy = Sprite.fromImage("./assets/candy.png", false);
			this.candy.anchor.set(0.5, 0.5);
			this.candy.position.set(width / 2.0, height / 2.0);

			this.stage.addChild(this.candy);

			this.onFrameRequestCallback(0);
		}

		private onResize(event: UIEvent): any {
			engine.renderer.resize(window.innerWidth, window.innerHeight);
			engine.candy.position.set(window.innerWidth / 2.0, window.innerHeight / 2.0)
		}

		private update(): void {
			this.candy.rotation += 0.1;
		}

		private render(): void {
			this.renderer.render(this.stage);
		}

		private onFrameRequestCallback = (timeStamp: number): void => {
			requestAnimationFrame(this.onFrameRequestCallback);
			Time.update(timeStamp);
			this.update();
			this.render();
		}

	}

	export var engine = new Engine(window.innerWidth, window.innerHeight);
}