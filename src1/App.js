import React from 'react';
import Vest from './Vest.js';
import Delete from './Delete.js';
import ListaVesti from './ListaVesti.js';
import {Switch, Route} from 'react-router-dom';

import modifyNews from './modifyNews.js';

modifyNews()

export default function App() {    
    return (
        <div className = "cms">
          <Switch>
              <Route exact path = {`/`}>
                <ListaVesti />
              </Route>
              <Route path = {`/vest/:id`}>
                <Vest />
              </Route>
              <Route path = {`/delete/:id`}>
                <Delete />
              </Route>
              <Route path = {`/vest`}>
                <Vest />
              </Route>
              <Route path = {`/listaVesti`} >
                <ListaVesti />
              </Route>
          </Switch>  
          
          
        </div>
    )
}