import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '..';

const AppRouter = observer ( () => {
    const {user} = useContext(Context)
    const isAuth = user.isAuth

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={isAuth 
                ? <Navigate to={SHOP_ROUTE} /> 
                : <Navigate to={LOGIN_ROUTE} />}
            />
        </Routes>
    );
});

export default AppRouter;