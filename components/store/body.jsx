import { useState } from "react";
import StorePage from "./storePage";
import ProductList from "./productList";

export default function Body(props) { 
    console.log(props)
    return (
        <>
            {props.navigateTo ===  null || props.navigateTo === 0 ? <StorePage />:<ProductList />}
        </>
    );
}