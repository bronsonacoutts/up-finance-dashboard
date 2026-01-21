import { Subscription } from "@/types/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BillingCalendarProps {
  subscriptions: Subscription[];
}

export const BillingCalendar = ({ subscriptions }: BillingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Map subscriptions to dates in the current month
  // Note: This is a simplification. A robust implementation would project recurring dates.
  // For now, we only show the `nextBillingDate` if it falls in this month.
  const subsByDate: Record<string, Subscription[]> = {};

  subscriptions.forEach(sub => {
      const billingDate = parseISO(sub.billing.nextBillingDate);
      if (isSameMonth(billingDate, currentMonth)) {
          const dateKey = format(billingDate, "yyyy-MM-dd");
          if (!subsByDate[dateKey]) subsByDate[dateKey] = [];
          subsByDate[dateKey].push(sub);
      }
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">Billing Calendar</CardTitle>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
                {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
            {/* Padding for start of month - simplified */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-muted/20 rounded-md" />
            ))}

            {calendarDays.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const daySubs = subsByDate[dateKey] || [];
                const isToday = isSameDay(day, new Date());

                return (
                    <div
                        key={dateKey}
                        className={cn(
                            "h-24 border rounded-md p-1 flex flex-col gap-1 overflow-hidden",
                            isToday ? "bg-accent/50 border-accent" : "bg-card"
                        )}
                    >
                        <div className={cn("text-xs font-medium mb-1", isToday && "text-primary")}>
                            {format(day, "d")}
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none">
                            {daySubs.map(sub => (
                                <div
                                    key={sub.id}
                                    className="text-[10px] bg-primary/10 text-primary rounded px-1 py-0.5 truncate border border-primary/20"
                                    title={`${sub.name} - $${sub.amount.current}`}
                                >
                                    {sub.name}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
