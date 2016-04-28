namespace Roller {

	export abstract class Component {

		public attach(): Component { return this; }

		public update(): void { }
		public fixedUpdate(): void { }
		public lateUpdate(): void { }

	}

}