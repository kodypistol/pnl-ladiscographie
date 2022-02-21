/** MY IMPORTS **/
import sceneManager from './managers/sceneManager';
import loaderManager from "./managers/loaderManager";
import raycaster from "./raycaster";
import assets from './documentation/assets'
import router from '../router'
import renderer from "./renderer";

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

        loaderManager.loadMultipleSVGs({
            pnlTitleSVG: assets.svgAssets.pnl,
            laDiscographieSVG: assets.svgAssets.laDiscographie,
            dfSVG: assets.svgAssets.dfSVG,
            dllSVG: assets.svgAssets.dllSVG,
            lmcSVG: assets.svgAssets.lmcSVG,
            qlfSVG: assets.svgAssets.qlfSVG
        }, this.onLoadSVGComplete.bind(this));



        // Signal setup change screen
        // signal.on('changeScreen', this.onChangeScreen);

        renderer.init(canvas);

        // Start Loop Renderer
        this.startExperience();


    },

    onLoadTexturesComplete(){
      this.texturesObjects = loaderManager.textureLoadedAssets;
      router.setScreen(1);
        console.log('textures CHARGÉES :')
        console.log(this.texturesObjects)
    },

    onLoadSVGComplete(){
        this.svgObjects = loaderManager.svgLoadedAssets;
        router.setScreen(1);
        console.log('svg CHARGÉS :')
        console.log(this.svgObjects)
        this.placeMeshFirstScene()

    },

    startExperience(){
        renderer.startLoop();
    },

    // onChangeScreen(index){
    //     console.log(`go to screen ${index} in three js scene`);
    //     switch(index)
    //     {
    //         case 0:
    //             console.log('do scene 0, loading page lol')
    //
    //             break;
    //         case 1:
    //             console.log('do scene 1 place meshes')
    //             this.placeMeshFirstScene()
    //             break;
    //     }
    // },
    placeMeshFirstScene(){
        const DF = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: this.texturesObjects.dfTexture,

            })
        )
        DF.name = 'DF'

        DF.position.set(-7, 0, 0)

        DF.rotation.x = 0
        DF.rotation.y = - Math.PI / 4.5

        sceneManager.addObject(DF)
        sceneManager.addObject(this.svgObjects.dfSVG)
    }
}

export default experienceManager;