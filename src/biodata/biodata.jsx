import "./custom.css";
import poto_gue from '../assets/poto_gue.png';

//  Komponen utama biodata oza
export default function Biodata() {
  return (
    <div className="ui-container">
      <Header />
      <FotoProfile />
      <IdentitasPribadi />
      <RiwayatPendidikan />
      <Hobi />
      <Motivasi />
      <MediaSosial />
    </div>
  );
}

function Header() {
  return (
    <div className="header-section">
      <h1>Biodata Diri</h1>
    </div>
  );
}

function FotoProfile() {
  return (
    <div className="box-section foto-profile">
      <div className="profile-circle">
        <img src={poto_gue} alt="Profile Oza" />
      </div>
      <p>Foto Profile</p>
    </div>
  );
}

function IdentitasPribadi() {
  return (
    <div className="box-section identitas-pribadi">
      <h4>Identitas Pribadi</h4>
      <table className="table-identitas">
        <tbody>
          <tr>
            <td>Nama</td>
            <td>: Oza Okta Gistrada</td>
          </tr>
          <tr>
            <td>NIM</td>
            <td>: 2457301117</td>
          </tr>
          <tr>
            <td>Jurusan</td>
            <td>: Sistem Informasi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RiwayatPendidikan() {
  return (
    <div className="box-section riwayat-pendidikan">
      <h4>Riwayat Pendidikan</h4>
      <ul>
        <li>SD: SDS IT Al-Kautsar</li>
        <li>SMP: SMPS IT Al-Kautsar</li>
        <li>SMA: SMAS IT Mutiara</li>
      </ul>
    </div>
  );
}

function Hobi() {
  return (
    <div className="box-section hobi">
      <h4>Hobi</h4>
      <ul>
        <li>Tidur</li>
        <li>Travelling</li>
        <li>Otomotif</li>
      </ul>
    </div>
  );
}

function Motivasi() {
  return (
    <div className="box-section motivasi">
      <h4>Motivasi</h4>
      <p>"Teruslah belajar, karena hidup tidak pernah berhenti mengajar"</p>
    </div>
  );
}

function MediaSosial() {
  return (
    <div className="box-section media-sosial">
      <h4>Media Sosial</h4>
      <p>Instagram: @oza.oktaa, @0jeeet</p>
      <p>GitHub: github.com/zennn167</p>
    </div>
  );
}