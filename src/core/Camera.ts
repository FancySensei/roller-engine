/// <reference path="../Engine.ts" />

namespace Roller {

	import Point = PIXI.Point;

	export class Camera extends Component {

		/**
		 * The look at target of the camera.
		 */
		public target: Point = new Point();

		/**
		 * The offset of the camera.
		 */
		public offset: Point = new Point();

		private _scene: Scene;
		/**
		 * The Scene that camera belongs to.
		 */
		get scene(): Scene {
			return this._scene;
		}

		private _position: Point = new Point();
		/**
		 * The position of the camera.
		 */
		get position(): Point {
			return this._position;
		}

		private _centre: Point;
		/**
		 * The centre of the camera.
		 */
		get centre(): Point {
			return this._centre;
		}

		private _scale: Point = new Point(1.0, 1.0);
		/**
		 * The overall scale of the camera.
		 */
		get scale(): Point {
			return this._scale;
		}

		private _zoom: number = 1.0;
		/**
		 * The zoom of the camera.
		 */
		get zoom(): number {
			return this._zoom;
		}

		constructor(scene: Scene) {
			super();
			this._scene = scene;
			this._centre = new Point(Engine.instance.renderer.width * 0.5, Engine.instance.renderer.height * 0.5);
		}

		public lateUpdate(): void {
			if (!this.enabled) return;

			let scaleX = this.scale.x * this.zoom;
			let scaleY = this.scale.y * this.zoom;
			this.position.copy(this.target);
			this.position.x *= scaleX;
			this.position.y *= scaleY;
			this.position.x += this.offset.x - this.centre.x;
			this.position.y += this.offset.y - this.centre.y;
			this.scene.position.set(-this.position.x, -this.position.y);
			this.scene.scale.set(scaleX, scaleY);
		}

	}

}