import React from "react"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { cn } from "../../../lib/utils"

export function FormField({ label, id, type = "text", placeholder, className, error, ...props }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}
