import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Booking } from "../services/BookingApi";
import { Font } from "./cssConstants";
import { useAuth } from "../features/Authentication/AuthProvider";

function SalesChart({ bookings, days }: { bookings: Booking[]; days: number }) {
  const { darkMode } = useAuth();
  const dateIntervals = eachDayOfInterval({
    start: subDays(new Date(), days),
    end: new Date(),
  });

  const data = dateIntervals.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, booking) => acc + booking.extrasPrice, 0),
    };
  });

  const colors = darkMode
    ? {
        totalSales: { stroke: "#7048e8", fill: "#845ef7" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#9775fa", fill: "#CCBEF7" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: -10,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          fontSize={Font.fs12}
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <YAxis
          fontSize={Font.fs12}
          unit={"$"}
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <CartesianGrid strokeDasharray={"4"} />
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        <Area
          type="monotone"
          dataKey="totalSales"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
          strokeWidth={2}
          name="Total Sales"
          unit={"$"}
        />
        <Area
          type="monotone"
          dataKey="extraSales"
          stroke={colors.extrasSales.stroke}
          fill={colors.extrasSales.fill}
          strokeWidth={2}
          name="Extras Sales"
          unit={"$"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;
