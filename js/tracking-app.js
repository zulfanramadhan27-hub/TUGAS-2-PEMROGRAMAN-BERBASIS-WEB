new Vue({
    el: '#app',
    data: {
        pengirimanList: [
            { kode: "REG", nama: "Reguler (3-5 hari)" },
            { kode: "EXP", nama: "Ekspres (1-2 hari)" }
        ],
        paket: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
        ],
        dataDO: [
            {
                doNumber: "DO2025-001",
                nim: "123456789",
                nama: "Rina Wulandari",
                ekspedisi: "REG",
                paket: "PAKET-UT-001",
                total: 120000,
                tanggal: "2025-08-25",
                status: "Dalam Perjalanan"
            }
        ],
        seq: 2, 
        form: { doNumber: '', nim: '', nama: '', ekspedisi: '', paket: '', total: 0, tanggal: '' }
    },
    computed: {
        detailPaket() {
            if(!this.form.paket) return null;
            return this.paket.find(p => p.kode === this.form.paket);
        }
    },
    watch: {
        'form.paket'(newVal) {
            const getPaket = this.paket.find(p => p.kode === newVal);
            this.form.total = getPaket ? getPaket.harga : 0;
        }
    },
    methods: {
        generateDONumber() {
            const tahun = new Date().getFullYear();
            const formatSeq = String(this.seq).padStart(3, '0');
            this.form.doNumber = `DO${tahun}-${formatSeq}`;
        },
        simpanDO() {
            this.dataDO.push({
                ...this.form,
                status: "Baru Didaftarkan"
            });
            alert(`Sukses! Nomor transaksi ${this.form.doNumber} berhasil ditambahkan`);
            
            this.seq++;
            this.form.nim = '';
            this.form.nama = '';
            this.form.ekspedisi = '';
            this.form.paket = '';
            
            this.generateDONumber();
        }
    },
    mounted() {
        this.generateDONumber();
        this.form.tanggal = new Date().toISOString().split('T')[0];
    }
});