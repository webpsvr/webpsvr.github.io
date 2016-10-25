var camera, scene, renderer;
var mesh;
var effect;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 800;
	//var controls = new THREE.OrbitControls(camera);

	scene = new THREE.Scene();

	var texture = new THREE.TextureLoader().load( '/assets/textures/crate.gif' );

	var geometry1 = new THREE.BoxBufferGeometry( 200, 200, 200 );
	/*var geometry2 = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var geometry3 = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var geometry4 = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var geometry5 = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var geometry6 = new THREE.BoxBufferGeometry( 200, 200, 200 );*/

	var material = new THREE.MeshBasicMaterial( { map: texture } );

	mesh = new THREE.Mesh( geometry1, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	effect = new THREE.StereoEffect(renderer);
	effect.setSize(window.innerWidth, window.innerHeight);

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	//controls.update(); 

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;
	//camera.rotation.x = acc.pitch;
	//camera.rotation.y = acc.yaw;

	//renderer.render( scene, camera );
	effect.render(scene, camera);


}