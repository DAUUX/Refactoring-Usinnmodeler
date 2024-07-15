import {
	BaseEdge,
	EdgeLabelRenderer,
	getSmoothStepPath,
	getStraightPath,
	useReactFlow,
} from 'reactflow';


export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath}/>
			<EdgeLabelRenderer>
				<button
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						pointerEvents: 'all',
						color: "red"
					}}
					className="nodrag nopan"
					onClick={() => {
						setEdges((es) => es.filter((e) => e.id !== id));
					}}
				>
					delete
				</button>
			</EdgeLabelRenderer>
		</>
	);
}
