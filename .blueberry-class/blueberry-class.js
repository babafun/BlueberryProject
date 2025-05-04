// @ts-check
/// <reference path="./blueberry-class.d.ts" />
/** @typedef {{ x: number, y: number, width: number, height: number, texture: HTMLImageElement }} Platform */
/** @typedef {{ x: number, y: number, width: number, height: number, speed: number, dx: number, dy: number, camX: number, camY: number, camYHide: number, jumpPower: number, onGround: boolean, canWallJump: boolean, wallJumpDirection: number, isDashing: boolean, dashPower: number, dashLength: number, dashCooldown: number, lastDash: number, running: boolean, isRolling: boolean, currentFrame: HTMLImageElement, frameCount: number, frameDuration: number, airDashCooldown: boolean, direction: number, rotation: number, maxPlayerCamY?: number }} Player */

export class Blueberry {
    /**
     * @param {string} canvasId
     * @param {Platform[]} platforms
     * @param {"blueberry" | "cat" | string} costume
     * @param {number} [clampCamY=150]
     */
    constructor(canvasId, platforms, costume, clampCamY = 150) {
        let canvasElement;
        try {
            canvasElement = /** @type {HTMLCanvasElement} */ (document.getElementById(canvasId));
            if (!(canvasElement instanceof HTMLCanvasElement)) throw new Error();
        } catch (error) {
            throw new Error(`Element with id "${canvasId}" is not a valid canvas element.`);
        }
        this.canvas = canvasElement;
        let ctx;
        try {
            ctx = /** @type {CanvasRenderingContext2D} */ (this.canvas.getContext("2d"));
            if (!ctx) throw new Error();
        } catch (error) {
            throw new Error("Cannot obtain 2D context from the canvas element.");
        }
        this.ctx = ctx;
        this.costume = costume;
        this.platforms = platforms;

        this.grass = new Image();
        this.grass.crossOrigin = "anonymous";
        this.grass.src = "grass.png";

        this.idleFrame = new Image();
        this.idleFrame.crossOrigin = "anonymous";
        this.rollingFrame = new Image();
        this.rollingFrame.crossOrigin = "anonymous";
        this.rollingFrame.src = "The BlueBerry/roll.svg";

        this.runningFrames = [];
        if (this.costume === "blueberry") {
            this.idleFrame.src = "The BlueBerry/stand.svg";
            for (let i = 1; i <= 2; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `The BlueBerry/run${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        } else if (this.costume === "cat") {
            this.idleFrame.src = "ScratchCat/stand.svg";
            for (let i = 1; i <= 16; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `ScratchCat/run-${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        } else {
            this.idleFrame.src = "The PurpleBerry/stand.svg";
            for (let i = 1; i <= 2; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `The PurpleBerry/run${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        }

        this.startX = 150;
        this.startY = platforms[0].y - 50;

        /** @type {Player} */
        this.player = {
            x: this.startX,
            y: this.startY,
            width: 50,
            height: 44.5,
            speed: 5,
            dx: 0,
            dy: 0,
            camX: this.startX,
            camY: this.startY,
            camYHide: clampCamY,
            jumpPower: 15,
            onGround: false,
            canWallJump: false,
            wallJumpDirection: 0,
            isDashing: false,
            dashPower: 10,
            dashLength: 300,
            dashCooldown: 300,
            lastDash: 0,
            running: false,
            isRolling: false,
            currentFrame: this.idleFrame,
            frameCount: 0,
            frameDuration: this.costume === "cat" ? 2 : 6,
            airDashCooldown: false,
            direction: 1,
            rotation: 0
        };

        this.cameraX = 0;
        this.cameraY = 0;
        this.mapHeight = Math.max(...this.platforms.map(p => p.y + p.height));

        this.gravity = 0.8;
        this.friction = 0.8;
        this.rollingSpeedMultiplier = 0.8;

        this.keys = /** @type {Record<string, boolean>} */ ({});

        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));

        this.idleFrame.onload = () => {
            this.update();
        };
    }

    /** @param {KeyboardEvent} e */
    handleKeyDown(e) {
        this.keys[e.key] = true;
        this.keys[e.code] = true;

        if (e.key === "e") {
            if (!this.player.isDashing) {
                const currentTime = Date.now();
                if (currentTime - this.player.lastDash >= this.player.dashCooldown) {
                    this.player.isDashing = true;
                    this.player.lastDash = currentTime;
                    if (!this.player.onGround) {
                        this.player.dy = this.player.isDashing ? -10 : -5;
                    }
                    this.player.dx = this.player.dashPower * (this.player.dx >= 0 ? 1 : -1);
                    this.player.running = true;
                    setTimeout(() => {
                        this.player.isDashing = false;
                        this.player.dx *= this.friction;
                    }, this.player.dashLength);
                }
            }
        }
    }

    /** @param {KeyboardEvent} e */
    handleKeyUp(e) {
        this.keys[e.key] = false;
        this.keys[e.code] = false;
        this.keys[e.keyCode.toString()] = false;
    }

    drawNextFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.cameraX, -this.cameraY);

        if (this.player.isRolling) {
            this.player.currentFrame = this.rollingFrame;
            this.player.rotation += 3 * this.player.dx;
        } else if (this.player.running) {
            this.player.frameCount++;
            this.player.currentFrame = this.runningFrames[
                Math.floor(this.player.frameCount / this.player.frameDuration) % this.runningFrames.length
            ];
        } else {
            this.player.currentFrame = this.idleFrame;
            this.player.rotation = 0;
        }

        this.ctx.save();
        this.ctx.translate(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
        this.ctx.rotate(this.player.rotation * Math.PI / 180);
        this.ctx.scale(this.player.direction, 1);
        this.ctx.drawImage(
            this.player.currentFrame,
            -this.player.width / 2,
            -this.player.height / 2,
            this.player.width,
            this.player.height
        );
        this.ctx.restore();

        this.platforms.forEach(platform => {
            if (platform.texture.complete) {
                this.ctx.drawImage(platform.texture, platform.x, platform.y, platform.width, platform.height);
            }
        });

        this.ctx.restore();
    }

    checkCollisions() {
        let onAnyPlatform = false;
        this.player.canWallJump = false;
        this.player.wallJumpDirection = 0;

        this.platforms.forEach(platform => {
            if (this.player.x < platform.x + platform.width && 
                this.player.x + this.player.width > platform.x &&
                this.player.y < platform.y + platform.height && 
                this.player.y + this.player.height > platform.y) {

                const overlapX = Math.min(
                    this.player.x + this.player.width - platform.x, 
                    platform.x + platform.width - this.player.x
                );
                const overlapY = Math.min(
                    this.player.y + this.player.height - platform.y, 
                    platform.y + platform.height - this.player.y
                );

                if (overlapX < overlapY) {
                    if (this.player.x < platform.x) {
                        this.player.x = platform.x - this.player.width;
                        this.player.canWallJump = true;
                        this.player.wallJumpDirection = -1;
                    } else {
                        this.player.x = platform.x + platform.width;
                        this.player.canWallJump = true;
                        this.player.wallJumpDirection = 1;
                    }
                } else {
                    if (this.player.y < platform.y) {
                        if (this.player.dy > 0) {
                            this.player.y = platform.y - this.player.height;
                            this.player.dy = this.player.isRolling ? -this.player.dy * 0.8 : 0;
                            onAnyPlatform = true;
                        }
                    } else {
                        this.player.y = platform.y + platform.height;
                        this.player.dy = 0;
                    }
                }
            }
        });

        this.player.onGround = onAnyPlatform;
    }

    update() {
        this.player.running = false;

        if (!this.player.isDashing) {
            if (this.keys["ArrowLeft"] || this.keys["a"]) {
                this.player.dx = this.player.isRolling ? -this.player.speed * this.rollingSpeedMultiplier : -this.player.speed;
                this.player.running = true;
                this.player.direction = -1;
            } else if (this.keys["ArrowRight"] || this.keys["d"]) {
                this.player.dx = this.player.isRolling ? this.player.speed * this.rollingSpeedMultiplier : this.player.speed;
                this.player.running = true;
                this.player.direction = 1;
            } else {
                this.player.dx *= this.friction;
            }
            this.player.isRolling = this.keys["r"];
            if (!this.keys["r"]) {
                this.player.rotation = 0;
            }
            this.player.dashPower = this.player.isRolling ? 18 : 10;

            if ((this.keys[" "] || this.keys["w"] || this.keys["ArrowUp"])) {
                if (this.player.onGround) {
                    this.player.dy = -this.player.jumpPower;
                    this.player.onGround = false;
                } else if (this.player.canWallJump) {
                    this.player.dy = -this.player.jumpPower;
                    this.player.dx = this.player.wallJumpDirection * this.player.speed * 1.5;
                    this.player.canWallJump = false;
                }
            }
        }

        this.player.dy += this.gravity;
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;

        this.player.camX = this.player.x - (this.canvas.width / 2 - this.player.width / 2);
        this.player.camY = this.player.y - (this.canvas.height / 2 - this.player.height / 2);

        this.player.maxPlayerCamY = this.mapHeight - (this.canvas.height + this.player.camYHide);
        if (this.player.camY > this.player.maxPlayerCamY) {
            this.player.camY = this.player.maxPlayerCamY;
        }

        this.cameraX = this.player.camX;
        this.cameraY = this.player.camY;

        if (this.player.y > this.canvas.height) {
            this.player.x = this.startX;
            this.player.y = this.startY;
            this.player.dx = 0;
            this.player.dy = 0;
        }

        this.checkCollisions();
        this.drawNextFrame();
        requestAnimationFrame(() => this.update());
    }
}
