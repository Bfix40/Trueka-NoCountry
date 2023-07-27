import React from 'react'
import Card from 'react-bootstrap/Card';
import OfertaRecibidaCards from './OfertaRecibidaCards'
import './OfertaRecibida.css'
import PerfilUser from './Perfil/PerfilUser';
import SettingPerfil from './SettingPerfil/SettingPerfil';
import CardMiniPerfil from './Perfil/CardMiniPerfil/CardMiniPerfil';
import Stars from './Perfil/Stars/Stars';
import UserBannerStatistics from './Perfil/UserBannerStatistics/UserBannerStatistics';
import { Link, useNavigate} from 'react-router-dom';
//import PerfilUsuario from './Perfil/PerfilUsuarioConsumeAgustinLorenzi';
import Swal from "sweetalert2";
import OfertaAceptada from './OfertaAceptada';
import { useState } from 'react';
import PerfilUsuario from './Perfil/PerfilUsuarioConsumeAgustinLorenzi';


const array = [
    { imagen: "imagen1", titulo: "producto1", ubicacion: "ubicacion1" },
    { imagen: "imagen2", titulo: "producto2", ubicacion: "ubicacion2" },
    // { imagen: "imagen3", titulo: "producto3", ubicacion: "ubicacion3" }

]

const OfertaRecibida = () => {

    const navigate = useNavigate();

    function confirmacion() {


        Swal.fire({
            html: '<h4>¿Aceptás la oferta recibida?.</h4> <br/>   <p>Confirmá si aceptás la oferta de trueque que recibiste de tu contraparte.<br/> Podés contactarte antes para asegurarte de que la oferta sea válida.</p>',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-button',
                text: 'texto',
                cancelButton: 'custom-button2'
            },
        }).then((result) => {

            if (result.isConfirmed) {        

           

                navigate("/oferta-aceptada");
            }
        })

        
    }

    return (



        <div >

                <div>
                    <h3 className='titulo-h3'>¡Recibiste una oferta por tu articulo!.</h3>
                    <div className='controlar-cards-recibida'>
                        <Card className='cards-recibida'>

                            <Card.Img variant="top" src="" />



                            <Card.Body>
                                <Card.Title className='prod-titulo'>Articulo seleccionado</Card.Title>

                            </Card.Body>
                        </Card>


                    </div>

                    <PerfilUsuario/>
                    <hr className='hr' />

                    <h3 className='titulo-h3'>Te ofrecieron.</h3>

                    <div className='ubicar'>
                        {array.map(prod => <div key={prod.titulo} className='margin'><OfertaRecibidaCards prod={prod} /></div>)}
                    </div>

                    {/* <PerfilUsuario /> */}
                    <hr className='hr' />

                    <div className='contactar-whatsapp'>
                        <img src="/images/WhatsApp 1.png" alt="" />
                        <Link to='' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
                            Contactar al usuario via WhatsApp.
                        </Link>

                    </div>
                    <div className='botones'>
                        <button className='ofertar' onClick={confirmacion} >Aceptar Oferta</button>

                    </div>

                    <div className='botones'>
                        <button className='ofertar2'>Rechazar Oferta</button>

                    </div>


                </div>


        </div>
    )
}

export default OfertaRecibida
