var scene, camera, renderer, mesh, clock;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02, canShoot:0 , hp : 3, Score : 0, inTime : 0};
var removet = true;
var USE_WIREFRAME = false;

var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;

// Models index

var models = {

	oil :{
		linktomodel : "models/oil/scene.gltf",
		mesh: null
	}
	,
	meteor : {
		linktomodel : "models/oil/scene.gltf",
		mesh:null
	}
	,
	dog : null
	,
	cat : null
};

var planets = {
moon : {
	x : 20,
	y : 20,
	z : 20,
	model : null
}

};
var items = {



		oil1 : {
			initX : 100,
			initY : 0,
			initZ : 100,
		 x : 50,
		 y : 50,
		 z: 50,
		 inittime : 5,
		timeleft :5,
		rotation : 0.1,
		reset : 10,
		timetokill:0,
		 model : null,

		},
};
var meteors = {
meteor1 : {
	initX : 100,
	initY : 0,
	initZ : 100,
 x : 50,
 y : 50,
 z: 50,
hp:3,
rotation : 0.5,
reset : 10,
timetokill:0,
 model : null,

},

meteor2 : {
	initX : 100,
	initY : 0,
	initZ : 300,
 x : 50,
 y : 50,
 z: 50,
 hp:3,
 rotation : 0.3,
 reset : 10,
 timetokill:0,
 model : null
},

meteor3 : {

		initX : 50,
		initY : 100,
		initZ : 100,
 x : 50,
 y : 50,
 z: 50,
 hp:3,
 rotation : 0.6,
 reset : 10,
 timetokill:0,
 model : null
},

meteor4 : {

		initX : 100,
		initY : 20,
		initZ : 100,
 x : 50,
 y : 50,
 z: 50,
 hp:2,
 rotation : 0.7,
 reset : 10,
 timetokill:0,
 model : null
},

meteor5 : {

		initX : 30,
		initY : 100,
		initZ : -30,
 x : 50,
 y : 50,
 z: 50,
 hp:3,
 rotation : 0.001,
 reset : 10,
 timetokill:0,
 model : null
},

meteor6 : {

		initX : 30,
		initY : 100,
		initZ : -30,
 x : 50,
 y : 50,
 z: 50,
 hp:3,
 rotation : 0.001,
 reset : 10,
 timetokill:0,
 model : null
},

meteor7 : {

		initX : 30,
		initY : 100,
		initZ : -30,
 x : 50,
 y : 50,
 z: 50,
 hp:3,
 rotation : 0.001,
 reset : 10,
 timetokill:0,
 model : null
},


};

			const loader = new THREE.GLTFLoader();



						loader.load('./models/oil/scene.gltf', function(gltf){
						  items.oil1.model = gltf.scene.children[0];
						  items.oil1.model.scale.set(1,1,1);
							items.oil1.model.position.set(planets.moon.x,planets.moon.y,planets.moon.z);
						  scene.add(gltf.scene);
						}, undefined, function (error) {
							console.error(error);
						});

			loader.load('./models/moon/scene.gltf', function(gltf){
			  planets.moon.model = gltf.scene.children[0];
			  planets.moon.model.scale.set(2,2,2);
				planets.moon.model.position.set(planets.moon.x,planets.moon.y,planets.moon.z);
			  scene.add(gltf.scene);
			}, undefined, function (error) {
				console.error(error);
			});
			loader.load('./models/moon/scene.gltf', function(gltf){
			  meteors.meteor1.model = gltf.scene.children[0];
			  meteors.meteor1.model.scale.set(2,2,1);
				meteors.meteor1.modelposition.set(50,0,5);
			  scene.add(gltf.scene);
			}, undefined, function (error) {
				console.error(error);
			});

			loader.load('./models/moon/scene.gltf', function(gltf){
				meteors.meteor2.model = gltf.scene.children[0];
				meteors.meteor2.model.scale.set(2,2,1);
				meteors.meteor2.model.position.set(20,0,5);
				scene.add(gltf.scene);
			}, undefined, function (error) {
				console.error(error);
			});


			loader.load('./models/moon/scene.gltf', function(gltf){
			  meteors.meteor3.model = gltf.scene.children[0];
			  meteors.meteor3.model.scale.set(1,1,1);
				meteors.meteor3.model.position.set(10,20,30);
			  scene.add(gltf.scene);
			}, undefined, function (error) {
				console.error(error);
			});

			loader.load('./models/moon/scene.gltf', function(gltf){
			  meteors.meteor4.model = gltf.scene.children[0];
			  meteors.meteor4.model.scale.set(1,1,1);
				meteors.meteor4.model.position.set(50,0,5);
			  scene.add(gltf.scene);
			}, undefined, function (error) {
				console.error(error);
			});

						loader.load('./models/moon/scene.gltf', function(gltf){
						  meteors.meteor5.model = gltf.scene.children[0];
						  meteors.meteor5.model.scale.set(1,1,1);
							meteors.meteor5.model.position.set(50,0,5);
						  scene.add(gltf.scene);
						}, undefined, function (error) {
							console.error(error);
						});


      						loader.load('./models/meteor2/scene.gltf', function(gltf){
      						  meteors.meteor6.model = gltf.scene.children[0];
      						  meteors.meteor6.model.scale.set(0.07, 0.07,0.07);
      							meteors.meteor6.model.position.set(100,0,5);
      						  scene.add(gltf.scene);
      						}, undefined, function (error) {
      							console.error(error);
      						});

            			loader.load('./models/meteor3/scene.gltf', function(gltf){
            			  meteors.meteor7.model = gltf.scene.children[0];
            			  meteors.meteor7.model.scale.set(0.035, 0.035,0.035);
            				meteors.meteor7.model.position.set(1000,0,5);
            			  scene.add(gltf.scene);
            			}, undefined, function (error) {
            				console.error(error);
            			});

