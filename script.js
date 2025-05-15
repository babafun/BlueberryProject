// @ts-check
import * as blueberryModule from './.blueberry-class/blueberry-class.js'; // Ensure correct import path
import { validateData } from './validate.js';  // Import the validateData function

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

// Wait for the DOM to be fully loaded before fetching resources
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('validation-types.json')
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to load shapes:', error);
                return {};
            }),
        fetch('levels.jsonc')
            .then(response => response.text())
            .then(text => {
                // Remove comments from JSONC and parse the cleaned string to JSON
                const cleaned = text.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
                return JSON.parse(cleaned);
            })
    ])
    .then(([shapes, levels]) => {
        console.log('Shapes loaded:', shapes);
        console.log('Levels loaded:', levels);

        answer = prompt(`Enter level ID (between 0 and ${levels.length - 1}):`, "0") + "";
        try {
            levelIndex = parseInt(answer);
            if (isNaN(levelIndex) || levelIndex < 0 || levelIndex >= levels.length) {
                throw new Error('Invalid level ID! Please enter a valid level ID.');
            }

            // Map each platform to include a loaded texture and validate its shape
            platforms = levels[levelIndex].map(platform => {
                try {
                    if (!shapes.platform) {
                        throw new Error('Shape for "platform" is not defined in shapes file.');
                    }
                    validateData(platform, shapes.platform);

                    return {
                        ...platform,
                        texture: createTexture(platform.texture)
                    };
                } catch (error) {
                    console.error('Invalid platform data:', error);
                    console.log('Invalid platform data.');
                    return platform; // Return the original platform data if validation fails
                }
            });
        } catch (error) {
            alert('Invalid level ID. Please refresh and try again.');
            console.error(error);
            return;
        }

        // Ensure all platform textures are loaded before starting the game
        let texturesLoaded = 0;
        const totalTextures = platforms.length;

        if (totalTextures === 0) {
            console.log('No platforms to load, starting game immediately...');
            /** @type {any} */ (window).blueberry = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry", 150);
        } else {
            platforms.forEach(platform => {
                platform.texture.onload = () => {
                    texturesLoaded++;
                    console.log(`Texture loaded: ${texturesLoaded}/${totalTextures}`);
                    if (texturesLoaded === totalTextures) {
                        console.log('All textures loaded. Starting game...');
                        /** @type {any} */ (window).blueberry = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry", 150);
                    }
                };
                platform.texture.onerror = () => {
                    console.error('Failed to load texture:', platform.texture.src);
                };
            });
            console.log('Loading textures...');
        }
    })
    .catch(error => {
        console.error('Failed to load required files:', error);
    });
});
