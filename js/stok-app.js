new Vue({
    el: '#app',
    data: {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        stok: [
            { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024, cetak ulang</em>" },
            { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
            { kode: "BIOL4201", judul: "Biologi Umum (Praktikum)", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh <u>pendingin</u> untuk kit basah" },
            { kode: "FISIP4001", judul: "Dasar-Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder" }
        ],
        filterUpbjj: '',
        filterKategori: '',
        filterRestock: false,
        sortBy: 'judul',
        isEdit: false,
        form: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', qty: 0, safety: 0, harga: 0, catatanHTML: '' }
    },
    computed: {
        filteredStok() {
            let temp = this.stok;

            if (this.filterUpbjj) temp = temp.filter(s => s.upbjj === this.filterUpbjj);
            if (this.filterUpbjj && this.filterKategori) temp = temp.filter(s => s.kategori === this.filterKategori);
            if (this.filterRestock) temp = temp.filter(s => s.qty <= s.safety);

            return temp.sort((a, b) => {
                if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
                if (this.sortBy === 'stok') return a.qty - b.qty;
                if (this.sortBy === 'harga') return a.harga - b.harga;
            });
        }
    },
    watch: {
        filterUpbjj() {
            this.filterKategori = ''; 
        }
    },
    methods: {
        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.filterRestock = false;
            this.sortBy = 'judul';
        },
        resetForm() {
            this.isEdit = false;
            this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', qty: 0, safety: 0, harga: 0, catatanHTML: '' };
        },
        editData(item) {
            this.isEdit = true;
            this.form = { ...item };
            window.scrollTo(0, document.body.scrollHeight);
        },
        simpanData() {
            if (this.isEdit) {
                const index = this.stok.findIndex(s => s.kode === this.form.kode);
                if (index !== -1) Vue.set(this.stok, index, { ...this.form });
                alert("Data berhasil diperbarui!");
            } else {
                this.stok.push({ ...this.form });
                alert("Data bahan ajar berhasil ditambahkan!");
            }
            this.resetForm();
        }
    }
});