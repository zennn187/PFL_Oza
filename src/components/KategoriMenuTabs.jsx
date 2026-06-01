import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function KategoriMenuTabs() {
  return (
    <Tabs defaultValue="prasmanan" className="w-full max-w-xl">
      <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
        <TabsTrigger value="prasmanan" className="rounded-lg py-2 text-sm font-medium">Prasmanan</TabsTrigger>
        <TabsTrigger value="nasikotak" className="rounded-lg py-2 text-sm font-medium">Nasi Kotak</TabsTrigger>
        <TabsTrigger value="kue" className="rounded-lg py-2 text-sm font-medium">Kue Kotak</TabsTrigger>
      </TabsList>

      <TabsContent value="prasmanan" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Paket Prasmanan Premium</CardTitle>
            <Badge variant="outline" className="border-orange-500 text-orange-500">Tersedia</Badge>
          </CardHeader>
          <CardContent className="flex justify-between items-center border-t pt-4">
            <p className="text-sm text-slate-500">Minimal pemesanan untuk 100 porsi acara.</p>
            <Button size="sm" className="bg-[#F97316] hover:bg-orange-600">Atur Menu</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}