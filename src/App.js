import {FiSearch} from "react-icons/fi";
import "./styles.css";
import "./index.css";
import {useState} from "react";

import api from "./services/api";

function App() {
    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    async function handleSearch() {
        const formattedCep = input.replace("-", "");

        if (formattedCep === "") {
            alert("Preencha algum CEP!");
            return;
        }

        try {
            const response = await api.get(`${formattedCep}/json`);
            console.log(response);
            setCep(response.data);
            setInput("");
        } catch {
            alert("Ops, erro ao buscar!");
            setInput("");
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>
            <div className="containerInput">
                <input
                    type="text"
                    placeholder="Digite seu CEP..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF"/>
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>{cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>
            {cep.localidade} - {cep.uf}
          </span>
                </main>
            )}
        </div>
    );
}

export default App;
