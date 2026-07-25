"use client"
import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  itemClass?: string;
  highlightClass?: string;
}

export const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  itemClass = 'bg-white text-slate-900 border-slate-200',
  highlightClass = 'text-primary bg-primary/10 border-primary/30'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');

    const icons = [
      `<svg class="w-4 h-4 text-inherit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      `<svg class="w-4 h-4 text-inherit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      `<svg class="w-4 h-4 text-inherit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      `<svg class="w-4 h-4 text-inherit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      `<svg class="w-4 h-4 text-inherit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    ];

    const newHTML = words
      .map((word, i) => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        const icon = isHighlighted ? icons[i % icons.length] : '';
        const rotateClass = i % 2 === 0 ? 'hover:rotate-3' : 'hover:-rotate-3';
        
        return `<span
          class="relative inline-block mx-[2px] my-[2px] px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] border select-none cursor-grab active:cursor-grabbing font-bold tracking-widest uppercase text-xs transition-all duration-300 hover:scale-[1.15] ${rotateClass} hover:-translate-y-1 hover:shadow-primary/40 active:scale-95 overflow-hidden group/pill ${itemClass} ${isHighlighted ? highlightClass : ''}"
        >
          <span class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent w-[200%] -translate-x-full group-hover/pill:animate-[sweep_2s_ease-in-out_infinite] z-0 pointer-events-none mix-blend-overlay"></span>
          <span class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"></span>
          <span class="relative z-10 flex items-center gap-2">${icon}${word}</span>
        </span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, itemClass, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    if (!textRef.current) return;
    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [...wordSpans].map((elem, i) => {
      const rect = elem.getBoundingClientRect();

      // Start elements slightly higher and spread out for a nicer drop effect
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = -100 - (i * 30); // staggered drop

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8, // highly bouncy and fun
        frictionAir: 0.01,
        friction: 0.1,
        chamfer: { radius: 24 } // matches the rounded-full CSS
      });
      
      // Random initial rotation
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
      elem.style.zIndex = '10';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.1, // Softer spring for better dragging feel
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    // The Explosion Effect
    const handleCanvasClick = (e: MouseEvent) => {
      if (!containerRef.current || !engine) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const explosionForce = 0.12; // Massive blast force

      wordBodies.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 500) {
           const forceMagnitude = explosionForce * (1 - distance / 500);
           Matter.Body.applyForce(body, body.position, {
             x: (dx / distance) * forceMagnitude,
             y: (dy / distance) * forceMagnitude
           });
        }
      });
    };

    // The Magnet Hover Effect
    const handleCanvasMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !engine) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const magnetForce = 0.002; // Gentle pull towards mouse

      wordBodies.forEach(({ body }) => {
        const dx = mouseX - body.position.x;
        const dy = mouseY - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only pull objects that are somewhat close (within 250px)
        if (distance > 30 && distance < 250) {
           const forceMagnitude = magnetForce * (1 - distance / 250);
           Matter.Body.applyForce(body, body.position, {
             x: (dx / distance) * forceMagnitude,
             y: (dy / distance) * forceMagnitude - 0.001 // extra anti-gravity lift
           });
        }
      });
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener('click', handleCanvasClick);
    containerEl.addEventListener('mousemove', handleCanvasMouseMove);

    return () => {
      containerEl.removeEventListener('click', handleCanvasClick);
      containerEl.removeEventListener('mousemove', handleCanvasMouseMove);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-full cursor-default overflow-hidden rounded-[2.5rem]"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block"
        style={{
          fontSize,
          lineHeight: 1.4
        }}
      />

      <div className="absolute top-0 left-0 z-0 pointer-events-none" ref={canvasContainerRef} />
    </div>
  );
};
