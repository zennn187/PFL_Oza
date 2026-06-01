import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";

export function UlasanPelangganAccordion() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-base font-bold">Feedback Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="border-t pt-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ulasan-1" className="border-b py-1">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center justify-between w-full pr-4 text-left">
                <span className="font-semibold text-sm text-slate-800">Oza Okta (Acara Pernikahan)</span>
                <Badge className="bg-amber-500 flex items-center gap-1 text-[11px] px-2 text-white border-none">
                  5 <FaStar className="text-[9px]" />
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-500 pb-3 leading-relaxed">
              "Rasa rendang dan ayam bakarnya mantap sekali, bumbunya meresap. Pengiriman juga tepat waktu 1 jam sebelum acara dimulai. Sangat direkomendasikan untuk catering UMKM!"
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}