/// <reference path="../utils/MathR.ts" />

namespace Roller {

	export class Time {

		/**
		 * Max delta time prevent lag generated stupid big time number.
		 */
		public static maxDeltaTime = 1.0;

		private static _deltaTime = 0;
		/**
		 * Time passed since last frame.
		 */
		static get deltaTime(): number {
			return Time._deltaTime;
		}

		private static lastStamp: number = 0;

		public static update(timeStamp: number): void {
			this._deltaTime = MathR.clamp(timeStamp - this.lastStamp, 0, this.maxDeltaTime);
			this.lastStamp = timeStamp;
		}

	}

}
