import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const progressDialog = document.getElementById("progress-dialog");
const progressIndicator = document.getElementById("progress-indicator");

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    const url = "https://pub-b5e3fa5caf8549b4bf8bff1ac7c7eee8.r2.dev/53470b29-88cd-4cce-9184-6faf9f8776ae/output/a.splat";

    await SPLAT.Loader.LoadAsync(url, scene, (progress) => progressIndicator.value = progress * 100);
    progressDialog.close();

    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(frame);
}

main();
