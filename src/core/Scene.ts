/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
/// <reference path="GameObject.ts" />

namespace Roller {

	export abstract class Scene extends GameObject {

		public onResize(width: number, height: number): void { }

	}

}
