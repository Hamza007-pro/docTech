"use client";
import StorePage from "./storePage";
import ProductList from "./productList";
import useNavigationStore from "@/app/store/navigationStore";

export default function Body() { 
    const navigateTo = useNavigationStore((state) => state.navigateTo);

    return (
        <>
            {navigateTo === 0 ? <StorePage /> : <ProductList />}
        </>
    );
}
