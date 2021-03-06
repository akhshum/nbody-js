// declare global variables
var camera, scene, renderer, particleSystem;
var WIDTH, HEIGHT;
var pCOUNT = 5000;
var r, theta;

var $container = $('#container');

function init() {
	WIDTH = $(window).width();
	HEIGHT = $(window).height();

	var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

	renderer = new THREE.WebGLRenderer();
	camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE, ASPECT, NEAR, FAR);

	scene = new THREE.Scene();

	camera.position.z = 600;

	renderer.setSize(WIDTH, HEIGHT);

	scene.add(camera)

	$container.append( renderer.domElement );

	// create a sphere

	var radius = 5,
		segments = 16,
		rings = 16;

	// create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!

	var sphereMaterial = 
		new THREE.MeshLambertMaterial(
			{
				color: 0xDDDDDD
			});

	sphere = new THREE.Mesh(

	  new THREE.SphereGeometry(
	    radius,
	    segments,
	    rings),

	  sphereMaterial);

	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.position.z = 0;

	// add the sphere to the scene
	//scene.add(sphere);

	// create particle variables
	var particles = new THREE.Geometry;
	var pMaterial = new THREE.ParticleBasicMaterial({
		color: 0xFFFFFF,
		size: 10,
		map: THREE.ImageUtils.loadTexture("img/particle.png"),
		blending: THREE.AdditiveBlending,
		transparent: true
	});


	// spawn individual particles
	for (var i = 0; i < pCOUNT; i++) {
		r = Math.random() * (WIDTH * 0.25);
		theta = Math.random() * Math.PI * 2.0;
		var pX = r * Math.cos(theta),
			pY = r * Math.sin(theta),
			pZ = r * Math.tan(theta),
			particle = new THREE.Vertex(
				new THREE.Vector3(pX, pY, pZ)
			);
			particle.velocity = 0.0;
			particle.accel = 0.0;
		particles.vertices.push(particle);
	}

	// create particle system
	particleSystem = new THREE.ParticleSystem(
		particles, pMaterial);

	particleSystem.sortParticles = true;

	// add to scene
	scene.add(particleSystem);


	// create a point light
	var pointLight =
	  new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 15;
	pointLight.position.z = 300;

	// add to the scene
	//scene.add(pointLight);

	var light = new THREE.DirectionalLight(0xFFFF66, 1.0);
	light.position.set(0.5, 0.7, 1);
	scene.add(light);
}


function animate() {

	renderer.render(scene, camera);

	// add rotation
	particleSystem.rotation.y += 0.01

	// call next frame
	requestAnimationFrame(animate);
}

// on load starting point
$(function() {

	init();
	animate();

	// on window resize
	$(window).resize(function() {
		WIDTH = $(window).width();
		HEIGHT = $(window).height();

		// update renderer
		renderer.setSize(WIDTH, HEIGHT);

		// update camera
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

});