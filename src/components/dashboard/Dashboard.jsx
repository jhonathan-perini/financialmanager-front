import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import {categoryOptions} from "../expenses/Expenses.jsx";
import {useQuery} from "@tanstack/react-query";
import api from "../../api/api.js";
import Loading from "../Loading";


let options = {

    chart: {
        type: 'bar',


    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
            distributed: true
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ['#FFF']
        },
        formatter: function (value)  {
            return Number(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        },

    },
    xaxis: {

        categories: [],
        labels: {
            style:{
                colors: ['#FFF']
            },
            formatter: function (value)  {
                return Number(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            },

        },

    },
    yaxis: {
        labels: {
            style:{
                colors: ['#FFF']
            },

        },
    }
};


const pieOpt = {
    series: [],
    chartOptions: {
        labels:  ['Expenses', 'Incomes'],
        colors: ['#e85050', '#64d364'],
        tooltip: {
            y:{
                formatter: function (value)  {
                    return Number(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                },
            }

        }
},



}
let series =  [{name: 'Total expense amount', data: []}]

export default function Dashboard(){

    const [chartBarOptions, setChartOptions ]= useState({
     options, series
    })
const {data: sumExpenses, isLoading: dashbordLoading} = useQuery(["expenses"], async () => {
    const response = await api.get('/expenses/category')
    options.xaxis.categories = response.data.data.map(el => el._id.charAt(0).toUpperCase() + el._id.slice(1))
    series[0].data= response.data.data.map(el => el.totalAmount)
   const valuesPieChart = {total: 0, income: 0}
       response.data.data.forEach(el => {
        if(el._id !== 'income'){
            console.log(el.totalAmount)
            valuesPieChart.total += el.totalAmount
        } else if (el._id === 'income'){
            console.log(el.totalAmount)
            valuesPieChart.income += el.totalAmount
           }

    })
        pieOpt.series = [valuesPieChart.total, valuesPieChart.income]
    console.log(valuesPieChart)
    return response.data
})




console.log(sumExpenses)

    return (
        <div className="dashboard__view">
            {dashbordLoading ? <Loading/> : <>
                <h1>Let's check what is going on!</h1>
                <div className="charts__container">
                <div className="bar-chart">
                <h2>Total amount by category</h2>
            {sumExpenses?.data.length > 0 ? <Chart
                options={chartBarOptions.options}
                series={chartBarOptions.series}
                type="bar"
                width="100%"
                /> : null}
                </div>
                <div className="pie-chart">
                <h2>Your balance</h2>
            {sumExpenses?.data.length > 0 ? <Chart
                options={pieOpt.chartOptions}
                series={pieOpt.series}
                type="pie"
                width="100%"

                /> : null}
                </div>
                </div>
            </>
            }


        </div>
    )
}