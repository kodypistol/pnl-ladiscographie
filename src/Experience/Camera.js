import * as THREE from 'three'
import sceneManager from "./managers/sceneManager";
import experienceManager from "./experienceManager";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

class Camera {
    constructor() {
        // Create a Perspective Camera
        this.threeCamera = new THREE.PerspectiveCamera(
            15,
            window.innerWidth / window.innerHeight,
            0.1, 1000
        );

        this.controls = new OrbitControls(this.threeCamera, experienceManager.getCanvas());
        this.controls.enableDamping = true;
        this.controls.enabled = false

        // Set the Three Camera position in the scene
        this.threeCamera.position.set(0, 0, 10);


        // Set EventListener to resize correctly the camera when resizing screen
        window.addEventListener('resize', () =>
        {

            // Update camera
            this.threeCamera.aspect = window.innerWidth / window.innerHeight
            this.threeCamera.updateProjectionMatrix()

        })

        // Debug utilities

        window.addEventListener('keyup', (event) =>
        {
            if (event.code === 'KeyD')
            {
                this.activateControls();
            }
            if (event.code === 'KeyR')
            {
                this.threeCamera.position.set(0, 0, 10);
                this.threeCamera.lookAt(0, 0, 0)
            }
        });
    }

    getThreeCamera = () =>
    {
        return this.threeCamera;
    }

    activateControls = () =>
    {

        console.log('avant')

        if (!this.activeControls)
        {
            this.activeControls = true;
            this.controls.enabled = true;
            this.controls.update();

        }
        else
        {
            this.activeControls = false;
            this.controls.enabled = false;
            this.controls.update();

        }
    }



}

export default Camera;