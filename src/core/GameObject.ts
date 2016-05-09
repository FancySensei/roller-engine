/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
/// <reference path="Component.ts" />

namespace Roller {

	import Container = PIXI.Container;

	export class GameObject extends Container {

		public enabled: boolean = true;
		public parentGameObject: GameObject;

		protected components: Array<Component> = [];
		protected gameObjects: Array<GameObject> = [];

		constructor() {
			super();
		}

		/**
		 * Add a Component to the update list.
		 */
		public addComponent(component: Component): GameObject {
			console.log(component);
			let index = this.components.indexOf(component);
			if (index < 0) {
				this.components.push(component);
				component.parentGameObject = this;
			}
			else {
				console.warn("Component cannot be added (already exist): ", component);
			}

			return this;
		}

		/**
		 * Remove a Component from the update list.
		 */
		public removeComponent(component: Component): GameObject {
			let index = this.components.indexOf(component);
			if (index >= 0) {
				this.components.splice(index, 1);
				component.parentGameObject = null;
			}
			else {
				console.warn("Component cannot be removed (does not exist): ", component);
			}

			return this;
		}

		/**
		 * Add a GameObject to the list.
		 */
		public addGameObject(gameObject: GameObject, at?: number): GameObject {
			let index = this.gameObjects.indexOf(gameObject);
			if (index < 0) {
				if (at) {
					this.gameObjects.splice(at, 0, gameObject);
					this.addChildAt(gameObject, at);
				}
				else {
					this.gameObjects.push(gameObject);
					this.addChild(gameObject);
				}
				gameObject.parentGameObject = this;
			}
			else {
				console.warn("GameObject cannot be added (already exist): ", gameObject);
			}

			return this;
		}

		/**
		 * Remove a GameObject from the list.
		 */
		public removeGameObject(gameObject: GameObject): GameObject {
			let index = this.gameObjects.indexOf(gameObject);
			if (index >= 0) {
				this.gameObjects.splice(index, 1);
				this.removeChild(gameObject);
				gameObject.parentGameObject = null;
			}
			else {
				console.warn("GameObject cannot be removed (does not exist): ", gameObject);
			}

			return this;
		}

		/**
		 * Remove a GameObject from the list.
		 */
		public removeGameObjectAt(index: number): GameObject {
			if (index >= 0 && index < this.gameObjects.length) {
				this.gameObjects[index].parentGameObject = null;
				this.gameObjects.splice(index, 1);
				this.removeChildAt(index);
			}
			else {
				console.warn("GameObject cannot be removed (invalid index): ", this);
			}

			return this;
		}

		/**
		 * Regular update -- called once per frame.
		 * Should only get called from the owner Scene.
		 */
		public update(): void {
			if (!this.enabled) return;

			this.components.forEach(component => {
				component.update();
			});
			this.gameObjects.forEach(gameObject => {
				gameObject.update();
			});
		}

		/**
		 * Normal update -- called once per frame.
		 * Should only get called from the owner Scene.
		 */
		public fixedUpdate(): void {
			if (!this.enabled) return;

			this.components.forEach(component => {
				component.fixedUpdate();
			});
			this.gameObjects.forEach(gameObject => {
				gameObject.fixedUpdate();
			});
		}

		/**
		 * Late update -- called once per frame.
		 * Should only get called from the owner Scene.
		 */
		public lateUpdate(): void {
			if (!this.enabled) return;

			this.components.forEach(component => {
				component.lateUpdate();
			});
			this.gameObjects.forEach(gameObject => {
				gameObject.lateUpdate();
			});
		}

	}

}