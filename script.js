import * as blueberryModule from './blueberry_class_definition.js'; // Ensure correct import path
// Create a function to load the grass texture
const createGrassTexture = () => {
    const img = new Image();
    img.src = 'grass.png';
    return img;
};
const levels = [
    [{ texture: createGrassTexture(), x: 0, y: 825, width: 1100, height: 275 }, // Ground platform
    { texture: createGrassTexture(), x: 550, y: 675, width: 275, height: 27.5 },
    { texture: createGrassTexture(), x: 137.5, y: 450, width: 343.75, height: 27.5 },
    { texture: createGrassTexture(), x: 412.5, y: 150, width: 412.5, height: 27.5 }],

    [{ texture: createGrassTexture(), x: 0, y: 825, width: 1100, height: 275 }, // Ground platform

    // New tighter platforms
    { texture: createGrassTexture(), x: 137.5, y: 675, width: 206.25, height: 27.5 },
    { texture: createGrassTexture(), x: 481.25, y: 525, width: 206.25, height: 27.5 },
    { texture: createGrassTexture(), x: 825, y: 375, width: 275, height: 27.5 },
    // Higher platforms with more jumps required
    { texture: createGrassTexture(), x: 275, y: 225, width: 343.75, height: 27.5 },
    { texture: createGrassTexture(), x: 687.5, y: 90, width: 206.25, height: 27.5 },
    // Platforms with gaps in between that require jumping across
    { texture: createGrassTexture(), x: 550, y: 675, width: 206.25, height: 27.5 },
    { texture: createGrassTexture(), x: 68.75, y: 307.5, width: 206.25, height: 27.5 },

    // More challenging vertical platforming
    { texture: createGrassTexture(), x: 343.75, y: 225, width: 137.5, height: 27.5 },
    { texture: createGrassTexture(), x: 412.5, y: 75, width: 137.5, height: 27.5 },
]];
let answer = "";
let levelIndex = 0;
let platforms = [];
answer = prompt("Enter level ID (0 or 1):", "0");
try {
    levelIndex = parseInt(answer);
    if (isNaN(levelIndex) || levelIndex < 0 || levelIndex >= levels.length) {
        throw new Error('Invalid level ID! Please enter a valid level ID.');
    }
    platforms = levels[levelIndex];
} catch (error) {
    alert('Invalid level ID. Please refresh and try again.');
    console.error(error);
}
// Ensure all platform textures are loaded before starting the game
let texturesLoaded = 0;
const totalTextures = platforms.length;

// Bypass CORS by setting crossOrigin attribute
platforms.forEach(platform => {
    platform.texture.crossOrigin = "anonymous";
});

platforms.forEach(platform => {
    platform.texture.onload = () => {
        texturesLoaded++;
        console.log(`Texture loaded: ${texturesLoaded}/${totalTextures}`);
        window.blueberry = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry");
    };
    platform.texture.onerror = () => {
        console.error('Failed to load texture:', platform.texture.src);
    };
});

// Log when the grass texture starts loading
console.log('Loading grass textures...');