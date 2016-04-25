namespace Roller {

	export class MathR {

		/**
		 * Clamp a value within min to max.
		 */
		public static clamp(v: number, min: number, max: number): number {
			return v < min ? min : v > max ? max : v;
		}

		/**
		 * Clamp a value within 0 to 1.
		 * Useful for lerp state, tween animations etc.
		 */
		public static clamp01(v: number): number {
			return this.clamp(v, 0, 1);
		}

	}

}