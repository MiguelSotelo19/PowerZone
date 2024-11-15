import CanvasJSReact from '@canvasjs/react-charts';
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Menu from "./etiquetas/Menu";

import Form from 'react-bootstrap/Form';

//Canvas
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Ingresos() {
    const urlHistorial = "http://localhost:8080/api/power/historial/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const[ id_mem, setId_mem ] = useState(0);
    const [ historial, setHistorial ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);
    const [ nombre, setNombre ] = useState('');

    const [ fechaInicio, setFechaInicio] = useState("");
    const [ fechaFin, setFechaFin] = useState("");
    const [ stringhisto, setStringhisto ] = useState([]);
    const [ fechas ] = useState([ 
        { id: 0, mes:"Enero"}, { id: 1, mes:"Febrero"}, { id: 2, mes:"Marzo"}, 
        { id: 3, mes:"Abril"}, { id: 4, mes:"Mayo"}, { id: 5, mes:"Junio"}, 
        { id: 6, mes:"Julio"}, { id: 7, mes:"Agosto"}, { id: 8, mes:"Septiembre"}, 
        { id: 9, mes:"Octubre"}, { id: 10, mes:"Noviembre"}, { id: 11, mes:"Diciembre"} ]);
    const [fechasFinOpciones, setFechasFinOpciones] = useState(fechas);

    //Traer datos de historial
    useEffect(() => {
        getMembresias();
    }, [])

    const getMembresias = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlMembresias,
        });
        setMembresias(respuesta.data.data);
    }

    const getHistorial = async (id) => {
        const respuesta = await axios({
            method: 'GET',
            url: urlHistorial + id,
        });
        console.log(respuesta.data.data);
        return respuesta;
    };

    const verGrafica = async (id_membresia) => {
        const respuesta = await getHistorial(id_membresia);
        const historialData = respuesta.data.data;
        const resumenMensual = {};        
    
        setNombre(membresias[id_membresia - 1].tipo_membresia);
    
        for (let i = 0; i < historialData.length; i++) {
            const data = historialData[i];
            
            const [anio, mes] = data.fecha.split('-').map(Number);
            const key = `${anio}-${mes}`;
            
            if (!resumenMensual[key]) {
                resumenMensual[key] = 0;
            }
            resumenMensual[key] += data.ganancia;
        }
    
        const newStringhisto = Object.entries(resumenMensual).map(([key, totalGanancia]) => {
            const [anio, mes] = key.split('-').map(Number);
            const formattedDate = new Date(anio, mes - 1);
            return { x: formattedDate, y: totalGanancia };
        });
    
        setStringhisto(newStringhisto);
        return newStringhisto;
    };

    const asignarFechas = async (inicio) => {
        const respuesta = await verGrafica(id_mem);

        setFechaInicio(inicio);
        setFechaFin("");
        const resumenMensual = [];

        for(let i = 0; i < respuesta.length; i++){
            let mes = respuesta[i];
            if(mes.x.getMonth() >= inicio){
                resumenMensual.push(mes);
            }
        }

        const mesesRestantes = fechas.filter((fecha) => fecha.id > parseInt(inicio));
        setFechasFinOpciones(mesesRestantes);
        setStringhisto(resumenMensual);
    }

    const asignarFechaFin = async (fin) => {
        const respuesta = await verGrafica(id_mem);
        setFechaFin(fin);

        const resumenMensual = [];

        for(let i = 0; i < respuesta.length; i++){
            let mes = respuesta[i];
            if(mes.x.getMonth() <= fin){
                resumenMensual.push(mes);
            }
        }

        setStringhisto(resumenMensual);
    }

    //Canvas
    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Membresía "+nombre
        },
        axisX: {
            valueFormatString: "MMM",
            intervalType: "month",
            interval: 1
        },
        axisY: {
            title: "Ganancias",
            suffix: " MXN"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },
        data: [{
            type: "line",
            name: nombre,
            showInLegend: true,
            yValueFormatString: "#,### MXN",
            dataPoints: stringhisto
        }]
    };

    return(
        <>
            <Menu />
            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='row g-3 justify-content-center'>
                    <div className='col-md-3'>
                        <Form.Select required onChange={(e) => { verGrafica(e.target.value); setId_mem(e.target.value); setFechaInicio(""); setFechaFin("");}}>
                            <option id="selected" value={null}>Selecciona una membresia</option>
                            {membresias.map((membresia) => (
                                <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className='col-md-3'>
                        <Form.Select required value={fechaInicio} onChange={(e) => {setFechaInicio(e.target.value); asignarFechas(e.target.value);}}>
                            <option id="selected1" value="">Selecciona un mes de inicio</option>
                            {fechas.map((fecha) => (
                                <option key={fecha.id} value={fecha.id}>{fecha.mes}</option>
                            ))}
                        </Form.Select>
                    </div>
                    
                    <div className='col-md-3'>
                        <Form.Select required id='fechas_fin' value={fechaFin} onChange={(e) => asignarFechaFin(e.target.value)}>                            
                            <option id="selected2" value="">Selecciona un mes de fin</option>
                            {fechasFinOpciones.map((fecha) => (
                                <option key={fecha.id} value={fecha.id}>{fecha.mes}</option>
                            ))}
                        </Form.Select>
                    </div>
                </div>

                <div className='mt-5 d-flex justify-content-center'>
                    <div className='w-75'>
                        <CanvasJSChart options={options} />
                    </div>                    
                </div>
            </div>


            
        </>
    )

}

export default Ingresos