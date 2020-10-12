import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {AuthPage} from './pages/AuthPage'
import {RegPage} from './pages/RegPage'
import {CreatePage} from './pages/CreatePage'
import {DetailsPage} from './pages/DetailsPage'
import {LinksPage} from './pages/LinksPage'

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/details/:id">
                    <DetailsPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/registration" exact>
                <RegPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}