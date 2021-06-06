import React, { FunctionComponent, useContext } from "react";
import { Redirect, Route, useParams } from "react-router";
import { UserContext } from "../hooks/UserProvider";

interface IProfileRoutesProps<T> {
    component: FunctionComponent<T>;
    path: string;
} 

export default function ProfileRoutes<T>(props: IProfileRoutesProps<T>) {
    const user = useContext(UserContext);
    if(user) {
        return <Redirect to={"/home"}/>
    }
    return <Route exact={true} path={props.path} component={props.component} />
}