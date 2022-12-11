import {useEffect, useRef, useState} from "react";
import chevron from '../../assets/expenses/down-chevron.svg'

export default function MenuExpense({deleteFunction, editFunction, expenseId, expense}){
    function handleMenu(e){
        if(expenseMenu.current && open && !expenseMenu.current.contains(e.target)){
            setOpen(false)
        }
    }


    const expenseMenu = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('mousedown', handleMenu)
        return () => {
            document.removeEventListener('mousedown', handleMenu)
        }
    }, [open])
    return (
        <>
            <img className={"menu-indicator"} onClick={() => setOpen(true)} src={chevron}/>
        <div className={open ? "card__menu card__menu-open" : "card__menu" } ref={expenseMenu}>
            <span onClick={() => editFunction(expense)}>Edit</span>
            <span onClick={() => deleteFunction(expenseId)}>Delete</span>
        </div>
        </>
    )
}