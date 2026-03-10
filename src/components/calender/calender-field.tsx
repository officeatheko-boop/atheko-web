// components/calendar-field.tsx
"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function CalendarField({
  value,
  onChange,
}: {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [textValue, setTextValue] = React.useState(value ? formatDate(value) : "")
  const [month, setMonth] = React.useState<Date | undefined>(value)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className={`${inter.className} px-1 text-black`}>
        Schedule Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={textValue}
          placeholder="Tomorrow or next week"
          className="bg-background pr-10"
          onChange={(e) => {
            setTextValue(e.target.value)
            const parsed = parseDate(e.target.value)
            if (parsed) {
              onChange(parsed)
              setMonth(parsed)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selected) => {
                onChange(selected)
                setTextValue(formatDate(selected))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className={`${inter.className} text-muted-foreground px-1 text-sm text-black`}>
        Your post will be published on{" "}
        <span className={`${inter.className} font-medium`}>{formatDate(value)}</span>.
      </div>
    </div>
  )
}
