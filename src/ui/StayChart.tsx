import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Booking } from "../services/BookingApi";
import { Color, Font } from "./cssConstants";
import { useAuth } from "../features/Authentication/AuthProvider";

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function StayChart({ bookings }: { bookings: Booking[] }) {
  const { darkMode } = useAuth();
  function incArrayValue(
    arr: { duration: string; value: number; color: string }[],
    field: string
  ) {
    return arr.map((cell) => {
      if (cell.duration === field) {
        cell.value++;
      }
      return cell;
    });
  }
  const baseData = darkMode ? startDataDark : startDataLight;

  baseData.forEach((cell) => {
    cell.value = 0;
  });

  const data = bookings
    .reduce((acc, booking) => {
      const duration = booking.numNights;
      if (duration === 1) {
        return incArrayValue(acc, "1 nights");
      } else if (duration === 2) {
        return incArrayValue(acc, "2 nights");
      } else if (duration === 3) {
        return incArrayValue(acc, "3 nights");
      } else if (duration >= 4 && duration <= 5) {
        return incArrayValue(acc, "4-5 nights");
      } else if (duration >= 6 && duration <= 7) {
        return incArrayValue(acc, "6-7 nights");
      } else if (duration >= 8 && duration <= 14) {
        return incArrayValue(acc, "8-14 nights");
      } else if (duration >= 15 && duration <= 21) {
        return incArrayValue(acc, "15-21 nights");
      } else {
        return incArrayValue(acc, "21+ nights");
      }
    }, baseData)
    .filter((cell) => cell.value > 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={200}>
        <Pie
          dataKey="value"
          data={data}
          nameKey="duration"
          cx={"40%"}
          cy={"50%"}
          innerRadius={50}
          outerRadius={70}
          paddingAngle={3}
        >
          {data.map((cell) => (
            <Cell
              fontSize={Font.fs10}
              key={cell.duration}
              fill={cell.color}
              stroke={cell.color}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: Color.grey0 }} />
        <Legend
          fontSize={Font.fs10}
          verticalAlign="middle"
          width={200}
          align="right"
          layout="vertical"
          iconSize={15}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default StayChart;
