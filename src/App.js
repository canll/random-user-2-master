import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("");

  const getData = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(url);
      setUser(data.results);
      // console.log(data.results[0]);
      setValue(data.results[0].name.first);
      setTitle("name");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addUser = () => {
    const check = tableList.filter((item) => item.email === user[0].email);
    check.length
      ? alert("There is this person")
      : setTableList([...tableList, user[0]]);

    console.log(user[0]);
  };
  console.log(tableList);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <h1 className="loading">LOADING...</h1>;
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={(user && user[0].picture.large) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].name.first);
              }}
            >
              <img
                src={user[0].gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].email);
              }}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].dob.age);
              }}
            >
              <img
                src={user[0].gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].location.street.name);
              }}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].phone);
              }}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseEnter={(e) => {
                setTitle(e.target.dataset.label);
                setValue(user[0].login.password);
              }}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getData}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {tableList?.map((item, i) => {
                return (
                  <tr className="body-tr" key={i}>
                    <td>{item.name.first}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
