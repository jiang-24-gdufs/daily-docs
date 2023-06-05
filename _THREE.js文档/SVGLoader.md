[TOC]

# SVGLoader

A loader for loading a *.svg* resource.
[Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation.

## Example

`// instantiate a loader var loader = new THREE.SVGLoader(); // load a SVG resource loader.load( // resource URL 'data/svgSample.svg', // called when the resource is loaded function ( data ) { 		var paths = data.paths; 	var group = new THREE.Group(); 		for ( var i = 0; i < paths.length; i ++ ) { 			var path = paths[ i ]; 			var material = new THREE.MeshBasicMaterial( { 			color: path.color, 			side: THREE.DoubleSide, 			depthWrite: false 		} ); 			var shapes = path.toShapes( true ); 			for ( var j = 0; j < shapes.length; j ++ ) { 				var shape = shapes[ j ]; 			var geometry = new THREE.ShapeBufferGeometry( shape ); 			var mesh = new THREE.Mesh( geometry, material ); 			group.add( mesh ); 			} 		} 		scene.add( group ); 	}, // called when loading is in progresses function ( xhr ) { 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); 	}, // called when loading has errors function ( error ) { 		console.log( 'An error happened' ); 	} );`[webgl_loader_svg](http://www.webgl3d.cn/threejs/examples/#webgl_loader_svg)

## Constructor

### SVGLoader( manager : LoadingManager )

manager — The loadingManager for the loader to use. Default is THREE.DefaultLoadingManager.

Creates a new SVGLoader.

## Properties

See the base Loader class for common properties.

## Methods

See the base Loader class for common methods.

### .load ( url : String, onLoad : Function, onProgress : Function, onError : Function ) : null

url — A string containing the path/URL of the *.svg* file.
onLoad — (optional) A function to be called after loading is successfully completed. The function receives an array of ShapePath as an argument.
onProgress — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains total and loaded bytes.
onError — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.

Begin loading from url and call onLoad with the response content.

## Source

[examples/js/loaders/SVGLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/SVGLoader.js)
