import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import './result.scss';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

export const Result = () => {
    const { result, setResult, sciences, blok1, blok2s } = useAuth()
    const [ball, setBall] = useState()

    const fan1 = sciences?.filter(scince => {
        if (Number(blok2s) === 1) {
            return scince.science === 'Matematika'
        }
        if (Number(blok2s) === 2) {
            return scince.science === 'Fizika'
        }
        if (Number(blok2s) === 3) {
            return scince.science === 'Ingliz tili'
        }
        if (Number(blok2s) === 4) {
            return scince.science === 'Kimyo'
        }
        if (Number(blok2s) === 5) {
            return scince.science === 'Biologiya'
        }
        return true
    })
    const fan2 = sciences?.filter(scince => {
        if (Number(blok1) === 1) {
            return scince.science === 'Matematika'
        }
        if (Number(blok1) === 2) {
            return scince.science === 'Fizika'
        }
        if (Number(blok1) === 3) {
            return scince.science === 'Ingliz tili'
        }
        if (Number(blok1) === 4) {
            return scince.science === 'Kimyo'
        }
        if (Number(blok1) === 5) {
            return scince.science === 'Biologiya'
        }
        return true
    })

    const data = JSON.parse(localStorage.getItem('test'));

    useEffect(() => {
        fetch(`http://localhost:7000/result`)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(err => console.log(err));

    }, [setResult]);

    const filteredResult = result?.filter(res => res.user__id === data.user__id && res.res_id === data.res_id)
    useEffect(() => {
        filteredResult?.forEach(el => {
            if (el.total_score > el.faculties[0]?.kontrakt_score) {
                return setBall("Shartnoma asosida")
            }
            else if (el.total_score > el.faculties[0]?.grand_score) {
                return setBall("Davlat granti")
            }
            return setBall("Tavsiya etilmadi")
        });
    }, [filteredResult])



    return (
        <div className="result container">
            <div className=" result__container">
                <h1 className="result__title">Natija</h1>

                <div className="result__box">
                    <h2 className="relut__box-title">Asosiy</h2>
                    <ul className="result__list p-0">
                        <li className="result__item">{fan1?.map(title => (
                            <span key={title?.science_id}>{title?.science}</span>
                        ))}  {data?.blok1_score}/10</li>
                        <li className="result__item">{fan2?.map(title => (
                            <span key={title?.science_id}>{title?.science}</span>
                        ))}  {data?.blok2_score}/10</li>
                    </ul>
                </div>
                <h2>Natija (tavsiya etildi yoki etilmadi)</h2>
                {filteredResult?.map(res => (
                    <ul className='list3 p-0' key={res.res_id}>
                        <li>{res?.faculties[0]?.fac_name}</li>
                        <li>{ball}</li>
                    </ul>
                ))}
                <Link to='/table' className='btn btn-primary'>Imtihon natijalari</Link>

            </div>
        </div>
    )
}