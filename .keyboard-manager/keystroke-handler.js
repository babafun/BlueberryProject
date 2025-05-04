// @ts-check

/**
 * Class to manage keystroke events.
 */
export class KeystrokeHandler {
    /** @type {Record<string, boolean>} */
    keys = {};

    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    /**
     * Attaches key event listeners.
     * @returns {void}
     */
    attach() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }

    /**
     * Detaches key event listeners.
     * @returns {void}
     */
    detach() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
    }

    /**
     * Handles the keydown event.
     * @param {KeyboardEvent} e
     * @returns {void}
     */
    handleKeyDown(e) {
        this.keys[e.key] = true;
        this.keys[e.code] = true;
    }

    /**
     * Handles the keyup event.
     * @param {KeyboardEvent} e
     * @returns {void}
     */
    handleKeyUp(e) {
        this.keys[e.key] = false;
        this.keys[e.code] = false;
        if (typeof e.keyCode !== "undefined") {
            this.keys[e.keyCode.toString()] = false;
        }
    }

    /**
     * Checks whether a given key is pressed.
     * @param {string} key
     * @returns {boolean}
     */
    isKeyPressed(key) {
        return !!this.keys[key];
    }
}