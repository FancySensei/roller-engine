/// <reference path="../typings/pixi.js/pixi.js.d.ts" />
/// <reference path="core/Scene.ts" />
/// <reference path="system/Time.ts" />

namespace Roller {

	import Sprite = PIXI.Sprite;

	export class Engine {

		private static _instance: Engine;
		static get instance(): Engine {
			return this.instance;
		}

		private _renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
		get renderer(): PIXI.CanvasRenderer | PIXI.WebGLRenderer {
			return this._renderer;
		}

		private _currentScene: Scene;
		get currentScene(): Scene {
			return this._currentScene;
		}

		private _isRunning: boolean = false;
		get isRunning(): boolean {
			return this._isRunning;
		}

		public autoResize: boolean = false;

		private requestedAnimationFrame: number;

		constructor(width: number = 800, height: number = 600, options?: PIXI.RendererOptions, noWebGL?: boolean) {
			if (Engine._instance != null) {
				console.error("You'd better not instantiate more than 1 Roller Engine!")
			}
			Engine._instance = this;

			this._renderer = PIXI.autoDetectRenderer(width, height, options, noWebGL);
			document.body.appendChild(this.renderer.view);

			window.addEventListener("resize", this.onResize);
		}

		/**
		 * Start the engine. Return false when engine already started.
		 */
		public start(scene?: Scene): boolean {
			if (this._isRunning) return false;

			this._currentScene = scene;
			this.onFrameRequestCallback(0);
			this._isRunning = true;
			return true;
		}

		/**
		 * Stop the engine -- will generate a spike on Time.deltaTime.
		 */
		public stop(): void {
			cancelAnimationFrame(this.requestedAnimationFrame);
			this._isRunning = false;
		}

		private onResize = (event: UIEvent): any => {
			if (this.autoResize) {
				this.renderer.resize(window.innerWidth, window.innerHeight);
			}
			this.currentScene.onResize(this.renderer.width, this.renderer.height);
		}

		private update(): void {
			this.currentScene.update();
			this.currentScene.fixedUpdate();
			this.currentScene.lateUpdate();
		}

		private render(): void {
			this.renderer.render(this._currentScene);
		}

		private onFrameRequestCallback = (timeStamp: number): void => {
			this.requestedAnimationFrame = requestAnimationFrame(this.onFrameRequestCallback);
			Time.update(timeStamp);
			this.update();
			this.render();
		}

	}
}