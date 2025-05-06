export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    texture: HTMLImageElement;
}

export interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    dx: number;
    dy: number;
    camX: number;
    camY: number;
    camYHide: number;
    jumpPower: number;
    onGround: boolean;
    canWallJump: boolean;
    wallJumpDirection: number;
    isDashing: boolean;
    dashPower: number;
    dashLength: number;
    dashCooldown: number;
    lastDash: number;
    running: boolean;
    isRolling: boolean;
    currentFrame: HTMLImageElement;
    frameCount: number;
    frameDuration: number;
    airDashCooldown: boolean;
    direction: number;
    rotation: number;
    maxPlayerCamY?: number;
}

export class Blueberry {
    constructor(
        canvasId: string,
        platforms: Platform[],
        costume: string,
        clampCamY?: number
    );

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    costume: string;
    platforms: Platform[];
    player: Player;
    keys: Record<string | number, boolean>;
    cameraX: number;
    cameraY: number;
    mapHeight: number;
    gravity: number;
    friction: number;
    rollingSpeedMultiplier: number;

    handleKeyDown(e: KeyboardEvent): void;
    handleKeyUp(e: KeyboardEvent): void;
    drawNextFrame(): void;
    checkCollisions(): void;
    update(): void;
}
