"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Packet {
  from: number;
  to: number;
  progress: number;
  speed: number;
  size: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const timeRef = useRef(0);

  const initNodes = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 25000), 40);
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initNodes(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      timeRef.current += 0.01;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      const nodes = nodesRef.current;
      const packets = packetsRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          node.vx -= (dx / dist) * force * 0.02;
          node.vy -= (dy / dist) * force * 0.02;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Draw node
        const pulse = Math.sin(timeRef.current * 2 + node.pulsePhase) * 0.3 + 0.7;
        const alpha = pulse * 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.1})`;
        ctx.fill();
      }

      // Draw connections
      const connectionDistance = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Spawn packets
      if (Math.random() < 0.02 && nodes.length > 1) {
        const from = Math.floor(Math.random() * nodes.length);
        let to = Math.floor(Math.random() * nodes.length);
        while (to === from) to = Math.floor(Math.random() * nodes.length);
        packets.push({
          from,
          to,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01,
          size: 2 + Math.random() * 2,
        });
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const fromNode = nodes[packet.from];
        const toNode = nodes[packet.to];
        const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

        // Packet trail
        ctx.beginPath();
        ctx.arc(x, y, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.8)";
        ctx.fill();

        // Packet glow
        ctx.beginPath();
        ctx.arc(x, y, packet.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.15)";
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
