import {
	BaseEdge,
	EdgeLabelRenderer,
	getStraightPath,
	useReactFlow,
} from 'reactflow';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
			<EdgeLabelRenderer>
				<input id="text-input-user-action-diagram" spellCheck="false" placeholder="lapa" />
			</EdgeLabelRenderer>
		</>
	);
}
