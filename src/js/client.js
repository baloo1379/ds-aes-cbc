import Chart from 'chart.js';

// eslint-disable-next-line func-names
(function () {
  fetch('http://localhost:8080/10')
    .then((resp) => resp.json())
    .then((resp) => {
      const e = [];
      const d = [];
      for (let i = 0; i < 5; i += 1) {
        e.push(resp[i][0]);
        d.push(resp[i][1]);
      }
      return [['ctr', 'cbc', 'cfb', 'ocb', 'ecb'], e, d];
    })
    .then((resp) => {
      const ctx = document.getElementById('timings');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resp[0],
          datasets: [{
            label: '10MB text file',
            data: resp[1],
            backgroundColor:
              'rgba(255, 99, 132, 0.2)',
            borderColor:
              'rgba(255, 99, 132, 1)',

            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    });
}());
