
function Contenedor({ title1, text1, title2, text2, title3, text3, title4, acciones }) {

    return (
        <>
        <div className='d-flex justify-content-center mt-4' style={{ border: '1px solid rgb(217, 217, 217)', width: 'fit-content', margin: '2px auto', borderRadius: '10px' }}>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>{title1}</div>
                <div>{text1}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>{title2}</div>
                <div>{text2}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>{title3}</div>
                <div>{text3}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>{title4}</div>                   
                <div>    
                    {acciones}            
                </div>
            </div>
        </div>
        </>
    )
}

export default Contenedor