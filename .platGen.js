console.log("potato filler random ahh")


function generatePlatforms(count = 30, startX = 300, startY = 550, stepMin = 20, stepMax = 50, yStep = 140) {
    const platforms = [];

let currentX = startX;
let currentY = startY;

for (let i = 0; i < count; i++) {
    const direction = Math.random() < 0.5 ? -1 : 1;

    // Random horizontal step
    const xOffset = Math.floor(Math.random() * (stepMax - stepMin + 1)) + stepMin;
    currentX += direction * xOffset;

    // Vertical offset (going upward)
    currentY -= yStep;

    platforms.push({
        texture: "grass",
        x: currentX,
        y: currentY,
        width: 300,
        height: 20
    });
}

// Add the ground platform at bottom
platforms.unshift({
    texture: "grass",
    x: 0,
    y: startY,
    width: 500000,
    height: 200
});

return platforms;
}

const level3 = generatePlatforms(40); // Boom Bralen, I just took some coding help from gpt but it should work but you double check it.
console.log(level3);

