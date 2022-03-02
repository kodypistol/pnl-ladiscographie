import * as dat from 'dat.gui'
import scenography from "./scenography";
import sceneManager from "./managers/sceneManager";

const debugPanel = {
    init(){
        console.log('objets:' +
            scenography.objects.df)
        // Initialize GUI
        this.gui = new dat.GUI({ width: 400 });

        // const cameraFolder = this.gui.addFolder('CAMERA');
        const covers = this.gui.addFolder('COVERS');
        const titles = this.gui.addFolder('TITLES');



        // Set GUI for COVERS
        this.setGUI('DEUX FRÈRES', scenography.objects.df, covers);
        this.setGUI('DANS LA LÉGENDE', scenography.objects.dll, covers);
        this.setGUI('LE MONDE CHICO', scenography.objects.lmc, covers);
        this.setGUI('QUE LA FAMILLE', scenography.objects.qlf, covers);


        // Set GUI for SVGs
        this.setGUI('"PNL" title', scenography.objects.pnlTitleSVG, titles);
        this.setGUI('"La Discographie" title', scenography.objects.laDiscographieSVG, titles);
        this.setGUI('DEUX FRÈRES title', scenography.objects.dfSVG, titles);
        this.setGUI('DANS LA LÉGENDE title', scenography.objects.dllSVG, titles);
        this.setGUI('LE MONDE CHICO title', scenography.objects.lmcSVG, titles);
        this.setGUI('QUE LA FAMILLE title', scenography.objects.qlfSVG, titles);



    },
    setGUI(description, object, folder)
    {
        this.objectFolder = folder.addFolder(description)
        const objectFolderPositionFolder = this.objectFolder.addFolder('Position (X,Y,Z)')
        const objectFolderRotationFolder = this.objectFolder.addFolder('Rotation (X,Y,Z)')
        const objectFolderScaleFolder = this.objectFolder.addFolder('Scale')


        //Position GUI
        objectFolderPositionFolder.add(object.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        objectFolderPositionFolder.add(object.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        objectFolderPositionFolder.add(object.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        //Rotation GUI
        objectFolderRotationFolder.add(object.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        objectFolderRotationFolder.add(object.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        objectFolderRotationFolder.add(object.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        // Scale GUI
        const objectScaleParameter = {
            scale: object.scale.x
        }

        objectFolderScaleFolder.add(objectScaleParameter, 'scale').min(0.5).max(2).step(0.001).name('Scale').onFinishChange(() =>
        {
            object.scale.set(objectScaleParameter.scale, objectScaleParameter.scale, objectScaleParameter.scale)
        });
    }
}

export default debugPanel