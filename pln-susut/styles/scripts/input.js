document.getElementById('susutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ulp = document.getElementById('ulp').value;
    const tanggal = document.getElementById('tanggal').value;
    const jumlahSusut = parseFloat(document.getElementById('jumlah_susut').value);

    const data = { ulp, tanggal, jumlahSusut };
    let susutData = JSON.parse(localStorage.getItem('susutData')) || [];
    susutData.push(data);
    localStorage.setItem('susutData', JSON.stringify(susutData));

    window.location.href = 'grafik-susut.html';
});
