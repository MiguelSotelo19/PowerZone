import CanvasJSReact from '@canvasjs/react-charts';
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Menu from "./components/Menu";

import Form from 'react-bootstrap/Form';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Ingresos() {
    const urlHistorial = "http://localhost:8080/api/power/historial/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [id_mem, setId_mem] = useState(0);
    const [historial, setHistorial] = useState([]);
    const [membresias, setMembresias] = useState([]);
    const [nombre, setNombre] = useState("");

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [stringhisto, setStringhisto] = useState([]);

    useEffect(() => {
        getMembresias();
    }, []);

    const getMembresias = async () => {
        const respuesta = await axios.get(urlMembresias);
        setMembresias(respuesta.data.data);
    };

    const getHistorial = async (id) => {
        const respuesta = await axios.get(urlHistorial + id);
        return respuesta.data.data;
    };

    const verGrafica = async (id_membresia) => {
        const historialData = await getHistorial(id_membresia);
        const resumenMensual = {};

        setNombre(membresias[id_membresia - 1]?.tipo_membresia || "");

        historialData.forEach((data) => {
            const fecha = new Date(data.fecha);
            const key = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
            resumenMensual[key] = (resumenMensual[key] || 0) + data.ganancia;
        });

        const newStringhisto = Object.entries(resumenMensual).map(([key, totalGanancia]) => {
            const [anio, mes] = key.split("-").map(Number);
            return { x: new Date(anio, mes - 1), y: totalGanancia };
        });

        setStringhisto(newStringhisto);
        return newStringhisto;
    };

    const filtrarPorFechas = (data, inicio, fin) => {
        const inicioDate = inicio ? new Date(inicio) : null;
        const finDate = fin ? new Date(fin) : null;

        return data.filter((mes) => {
            const mesDate = mes.x;
            const inicioValido = inicioDate ? mesDate >= inicioDate : true;
            const finValido = finDate ? mesDate <= finDate : true;
            return inicioValido && finValido;
        });
    };

    const actualizarFechas = async (inicio, fin) => {
        const respuesta = await verGrafica(id_mem);
        const datosFiltrados = filtrarPorFechas(respuesta, inicio, fin);
        setStringhisto(datosFiltrados);
    };

    const manejarFechaInicio = (e) => {
        const nuevaFechaInicio = e.target.value;
        setFechaInicio(nuevaFechaInicio);
        actualizarFechas(nuevaFechaInicio, fechaFin);
    };

    const manejarFechaFin = (e) => {
        const nuevaFechaFin = e.target.value;
        setFechaFin(nuevaFechaFin);
        actualizarFechas(fechaInicio, nuevaFechaFin);
    };

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Membresía " + nombre,
        },
        axisX: {
            valueFormatString: "MMM",
            intervalType: "month",
            interval: 1,
        },
        axisY: {
            title: "Ganancias",
            suffix: " MXN",
        },
        toolTip: {
            shared: true,
        },
        legend: {
            cursor: "pointer",
            itemclick: function (e) {
                e.dataSeries.visible = !e.dataSeries.visible;
                e.chart.render();
            },
        },
        data: [
            {
                type: "line",
                name: nombre,
                showInLegend: true,
                yValueFormatString: "#,### MXN",
                dataPoints: stringhisto,
            },
        ],
    };

    return (
        <>
            <Menu />
            <div className="main-content pb-5">
                <div className="row g-3 justify-content-center">
                    <div className="col-md-3">
                        <Form.Select
                            required
                            onChange={(e) => {
                                verGrafica(e.target.value);
                                setId_mem(e.target.value);
                                setFechaInicio("");
                                setFechaFin("");
                            }}
                        >
                            <option value={null}>Selecciona una membresía</option>
                            {membresias.map((membresia) => (
                                <option key={membresia.id} value={membresia.id}>
                                    {membresia.tipo_membresia}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-3">
                        <input
                            type="date"
                            className="form-control"
                            value={fechaInicio}
                            onChange={manejarFechaInicio}
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            type="date"
                            className="form-control"
                            value={fechaFin}
                            onChange={manejarFechaFin}
                        />
                    </div>
                </div>

                <div className="mt-5 d-flex justify-content-center">
                    <div className="w-75">
                        <CanvasJSChart options={options} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ingresos;
