import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Hello World</h2>
      <p>I am Amit Thakur</p>
      <Button variant="superOutline">Click Me</Button>
    </div>
  );
}
