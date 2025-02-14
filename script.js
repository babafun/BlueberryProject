import { Blueberry } from './blueberry_class_definition.js'; // Ensure correct import path

const createGrassTexture = () => {
    const img = new Image();
    img.src = 'grass.png';
    return img;
};

const platforms = [
    { texture: createGrassTexture(), x: 0, y: 550, width: 800, height: 200 }, // Ground platform
    { texture: createGrassTexture(), x: 400, y: 450, width: 200, height: 20 },
    { texture: createGrassTexture(), x: 100, y: 300, width: 250, height: 20 },
    { texture: createGrassTexture(), x: 300, y: 100, width: 300, height: 20 }
];

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
            const blueberryGame = new Blueberry("gameCanvas", platforms);
        }
    };
    platform.texture.onerror = () => {
        console.error('Failed to load texture:', platform.texture.src);
    };
});

// Log when the grass texture starts loading
console.log('Loading grass textures...');