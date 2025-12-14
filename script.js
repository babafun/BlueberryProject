// Blueberry Game Class - merged from blueberry-class.js
class Blueberry {
    /**
     * @param {string} canvasId
     * @param {Array} platforms
     * @param {"blueberry" | "cat" | string} costume
     * @param {number} [clampCamY=150]
     */
    constructor(canvasId, platforms, costume, clampCamY = 150) {
        console.log('Initializing Blueberry game...');
        
        let canvasElement;
        try {
            canvasElement = document.getElementById(canvasId);
            if (!(canvasElement instanceof HTMLCanvasElement)) {
                throw new Error(`Element with id "${canvasId}" is not a valid canvas element.`);
            }
        } catch (error) {
            console.error('Canvas element error:', error);
            throw error;
        }
        
        this.canvas = canvasElement;
        let ctx;
        try {
            ctx = this.canvas.getContext("2d");
            if (!ctx) throw new Error("Cannot obtain 2D context from the canvas element.");
        } catch (error) {
            console.error('2D context error:', error);
            throw error;
        }
        
        this.ctx = ctx;
        this.costume = costume;
        this.platforms = platforms;
        
        console.log('Loading game assets...');
        
        this.grass = new Image();
        this.grass.crossOrigin = "anonymous";
        this.grass.src = "grass.png";

        this.idleFrame = new Image();
        this.idleFrame.crossOrigin = "anonymous";
        this.rollingFrame = new Image();
        this.rollingFrame.crossOrigin = "anonymous";
        this.rollingFrame.src = "Assets/The BlueBerry/roll.svg";

        this.runningFrames = [];
        if (this.costume === "blueberry") {
            this.idleFrame.src = "Assets/The BlueBerry/stand.svg";
            for (let i = 1; i <= 2; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `Assets/The BlueBerry/run${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        } else if (this.costume === "cat") {
            this.idleFrame.src = "Assets/ScratchCat/stand.svg";
            for (let i = 1; i <= 16; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `Assets/ScratchCat/run-${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        } else {
            this.idleFrame.src = "Assets/The PurpleBerry/stand.svg";
            for (let i = 1; i <= 2; i++) {
                const runningFrame = new Image();
                runningFrame.crossOrigin = "anonymous";
                runningFrame.src = `Assets/The PurpleBerry/run${i}.svg`;
                this.runningFrames.push(runningFrame);
            }
        }

        this.startX = 150;
        this.startY = platforms[0] ? platforms[0].y - 50 : 500;

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

        this.keys = {};

        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));

        // Wait for idle frame to load before starting
        this.idleFrame.onload = () => {
            console.log('Game assets loaded. Starting game...');
            this.update();
        };
        
        this.idleFrame.onerror = () => {
            console.warn('Idle frame failed to load, starting anyway...');
            this.update();
        };
    }

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

        // Draw player with rotation and scaling
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

