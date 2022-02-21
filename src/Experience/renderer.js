import * as THREE from "three";
import raycaster from './raycaster'
import experienceManager from "./experienceManager";
import sceneManager from "./managers/sceneManager";

const renderer = {
    init(canvas)
    {
        // Initialize the WebGL renderer
        this.threeRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });

        // Setting parameters in order to make it work properly
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
        this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.threeRenderer.setClearColor('#0C1020');

        window.addEventListener('resize', () =>
        {
            this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
            this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    },
    getRenderer(){
        return this.threeRenderer;
    },
    draw(){
        this.threeRenderer.render(sceneManager.getThreeScene(), sceneManager.getThreeCamera());
    },


    /**
     * -------------- LOOP TICK FUNCTION --------------
     */
    startLoop()
    {
        this.clock = new THREE.Clock();
        this.lastElapsedTime = 0;

        this.currentIntersect = null;

        this.tick = () =>
        {
            this.elapsedTime = this.clock.getElapsedTime();
            this.deltaTime = this.elapsedTime - this.lastElapsedTime;
            this.lastElapsedTime = this.elapsedTime;


            // Raycaster
            // if(raycaster.getCameraControl())
            // {
            //     raycaster.threeSetFromCamera();
            //
            //     this.hoveringElements = [experienceManager.objects.df, experienceManager.objects.dll,
            //         experienceManager.objects.lmc, experienceManager.objects.qlf]
            //
            //     this.intersectObjects = raycaster.getRaycaster().intersectObjects(this.hoveringElements)
            //
            //     if (this.intersectObjects.length)
            //     {
            //         if (this.currentIntersect !== this.intersectObjects[0].object)
            //         {
            //             switch (this.intersectObjects[0].object.name)
            //             {
            //
            //                 default:
            //             }
            //         }
            //         this.currentIntersect = this.intersectObjects[0].object
            //
            //     }
            //     else
            //     {
            //         if (this.currentIntersect)
            //         {
            //             // leaveRaycasterHover();
            //         }
            //         this.currentIntersect = null;
            //     }
            //
            // }

            // Render
            this.draw();

            // Call tick again on the next frame
            window.requestAnimationFrame(this.tick)
        }

        this.tick()
    }
}

export default renderer;