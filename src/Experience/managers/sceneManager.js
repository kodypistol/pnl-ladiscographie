import * as THREE from 'three';
import Camera from '../Camera';

const sceneManager = {
    create(){
        this.scene = new THREE.Scene();
        this.camera = new Camera();

        this.scene.add(this.camera.getThreeCamera());
    },
    getThreeScene()
    {
        return this.scene
    },
    getThreeCamera(){
       return this.camera.getThreeCamera();
    },
    addObject(object)
    {
        this.scene.add(object);
    },
    removeObject(object)
    {
        this.scene.remove(object);
    }
}

export default sceneManager;