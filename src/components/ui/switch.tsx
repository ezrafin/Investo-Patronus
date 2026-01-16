import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group relative inline-flex h-8 w-20 shrink-0 cursor-pointer items-center rounded-lg border-2 border-transparent transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    {/* ON Text - visible when checked */}
    <span className="absolute left-2 text-xs font-medium text-white transition-opacity duration-300 opacity-0 group-data-[state=checked]:opacity-100 pointer-events-none z-10">
      ON
    </span>
    {/* OFF Text - visible when unchecked */}
    <span className="absolute right-2 text-xs font-medium text-foreground/70 transition-opacity duration-300 opacity-100 group-data-[state=checked]:opacity-0 pointer-events-none z-10">
      OFF
    </span>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-md ring-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=checked]:translate-x-[52px] data-[state=unchecked]:translate-x-1 data-[state=checked]:shadow-lg z-20",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
