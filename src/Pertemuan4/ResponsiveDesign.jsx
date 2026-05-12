export default function ResponsiveDesign() {
  function ResponsiveText() {
    return (
<p className="text-sm text-blue-500 md:text-lg md:text-green-600 lg:text-xl lg:text-red-600 xl:text-2xl xl:text-purple-600 mb-4">        Coba lakukan zoom in atau zoom out. Perhatikan bahwa ukuran teks akan menyesuaikan dengan ukuran layar.<br />
        Coba hapus class yang menggunakan prefix breakpoint (md:xxx, lg:xxx, xl:xxx) dan lihat perbedaannya!
      </p>
    );
  }

  function ResponsiveWidth() {
    return (
      <div className="mb-4">
        <p>
          Coba lakukan **zoom in/zoom out** atau ubah ukuran layar. Perhatikan bagaimana posisi kolom akan menyesuaikan secara responsif:<br /> <br />
        </p>
        <p>
          <strong>md:w-1/2</strong> → Saat layar mencapai ukuran tablet (md: 768px) atau lebih besar, setiap kolom akan memiliki lebar 50%.
        </p>
        <p>
          <strong>md:flex-row</strong> pada div parent membuat dua kolom ini sejajar secara horizontal pada layar tablet ke atas,<br />
          sedangkan pada layar lebih kecil (mobile), kolom akan tersusun vertikal secara default (flex-col).
        </p>

        <div className="flex flex-col md:flex-row mb-4">
          <div className="bg-red-400 w-full md:w-1/2 p-4">Kolom 1</div>
          <div className="bg-blue-400 w-full md:w-1/2 p-4">Kolom 2</div>
        </div>
      </div>
    );
  }

  function ResponsiveLayout() {
    return (
      <div>
        <p className="mt-4">
          Kotak-kotak di bawah ini menggunakan <strong>Grid Layout</strong> dari Tailwind CSS. Jumlah kolom akan menyesuaikan dengan ukuran layar:
        </p>
        <p>
          - <strong>grid-cols-1</strong> → Pada layar kecil (default), semua box tersusun dalam <strong>1 kolom</strong>.<br />
          - <strong>sm:grid-cols-2</strong> → Saat ukuran layar mencapai <strong>sm (≥640px)</strong>, grid berubah menjadi <strong>2 kolom</strong>.<br />
          - <strong>md:grid-cols-3</strong> → Pada ukuran <strong>md (≥768px)</strong>, grid berubah menjadi <strong>3 kolom</strong>.<br />
          - <strong>lg:grid-cols-4</strong> → Saat ukuran layar <strong>lg (≥1024px)</strong> atau lebih besar, grid akan memiliki <strong>4 kolom</strong>.<br />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-500 p-4">Box 1</div>
          <div className="bg-blue-500 p-4">Box 2</div>
          <div className="bg-blue-500 p-4">Box 3</div>
          <div className="bg-blue-500 p-4">Box 4</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contoh Responsive Design dengan Tailwind CSS</h1>
      <ResponsiveText />
      <ResponsiveWidth />
      <ResponsiveLayout />
    </div>
  );
}