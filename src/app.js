import './style.css'
import router from './router'
import experienceManager from './Experience/experienceManager'
import debugPanel from "./Experience/debugPanel";


router.init();
window.addEventListener("load", () =>
{
    experienceManager.init();

    router.setScreen(0);
});
