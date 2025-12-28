import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Image({ src, alt, className, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
