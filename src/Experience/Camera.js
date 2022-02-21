import * as THREE from 'three'

class Camera {
    constructor() {
        // Create a Perspective Camera
        this.threeCamera = new THREE.PerspectiveCamera(
            20,
            window.innerWidth / window.innerHeight,
            0.1, 1000
        );

        // Set the Three Camera position in the scene
        this.threeCamera.position.set(0, 0, 10);

        // Set EventListener to resize correctly the camera when resizing screen
        window.addEventListener('resize', () =>
        {

            // Update camera
            this.threeCamera.aspect = window.innerWidth / window.innerHeight
            this.threeCamera.updateProjectionMatrix()

            // Update renderer

        })
    }

    getThreeCamera = () =>
    {
        return this.threeCamera;
    }

}

export default Camera;