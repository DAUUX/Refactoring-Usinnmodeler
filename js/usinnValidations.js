function insertValidations(graph){

	graph.getEdgeValidationError = function(edge, source, target)
	{
	  if (source != null && target != null &&
	    this.model.getValue(source) != null &&
	    this.model.getValue(target) != null && 
	    edge != null)
	  {
	  	
	  	// Restrições para tipos de conectores
	  	switch(edge.style){
	  		case "systemFeedbackEdge":
	  			// Emitindo um conector
	  			switch(source.style){
	  				case "openingPoint":
	  					return "Um 'ponto de abertura' não deve emitir um 'feedback do sistema'";
	  				case "userAction":
	  					return "Uma 'ação do usuário' não deve emitir um 'feedback do sistema'";
	  				case "requiredUserAction":
	  					return "Uma 'ação do usuário (obrigatória)' não deve emitir um 'feedback do sistema'";
	  				case "dataCollection":
	  					return "Uma 'coleção de dados' não deve emitir um 'feedback do sistema'";
	  			}
	  			// Recebendo um conector
	  			switch(target.style){
	  				case "closurePoint":
	  					return "Um 'ponto de fechamento' não deve receber um 'feedback do sistema'";
	  				case "systemProcess":
	  					return "Um 'processo do sistema' não deve receber um 'feedback do sistema'";
	  				case "notificationAlertOrConfirmation":
	  					return "Uma 'notificação de alerta ou confirmação' não deve receber um 'feedback do sistema'";	
	  				case "dataCollection":
	  					return "Uma 'coleção de dados' não deve receber um 'feedback do sistema'";
	  				case "progressIndicator":
	  					return "Um 'indicador de progresso' não deve receber um 'feedback do sistema'";
	  			}
	  		break;
	  		case "cancellationTransitionEdge":
	  		// Emitindo um conector
	  		switch(source.style){
	  			case "openingPoint":
	  				return "Um 'ponto de abertura' não deve emitir uma 'transição de cancelamento'";
	  			case "userAction":
	  				return "Uma 'ação do usuário' não deve emitir uma 'transição de cancelamento'";
	  			case "requiredUserAction":
	  				return "Uma 'ação do usuário (obrigatória)' não deve emitir uma 'transição de cancelamento'";
	  			case "dataCollection":
	  				return "Uma 'coleção de dados' não deve emitir uma 'transição de cancelamento'";
	  		}
	  		// Recebendo um conector
	  		switch(target.style){
	  			case "closurePoint":
	  				return "Um 'ponto de fechamento' não deve receber uma 'transição de cancelamento'";
	  			case "systemProcess":
	  				return "Um 'processo do sistema' não deve receber uma 'transição de cancelamento'";
	  			case "notificationAlertOrConfirmation":
	  				return "Uma 'notificação de alerta ou confirmação' não deve receber uma 'transição de cancelamento'";	
	  			case "dataCollection":
	  				return "Uma 'coleção de dados' não deve receber uma 'transição de cancelamento'";
	  			case "progressIndicator":
	  				return "Um 'indicador de progresso' não deve receber uma 'transição de cancelamento'";
	  		}

	  		break;

	  		case "queryDataEdge":
	  		// Emitindo um conector
	  		switch(source.style){
	  			case "openingPoint":
	  				return "Um 'ponto de abertura' não deve emitir 'dados de uma query'";
	  		}
	  		// Recebendo um conector
	  		switch(target.style){
	  			case "closurePoint":
	  				return "Um 'ponto de fechamento' não deve receber 'dados de uma query'";
	  		}
	  	}


	  }

	  // "Supercall"
	  return mxGraph.prototype.getEdgeValidationError.apply(this, arguments);
	}



	/*

	source, type, attr, value, min, max, validNeighbors, countError, typeError, validNeighborsAllowed

	source	Boolean indicating if this rule applies to the source or target terminal.
	type	Type of the source or target terminal that this rule applies to.  See type for more information.
	attr	Optional attribute name to match the source or target terminal.
	value	Optional attribute value to match the source or target terminal.
	min	Minimum number of edges for this rule.  Default is 1.
	max	Maximum number of edges for this rule. n means infinite.  Default is n.
	validNeighbors	Array of types of the opposite terminal for which this rule applies.
	countError	Error to be displayed for invalid number of edges.
	typeError	Error to be displayed for invalid opposite terminals.
	validNeighborsAllowed	Optional boolean indicating if the array of opposite types should be valid or invalid.
	*/


	// Um 'ponto de abertura' não pode receber conectores
	graph.multiplicities.push(new mxMultiplicity(
	    false, 'openingPoint', null, null, 0, 0, null,
	    "Um 'ponto de abertura' não pode receber conectores", null
	));

	// Um 'ponto de fechamento' não pode emitir conectores
	graph.multiplicities.push(new mxMultiplicity(
	    true, 'closurePoint', null, null, 0, 0, null,
	    "Um 'ponto de fechamento' não pode emitir conectores", null
	));

}