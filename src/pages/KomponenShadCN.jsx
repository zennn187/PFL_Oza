import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../components/ui/drawer";
import { FaArrowUp, FaTruck, FaStar, FaCalendarAlt, FaCheck, FaChevronDown, FaListUl, FaEye, FaFilter } from "react-icons/fa";

export default function KomponenShadCN() {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [valueCombobox, setValueCombobox] = useState("");

  const daftarMenuCatering = [
    { value: "rendang", label: "Rendang Daging Sapi Premium" },
    { value: "ayam-bakar", label: "Ayam Bakar Madu" },
    { value: "kakap-asam", label: "Kakap Asam Manis" },
    { value: "sambal-goreng", label: "Sambal Goreng Ati Ampela" }
  ];

  const riwayatPesanan = [
    { id: "ORD-001", menu: "Prasmanan Paket A", status: "Selesai", total: "Rp 3.500.000" },
    { id: "ORD-002", menu: "Nasi Kotak Ayam", status: "Diproses", total: "Rp 750.000" },
    { id: "ORD-003", menu: "Kue Tampah Makmur", status: "Pending", total: "Rp 400.000" }
  ];

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
    <div id="shadcn-container" className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <PageHeader title="Komponen ShadCN" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        <div className="space-y-6 flex flex-col">
          
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">1. Komponen Chart</h2>
            <Card className="w-full border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold text-slate-800">Grafik Penjualan</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Total pemasukan katering bulan ini</CardDescription>
                </div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1 text-white border-none py-1 px-2 text-xs">
                  <FaArrowUp className="text-[9px]" /> 12.5%
                </Badge>
              </CardHeader>
              <CardContent className="h-[180px] flex items-end gap-3 pt-4 px-6 border-t border-slate-50">
                <div className="w-full bg-slate-100 rounded-t-md h-[40%] relative group hover:bg-orange-200 transition-all cursor-pointer"></div>
                <div className="w-full bg-slate-100 rounded-t-md h-[65%] relative group hover:bg-orange-200 transition-all cursor-pointer"></div>
                <div className="w-full bg-slate-100 rounded-t-md h-[50%] relative group hover:bg-orange-200 transition-all cursor-pointer"></div>
                <div className="w-full bg-[#F97316] rounded-t-md h-[90%] relative cursor-pointer"></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">3. Komponen Tabs</h2>
            <Tabs defaultValue="prasmanan" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-200/70 p-1 rounded-xl">
                <TabsTrigger value="prasmanan" className="rounded-lg py-1.5 text-xs font-medium data-[state=active]:shadow-sm">Prasmanan</TabsTrigger>
                <TabsTrigger value="nasikotak" className="rounded-lg py-1.5 text-xs font-medium data-[state=active]:shadow-sm">Nasi Kotak</TabsTrigger>
                <TabsTrigger value="kue" className="rounded-lg py-1.5 text-xs font-medium data-[state=active]:shadow-sm">Kue Kotak</TabsTrigger>
              </TabsList>
              <TabsContent value="prasmanan" className="mt-3">
                <Card className="border-slate-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-800">Paket Prasmanan Premium</CardTitle>
                    <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-50/50 text-[11px] px-2 py-0.5">Tersedia</Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-slate-50 pt-4">
                    <p className="text-xs text-slate-500 max-w-xs">Minimal pemesanan untuk 100 porsi acara.</p>
                    <Button size="sm" className="bg-[#F97316] hover:bg-orange-600 text-white font-medium text-xs px-4 rounded-lg shadow-sm">Atur Menu</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">5. Komponen Hover Card</h2>
            <Card className="w-full border-slate-100 shadow-sm">
              <CardContent className="pt-5 pb-5 flex flex-col gap-2.5">
                <p className="text-xs text-slate-500 leading-relaxed">Arahkan kursor pada nama pengantar untuk mengecek profil pengiriman:</p>
                <div className="flex items-center gap-2 bg-slate-100/50 p-2.5 rounded-lg border border-slate-200/40 w-fit">
                  <span className="text-xs font-medium text-slate-600">Petugas Lapangan:</span>
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <span className="text-xs font-bold text-[#F97316] underline cursor-pointer decoration-dotted decoration-2 hover:text-orange-600 transition-colors">Budi Arisandi</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-white p-4 shadow-xl border border-slate-100 rounded-xl z-50">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Budi Arisandi (Kurir Utama)
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Spesialisasi pengantaran paket katering besar menggunakan mobil boks roda 4.</p>
                        <div className="flex items-center pt-1 gap-1.5 text-[11px] text-slate-400 border-t border-slate-50 mt-2">
                          <FaCalendarAlt className="text-slate-300" />
                          <span>Bergabung sejak Maret 2024</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">7. Komponen Table</h2>
            <Card className="w-full border-slate-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">Riwayat Pesanan</CardTitle>
                <CardDescription className="text-xs text-slate-500">Daftar transaksi katering masuk terkini</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-slate-50 p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
                      <TableHead className="text-xs font-semibold text-slate-700 w-[100px]">ID Pesanan</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700">Menu</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="text-xs font-semibold text-slate-700 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riwayatPesanan.map((pesanan) => (
                      <TableRow key={pesanan.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="text-xs font-medium text-slate-900">{pesanan.id}</TableCell>
                        <TableCell className="text-xs text-slate-600">{pesanan.menu}</TableCell>
                        <TableCell className="text-xs">
                          <Badge className={`border-none text-[10px] px-2 py-0.5 font-medium ${
                            pesanan.status === "Selesai" ? "bg-emerald-50 text-emerald-600" :
                            pesanan.status === "Diproses" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                          }`}>
                            {pesanan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-right font-medium text-slate-800">{pesanan.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

        </div>

        <div className="space-y-6 flex flex-col">
          
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">2. Komponen Sonner (Toast)</h2>
            <Card className="w-full border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-50 text-[#F97316] rounded-xl border border-orange-100/50 text-sm">
                    <FaTruck />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800">Update Pengiriman</span>
                    <span className="text-[11px] text-slate-400">Notifikasi real-time kurir</span>
                  </div>
                </div>
                <Button onClick={handleUpdateStatus} size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 rounded-lg shadow-sm">
                  Kirim Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">4. Komponen Accordion</h2>
            <Card className="w-full border-slate-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">Feedback Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="border-t border-slate-50 pt-1">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ulasan-1" className="border-none py-0">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center justify-between w-full pr-2 text-left">
                        <span className="font-medium text-xs text-slate-700">Oza Okta (Acara Pernikahan)</span>
                        <Badge className="bg-amber-400 flex items-center gap-1 text-[10px] px-2 py-0.5 text-white border-none font-bold">
                          5 <FaStar className="text-[8px]" />
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-slate-500 pb-3 leading-relaxed border-t border-slate-50 pt-2 mt-1">
                      "Rasa rendang dan ayam bakarnya mantap sekali, bumbunya meresap. Pengiriman juga tepat waktu 1 jam sebelum acara dimulai. Sangat direkomendasikan!"
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">6. Komponen Combobox</h2>
            <Card className="w-full border-slate-100 shadow-sm">
              <CardContent className="pt-5 pb-5 flex flex-col gap-3">
                <p className="text-xs text-slate-500">Pilih menu masakan untuk dimasukkan ke dalam paket katering:</p>
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={openCombobox} className="w-full justify-between border-slate-200 text-xs text-slate-700 font-normal h-9 bg-white hover:bg-slate-50 rounded-lg">
                      {valueCombobox ? daftarMenuCatering.find((menu) => menu.value === valueCombobox)?.label : "Cari menu masakan..."}
                      <FaChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] sm:w-[350px] p-0 bg-white border border-slate-100 shadow-xl rounded-xl z-50 overflow-hidden">
                    <Command className="bg-white">
                      <CommandInput placeholder="Ketik nama masakan..." className="text-xs h-9" />
                      <CommandList>
                        <CommandEmpty className="text-xs text-slate-400 p-3 text-center">Menu tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {daftarMenuCatering.map((menu) => (
                            <CommandItem
                              key={menu.value}
                              value={menu.value}
                              onSelect={(currentValue) => {
                                setValueCombobox(currentValue === valueCombobox ? "" : currentValue);
                                setOpenCombobox(false);
                              }}
                              className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-slate-50 text-xs text-slate-700 data-[selected=true]:bg-slate-50"
                            >
                              <span>{menu.label}</span>
                              <FaCheck className={`h-3 w-3 ${valueCombobox === menu.value ? "opacity-100 text-[#F97316]" : "opacity-0"}`} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">8. Komponen Sheet & Drawer</h2>
            <Card className="w-full border-slate-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">Aksi Tambahan</CardTitle>
                <CardDescription className="text-xs text-slate-500">Panel interaktif samping dan bawah</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-slate-50 pt-4 flex flex-wrap gap-3">
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 h-9 rounded-lg border-slate-200">
                      <FaFilter className="text-[10px] text-slate-400" /> Buka Filter (Sheet)
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-white p-6 w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="text-base font-semibold text-slate-800">Filter Pencarian</SheetTitle>
                      <SheetDescription className="text-xs text-slate-500">Saring data pesanan katering berdasarkan preferensi.</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600">Kategori Menu</label>
                        <div className="flex gap-2">
                          <Badge className="bg-orange-50 text-[#F97316] border border-orange-100 text-xs cursor-pointer">Makanan Utama</Badge>
                          <Badge variant="outline" className="text-slate-500 text-xs cursor-pointer">Snack Box</Badge>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 h-9 rounded-lg border-slate-200">
                      <FaListUl className="text-[10px] text-slate-400" /> Detail Menu (Drawer)
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-white max-h-[85vh]">
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader className="text-left">
                        <DrawerTitle className="text-base font-semibold text-slate-800">Detail Komposisi Katering</DrawerTitle>
                        <DrawerDescription className="text-xs text-slate-500">Informasi standar higienitas masakan dapur katering.</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-2 text-xs text-slate-600 leading-relaxed">
                        <p>• 100% Menggunakan bahan lokal pilihan bersertifikasi Halal.</p>
                        <p>• Dimasak segar langsung di hari pengantaran acara.</p>
                        <p>• Wadah kemasan ramah lingkungan dan tertutup rapat hampa udara.</p>
                      </div>
                      <DrawerFooter className="pt-2 pb-6">
                        <DrawerClose asChild>
                          <Button className="w-full bg-slate-950 text-white text-xs h-9 rounded-lg shadow-sm">Tutup Info</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>

              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}