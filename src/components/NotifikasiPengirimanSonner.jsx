import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaTruck } from "react-icons/fa";

export function NotifikasiPengirimanSonner() {
  const handleUpdateStatus = () => {
    toast("Status Kurir Diperbarui", {
      description: "Pesanan #ORD-001 sedang dalam perjalanan menuju lokasi.",
      action: {
        label: "Lacak",
        onClick: () => console.log("Membuka peta..."),
      },
    });
  };

  return (
    <Card className="max-w-sm">
      <CardContent className="pt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 text-[#F97316] rounded-full">
            <FaTruck />
          </div>
          <span className="text-sm font-medium text-slate-700">Update Pengiriman</span>
        </div>
        <Button onClick={handleUpdateStatus} className="bg-slate-900 hover:bg-slate-800 text-white size-sm">
          Kirim Sekarang
        </Button>
      </CardContent>
    </Card>
  );
}