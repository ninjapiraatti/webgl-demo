
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


function browserSupportsWebGL() {
var canvas = document.querySelector('.webgl');
var context = null;var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
for (var i = 0; i < names.length; ++i) {
try { context = canvas.getContext(names[i]); }
catch(e) {}
if (context) { break; }
}
return context != null;
};

if((browserSupportsWebGL) && (document.querySelector('.webgl') !== null) && (viewport.width >= 1000)) {
    var script = document.createElement("script");
    script.onload = function(){


        var camera, scene, mesh_wire, mesh_solid;
        var mouseX = 0, mouseY = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var mouseXPercentage = 0;
		var mouseYPercentage = 0;

		var smoothX = 0;
		var smoothY = 0;

        scene = new THREE.Scene();
        //camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 5 );
        camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 15 );
        //camera.position.z = 3200;
        renderer = new THREE.WebGLRenderer( {alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        document.querySelector(".webgl").appendChild( renderer.domElement );

        //var boxmaterial = new THREE.MeshLambertMaterial( { color: 0x00a0ff, envMap: textureCube } );

        var loader = new THREE.JSONLoader();
        loader.load( "dirigible06.js", function(geometry_wire, materials){
            //var material = new THREE.MeshPhongMaterial( { color: 0xff9600, specular: 0xffff00, shininess: 5, shading: THREE.FlatShading } );
            //var material = new THREE.MeshBasicMaterial({color: 0x00a0ff, wireframe: true});
            //mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( materials ) );
            //mesh_solid = new THREE.Mesh( geometry_wire, materials );
            mesh_solid = new THREE.Mesh( geometry_wire, new THREE.MeshFaceMaterial( materials ) );
            mesh_solid.material.materials[ 0 ].shading = THREE.FlatShading;
            mesh_solid.material.materials[ 1 ].shading = THREE.FlatShading;
						mesh_solid.doubleSided = true;
						console.log(materials);
            //mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh_solid);
						for ( var i = 0; i < materials.length; i ++ )
            {
             var material = materials[i];
                material.side = THREE.DoubleSide;
            }
        });

		var originalCameraX = 0;
		var originalCameraY = 1;
		var originalCameraZ = 8;

		camera.position.x = originalCameraX;
		camera.position.y = originalCameraY;
		camera.position.z = originalCameraZ;

        var light = new THREE.AmbientLight( 0xeeeeee ); // soft white light
        light1 = new THREE.PointLight( 0xffffff, 0.5, 10, 0 );
        //light2 = new THREE.PointLight( 0xffffff, 2, 50 );
        //light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
        scene.add( light1 );
        light1.position.x = 0;
        light1.position.z = 5;
				light1.position.y = 0;

        //scene.add( light2 );
        scene.add( light );

        //Particles
        var particles;
        scene.fog = new THREE.FogExp2( 0x000000, 0.01 );

				geometry = new THREE.Geometry();

				sprite = THREE.ImageUtils.loadTexture( "/site/assets/images/disc.png" );

				for ( i = 0; i < 1000; i ++ ) {

					var vertex = new THREE.Vector3();
					vertex.x = (2 * Math.random() - 1) * 3;
					vertex.y = (2 * Math.random() - 1);
					vertex.z = (4 * Math.random() - 2) - 1.5;

					geometry.vertices.push( vertex );

				}

				material = new THREE.PointCloudMaterial( { size: 0.02, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
				material.color.setRGB( 0.8, 0.8, 0.8 );

				particles = new THREE.PointCloud( geometry, material );
				scene.add( particles );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

				mouseXPercentage = mouseX / windowHalfX;
				mouseYPercentage = mouseY / windowHalfY;
        }
        function onDocumentTouchStart( event ) {
          if ( event.touches.length == 1 ) {

					//event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

					mouseXPercentage = mouseX / windowHalfX;
					mouseYPercentage = mouseY / windowHalfY;
          }
        }
        function onDocumentTouchMove( event ) {
          if ( event.touches.length == 1 ) {

					//event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

					mouseXPercentage = mouseX / windowHalfX;
					mouseYPercentage = mouseY / windowHalfY;
          }
        }

        function animate() {

				requestAnimationFrame( animate );
				render();
        }

        function render() {

        //mesh.rotation.z += mouseXr / 80000;

        var time = Date.now() * 0.0005;
        /*
        light1.position.x = Math.sin( time * 0.7 ) * 20;
        light1.position.y = Math.cos( time * 0.5 ) * 30;
        light1.position.z = Math.cos( time * 0.3 ) * 20;

        light2.position.x = Math.sin( time * 0.3 ) * 20;
        light2.position.y = Math.cos( time * 0.5 ) * 30;
        light2.position.z = Math.cos( time * 0.7 ) * 20;
        */

		camera.position.x = originalCameraX - mouseXPercentage * 0.03;
		camera.position.y = originalCameraY - mouseYPercentage * 0.01;
        // camera.position.x = THREE.Math.clamp(camera.position.x, 0.4, 1.5);
        //camera.position.y += ( - mouseY - camera.position.y ) * .05;

        //camera.lookAt( scene.position );
        //cameraCube.rotation.copy( camera.rotation );

        //particles.rotation.x += ( mouseX * .0005);
        //particles.rotation.y += ( mouseY * .0005);

        if ( mesh_solid !== undefined ) {
			mesh_solid.rotation.y = time * 0.2;
			mesh_solid.rotation.x = mouseYPercentage * 0.01;
        }

        requestAnimationFrame( render );
        renderer.render(scene, camera);
        }
        render();
    }
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
    document.body.appendChild(script);
}
