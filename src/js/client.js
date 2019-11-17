/* eslint-disable no-unused-vars */
import axios from 'axios';
import Chart from 'chart.js';

// eslint-disable-next-line func-names
(function () {
  const file = ['10', '2', '512', '128'];
  axios.get(`http://localhost:8080/${file[0]}`)
    .then((resp) => resp.data)
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
      const ctx = document.getElementById(`t${file[0]}`);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resp[0],
          datasets: [{
            label: `${file[0]} file`,
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

  axios.get(`http://localhost:8080/${file[1]}`)
    .then((resp) => resp.data)
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
      const ctx = document.getElementById(`t${file[1]}`);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resp[0],
          datasets: [{
            label: `${file[1]} file`,
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

  axios.get(`http://localhost:8080/${file[2]}`)
    .then((resp) => resp.data)
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
      const ctx = document.getElementById(`t${file[2]}`);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resp[0],
          datasets: [{
            label: `${file[2]} file`,
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

  axios.get(`http://localhost:8080/${file[3]}`)
    .then((resp) => resp.data)
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
      const ctx = document.getElementById(`t${file[3]}`);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resp[0],
          datasets: [{
            label: `${file[3]} file`,
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
