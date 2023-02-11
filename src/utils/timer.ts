/**
 * Time Watcher/Counter
 *
 * use `start()` to start counting
 *
 * use `stop()` to stop timer/counter
 *
 * `Timer.property.running` {boolean} return if the timer is running or not
 *
 * `Timer.property.passed` {number} show how many `milisec` have been passed since start
 */
export class Timer {
    running: boolean = false;
    passed: number = 0;
    started: number = 0;
    ended: number = 0;
    private intervalId: NodeJS.Timer | null = null;
    constructor() {
        this.running = false;
    }

    start() {
        this.running = true;
        this.started = Date.now();
        this.intervalId = setInterval(() => {
            this.passed += 100;
        }, 100);
    }

    stop() {
        this.running = false;
        this.passed = 0;
        clearInterval(this.intervalId!);
        this.ended = Date.now();
    }
}
