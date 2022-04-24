import scenography from "../scenography";
import raycaster from "../raycaster";
import gsap from "gsap";

const discoverAlbumManager = {
    discoverDeuxFreres(){
        document.querySelector('.album').style.display = 'flex';

        gsap.to('.album', {
            duration: 2,
            delay: 0,
            opacity: '100' + '%'
        });

        const initializeDeuxFreresNav = gsap.timeline(
            {
                repeat: 0,
                // onComplete: this.setupComplete.bind(this)
            })
        // DF : Position
        initializeDeuxFreresNav.to(scenography.objects.df.position,
            {
                duration: 1,
                delay: 0,
                x:0.72,
                y: 0.55,
                z: -1.8
            }, 0)

        // DF : Rotation
        initializeDeuxFreresNav.to(scenography.objects.df.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)

        // DF : Scale
        initializeDeuxFreresNav.to(scenography.objects.df.scale,
            {
                duration: 1,
                delay: 0,
                x:0.5,
                y: 0.5,
                z: 0.5
            }, 0)


        /**
         * DLL
         */
        // DLL : Position
        initializeDeuxFreresNav.to(scenography.objects.dll.position,
            {
                duration: 1,
                delay: 0,
                x: scenography.objects.dll.position.x + 10,
            }, 0)

        // DLL : Rotation
        initializeDeuxFreresNav.to(scenography.objects.dll.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)

        /**
         * LMC
         */
        // LMC : Position
        initializeDeuxFreresNav.to(scenography.objects.lmc.position,
            {
                duration: 1,
                delay: 0,
                x: scenography.objects.lmc.position.x - 10,
            }, 0)

        // LMC : Rotation
        initializeDeuxFreresNav.to(scenography.objects.lmc.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)

        /**
         * QLF
         */
        // QLF : Position
        initializeDeuxFreresNav.to(scenography.objects.qlf.position,
            {
                duration: 1,
                delay: 0,
                x: scenography.objects.qlf.position.x + 10,
            }, 0)

        // QLF : Rotation
        initializeDeuxFreresNav.to(scenography.objects.qlf.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)
        raycaster.setCameraControl(false);

        /**
         * PNL TITLE
         */
        scenography.objects.pnlTitleSVG.children.forEach((child) =>
        {
            gsap.to(child.material, {
                duration: 1,
                delay: 0,
                opacity:0
            })
        })
        initializeDeuxFreresNav.to(scenography.objects.pnlTitleSVG.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)

        /**
         * La Discographie TITLE
         */
        scenography.objects.laDiscographieSVG.children.forEach((child) =>
        {
            gsap.to(child.material, {
                duration: 1,
                delay: 0,
                opacity:0
            })
        })
        initializeDeuxFreresNav.to(scenography.objects.laDiscographieSVG.rotation,
            {
                duration: 1,
                delay: 0,
                x:0,
                y: 0,
                z: 0
            }, 0)
    }
}

export default discoverAlbumManager;