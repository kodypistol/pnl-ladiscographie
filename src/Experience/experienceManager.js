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
    objects: {
        dfTexture: null,
        dllTexture: null,
        lmcTexture: null,
        qlfTexture: null
    },

    // Initialization of the experience. Setting the scene, renderer, raycaster, loader, loop
    init(){
        // Scene
        sceneManager.create();

        // Init Renderer
        raycaster.init();

        // Load plane textures
        loaderManager.loadMultipleTextures({
            df: assets.dfTexture,
            dll: assets.dllTexture,
            lmc: assets.lmcTexture,
            qlf: assets.qlfTexture
        }, this.onLoadComplete.bind(this));

        console.log('OBJETS CHARGÉS :')
        console.log(this.objects)

        // Signal setup change screen
        // signal.on('changeScreen', this.onChangeScreen);

        renderer.init(canvas);

        // Start Loop Renderer
        this.startExperience();


    },

    onLoadComplete(){
      this.objects = loaderManager.loadedAssets;
      router.setScreen(1);
    },

    startExperience(){
        renderer.startLoop();
        this.placeMeshFirstScene()
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
                map: this.objects.df,

            })
        )
        DF.name = 'DF'

        DF.position.set(-7, 0, 0)

        DF.rotation.x = 0
        DF.rotation.y = - Math.PI / 4.5

        sceneManager.addObject(DF)
    }
}

export default experienceManager;