import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoRoti from './assets/roti.png'; // pastikan logo ada di src/assets/roti.png
import './App.css';

function App() {
  const [penjualan, setPenjualan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [namaBarang, setNamaBarang] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [namaPengeluaran, setNamaPengeluaran] = useState("");
  const [biaya, setBiaya] = useState("");

  const totalPenjualan = penjualan.reduce(
    (sum, item) => sum + item.hargaSatuan * item.jumlah,
    0
  );
  const totalPengeluaran = pengeluaran.reduce((sum, item) => sum + item.biaya, 0);
  const labaBersih = totalPenjualan - totalPengeluaran;

  const addPenjualan = () => {
    if (!namaBarang || !hargaSatuan || !jumlah) return;
    setPenjualan([
      ...penjualan,
      { namaBarang, hargaSatuan: Number(hargaSatuan), jumlah: Number(jumlah) },
    ]);
    setNamaBarang("");
    setHargaSatuan("");
    setJumlah("");
  };

  const addPengeluaran = () => {
    if (!namaPengeluaran || !biaya) return;
    setPengeluaran([...pengeluaran, { namaPengeluaran, biaya: Number(biaya) }]);
    setNamaPengeluaran("");
    setBiaya("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(LogoRoti, "PNG", 14, 10, 30, 30); // menambahkan logo
    doc.text("NA BAKERY 🍰", 50, 25);

    if (penjualan.length) {
      doc.text("Ringkasan Penjualan", 14, 50);
      doc.autoTable({
        startY: 55,
        head: [["Nama Barang", "Harga Satuan", "Jumlah", "Total"]],
        body: penjualan.map((p) => [
          p.namaBarang,
          p.hargaSatuan,
          p.jumlah,
          p.hargaSatuan * p.jumlah,
        ]),
      });
    }

    if (pengeluaran.length) {
      const y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 70;
      doc.text("Ringkasan Pengeluaran", 14, y);
      doc.autoTable({
        startY: y + 5,
        head: [["Nama Pengeluaran", "Jumlah Biaya"]],
        body: pengeluaran.map((p) => [p.namaPengeluaran, p.biaya]),
      });
    }

    const yTotal = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 90;
    doc.text(`Total Penjualan: Rp ${totalPenjualan}`, 14, yTotal);
    doc.text(`Total Pengeluaran: Rp ${totalPengeluaran}`, 14, yTotal + 10);
    doc.text(`Laba Bersih: Rp ${labaBersih}`, 14, yTotal + 20);

    doc.save("NA_Bakery_Report.pdf");
  };

  const cardStyle = {
    backgroundColor: "#fff0f5",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    marginRight: "10px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "7px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#ff69b4",
    color: "#fff",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#ffe4e1",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <img src={LogoRoti} alt="Logo Roti" style={{ width: "120px" }} />
        <h1 style={{ color: "#ff69b4" }}>NA BAKERY 🍰</h1>
      </header>

      <section style={cardStyle}>
        <h2>Tambah Penjualan</h2>
        <input
          style={inputStyle}
          placeholder="Nama Barang"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Harga Satuan"
          value={hargaSatuan}
          onChange={(e) => setHargaSatuan(e.target.value)}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Jumlah"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
        />
        <button style={buttonStyle} onClick={addPenjualan}>
          Simpan
        </button>
      </section>

      <section style={cardStyle}>
        <h2>Tambah Pengeluaran</h2>
        <input
          style={inputStyle}
          placeholder="Nama Pengeluaran"
          value={namaPengeluaran}
          onChange={(e) => setNamaPengeluaran(e.target.value)}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Jumlah Biaya"
          value={biaya}
          onChange={(e) => setBiaya(e.target.value)}
        />
        <button style={buttonStyle} onClick={addPengeluaran}>
          Simpan
        </button>
      </section>

      <section style={cardStyle}>
        <h2>Ringkasan Penjualan</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Nama Barang</th>
              <th style={thStyle}>Harga Satuan</th>
              <th style={thStyle}>Jumlah</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {penjualan.map((p, i) => (
              <tr key={i}>
                <td style={tdStyle}>{p.namaBarang}</td>
                <td style={tdStyle}>{p.hargaSatuan}</td>
                <td style={tdStyle}>{p.jumlah}</td>
                <td style={tdStyle}>{p.hargaSatuan * p.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={cardStyle}>
        <h2>Ringkasan Pengeluaran</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Nama Pengeluaran</th>
              <th style={thStyle}>Jumlah Biaya</th>
            </tr>
          </thead>
          <tbody>
            {pengeluaran.map((p, i) => (
              <tr key={i}>
                <td style={tdStyle}>{p.namaPengeluaran}</td>
                <td style={tdStyle}>{p.biaya}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ ...cardStyle, backgroundColor: "#fffacd" }}>
        <h3>Total Penjualan: Rp {totalPenjualan}</h3>
        <h3>Total Pengeluaran: Rp {totalPengeluaran}</h3>
        <h3>Laba Bersih: Rp {labaBersih}</h3>
      </section>

      <button style={{ ...buttonStyle, marginTop: "10px" }} onClick={generatePDF}>
        Cetak PDF
      </button>
    </div>
  );
}

export default App;
