/// <reference path="Component.ts" />

namespace Roller {

	export class GameObject {

		protected components: Array<Component> = [];

		/**
		 * Add a component to the update list.
		 */
		public addComponent(component: Component): GameObject {
			let index = this.components.indexOf(component);
			if (index >= 0) {
				this.components.push(component);
			}
			else {
				console.warn("Component cannot be added (already exist): ", component);
			}

			return this;
		}

		/**
		 * Remove a component from the update list.
		 */
		public removeComponent(component: Component): GameObject {
			let index = this.components.indexOf(component);
			if (index >= 0) {
				this.components.splice(index, 1);
			}
			else {
				console.warn("Component cannot be removed (does not exist): ", component);
			}

			return this;
		}

		/**
		 * Regular update -- called once per frame.
		 * Should only get called from the owner Scene.
		 */
		public update(): void {
			this.components.forEach(component => {
				component.update();
			});
		}

		/**
		 * Normal update -- called once per frame.
		 * Should only get called from the owner Scene.
		 */
		public fixedUpdate(): void {
			this.components.forEach(component => {
				component.fixedUpdate();
			});
		}

		public lateUpdate(): void {
			this.components.forEach(component => {
				component.lateUpdate();
			});
		}

	}

}