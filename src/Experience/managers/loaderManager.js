import * as THREE from "three";

const loaderManager = {
    loadMultipleTextures(objects, callback)
    {

        this.queue = [];
        this.loadedAssets = {};

        this.callback = callback;

        for(let key in objects)
        {
            this.queue.push(
                {
                    key: key,
                    url: objects[key]
                }
            );
        }

        console.log('Start loading queue: ', this.queue);

        this.loadQueue()

    },
    loadQueue()
    {
        const fileToLoad = this.queue[0];
        console.log('Start loading file: ');
        console.log(fileToLoad)

        this.loadTexture(fileToLoad.url, (texture) =>
        {
            console.log('Finish loading: ' + fileToLoad.key);

            // Save the loaded texture in the loadedAssets array
            this.loadedAssets[fileToLoad.key] = texture;
            this.queue.shift();

            // Test if there is more textures to load
            if(this.queue.length > 0) {
                // If it is, then load it.
                this.loadQueue();
            } else {
                // If not, we finished to load all the assets, so we can end the loading process and get out of the function
                this.onFinishQueue()
            }

        })
    },
    loadTexture(path, callback){

        const textureLoader = new THREE.TextureLoader();
        const newTexture = textureLoader.load(path);

        callback(newTexture);
    },
    onFinishQueue(){
        // This is tricky to understand but we just provide the callback for the loadMultipleTextures function used
        // in the experienceManager.js. So, we can access it later in the other file and save all of our loaded files.
        this.callback(this.loadedAssets)
    }
}

export default loaderManager;