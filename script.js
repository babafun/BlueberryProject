// @ts-check
import * as blueberryModule from './.blueberry-class/blueberry-class.js'; // Your main game module
import { validateData } from './validate.js';  // Validation function
import { startTextAdventure } from './textadventure.js'; // Import text adventure function

const createTexture = (textureId) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    switch (textureId) {
        case 'grass':
            img.src = 'grass.png';
            break;
        // Add more cases for other textures here
        default:
            console.error(`Unknown texture ID: ${textureId}`);
            img.src = 'fallback.png';
    }
    return img;
};

let answer = "";
let levelIndex = 0;
let platforms = [];

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
                    return platform;
                }
            });
        } catch (error) {
            alert('Invalid level ID. Please refresh and try again.');
            console.error(error);
            return;
        }

        let texturesLoaded = 0;
        const totalTextures = platforms.length;

        const startGame = () => {
            /** @type {any} */ (window).blueberry = new blueberryModule.Blueberry("gameCanvas", platforms, "blueberry", 150);

            // Add Easter egg trigger method:
// @ts-ignore
window.blueberry.launchTextAdventure = () => {
  // @ts-ignore
  window.consoleGame = startTextAdventure();

  // @ts-ignore
  window.look = () => window.consoleGame.look();
  // @ts-ignore
  window.move = (dir) => window.consoleGame.move(dir);
  // @ts-ignore
  window.take = (item) => window.consoleGame.take(item);
  // @ts-ignore
  window.use = (item) => window.consoleGame.use(item);
  // @ts-ignore
  window.inventoryCheck = () => window.consoleGame.inventoryCheck();

  console.log("Text Adventure started! Try commands like: look(), move('north'), take('stick'), use('stick'), inventoryCheck()");
};
            console.log("Psst! There's another game hidden here. Type blueberry.launchTextAdventure() in the console to start the secret text adventure!");
        };

        if (totalTextures === 0) {
            console.log('No platforms to load, starting game immediately...');
            startGame();
        } else {
            platforms.forEach(platform => {
                platform.texture.onload = () => {
                    texturesLoaded++;
                    console.log(`Texture loaded: ${texturesLoaded}/${totalTextures}`);
                    if (texturesLoaded === totalTextures) {
                        console.log('All textures loaded. Starting game...');
                        startGame();
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
