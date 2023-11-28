import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
// import SplatScene from '../components/scene/SplatScene';
import dynamic from 'next/dynamic';

const SplatScene = dynamic(() => import('../components/scene/SplatScene'), { ssr: false });
const isServer = typeof window === 'undefined';
const Router = isServer ? StaticRouter : BrowserRouter;

const Viewer = () => {
	return (
		<Router location={''}>
			<ViewerContent />
		</Router>
	);
};

const ViewerContent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const targetUrl = queryParams.get('url');
    // const defaultUrl = "https://pub-b5e3fa5caf8549b4bf8bff1ac7c7eee8.r2.dev/53470b29-88cd-4cce-9184-6faf9f8776ae/output/a.splat";
    const defaultUrl = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k-mini.splat";
    const [sceneUrl, setSceneUrl] = useState(targetUrl || defaultUrl);

    useEffect(() => {
        // Update the sceneUrl only when the targetUrl changes
        if (targetUrl) {
            setSceneUrl(targetUrl);
        }
    }, [targetUrl]);

	return (
		<>
			<div id="progress-container">
				<dialog open id="progress-dialog">
					<p>
						<label htmlFor="progress-indicator">Loading scene...</label>
					</p>
					<progress max="100" id="progress-indicator"></progress>
				</dialog>
			</div>
			<SplatScene url={sceneUrl} />
		</>
	);
};

export default Viewer;
