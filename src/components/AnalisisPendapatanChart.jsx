import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaArrowUp } from "react-icons/fa";

export function AnalisisPendapatanChart() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold">Grafik Penjualan</CardTitle>
          <CardDescription>Total pemasukan katering bulan ini</CardDescription>
        </div>
        <Badge className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1 text-white border-none">
          <FaArrowUp className="text-[10px]" /> 12.5%
        </Badge>
      </CardHeader>
      <CardContent className="h-[200px] flex items-end gap-3 pt-4 px-6 border-t">
        <div className="w-full bg-slate-100 rounded-t-md h-[40%] relative group hover:bg-orange-200 transition-all"></div>
        <div className="w-full bg-slate-100 rounded-t-md h-[65%] relative group hover:bg-orange-200 transition-all"></div>
        <div className="w-full bg-slate-100 rounded-t-md h-[50%] relative group hover:bg-orange-200 transition-all"></div>
        <div className="w-full bg-[#F97316] rounded-t-md h-[90%] relative"></div>
      </CardContent>
    </Card>
  );
}   