import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import './table.scss';

export const Table = () => {
    const { result, setResult } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8000/result`)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(err => console.log(err));

    }, [setResult]);

    return (
        <div className="table">
            <div className="container table__container">
                <h2 className="text-center mt-3 text-primary">Test Natijalari</h2>
                <ul className="mt-3">
                    <li className="curs">
                        <span className="qwerty2">O'quvchini ismi</span>
                        <span className="qwerty2">Topshirilgan vaqt</span>
                        <span className="qwerty2">Yig'ilgan ball</span>
                    </li>
                    {result?.map(res => (
                        <li className="curs border p-2" key={res.res_id}>
                            <span onClick={() => [navigate("/personal"), localStorage.setItem("findUser", JSON.stringify(res?.users[0]?.user_id))]} className="qwerty">{res?.users[0]?.fulname}</span>
                            <span className="qwerty">{res.test_date}</span>
                            <span className="qwerty">{res.total_score}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}