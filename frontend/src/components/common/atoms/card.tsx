import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/utils"
import { Button } from "./button"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  closable?: boolean;
  onClose?: () => void;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, closable = false, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-sm bg-gray-1 border border-gray-3 transition-colors duration-200",
      className
    )}
    {...props}
  >
    {closable && onClose && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 h-7 w-7 p-0 z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={16} className="text-gray-6" />
      </Button>
    )}
    {props.children}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pr-10", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
