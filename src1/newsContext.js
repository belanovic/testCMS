import React, {useState, useEffect} from 'react';

const context = React.createContext();

function Provider(props) {

    const [listaVesti, setListaVesti] = useState([]);
    const [listLoaded, setListLoaded] = useState(true);

    

    useEffect((prom) => {
        setListLoaded(true);
    }, [listaVesti])


    return (
        <context.Provider value = {{
            listaVesti: listaVesti,
            setListaVesti: setListaVesti,
            listLoaded: listLoaded,
            setListLoaded: setListLoaded
        }}>
            {props.children}
        </context.Provider>
    )
}

export {context, Provider};