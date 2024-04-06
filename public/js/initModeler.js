function init(editor, rootPath){
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
		mxConnectionHandler.prototype.connectImage = new mxImage(rootPath+'/images/connector.gif', 16, 16);
		
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

		let getDiagramSVG = function(graph) {
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

			return mxUtils.getXml(root);
		}

		/**
		 * Salva diagrama, pegando XML e emitindo um novo evento
		 */
		let saveFunction = function(editor) {
			var enc = new mxCodec();
			var node = enc.encode(editor.graph.getModel());
			diagram = mxUtils.getPrettyXml(node);

			let diagramSVG = getDiagramSVG(editor.graph);

			const event = new CustomEvent('saveDiagram', { detail: {xml: diagram, svg: diagramSVG} });
			window.dispatchEvent(event);
		};

		/**
		 * Adiciona ação de salvar ao editor, 
		 * que será executada quando o botão correspondente for clicado
		 */
		editor.addAction('save', saveFunction);

		/**
		 * Escuta o evento de abrir o diagrama e decoda o XML dele
		 */
		window.addEventListener('openDiagram', (event) => {

			var diagram = mxUtils.parseXml(event.detail);
			var dec = new mxCodec(diagram);
			dec.decode(diagram.documentElement, editor.graph.getModel());

        });

		/**
		 * Escuta o evento para gerar diagrama
		 */
		window.addEventListener('generateDiagramSVG', (event) => {

			const svg = getDiagramSVG(editor.graph);
			const sendSVG = new CustomEvent('sendDiagramSVG', { detail: {svg} });
			window.dispatchEvent(sendSVG);

        });

		window.addEventListener('openDiagramSVG', (event) => {
			editor.execute("show");
        });

		window.addEventListener('openDiagramPDF', (event) => {
			editor.execute("print");
        });


		// Create select actions in page		
		var node = document.getElementById('actionsMenu');
		// var buttons = ['new', 'save','group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'zoomIn', 'zoomOut', 'fit'];
		var buttons = ['save','undo', 'redo','group', 'ungroup', 'delete', 'cut', 'copy', 'paste', 'fit', 'zoomIn', 'zoomOut'];
		
		// ['group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show']
		// var icons = [['new'],['save'],['group', 'ungroup'], ['cut', 'copy', 'paste'], ['delete'], ['undo', 'redo'], ['zoomin', 'zoomout', 'fit']];
		var icons = [['save'], ['undo', 'redo'], ['group', 'ungroup'], ['delete', 'cut', 'copy', 'paste'], ['fit', 'zoomin', 'zoomout']];
		// var descriptions = ['Novo', 'Salvar', 'Agrupar', 'Desagrupar', 'Cortar', 'Copiar', 'Colar', 'Excluir', 'Desfazer', 'Refazer', 'Aumentar zoom', 'Reduzir zoom', 'Ajustar à tela'];
		var descriptions = ['Salvar', 'Desfazer', 'Refazer', 'Agrupar', 'Desagrupar', 'Excluir', 'Cortar', 'Copiar', 'Colar', 'Ajustar à tela', 'Aumentar zoom', 'Reduzir zoom'];

		var i = 0;
		for(var j = 0; j < icons.length;j++){
			var group = document.createElement('div');
			group.classList.add('btn-group');
			group.classList.add('me-2');
			group.classList.add('border-end');

			for(k = 0; k < icons[j].length;k++){
				var button = document.createElement('button');
				button.id = buttons[i];
				button.classList.add('btn');
				button.classList.add('btn-light');
				button.classList.add('btn-sm');
				button.title = descriptions[i]
				
				var icon = document.createElement("img");
				icon.src=rootPath+"/images/icons/"+ icons[j][k] +".png";
				
				button.appendChild(icon);
				mxUtils.write(button, "");
				
				if(i == 0){
					let span = document.createElement('span');
					span.classList.add('h6');
					span.classList.add('text-secondary');
					let nameButton = document.createTextNode('Salvar');
					span.appendChild(nameButton);
					span.classList.add("ps-2");
					button.appendChild(span);
				}

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
		// var node = document.getElementById('selectActions');
		// mxUtils.write(node, 'Select: ');
		// mxUtils.linkAction(node, 'All', editor, 'selectAll');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'None', editor, 'selectNone');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'Vertices', editor, 'selectVertices');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'Edges', editor, 'selectEdges');

		// Create select actions in page
		// var node = document.getElementById('zoomActions');
		// mxUtils.write(node, 'Zoom: ');
		// mxUtils.linkAction(node, 'In', editor, 'zoomIn');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'Out', editor, 'zoomOut');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'Actual', editor, 'actualSize');
		// mxUtils.write(node, ', ');
		// mxUtils.linkAction(node, 'Fit', editor, 'fit');

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