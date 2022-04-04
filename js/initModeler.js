function init(editor){
		// Desabilitar rotação dos componentes
		mxVertexHandler.prototype.rotationEnabled = false;

		// Enables guides
		mxGraphHandler.prototype.guidesEnabled = true;
		
		
	    // Alt disables guides
	    mxGuide.prototype.isEnabledForEvent = function(evt)
	    {
	    	return !mxEvent.isAltDown(evt);
	    };
		
		// Enables snapping waypoints to terminals
		mxEdgeHandler.prototype.snapToTerminals = true;
		
		// Defines an icon for creating new connections in the connection handler.
		// This will automatically disable the highlighting of the source vertex.
		mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
		
		// Enables connections in the graph and disables
		// reset of zoom and translate on root change
		// (ie. switch between XML and graphical mode).
		editor.graph.setConnectable(true);

		// Clones the source if new connection has no target
		editor.graph.connectionHandler.setCreateTarget(false);
		editor.graph.setAllowDanglingEdges(false);
		editor.graph.setSplitEnabled(false);
		new mxSwimlaneManager(editor.graph);

		//editor.graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';


		editor.graph.panningHandler.useRightButtonForPanning = true;
		editor.graph.panningHandler.useLeftButtonForPanning = false;
		editor.graph.panningHandler.ignoreCell = false;


		// Updates the title if the root changes
		var title = document.getElementById('title');
		
		if (title != null)
		{
			var f = function(sender)
			{
				title.innerHTML = 'mxDraw - ' + sender.getTitle();
			};
			
			editor.addListener(mxEvent.ROOT, f);
			f(editor);
		}
		
	    // Changes the zoom on mouseWheel events
	    mxEvent.addMouseWheelListener(function (evt, up)
	    {
		    if (!mxEvent.isConsumed(evt) && mxEvent.isControlDown(evt)) {
		    	if (up) {
		    		editor.execute('zoomIn');
				} else {
					editor.execute('zoomOut');
				}
				
				mxEvent.consume(evt);
		    }
	    });

		// Defines a new action to switch between
		// XML and graphical display
		var textNode = document.getElementById('xml');
		var graphNode = editor.graph.container;
		var sourceInput = document.getElementById('source');
		sourceInput.checked = false;

		var funct = function(editor)
		{
			if (sourceInput.checked)
			{
				graphNode.style.display = 'none';
				textNode.style.display = 'inline';
				
				var enc = new mxCodec();
				var node = enc.encode(editor.graph.getModel());
				
				textNode.value = mxUtils.getPrettyXml(node);
				textNode.originalValue = textNode.value;
				textNode.focus();
			}
			else
			{
				graphNode.style.display = '';
				
				if (textNode.value != textNode.originalValue)
				{
					var doc = mxUtils.parseXml(textNode.value);
					var dec = new mxCodec(doc);
					dec.decode(doc.documentElement, editor.graph.getModel());
				}

				textNode.originalValue = null;
				
				// Makes sure nothing is selected in IE
				if (mxClient.IS_IE)
				{
					mxUtils.clearSelection();
				}

				textNode.style.display = 'none';

				// Moves the focus back to the graph
				editor.graph.container.focus();
			}
		};
		
		editor.addAction('switchView', funct);
		
		// Defines a new action to switch between
		// XML and graphical display
		mxEvent.addListener(sourceInput, 'click', function()
		{
			editor.execute('switchView');
		});

		// Create select actions in page
		var node = document.getElementById('mainActions');
		var buttons = ['new', 'save','group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show', 'zoomIn', 'zoomOut', 'fit'];
		
		// Only adds image and SVG export if backend is available
		// NOTE: The old image export in mxEditor is not used, the urlImage is used for the new export.
		if (editor.urlImage != null)
		{
			// Client-side code for image export
			var exportImage = function(editor)
			{
				var graph = editor.graph;
				var scale = graph.view.scale;
				var bounds = graph.getGraphBounds();
				
	        	// New image export
				var xmlDoc = mxUtils.createXmlDocument();
				var root = xmlDoc.createElement('output');
				xmlDoc.appendChild(root);
				
			    // Renders graph. Offset will be multiplied with state's scale when painting state.
				var xmlCanvas = new mxXmlCanvas2D(root);
				xmlCanvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
				xmlCanvas.scale(scale);
				
				var imgExport = new mxImageExport();
			    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
			    
				// Puts request data together
				var w = Math.ceil(bounds.width * scale + 2);
				var h = Math.ceil(bounds.height * scale + 2);
				var xml = mxUtils.getXml(root);
				
				// Requests image if request is valid
				if (w > 0 && h > 0)
				{
					var name = 'export.png';
					var format = 'png';
					var bg = '&bg=#FFFFFF';
					
					new mxXmlRequest(editor.urlImage, 'filename=' + name + '&format=' + format +
	        			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
	        			simulate(document, '_blank');
				}
			};
			
			editor.addAction('exportImage', exportImage);
			
			// Client-side code for SVG export
			var exportSvg = function(editor)
			{
				var graph = editor.graph;
				var scale = graph.view.scale;
				var bounds = graph.getGraphBounds();

			    // Prepares SVG document that holds the output
			    var svgDoc = mxUtils.createXmlDocument();
			    var root = (svgDoc.createElementNS != null) ?
			    	svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
			    
				if (root.style != null)
				{
					root.style.backgroundColor = '#FFFFFF';
				}
				else
				{
					root.setAttribute('style', 'background-color:#FFFFFF');
				}
			    
			    if (svgDoc.createElementNS == null)
			    {
			    	root.setAttribute('xmlns', mxConstants.NS_SVG);
			    }
			    
			    root.setAttribute('width', Math.ceil(bounds.width * scale + 2) + 'px');
			    root.setAttribute('height', Math.ceil(bounds.height * scale + 2) + 'px');
			    root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
			    root.setAttribute('version', '1.1');
			    
			    // Adds group for anti-aliasing via transform
			    var group = (svgDoc.createElementNS != null) ?
				    	svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
				group.setAttribute('transform', 'translate(0.5,0.5)');
				root.appendChild(group);
			    svgDoc.appendChild(root);

			    // Renders graph. Offset will be multiplied with state's scale when painting state.
			    var svgCanvas = new mxSvgCanvas2D(group);
			    svgCanvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
			    svgCanvas.scale(scale);
			    
			    var imgExport = new mxImageExport();
			    imgExport.drawState(graph.getView().getState(graph.model.root), svgCanvas);

				var name = 'export.svg';
			    var xml = encodeURIComponent(mxUtils.getXml(root));
				
				new mxXmlRequest(editor.urlEcho, 'filename=' + name + '&format=svg' + '&xml=' + xml).simulate(document, "_blank");
			};
			
			editor.addAction('exportSvg', exportSvg);
			
			buttons.push('exportImage');
			buttons.push('exportSvg');
		};
		
		// ['group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show']
		var icons = [['new'],['save'],['group', 'ungroup'], ['cut', 'copy', 'paste'], ['delete'], ['undo', 'redo'], ['print', 'image'], ['zoomin', 'zoomout', 'fit']];


		var i = 0;
		for(var j = 0; j < icons.length;j++){
			var group = document.createElement('div');
			group.classList.add('btn-group');

			for(k = 0; k < icons[j].length;k++){
				var button = document.createElement('a');
				button.id = buttons[i];
				button.classList.add('btn');
				button.classList.add('bg-light');
				button.classList.add('btn-sm');
				if(i == 0 || i == 1){
					button.classList.add('disabled');
				}

				var icon = document.createElement("img");
				icon.src="images/"+ icons[j][k] +".gif";

				button.appendChild(icon);
				mxUtils.write(button, "");
				
				var factory = function(name)
				{
					return function()
					{
						editor.execute(name);
					};
				};
				
				mxEvent.addListener(button, 'click', factory(buttons[i]));

				group.appendChild(button);
				i++;
				
			}

			node.appendChild(group);

		}



		// Create select actions in page
		var node = document.getElementById('selectActions');
		mxUtils.write(node, 'Select: ');
		mxUtils.linkAction(node, 'All', editor, 'selectAll');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'None', editor, 'selectNone');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'Vertices', editor, 'selectVertices');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'Edges', editor, 'selectEdges');

		// Create select actions in page
		var node = document.getElementById('zoomActions');
		mxUtils.write(node, 'Zoom: ');
		mxUtils.linkAction(node, 'In', editor, 'zoomIn');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'Out', editor, 'zoomOut');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'Actual', editor, 'actualSize');
		mxUtils.write(node, ', ');
		mxUtils.linkAction(node, 'Fit', editor, 'fit');

		var listener = function(sender, evt)
		{
			editor.graph.validateGraph();
		};
		


		editor.graph.getModel().addListener(mxEvent.CHANGE, listener);



	// DataStore Shape, supports size style
		function DataStoreShape()
		{
			mxCylinder.call(this);
		};
		mxUtils.extend(DataStoreShape, mxCylinder);

		DataStoreShape.prototype.redrawPath = function(c, x, y, w, h, isForeground)
		{
			var dy = Math.min(h / 2, Math.round(h / 8) + this.strokewidth - 1);
			
			if ((isForeground && this.fill != null) || (!isForeground && this.fill == null))
			{
				c.moveTo(0, dy);
				c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
				
				// Needs separate shapes for correct hit-detection
				if (!isForeground)
				{
					c.stroke();
					c.begin();
				}
				
				c.translate(0, dy / 2);
				c.moveTo(0, dy);
				c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
				
				// Needs separate shapes for correct hit-detection
				if (!isForeground)
				{
					c.stroke();
					c.begin();
				}
				
				c.translate(0, dy / 2);
				c.moveTo(0, dy);
				c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
				
				// Needs separate shapes for correct hit-detection
				if (!isForeground)
				{
					c.stroke();
					c.begin();
				}
				
				c.translate(0, -dy);
			}
			
			if (!isForeground)
			{
				c.moveTo(0, dy);
				c.curveTo(0, -dy / 3, w, -dy / 3, w, dy);
				c.lineTo(w, h - dy);
				c.curveTo(w, h + dy / 3, 0, h + dy / 3, 0, h - dy);
				c.close();
			}
		};
		DataStoreShape.prototype.getLabelMargins = function(rect)
		{
			return new mxRectangle(0, 2.5 * Math.min(rect.height / 2, Math.round(rect.height / 8) +
				this.strokewidth - 1) * this.scale, 0, 0);
		}

		mxCellRenderer.registerShape('datastore', DataStoreShape);
}