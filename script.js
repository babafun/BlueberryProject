import * as blueberryModule from './blueberry_class_definition.js'; // Ensure correct import path

// Create a function to load a texture based on its identifier
const createTexture = (textureId) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    switch (textureId) {
        case 'grass':
            img.src = 'grass.png';
            break;
        // Add more cases here for different textures
        default:
            console.error(`Unknown texture ID: ${textureId}`);
            img.src = 'fallback.png'; // Fallback texture
    }
    return img;
};

let answer = "";
let levelIndex = 0;
let platforms = [];

// Fetch levels from the JSONC file
fetch('levels.jsonc')
    .then(response => response.text())
    .then(text => {
        // Parse JSONC to JSON
        const levels = JSON.parse(text.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ''));
        
        // Prompt the user to enter a level ID
        answer = prompt("Enter level ID (0 or 1):", "0");
        try {
            levelIndex = parseInt(answer);
            if (isNaN(levelIndex) || levelIndex < 0 || levelIndex >= levels.length) {
                throw new Error('Invalid level ID! Please enter a valid level ID.');
            }
            // Map the levels to include the appropriate texture
            platforms = levels[levelIndex].map(platform => ({
                ...platform,
                texture: createTexture(platform.texture)
                x: platform.x
                y: platform.y
            }));
        } catch (error) {
            alert('Invalid level ID. Please refresh and try again.');
            console.error(error);
        }

        // Ensure all platform textures are loaded before starting the game
        let texturesLoaded = 0;
        const totalTextures = platforms.length;

        platforms.forEach(platform => {
            platform.texture.onload = () => {
                texturesLoaded++;
                console.log(`Texture loaded: ${texturesLoaded}/${totalTextures}`);
                if (texturesLoaded === totalTextures) {
                    // Start the game once all textures are loaded
                    console.log('All textures loaded. Starting game...');
                    window.blueberry = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry");
                }
            };
            platform.texture.onerror = () => {
                console.error('Failed to load texture:', platform.texture.src);
            };
        });

        // Log when the grass texture starts loading
        console.log('Loading textures...');
    })
    .catch(error => {
        console.error('Failed to load levels:', error);
    });
