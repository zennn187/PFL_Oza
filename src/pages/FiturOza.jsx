import {
  FaShoppingCart,
  FaCheckCircle,
  FaBan,
  FaDollarSign,
  FaEllipsisH,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import ordersData from "../data/ordersData.json";

// Import komponen shadcn/ui
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

export default function FiturOza() {
  return (
    <div id="dashboard-container" className="p-6">
      <PageHeader title="Fitur Oza" />
      <p className="mb-4">Ini Halaman Fitur Oza</p>

      {/* Baris Tombol */}
      <div className="flex flex-col gap-2 max-w-xs mb-6">
        <Button variant="default">Simpan</Button>
        <Button variant="outline">Simpan</Button>
        <Button variant="secondary">Simpan</Button>
        <Button variant="ghost">Simpan</Button>
        <Button variant="link">Simpan</Button>
        <Button variant="destructive">Simpan</Button>
      </div>

      {/* Komponen Card */}
      <Card className="w-[380px] mt-6 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/40 dark:shadow-none bg-white dark:bg-slate-950 transition-all hover:shadow-2xl hover:shadow-slate-100/60 duration-300">
        <CardHeader className="space-y-1.5 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Belajar shadcn/ui
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-none font-medium text-xs px-2.5 py-0.5 rounded-full"
            >
              Baru
            </Badge>
          </div>
          <CardDescription className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-6">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-900">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Komponen ini dibuat di branch{" "}
              <code className="text-xs bg-slate-200/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded font-mono font-semibold">
                setup-shadcn
              </code>{" "}
              lalu di-merge ke main.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-2.5 pt-0">
          <Button
            variant="ghost"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/80 font-medium transition-colors"
          >
            Batal
          </Button>
          <Button
            className="bg-slate-900 text-slate-50 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 font-medium px-5 shadow-sm transition-all active:scale-[0.98]"
          >
            Simpan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}