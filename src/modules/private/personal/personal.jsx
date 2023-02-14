import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";


const Personal = () => {
  const [stat, setStat] = useState([])
  const id = JSON.parse(localStorage.getItem("findUser")) || null
  if (!id) {
    alert("Malumot hatoligi")
  }

  useEffect(() => {
    fetch(`http://localhost:7000/result`)
      .then(res => res.json())
      .then(data => setStat(data))
      .catch(err => console.log(err));
  }, [setStat]);

  const findUser = stat.filter(e => e.user_id == id)
  // "2023-02-13T19:00:00.000Z"
  const sana = (kun) => {
    return kun.split("T")[0].split("-").reverse().join("/")
  }
  return (
    <>
      <div className="container-xl">
        <div className="w-75 mx-auto mt-4">
          <div className="d-flex justify-content-between">
            <h3>Shaxsiy natijalar</h3>
            <div>
              <Link to={"/"} className="btn btn-primary">Chiqish</Link>
            </div>
          </div>

          <h2>Testlar</h2>
          <ul className="list-unstyled">
            {findUser.map((e, i) => (
              <>
                <li className="d-flex justify-content-between border-bottom mb-2 mt-3" key={i}>
                  <p>Test #{i + 1}</p>
                  <p>{sana(e.test_date)}</p>
                  <p>{e.total_score}</p>
                </li>
                <li>
                  {e.faculties[0]?.fac_name}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Personal