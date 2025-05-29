import { useEffect, useState, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Plane,
  Hotel,
  Car,
  Hexagon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";
import LoadingBar from "@/components/LoadingBar";

export default function DashboardLayout() {
  const [theme] = useState<"dark" | "light">("dark");
  const { pathname } = useLocation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLoading, error } = useQuery({
    queryKey: ["admin-checker"],
    queryFn: async () => {
      const { data } = await axios.get("/dashboard/admin-checker");
      return data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Update time

  // Particle effect
  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${
          Math.floor(Math.random() * 100) + 150
        }, ${Math.floor(Math.random() * 55) + 200}, ${
          Math.random() * 0.5 + 0.2
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isLoading) return <LoadingBar />;
  if (error) return <Navigate to={"/admin-auth"} />;
  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-white to-gray-200 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sky Scanner
            </span>
          </div>
        </header>

        {/* Main content */}
        <div className="grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-white border border-gray-200 h-full shadow-sm">
              {" "}
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    path="/dashboard"
                    icon={LayoutDashboard} // Changed to LayoutDashboard
                    label="Main"
                    active={pathname === "/dashboard"}
                  />
                  <NavItem
                    path="/dashboard/user-details"
                    icon={Users} // Changed to Users
                    label="User Details"
                    active={pathname === "/dashboard/user-details"}
                  />
                  <NavItem
                    path="/dashboard/flight-search"
                    icon={Plane} // Changed to Plane
                    label="Flight Search"
                    active={pathname === "/dashboard/flight-search"}
                  />
                  <NavItem
                    path="/dashboard/hotel-search"
                    icon={Hotel} // Changed to Hotel
                    label="Hotel Search"
                    active={pathname === "/dashboard/hotel-search"}
                  />
                  <NavItem
                    path="/dashboard/car-search"
                    icon={Car} // Changed to Car
                    label="Car Search"
                    active={pathname === "/dashboard/car-search"}
                  />
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  path,
}: {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}) {
  return (
    <Link to={path}>
      <Button
        variant="outline"
        className={`w-full justify-start ${
          active
            ? "bg-blue-100 text-blue-700 hover:text-blue-500 cursor-pointer"
            : "text-gray-600  hover:text-blue-700 cursor-pointer"
        }`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
}