// Meshes index
var meshes = {};

// Bullets array
var bullets = [];

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	clock = new THREE.Clock();


		light3 = new THREE.PointLight(0xc4c4c4,0.8);
		light3.position.set(50,50,50);
		scene.add(light3);

	loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);

	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
		onResourcesLoaded();
	};


	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);


	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	var textureLoader = new THREE.TextureLoader(loadingManager);
	crateTexture = textureLoader.load("crate0/crate0_diffuse.jpg");
	crateBumpMap = textureLoader.load("crate0/crate0_bump.jpg");
	crateNormalMap = textureLoader.load("crate0/crate0_normal.jpg");

	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	scene.add(crate);
	crate.position.set(2.5, 3/2, 2.5);
	crate.receiveShadow = true;
	crate.castShadow = true;

	// Load models
	// REMEMBER: Loading in Javascript is asynchronous, so you need
	// to wrap the code in a function and pass it the index. If you
	// don't, then the index '_key' can change while the model is being
	// downloaded, and so the wrong model will be matched with the wrong
	// index key.

	var temp =0;
	for( var _key in models ){

	}



	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	document.body.appendChild(renderer.domElement);
	const loader = new THREE.TextureLoader();
const bgTexture = loader.load('res/bg.webp');
scene.background = bgTexture;
	render();
}

