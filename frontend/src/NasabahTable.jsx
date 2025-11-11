import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function NasabahTable() {
  // Data dummy (bisa ganti nanti dari backend)
  const [data] = useState([
    {
      id: 1,
      nama: "Budi Santoso",
      usia: 35,
      pekerjaan: "Pegawai Swasta",
      saldo: 25000000,
      skor_prediksi: 0.82,
      ketertarikan_prediksi: "tinggi",
    },
    {
      id: 2,
      nama: "Siti Aisyah",
      usia: 28,
      pekerjaan: "Wiraswasta",
      saldo: 10000000,
      skor_prediksi: 0.45,
      ketertarikan_prediksi: "sedang",
    },
    {
      id: 3,
      nama: "Agus Wijaya",
      usia: 52,
      pekerjaan: "PNS",
      saldo: 40000000,
      skor_prediksi: 0.91,
      ketertarikan_prediksi: "tinggi",
    },
    {
      id: 4,
      nama: "Dewi Lestari",
      usia: 24,
      pekerjaan: "Mahasiswa",
      saldo: 5000000,
      skor_prediksi: 0.15,
      ketertarikan_prediksi: "rendah",
    },
  ]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("nama", { header: "Nama" }),
      columnHelper.accessor("usia", { header: "Usia" }),
      columnHelper.accessor("pekerjaan", { header: "Pekerjaan" }),
      columnHelper.accessor("saldo", {
        header: "Saldo",
        cell: (info) =>
          "Rp " + Number(info.getValue()).toLocaleString("id-ID"),
      }),
      columnHelper.accessor("skor_prediksi", {
        header: "Skor Prediksi",
        cell: (info) => (info.getValue() * 100).toFixed(1) + "%",
      }),
      columnHelper.accessor("ketertarikan_prediksi", {
        header: "Ketertarikan",
      }),
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Daftar Nasabah Potensial</h2>

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-4 py-2 text-sm text-gray-800"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
