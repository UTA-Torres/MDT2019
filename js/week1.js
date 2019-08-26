
// Globals
window.gui = undefined;
window.svg = undefined;

// $ is a special character in jquery (a JS utility library) that designates 
// the main function. More precisely, this is the function that is called once
// the Document Object Model (DOM) has loaded. 

// MAIN FUNCTION
$(
	function(){
		// Bind paper.js to a fullscreen Canvas element
		$('#myCanvas').attr('height', $(window).height());
		$('#myCanvas').attr('width', $(window).width());
		paper.install(window);
		paper.setup('myCanvas');
		paper.view.zoom = 1;

		// Add dat.gui (a controller library) to the environment. 
		// Great for sandboxing.
		// https://github.com/dataarts/dat.gui
		gui = new dat.GUI();

		examples = {
			dm: direct_manipulation, 
			import: importing_svgs,
			clear: function(){ paper.project.clear() }
		}
		// Create three buttons that trigger the functions held by the 
		// examples object.
		gui.add(examples, "dm")
		gui.add(examples, "import")
		gui.add(examples, "clear")

		// AUTOMATICALLY CALL
		examples.dm()
	}
)


function direct_manipulation(){
	console.log("Running the Direct Manipulation Example");
	bigRedCircle = new paper.Path.Circle({
		fillColor: "red",
		radius: 100, 
		position: paper.view.center,
		onMouseDown: function(e){
			this.fillColor = "blue"
		}, 
		onMouseUp: function(e){
			this.fillColor = "orange"
		}
	})
}

function importing_svgs(){
	paper.project.importSVG("/svgs/TEST.svg", function(svg){
		window.svg = svg
		svg.position = paper.view.center
	})
}
