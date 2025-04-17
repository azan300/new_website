import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const OverviewChart = ({ dataColors, stats }) => {
  const apexOverviewColors = getChartColorsArray(dataColors);

  // Fallback data if none is passed
  const chartData = stats?.length > 0 ? stats : [42, 56, 40, 64, 26, 42, 56, 35, 62];
  const categories = chartData.map((_, i) => `Week ${i + 1}`);

  const options = {
    chart: {
      height: 290,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "14%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Progress",
        data: chartData,
      },
    ],
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      title: {
        text: "% (Percentage)",
      },
    },
    xaxis: {
      labels: {
        rotate: -90,
      },
      categories: categories,
      title: {
        text: "Week",
      },
    },
    colors: apexOverviewColors,
  };

  const series = [
    {
      name: "Progress",
      data: chartData,
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Project Overview</CardTitle>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="290"
          className="apex-charts"
        />
      </CardBody>
    </Card>
  );
};

OverviewChart.propTypes = {
  dataColors: PropTypes.string,
  stats: PropTypes.array, // e.g., [30, 40, 45, 50, 70]
};

export default OverviewChart;
