import React from 'react'
import "./paginacion.css"

export const Paginacion = ({ porPagina, pagina, allvideogame, paginado, setPagina, maximo }) => {

    const pageNumbers = []
    const maxpage = Math.ceil(allvideogame / porPagina)

    for (let i = 0; i < maxpage; i++) {
        pageNumbers.push(i + 1)
    }
    function onPrevClick() {
        setPagina(pagina - 1)
    }
    function onNextClick() {
        setPagina(pagina + 1)
    }

    return (
        <nav>
            <ul className='click'>
                <button className='button1' disabled={pagina === 1 || pagina < 1} onClick={onPrevClick}> Prev</button>

                {pageNumbers.map(num => {
                    return (

                        <li key={num}>

                            <button className='button2' onClick={() => paginado(num)}>{num}</button>

                        </li>
                    )
                })}

                <button className='button1' disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={onNextClick}>Next</button>


            </ul>
            <div className='actualPage'>
                <span className="button2">{`Actual Page  ${pagina}`} </span>
            </div>
        </nav>

    )
}