// Runs when all resources are loaded
function onResourcesLoaded(){

}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function render(){

	// Play the loading screen until resources are loaded.
	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(render);

		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

	requestAnimationFrame(render);

	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();


	for( var _key in meteors){
		(function(key){
			camera.updateMatrixWorld();
			meteors[key].model.rotation.z -= meteors[key].rotation*meteors[key].timetokill
			if (meteors[key].timetokill >0)
			meteors[key].timetokill -=0.05
			if(meteors[key].timetokill <=0)
			{

				meteors[key].reset -=0.1
				if(meteors[key].reset <0)
				{
								meteors[key].timetokill =  getRandomInt(15, 30)
					meteors[key].initX = camera.position.x+ + getRandomInt(70, 100) * (getRandomInt(1, 2)==2? 1:-1)
		//			meteors[key].y =  getRandomInt(100, 1000) * getRandomInt(1, 2)==2? 1:-1
					meteors[key].initZ  =  camera.position.z+getRandomInt(70, 100) *( getRandomInt(1, 2)==2? 1:-1)
					meteors[key].reset = 5
				}
			}

			meteors[key].x = 	meteors[key].initX  +meteors[key].timetokill *2  //camera.position.x+ //5+ meteors[key].initX*meteors[key].timetokill
			meteors[key].y = camera.position.y //camera.position.y//+0-100*meteors[key].timetokill
			meteors[key].z = 	meteors[key].initZ  + meteors[key].timetokill *2 // camera.position.z+//5+meteors[key].initZ*meteors[key].timetokill
		meteors[key].model.position.set(meteors[key].x,meteors[key].y,meteors[key].z)


			console.log(player.inTime, " ", player.hp)
			console.log(key +"  x "+(meteors[key].x-camera.position.x)  + " z "+(meteors[key].z - camera.position.z) + "COND 1 X "+ (meteors[key].x-camera.position.x <10 && meteors[key].x-camera.position.x > -10) +"COND Z : "+( meteors[key].z - camera.position.z > -10 && meteors[key].z - camera.position.z< 10))
					if(meteors[key].x-camera.position.x <5 && meteors[key].x-camera.position.x > -5  && meteors[key].z - camera.position.z > -5&& meteors[key].z - camera.position.z< 5)
					{
						console.log("Player get hit by meteor " + key +" !")
						meteors[key].reset = 0;
						meteors[key].timetokill = 0;
						if( player.inTime <=0)
						{
							player.inTime = 3;
							player.hp -=1;
						}

						if(player.hp <=0)
						{
							console.log("GAME OVER!")
							player.speed = 0;
						}
						//TODO: HIT EFFECT
					}
	//	 console.log(key+ " :" + meteors[key].x + " " + meteors[key].y + " "+ meteors[key].z+"STG "+meteors[key].timetokill+" RS: "+ meteors[key].reset + "IS : "+ meteors[key].initX + " "+meteors[key].initZ)
		})(_key);
	}


	// Meteor code ends

			for( var _key in items){
				(function(key){
					camera.updateMatrixWorld();
					items[key].model.rotation.z -= items[key].rotation * items[key].timetokill *0.06
					if (items[key].timetokill >0)
					items[key].timetokill -=0.05
					if(items[key].timetokill <=0)
					{

						items[key].reset -=0.1
						if(items[key].reset <0)
						{
										items[key].timetokill =  getRandomInt(15, 30)
							items[key].initX = camera.position.x+ + getRandomInt(20, 100) * (getRandomInt(1, 2)==2? 1:-1)
				//			items[key].y =  getRandomInt(100, 1000) * getRandomInt(1, 2)==2? 1:-1
							items[key].initZ  =  camera.position.z+getRandomInt(20, 100) *( getRandomInt(1, 2)==2? 1:-1)
							items[key].reset = 5
						}
					}

					items[key].x = 	items[key].initX // +items[key].timetokill *0.05  //camera.position.x+ //5+ items[key].initX*items[key].timetokill
					items[key].y = camera.position.y //camera.position.y//+0-100*items[key].timetokill
					items[key].z = 	items[key].initZ // + items[key].timetokill *0.05 // camera.position.z+//5+items[key].initZ*items[key].timetokill
				items[key].model.position.set(items[key].x,items[key].y,items[key].z)


					console.log(player.inTime, " ", player.hp)
					console.log(key +"  x "+(items[key].x-camera.position.x)  + " z "+(items[key].z - camera.position.z) + "COND 1 X "+ (items[key].x-camera.position.x <10 && items[key].x-camera.position.x > -10) +"COND Z : "+( items[key].z - camera.position.z > -10 && items[key].z - camera.position.z< 10))
							if(items[key].x-camera.position.x <5 && items[key].x-camera.position.x > -5  && items[key].z - camera.position.z > -5&& items[key].z - camera.position.z< 5)
							{
								console.log("Player get item " + key +" !")
								items[key].timetokill = 0;
								items[key].reset =0;
								if( key == "oil1")
								{
									console.log("item1 obtained! hp +1 ")
									player.inTime = 3;
									player.speed = player.speed * 2;
									player.hp +=1;

								}

								//TODO: HIT EFFECT
							}
			//	 console.log(key+ " :" + items[key].x + " " + items[key].y + " "+ items[key].z+"STG "+items[key].timetokill+" RS: "+ items[key].reset + "IS : "+ items[key].initX + " "+items[key].initZ)
				})(_key);
			}

			// item code ends here




	if(player.inTime >0)
	{
		player.inTime -=0.05;
	}
	else {

		player.speed = 0.2;
		player.inTime =0;
	}
		var temp = 0.00005;
		temp *= 0.001;
		planets.moon.model.rotation.x += 0.01;
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
		crate.rotation.y += 0.01;
		// Uncomment for absurdity!
		// meshes["pirateship"].rotation.z += 0.01;

		// go through bullets array and update position
		// remove bullets when appropriate
		for(var index=0; index<bullets.length; index+=1){
			if( bullets[index] === undefined ) continue;
			if( bullets[index].alive == false ){
				bullets.splice(index,1);
				continue;
			}

			bullets[index].position.add(bullets[index].velocity);
		}

	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * 2*player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	else if(keyboard[83]){ // S key
		camera.position.x -= Math.sin(camera.rotation.y) *0.5* player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	else if(keyboard[65]){ // A key

			camera.position.x -= Math.sin(camera.rotation.y) * 2*player.speed;
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	else if(keyboard[68]){ // D key

			camera.position.x -= Math.sin(camera.rotation.y) * 2*player.speed;
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	// shoot a bullet
	if(keyboard[32] && player.canShoot <= 0){ // spacebar key
		// creates a bullet as a Mesh object
		var bullet = new THREE.Mesh(
			new THREE.SphereGeometry(0.05,8,8),
			new THREE.MeshBasicMaterial({color:0xffffff})
		);
		// this is silly.
		// var bullet = models.pirateship.mesh.clone();

		// position the bullet to come from the player's weapon
		bullet.position.set(
			camera.position.x,
			camera.position.y + 0.15,
			camera.position.z
		);

		// set the velocity of the bullet
		bullet.velocity = new THREE.Vector3(
			-Math.sin(camera.rotation.y),
			0,
			Math.cos(camera.rotation.y)
		);

		// after 1000ms, set alive to false and remove from scene
		// setting alive to false flags our update code to remove
		// the bullet from the bullets array
		bullet.alive = true;
		setTimeout(function(){
			bullet.alive = false;
			scene.remove(bullet);
		}, 1000);

		// add to scene, array, and set the delay to 10 frames
		bullets.push(bullet);
		scene.add(bullet);
		player.canShoot = 10;
	}
	if(player.canShoot > 0) player.canShoot -= 1;

	// position the gun in front of the camera

	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
