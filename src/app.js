import './style.css'
import router from './router'
import experienceManager from './Experience/experienceManager'


router.init();
window.addEventListener("load", () =>
{
    experienceManager.init();

    router.setScreen(0);
});
