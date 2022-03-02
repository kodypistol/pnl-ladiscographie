/** MY IMPORTS **/
import sceneManager from './managers/sceneManager';
import loaderManager from "./managers/loaderManager";
import raycaster from "./raycaster";
import scenography from "./scenography";
import assets from './documentation/assets'
import router from '../router'
import renderer from "./renderer";
import debugPanel from "./debugPanel";

/** DEPENDENCIES IMPORTS **/
// import signal from "signal";
import * as THREE from "three";
import {MeshBasicMaterial} from "three";

/** EXPERIENCE MANAGER CODE **/
const canvas = document.querySelector('canvas.webgl');

const experienceManager =
{
    // Init objects which will be loaded in the starting screen
    texturesObjects: {
        dfTexture: null,
        dllTexture: null,
        lmcTexture: null,
        qlfTexture: null,

    },

    svgObjects: {
        pnlTitleSVG: null,
        laDiscographieSVG: null,
        dfSVG: null,
        dllSVG: null,
        lmcSVG: null,
        qlfSVG: null,
    },

    // Initialization of the experience. Setting the scene, renderer, raycaster, loader, loop
    init(){
        // Scene
        sceneManager.create();

        // Init Renderer
        raycaster.init();

        // Load plane textures
        loaderManager.loadMultipleTextures({
            dfTexture: assets.textures.dfTexture,
            dllTexture: assets.textures.dllTexture,
            lmcTexture: assets.textures.lmcTexture,
            qlfTexture: assets.textures.qlfTexture
        }, this.onLoadTexturesComplete.bind(this));




        // Signal setup change screen
        // signal.on('changeScreen', this.onChangeScreen);

        renderer.init(canvas);

        // Start Loop Renderer
        this.startExperience();


    },

    // First loading textures
    onLoadTexturesComplete(){
      this.texturesObjects = loaderManager.textureLoadedAssets;
      router.setScreen(1);
        console.log('textures CHARGÉES :')
        console.log(this.texturesObjects)

        this.texturesReady = true;

        // Then, loading SVGs, to be sure of the order
        loaderManager.loadMultipleSVGs({
            pnlTitleSVG: assets.svgAssets.pnl,
            laDiscographieSVG: assets.svgAssets.laDiscographie,
            dfSVG: assets.svgAssets.dfSVG,
            dllSVG: assets.svgAssets.dllSVG,
            lmcSVG: assets.svgAssets.lmcSVG,
            qlfSVG: assets.svgAssets.qlfSVG
        }, this.onLoadSVGComplete.bind(this));
    },

    // If we are here, we are sure that textures & svgs were loaded
    onLoadSVGComplete(){
        this.svgObjects = loaderManager.svgLoadedAssets;
        router.setScreen(1);
        console.log('svg CHARGÉS :')
        console.log(this.svgObjects)
        this.svgReady = true;

        if (this.texturesReady && this.svgReady)
        {
            scenography.init();
            debugPanel.init();
        }

    },

    startExperience(){
        renderer.startLoop();
    },
    getCanvas(){
      return canvas;
    },
}

export default experienceManager;