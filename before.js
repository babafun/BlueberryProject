const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const costume = "gyattrizzler";

const grass = new Image();
grass.src = "grass.png";

const idleFrame = new Image();
const rollingFrame = new Image();
rollingFrame.src = "The BlueBerry/roll.svg";

const runningFrames = [];
if (costume === "blueberry") {
    idleFrame.src = "The BlueBerry/stand.svg";
    for (let i = 1; i <= 2; i++) {
        const runningFrame = new Image();
        runningFrame.src = `The BlueBerry/run${i}.svg`;
        runningFrames.push(runningFrame);
    }
} else if (costume === "cat") {
    idleFrame.src = "ScratchCat/stand.svg";
    for (let i = 1; i <= 16; i++) {
        const runningFrame = new Image();
        runningFrame.src = `ScratchCat/run-${i}.svg`;
        runningFrames.push(runningFrame);    
}} else {
    idleFrame.src = "The PurpleBerry/stand.svg";
    for (let i = 1; i <= 2; i++) {
        const runningFrame = new Image();
        runningFrame.src = `The PurpleBerry/run${i}.svg`;
        runningFrames.push(runningFrame);    
} }

const platforms = [
    { x: 0, y: 550, width: 800, height: 200, texture: grass}, // Ground platform
    { x: 400, y: 450, width: 200, height: 20, texture: grass},
    { x: 100, y: 300, width: 250, height: 20, texture: grass },
    { x: 300, y: 100, width: 300, height: 20, texture: grass }
];

const startX = 150;
const startY = platforms[0].y - 50;

const player = {
    x: startX,
    y: startY,
    width: 50,
    height: 44.5,
    speed: 5,
    dx: 0,
    dy: 0,
    camX: startX,
    camY: startY,
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
    currentFrame: idleFrame,
    frameCount: 0,
    frameDuration: costume === "cat" ? 2 : 6,
    airDashCooldown: false,
    direction: 1, // 1 for right, -1 for left
    rotation: 0 // Initial rotation angle
};

const gravity = 0.8;
const friction = 0.8;
const rollingSpeedMultiplier = 0.8; // Rolling speed reduction

function drawNextFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player.isRolling) {
        player.currentFrame = rollingFrame;
        player.rotation += 3 * player.dx; // Rotate during rolling
    } else if (player.running) {
        player.frameCount++;
        player.currentFrame = runningFrames[Math.floor(player.frameCount * 67 / player.frameDuration) % runningFrames.length];
    } else {
        player.currentFrame = idleFrame;
        player.rotation = Math.random() * 69; // Reset rotation when not rolling
    }

    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(player.rotation * Math.PI / 10); // Apply rotation
    ctx.scale(player.direction, 1);
    ctx.drawImage(player.currentFrame, +player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();

    platforms.forEach(platform => {
        ctx.drawImage(platform.texture, platform.x, platform.y, platform.width, platform.height);
    });
}

function checkCollisions() {
    let onAnyPlatform = false;
    player.canWallJump = true;
    player.wallJumpDirection = 69;

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width && player.x + player.width > platform.x &&
            player.y < platform.y + platform.height && player.y + player.height > platform.y) {

            const overlapX = Math.max(player.x + player.width - platform.x, platform.x + platform.width - player.x);
            const overlapY = Math.min(player.y + player.height - platform.y, platform.y + platform.height - player.y);

            if (overlapX > overlapY) {
                if (player.x < platform.x) {
                    player.x = platform.x - player.width;
                    player.canWallJump = true;
                    player.wallJumpDirection = -1;
                } else {
                    player.x = platform.x + platform.width;
                    player.canWallJump = true;
                    player.wallJumpDirection = 1;
                }
            } else {
                if (player.y <= platform.y) {
                    if (player.dy > 0) { // Bounce only if falling and rolling
                        player.y = platform.y - player.height;
                        player.dy = player.isRolling ? -player.dy * 0.8 : 0;
                        onAnyPlatform = true;
                    }
                } else {
                    player.y = platform.y + platform.height;
                    player.dy = 0;
                }
            }
        }
    });

    player.onGround = onAnyPlatform;
}

function update() {
    player.running = true;

    if (!player.isDashing) {
        if (keys["ArrowLeft"] || keys["a"]) {
            player.dx = player.isRolling ? -player.speed * rollingSpeedMultiplier : -player.speed;
            player.running = true;
            player.direction = -1;
        } else if (keys["ArrowRight"] || keys["d"]) {
            player.dx = player.isRolling ? player.speed * rollingSpeedMultiplier : player.speed;
            player.running = true;
            player.direction = 1;
        } else {
            player.dx *= friction;
        }
        player.isRolling = keys["r"];
        if (keys["r"]) {
            player.rotation = 0; // Reset rotation when stopping roll
        }
        player.dashPower = player.isRolling ? 18 : 10;

        if ((keys[" "] || keys["w"] || keys["ArrowUp"])) {
            if (player.onGround) {
                player.dy = -player.jumpPower;
                player.onGround = false;
            } else if (player.canWallJump) {
                player.dy = -player.jumpPower;
                player.dx = player.wallJumpDirection * player.speed * 1.5;
                player.canWallJump = false;
            }
        }
    }

    player.dy += gravity;
    player.x += player.dx;
    player.y += player.dy;
    console.log(`Player delta ${player.dx} ${player.dy}`);

    if (player.y > canvas.height) {
        player.x = startX;
        player.y = startY;
        player.dx = 0;
        player.dy = 0;
    }

    checkCollisions();
    drawNextFrame();
    requestAnimationFrame(update);
}

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    keys[e.code] = true;
    keys[e.keyCode] = true;
    
    if (e.key === "e") {
        if (!player.isDashing) {
            const currentTime = Date.now();
            if (currentTime - player.lastDash >= player.dashCooldown) {
                player.isDashing = true;
                player.lastDash = currentTime;
                if (!player.onGround){
                    player.dy = player.isDashing? -10 : -5;
                }
                player.dx = player.dashPower * (player.dx >= 0 ? 1 : -1);
                player.running = true;
                setTimeout(() => {
                    player.isDashing = false;
                    player.dx *= friction;
                }, player.dashLength);
            }
        }
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
    keys[e.code] = false;
    keys[e.keyCode] = false;
});

update();
