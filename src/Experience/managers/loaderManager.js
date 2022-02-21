import * as THREE from "three";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import sceneManager from "./sceneManager";

const loaderManager = {

    /**                                                                                  *\
     *  --------------------------------- TEXTURES ------------------------------------- *
     *///                                                                              \\*\

    loadMultipleTextures(objects, callback)
    {

        this.textureQueue = [];
        this.textureLoadedAssets = {};

        this.callback = callback;

        for(let key in objects)
        {
            this.textureQueue.push(
                {
                    key: key,
                    url: objects[key]
                }
            );
        }

        console.log('Start loading texture queue: ', this.textureQueue);

        this.loadTextureQueue()

    },
    /**
     * LOAD TEXTURE QUEUE
     */

    loadTextureQueue()
    {
        const fileToLoad = this.textureQueue[0];
        console.log('Start loading file: ');
        console.log(fileToLoad)

        this.loadTexture(fileToLoad.url, (texture) =>
        {
            console.log('Finish loading: ' + fileToLoad.key);

            // Save the loaded texture in the loadedAssets array
            this.textureLoadedAssets[fileToLoad.key] = texture;
            this.textureQueue.shift();

            // Test if there is more textures to load
            if(this.textureQueue.length > 0) {
                // If it is, then load it.
                this.loadTextureQueue();
            } else {
                // If not, we finished to load all the assets, so we can end the loading process and get out of the function
                this.onFinishTextureQueue()
            }

        })
    },
    loadTexture(path, callback){

        const textureLoader = new THREE.TextureLoader();
        const newTexture = textureLoader.load(path);

        callback(newTexture);
    },
    onFinishTextureQueue(){
        // This is tricky to understand but we just provide the callback for the loadMultipleTextures function used
        // in the experienceManager.js. So, we can access it later in the other file and save all of our loaded files.
        this.callback(this.textureLoadedAssets)
    },

    /**                                                                             *\
     *  --------------------------------- SVG ------------------------------------- *
     *///                                                                         \\*\

    loadMultipleSVGs(objects, callback){

        this.svgQueue = [];
        this.svgLoadedAssets = {};

        this.callback = callback;

        for(let key in objects)
        {
            this.svgQueue.push(
                {
                    key: key,
                    url: objects[key]
                }
            );
        }

        console.log('Start loading svg queue: ', this.svgQueue);

        this.loadSVGQueue();
    },

    loadSVGQueue(){
        const fileToLoad = this.svgQueue[0];
        console.log('Start loading file: ');
        console.log(fileToLoad)

        this.loadSVG(fileToLoad.url, (texture) =>
        {
            console.log('Finish loading: ' + fileToLoad.key);

            // Save the loaded texture in the loadedAssets array
            this.svgLoadedAssets[fileToLoad.key] = texture;
            this.svgQueue.shift();

            // Test if there is more textures to load
            if(this.svgQueue.length > 0) {
                // If it is, then load it.
                this.loadSVGQueue();
            } else {
                // If not, we finished to load all the assets, so we can end the loading process and get out of the function
                this.onFinishSVGQueue()
            }

        })
    },
    loadSVG(path, callback){

        const svgLoader = new SVGLoader();

        svgLoader.load(
            path,
            (data) =>
            {
                const paths = data.paths;
                this.svg = new THREE.Group();

                for (let i = 0; i < paths.length; i ++)
                {
                    const path = paths[i];

                    const material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color('white'),
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        transparent: true,
                        opacity: 1
                    });

                    const shapes = SVGLoader.createShapes(path);

                    for (let j = 0; j < shapes.length ; j++)
                    {
                        const shape = shapes[j];
                        const geometry = new THREE.ShapeBufferGeometry(shape)
                        const mesh = new THREE.Mesh(geometry, material);

                        this.svg.add(mesh);
                    }
                }

                this.svg.scale.set(0.014, 0.014, 0.014)

                this.svg.rotation.y = 0
                this.svg.position.x = 0
                this.svg.position.y = 0
                this.svg.position.z = 0

                // sceneManager.addObject(this.pnlGroup);

                callback(this.svg);
            }


            // path,
            // (svg) =>
            // {
            //     callback(svg)
            // },
            // () =>
            // {
            //     console.log('progress loading svg')
            // },
            // (e) =>
            // {
            //     console.log('error: ' + e)
            // },

        );
    },
    onFinishSVGQueue(){
        // This is tricky to understand but we just provide the callback for the loadMultipleTextures function used
        // in the experienceManager.js. So, we can access it later in the other file and save all of our loaded files.
        this.callback(this.svgLoadedAssets)
    }

}

export default loaderManager;