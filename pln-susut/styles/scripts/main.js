const ctx = document.getElementById('susutChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES'],
        datasets: []
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Bulan' }},
            y: { beginAtZero: true, min: 0, stepSize: 2 }
        }
    }
});

// Fungsi untuk memperbarui grafik berdasarkan filter
function updateChart(selectedValue) {
    if (selectedValue === 'all') {
        chart.data.datasets = Object.values(data).map(d => ({
            label: d.label,
            data: d.data,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: d.borderColor,
            borderWidth: 3,
            pointBackgroundColor: d.borderColor,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
        }));
    } else {
        const selectedData = data[selectedValue];
        chart.data.datasets = [{
            label: selectedData.label,
            data: selectedData.data,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: selectedData.borderColor,
            borderWidth: 3,
            pointBackgroundColor: selectedData.borderColor,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
        }];
    }
    chart.update();
}

// Event listener untuk filter
document.getElementById('ulpFilter').addEventListener('change', function() {
    updateChart(this.value);
});

// Inisialisasi grafik dengan semua data
updateChart('all');

// Handle form submission
document.getElementById('susutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Data berhasil disimpan!');
    window.location.href = 'index.html';
});

document.addEventListener("DOMContentLoaded", function() {
    const dataSusut = {
        "2024": [],
        "2023": [],
    };

    const tableBody = document.getElementById('dataTableBody');
    const ctx = document.getElementById('susutChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Jumlah Susut (MW)',
                data: [],
                borderColor: '#6a11cb',
                backgroundColor: 'rgba(106, 17, 203, 0.2)',
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Tanggal' }},
                y: { title: { display: true, text: 'Jumlah Susut (MW)' }, beginAtZero: true }
            }
        }
    });

    document.getElementById('susutForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const ulp = document.getElementById('ulp').value;
        const tanggal = document.getElementById('tanggal').value;
        const jumlahSusut = parseFloat(document.getElementById('jumlahSusut').value);
        
        // Tambahkan data ke array
        const tahun = new Date(tanggal).getFullYear();
        if (!dataSusut[tahun]) {
            dataSusut[tahun] = [];
        }
        dataSusut[tahun].push({ ulp, tanggal, jumlahSusut });

        // Update tabel
        updateTable(dataSusut[tahun]);

        // Update grafik
        updateChart(dataSusut[tahun]);

        alert('Data berhasil disimpan!');
        this.reset(); // Reset form
    });

    function updateTable(data) {
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.ulp}</td>
                <td>${data.tanggal}</td>
                <td>${data.jumlahSusut}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteRow(${index})">Hapus</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updateChart(data) {
        chart.data.labels = data.map(d => d.tanggal);
        chart.data.datasets[0].data = data.map(d => d.jumlahSusut);
        chart.update();
    }

    function deleteRow(index) {
        dataSusut["2024"].splice(index, 1); // Assuming 2024 for simplicity
        localStorage.setItem('dataSusut', JSON.stringify(dataSusut));
        updateTable(dataSusut["2024"]);
        updateChart(dataSusut["2024"]);
    }

    // Initial render
    updateTable(dataSusut["2024"]);
    updateChart(dataSusut["2024"]);
});