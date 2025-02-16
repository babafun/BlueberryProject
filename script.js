import * as blueberryModule from './blueberry_class_definition.js'; // Ensure correct import path
// Create a function to load the grass texture
const createGrassTexture = () => {
    const img = new Image();
    img.src = 'grass.png';
    return img;
};
const levels = [
    [{ texture: createGrassTexture(), x: 0, y: 550, width: 800, height: 200 }, // Ground platform
    { texture: createGrassTexture(), x: 400, y: 450, width: 200, height: 20 },
    { texture: createGrassTexture(), x: 100, y: 300, width: 250, height: 20 },
    { texture: createGrassTexture(), x: 300, y: 100, width: 300, height: 20 }],


    [{ texture: createGrassTexture(), x: 0, y: 550, width: 800, height: 200 }, // Ground platform

    // New tighter platforms
    { texture: createGrassTexture(), x: 100, y: 450, width: 150, height: 20 },
    { texture: createGrassTexture(), x: 350, y: 350, width: 150, height: 20 },
    { texture: createGrassTexture(), x: 600, y: 250, width: 200, height: 20 },

    // Higher platforms with more jumps required
    { texture: createGrassTexture(), x: 200, y: 150, width: 250, height: 20 },
    { texture: createGrassTexture(), x: 500, y: 100, width: 150, height: 20 },

    // Smaller platforms at higher positions to test accuracy
    { texture: createGrassTexture(), x: 50, y: 75, width: 100, height: 20 },
    { texture: createGrassTexture(), x: 650, y: 50, width: 100, height: 20 },

    // Platforms with gaps in between that require jumping across
    { texture: createGrassTexture(), x: 400, y: 450, width: 150, height: 20 },
    { texture: createGrassTexture(), x: 580, y: 400, width: 150, height: 20 },
    { texture: createGrassTexture(), x: 50, y: 250, width: 150, height: 20 },

    // More challenging vertical platforming
    { texture: createGrassTexture(), x: 250, y: 150, width: 100, height: 20 },
    { texture: createGrassTexture(), x: 300, y: 50, width: 100, height: 20 },
]];
const platforms = levels[1]; // Change the level index to test different levels

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
        if (texturesLoaded === totalTextures) {
            // Start the game once all textures are loaded
            console.log('All textures loaded. Starting game...');
            window.blueberryGame = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry");
        }
    };
    platform.texture.onerror = () => {
        console.error('Failed to load texture:', platform.texture.src);
    };
});

// Log when the grass texture starts loading
console.log('Loading grass textures...');