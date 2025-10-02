import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  type Edge,
  type EdgeProps,
  MiniMap,
  type Node,
  type NodeProps,
  Position,
  getBezierPath
} from 'reactflow';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import 'reactflow/dist/style.css';
import type { Phase } from '../../data/roadmap';
import { ROADMAP } from '../../data/roadmap';

const STATUS_STYLES: Record<Phase['status'], string> = {
  in_progress: 'border-primary/70 bg-primary/15 text-primary-600',
  up_next: 'border-accent/60 bg-accent/10 text-accent',
  planned: 'border-border bg-bg-elev text-fg-muted',
  blocked: 'border-danger/50 bg-danger/10 text-danger',
  done: 'border-success/50 bg-success/10 text-success'
};

const STATUS_WEIGHT: Record<Phase['status'], number> = {
  done: 1,
  in_progress: 0.6,
  up_next: 0.3,
  planned: 0,
  blocked: 0
};

type Orientation = 'horizontal' | 'vertical';

type FlowNodeData = {
  phase: Phase;
  onSelect: (_phase: Phase) => void;
  orientation: Orientation;
};

function RoadmapNode({ data }: NodeProps<FlowNodeData>) {
  const { phase, onSelect, orientation } = data;
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const statusStyle = STATUS_STYLES[phase.status];
  const metricsEntries = useMemo(() => Object.entries(phase.metrics ?? {}), [phase.metrics]);

  const sourcePosition = orientation === 'vertical' ? Position.Bottom : Position.Right;
  const targetPosition = orientation === 'vertical' ? Position.Top : Position.Left;

  const toggleHover = useCallback((value: boolean) => {
    setHovered(value);
  }, []);

  const handleClick = useCallback(() => {
    onSelect(phase);
  }, [onSelect, phase]);

  return (
    <div data-testid={`roadmap-node-${phase.id}`} className="group relative h-full">
      <Handle
        type="target"
        position={targetPosition}
        className="!h-2.5 !w-2.5 !rounded-full !border-none !bg-primary/70"
        isConnectable={false}
      />
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        onFocus={() => toggleHover(true)}
        onBlur={() => toggleHover(false)}
        className={`flex w-[clamp(16rem,80vw,22rem)] min-w-[16rem] flex-col gap-3 rounded-2xl border-2 bg-card p-4 text-left shadow-glow transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${statusStyle} hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_55px_-25px_hsl(201_92%_56%/0.45)]`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted/80">
          {phase.subtitle ?? 'Milestone'}
        </span>
        <span className="text-lg font-semibold text-fg">{phase.title}</span>
        <p className="text-sm text-fg-muted">{phase.description}</p>
        {phase.links?.length ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            {phase.links[0]?.label}
          </span>
        ) : null}
      </button>
      <Handle
        type="source"
        position={sourcePosition}
        className="!h-2.5 !w-2.5 !rounded-full !border-none !bg-primary/70"
        isConnectable={false}
      />
      <AnimatePresence>
        {hovered ? (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute left-1/2 top-full z-10 mt-3 w-64 -translate-x-1/2 rounded-xl border border-border bg-card/95 p-4 text-xs text-fg-muted shadow-glow backdrop-blur"
            role="status"
          >
            <p className="text-sm font-semibold text-fg">{phase.title}</p>
            <p className="mt-1 leading-relaxed">{phase.description}</p>
            {metricsEntries.length ? (
              <dl className="mt-3 grid grid-cols-2 gap-2">
                {metricsEntries.map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-bg-elev px-2 py-1 text-[11px] font-medium text-fg">
                    <dt className="uppercase tracking-[0.2em] text-[10px] text-fg-muted/80">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function RoadmapEdge(props: EdgeProps) {
  const { id, markerEnd, style } = props;
  const [edgePath] = getBezierPath(props);

  return (
    <g data-testid={`roadmap-edge-${id}`}>
      <motion.path
        d={edgePath}
        stroke={(style?.stroke as string) ?? 'hsl(201 92% 56% / 0.75)'}
        strokeWidth={(style?.strokeWidth as number) ?? 2.5}
        strokeDasharray="6 4"
        fill="none"
        markerEnd={markerEnd}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </g>
  );
}

const edgeTypes = { roadmap: RoadmapEdge };
const nodeTypes = { roadmap: RoadmapNode };

type FlowProps = {
  onSelectPhase: (_phase: Phase) => void;
};

export function RoadToDeploymentFlow({ onSelectPhase }: FlowProps) {
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handler);
    } else if (typeof media.addListener === 'function') {
      media.addListener(handler);
    }
    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handler);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(handler);
      }
    };
  }, []);

  const orientation: Orientation = isMobile ? 'vertical' : 'horizontal';

  const nodes = useMemo<Node<FlowNodeData>[]>(() => {
    const spacing = isMobile ? 260 : 280;
    return ROADMAP.map((phase, index) => ({
      id: phase.id,
      type: 'roadmap',
      position: isMobile
        ? { x: 0, y: index * spacing }
        : { x: index * spacing, y: index % 2 === 0 ? 0 : 150 },
      data: { phase, onSelect: onSelectPhase, orientation }
    }));
  }, [isMobile, onSelectPhase, orientation]);

  const edges = useMemo<Edge[]>(
    () =>
      ROADMAP.flatMap((phase) =>
        (phase.dependsOn ?? []).map((dependency) => ({
          id: `${dependency}-${phase.id}`,
          source: dependency,
          target: phase.id,
          type: 'roadmap',
          animated: true,
          style: { stroke: 'var(--primary)', strokeDasharray: '6 4', strokeWidth: 2.5 }
        }))
      ),
    []
  );

  const progress = useMemo(() => {
    const total = ROADMAP.length;
    const sum = ROADMAP.reduce((acc, phase) => acc + (STATUS_WEIGHT[phase.status] ?? 0), 0);
    return Math.round((sum / total) * 100);
  }, []);

  return (
    <section aria-labelledby="roadmap-flow-heading" className="space-y-6">
      <header className="flex flex-col gap-3 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fg-muted/70">Deployment journey</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 id="roadmap-flow-heading" className="text-2xl font-bold text-fg">
              Road to deployment
            </h2>
            <p className="max-w-2xl text-sm text-fg-muted">
              Follow how Genesis, Adiri, and Zenith flow from critical fixes into live deployment.
            </p>
          </div>
          <div className="max-w-xs rounded-2xl border-2 border-border bg-card p-4 shadow-glow">
            <div className="flex items-center justify-between text-xs font-medium text-fg-muted">
              <span>Overall readiness</span>
              <span className="text-sm font-semibold text-fg">{progress}%</span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-bg-elev">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary-600 shadow-[0_0_18px_hsl(201_92%_56%/0.35)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeOut' }}
                role="presentation"
              />
            </div>
          </div>
        </div>
      </header>
      <div
        className="rounded-3xl border-2 border-border/60 bg-card/80 p-6 shadow-glow"
        data-testid="roadmap-flow"
        style={{ height: 'clamp(28rem, 70vh, 40rem)' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          style={{ width: '100%', height: '100%' }}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          panOnDrag
          panOnScroll
          zoomOnDoubleClick={false}
          minZoom={0.6}
          maxZoom={1.2}
          className="!bg-transparent"
          data-testid="roadmap-flow"
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={32} color="hsl(220 14% 90% / 0.4)" />
          <MiniMap className="!bg-bg/90 !text-fg-muted" zoomable pannable maskColor="rgba(255,255,255,0.7)" />
          <Controls
            className="!border !border-border !bg-card/90 !shadow-glow"
            showInteractive={false}
            position="bottom-right"
          />
        </ReactFlow>
      </div>
    </section>
  );
}
