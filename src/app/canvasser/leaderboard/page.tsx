"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Trophy } from "lucide-react";

type Period = "week" | "month" | "all";

type Row = {
  canvasser_id: string;
  name: string;
  submitted: number;
  converted: number;
  rank: number;
};

const PERIOD_LABELS: Record<Period, string> = {
  week: "This Week",
  month: "This Month",
  all: "All Time",
};

const RANK_EMOJI: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("week");
  const [rows, setRows] = useState<Row[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (p: Period) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/canvasser/leaderboard?period=${p}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRows(data.rows ?? []);
      setMe(data.me ?? null);
    } catch {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(period);
  }, [load, period]);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500">
            Ranked by leads submitted, then by leads converted (scheduled or quoted).
          </p>
        </div>
      </div>

      <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 mb-6">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
              period === p
                ? "bg-orange-500 text-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">No leads yet for this period.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium w-16">Rank</th>
                <th className="text-left px-4 py-3 font-medium">Canvasser</th>
                <th className="text-right px-4 py-3 font-medium">Submitted</th>
                <th className="text-right px-4 py-3 font-medium">Converted</th>
                <th className="text-right px-4 py-3 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => {
                const isMe = row.canvasser_id === me;
                const rate = row.submitted > 0
                  ? Math.round((row.converted / row.submitted) * 100)
                  : 0;
                return (
                  <tr
                    key={row.canvasser_id}
                    className={isMe ? "bg-orange-50" : "hover:bg-gray-50"}
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-lg">{RANK_EMOJI[row.rank] ?? ""}</span>
                        <span className="font-semibold text-gray-700">#{row.rank}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${isMe ? "text-orange-700" : "text-gray-900"}`}>
                        {row.name}
                        {isMe && (
                          <span className="ml-2 text-xs font-normal text-orange-600">(you)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.submitted}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.converted}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-600">{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
