import scenography from "../scenography";
import raycaster from "../raycaster";

const discoverAlbumManager = {
    discoverDeuxFreres(){
        document.querySelector('.album').style.display = 'flex';
        scenography.objects.dll.position.x = 40;
        scenography.objects.lmc.position.x = 40;
        scenography.objects.qlf.position.x = 40;
        scenography.objects.pnlTitleSVG.position.x = 40;
        scenography.objects.laDiscographieSVG.position.x = 40;

        scenography.objects.df.position.set(0.72, 0.55, -1.8);
        scenography.objects.df.rotation.y = 0;
        scenography.objects.df.scale.set(0.5, 0.5, 0.5);
        scenography.objects.df.updateMatrix();

        raycaster.setCameraControl(false);
    }
}

export default discoverAlbumManager;