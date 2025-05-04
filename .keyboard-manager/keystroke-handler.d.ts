export declare class KeystrokeHandler {
    keys: Record<string, boolean>;
    constructor();
    attach(): void;
    detach(): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleKeyUp(e: KeyboardEvent): void;
    isKeyPressed(key: string): boolean;
}