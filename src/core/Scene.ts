/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
/// <reference path="IGameObject.ts" />
import Container = PIXI.Container
import DisplayObject = PIXI.DisplayObject

namespace Roller {

	export class Scene extends Container implements IGameObject {

		public enabled: boolean = true;

		protected _updateList: Array<IGameObject> = [];
		public get updateList() { return this._updateList; }

		constructor() {
			super();
		}

		public addUpdate(gameObject: IGameObject, at?: number) {
			if (at) {
				this._updateList.splice(at, 0, gameObject);
			}
			this._updateList.push(gameObject);
		}

		public update(): void {

		}

		public fixedUpdate(): void {

		}

		public lateUpdate(): void {

		}

	}

}
