namespace Roller {

	export interface IGameObject {

		enabled: boolean;
		update(): void;
		fixedUpdate(): void;
		lateUpdate(): void;

	}

}