        // Draw platforms
        this.platforms.forEach(platform => {
            if (platform.texture && platform.texture.complete) {
                this.ctx.drawImage(platform.texture, platform.x, platform.y, platform.width, platform.height);
            } else if (platform.texture) {
                // Fallback: draw a colored rectangle if texture isn't loaded yet
                this.ctx.fillStyle = "#4CAF50";
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            } else {
                // Fallback: draw a red rectangle for platforms without textures
                this.ctx.fillStyle = "#FF5722";
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
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
            console.log('Player fell, resetting position');
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

// Validation function from validate.js
const validateData = (data, schema) => {
    for (const key in schema) {
        if (typeof data[key] !== schema[key]) {
            throw new Error(`Invalid type for ${key}. Expected ${schema[key]}, got ${typeof data[key]}`);
        }
    }
    return true;
};

// Text adventure function from textadventure.js  
const startTextAdventure = () => {
    console.log("Text Adventure starting...");
    // Basic text adventure implementation
    return {
        look: () => console.log("You look around the mysterious text adventure world..."),
        move: (dir) => console.log(`You move ${dir}...`),
        take: (item) => console.log(`You take ${item}...`),
        use: (item) => console.log(`You use ${item}...`),
        inventoryCheck: () => console.log("Your inventory is empty...")
    };
};

// Game initialization
const createTexture = (textureId) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    switch (textureId) {
        case 'grass':
            img.src = 'grass.png';
            break;
        default:
            console.warn(`Unknown texture ID: ${textureId}, using fallback`);
            img.src = 'fallback.png';
    }
    return img;
};

let answer = "";
let levelIndex = 0;
let platforms = [];

console.log('Starting game initialization...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching game files...');
    
    Promise.all([
        fetch('validation-types.json')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .catch(error => {
                console.error('Failed to load shapes:', error);
                return {};
            }),
        fetch('levels.jsonc')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(text => {
                const cleaned = text.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
                return JSON.parse(cleaned);
            })
            .catch(error => {
                console.error('Failed to load levels:', error);
                return [];
            })
    ])
    .then(([shapes, levels]) => {
        console.log('Files loaded successfully');
        console.log('Shapes:', shapes);
        console.log('Levels loaded, count:', levels ? levels.length : 0);

        if (!levels || levels.length === 0) {
            console.error('No levels loaded!');
            return;
        }

        answer = prompt(`Enter level ID (between 0 and ${levels.length - 1}):`, "0") + "";
        try {
            levelIndex = parseInt(answer);
            if (isNaN(levelIndex) || levelIndex < 0 || levelIndex >= levels.length) {
                throw new Error('Invalid level ID! Please enter a valid level ID.');
            }

            console.log(`Loading level ${levelIndex}...`);
            platforms = levels[levelIndex].map(platform => {
                try {
                    if (shapes.platform) {
                        validateData(platform, shapes.platform);
                    }

                    return {
                        ...platform,
                        texture: createTexture(platform.texture)
                    };
                } catch (error) {
                    console.error('Invalid platform data:', error);
                    return {
                        ...platform,
                        texture: createTexture('grass') // fallback
                    };
                }
            });
            
            console.log('Platforms processed:', platforms.length);
        } catch (error) {
            alert('Invalid level ID. Please refresh and try again.');
            console.error(error);
            return;
        }

        let texturesLoaded = 0;
        const totalTextures = platforms.length;
        
        console.log(`Loading ${totalTextures} textures...`);

        const startGame = () => {
            console.log('Starting game with', platforms.length, 'platforms');
            try {
                window.blueberry = new Blueberry("gameCanvas", platforms, "blueberry", 150);

                // Add Easter egg trigger method
                window.blueberry.launchTextAdventure = () => {
                    window.consoleGame = startTextAdventure();

                    window.look = () => window.consoleGame.look();
                    window.move = (dir) => window.consoleGame.move(dir);
                    window.take = (item) => window.consoleGame.take(item);
                    window.use = (item) => window.consoleGame.use(item);
                    window.inventoryCheck = () => window.consoleGame.inventoryCheck();

                    console.log("Text Adventure started! Try commands like: look(), move('north'), take('stick'), use('stick'), inventoryCheck()");
                };
                
                console.log("Game initialized successfully!");
                console.log("Psst! There's another game hidden here. Type blueberry.launchTextAdventure() in the console to start the secret text adventure!");
                
            } catch (error) {
                console.error('Failed to initialize game:', error);
            }
        };

        if (totalTextures === 0) {
            console.log('No platforms to load, starting game immediately...');
            startGame();
        } else {
            platforms.forEach((platform, index) => {
                platform.texture.onload = () => {
                    texturesLoaded++;
                    console.log(`Texture loaded: ${texturesLoaded}/${totalTextures} (${platform.texture.src})`);
                    if (texturesLoaded === totalTextures) {
                        console.log('All textures loaded. Starting game...');
                        startGame();
                    }
                };
                platform.texture.onerror = (error) => {
                    console.warn('Failed to load texture:', platform.texture.src, error);
                    texturesLoaded++;
                    if (texturesLoaded === totalTextures) {
                        console.log('Some textures failed to load, but starting game anyway...');
                        startGame();
                    }
                };
            });
        }
    })
    .catch(error => {
        console.error('Failed to load required files:', error);
        console.error('Game cannot start without these files. Please check your deployment.');
    });
});

console.log('Script loaded successfully!');
