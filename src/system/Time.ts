/// <reference path="../utils/MathR.ts" />

namespace Roller {

	export class Time {

		/**
		 * Max delta time prevent lag generated stupid big time number.
		 */
		public static maxDeltaTime: number = 1.0;

		private static _timeScale: number = 1.0;
		/**
		 * Time scale -- useful for slow motion.
		 * Value must be >= 0.
		 */
		static get timeScale(): number {
			return this._timeScale;
		}
		static set timeScale(value: number) {
			this._timeScale = Math.max(value, 0);
		}

		private static _unscaledDeltaTime: number = 0;
		/**
		 * Time passed since last frame without scaled. (in seconds)
		 */
		static get unscaledDeltaTime(): number {
			return this._unscaledDeltaTime;
		}

		private static _deltaTime: number = 0;
		/**
		 * Time passed since last frame. (in seconds)
		 */
		static get deltaTime(): number {
			return this._deltaTime;
		}

		private static _timeSinceStart: number = 0;
		/**
		 * Time passed since the engine started. (in seconds)
		 */
		static get timeSinceStart(): number {
			return this._timeSinceStart;
		}

		private static lastTimeStamp: number = 0;

		/**
		 * Update the time. Should only get called once per frame by the Engine.
		 * Time stamp should be from the requestedAnimationFrame -- and it's in millisecond.
		 */
		public static update(timeStamp: number): void {
			this._unscaledDeltaTime = MathR.clamp((timeStamp - this.lastTimeStamp) / 1000.0, 0, this.maxDeltaTime);
			this._deltaTime = this._unscaledDeltaTime * this.timeScale;
			this._timeSinceStart = timeStamp / 1000.0;
			this.lastTimeStamp = timeStamp;

			console.log(this.deltaTime);
		}

	}

}
