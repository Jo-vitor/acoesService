const API_URL = "https://brapi.dev";
const TOKEN = "bRMmRuTBRx1FChS7ghWESL";

//essas funções foram utilizadas diretamento no trabalho de mobile e estão aqui para fins de avaliação

const getAtivos = async (pesquisa, tipo) => {
    const response = await fetch(`${API_URL}/api/quote/list?page=1&limit=20&search=${pesquisa}&type=${tipo}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const data = await response.json();
    
    return data;
};

const maioresVaricoes = async (tipo, ordem) => {
    const response = await fetch(`${API_URL}/api/quote/list?page=1&limit=20&type=${tipo}&sortBy=change&sortOrder=${ordem}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const data = await response.json();
    
    return data;
};

const dadosHistoricos = async(tickers) => {
    const response = await fetch(`${API_URL}/api/quote/${tickers}?range=5d&interval=1d`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const data = await response.json();

    return data;
}

export {getAtivos, maioresVaricoes, dadosHistoricos}