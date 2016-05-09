namespace Roller {

	export abstract class Component {

		public enabled: boolean;

		public update(): void { }
		public fixedUpdate(): void { }
		public lateUpdate(): void { }

	}

}