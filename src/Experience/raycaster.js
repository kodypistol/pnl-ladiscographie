import * as THREE from "three";
import sceneManager from './managers/sceneManager';

let cameraControl = false;

const raycaster = {
    /**
     * Raycaster
     */


    init(){

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.cursor = {
            x: 0,
            y: 0
        };

        window.addEventListener('mousemove', (event) => {


            // Cursor for camera controlling
            this.cursor.x = (event.clientX / window.innerWidth - 0.5) / 6;
            this.cursor.y = -(event.clientY / window.innerHeight - 0.5) / 6;

            if(this.cameraControl)
            {
                sceneManager.getThreeCamera().lookAt(this.cursor.x, this.cursor.y)
            }

            // Mouse for Raycaster
            this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight * 2 - 1);

        });
    },
    getRaycaster(){
        return this.raycaster;
    },
    getCameraControl(){
        return cameraControl;
    },
    setCameraControl(bool){
        this.cameraControl = bool;
    },
    threeSetFromCamera(){
        this.raycaster.setFromCamera(this.mouse, sceneManager.getThreeCamera())
    }


}

export default raycaster;