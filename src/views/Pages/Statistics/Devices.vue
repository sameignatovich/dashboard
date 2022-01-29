<template>
  <div class="row">
    <div class="col-md-6 devices">
      <canvas ref="devices"></canvas>
    </div>
    <div class="col-md-6 browsers">
      <canvas ref="browsers"></canvas>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  ArcElement,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(ArcElement, DoughnutController, Legend, Title, Tooltip);
const COLORS = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
];

export default {
  data() {
    return {
      platformsData: null,
      error: null,
      chart: null,
    };
  },
  mounted() {
    this.$title('Devices stats');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http.get('/statistics/platforms')
        .then((response) => {
          this.platformsData = response.data;
          this.drawChart(this.$refs.devices,
            'Devices',
            Object.keys(this.platformsData.devices),
            Object.values(this.platformsData.devices));
          this.drawChart(this.$refs.browsers,
            'Browsers',
            Object.keys(this.platformsData.browsers),
            Object.values(this.platformsData.browsers));
        })
        .catch((error) => {
          this.error = error;
        });
    },
    drawChart(element, title, labels, data) {
      this.chart = new Chart(element, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: 'Used devices',
            data,
            backgroundColor: COLORS,
            hoverOffset: 4,
          }],
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: title,
            },
          },
        },
      });
    },
  },
};
</script>
