import Dialog from "../dialog/Dialog";
import {useEffect, useState} from "react";
import doll from '../../assets/expenses/voodoo-doll.svg'
import Select from 'react-select'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../api/api.js";
import categoryImages from "../../assets/categoryEnum";
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import food from '../../assets/expenses/food.svg'
import clothes from '../../assets/expenses/clothes.svg'
import health from '../../assets/expenses/health.svg'
import income from '../../assets/expenses/income.svg'
import medication from '../../assets/expenses/medication.svg'
import others from '../../assets/expenses/others.svg'
import restaurant from '../../assets/expenses/restaurant.svg'
import wellness from '../../assets/expenses/wellness.svg'
import filterIcon from '../../assets/expenses/filter.svg'
import NotFound from "../NotFound";
import MenuExpense from "./MenuExpense";
import Loading from "../Loading";
import { ToastContainer, toast } from 'react-toastify';
import validator from "validator/es";
registerLocale('pt-BR', pt)

const images = {
    clothes,
    food,
    health,
    income,
    medication,
    others,
    restaurant,
    wellness
}


export function getCategoryImage(imageName){
    console.log(imageName)
    return <img className="expense-category__icon" src={images[imageName]} alt={`${imageName} icon`} title={imageName}/>

}
export const categoryOptions = [{label:'food', value: 'food'},{label:'medication', value: 'medication'},{label:'others', value: 'others'}, {label:'wellness', value: 'wellness'}, {label:'clothes', value: 'clothes'}, {label:'restaurant', value: 'restaurant'}, {label:'health', value: 'health'}]
export const categoryOptionsFilter = [{label:'income', value: 'income'},{label:'food', value: 'food'},{label:'medication', value: 'medication'},{label:'others', value: 'others'}, {label:'wellness', value: 'wellness'}, {label:'clothes', value: 'clothes'}, {label:'restaurant', value: 'restaurant'}, {label:'health', value: 'health'}]
export const typeOptions = [{label:'expense', value: 'expense'},{label:'income', value: 'income'}]

const dropdownStyle = {
    control: (provided, ) => ({
        ...provided,
      backgroundColor: '#898989',
        width: '100%',
       borderColor: "#898989",
        boxShadow: 'none',
    borderRadius: '0.8rem',
        height: '4rem',
        caretColor: 'red'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(248,248,255,0.70)',
        fontFamily: 'Hallowen inline',
        paddingLeft: '1rem',
        fontSize: '1.6rem'
    }),
    container: (provided) => ({
        ...provided,
        width: '100%',
        height: '4rem'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(0,0,0,0.78)',
        borderRadius: '1rem'
    }),
    menuList: (provided, ) => ({
        ...provided,
        color: 'ghostwhite',
        borderRadius: '1rem',

    }),
    option: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: "red"
        },
        fontSize: '1.6rem'

    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#FFF',

    }),


}

export default function Expenses (){
    const initialState = {
        name: '',
        value: '',
        category: null,
        date: '',
        type: ''
    }

    const initialStateFilter = {
        name: '',
        minvalue: '',
        maxvalue: '',
        category: null,
        date: '',

    }
    const [dialog, setDialog] = useState(false)
    const [expense, setExpense] = useState(initialState)
    const [filter, setFilter] = useState(initialStateFilter)
    const [filteredExpenses, setFilteredExpenses] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const client = useQueryClient()

    const {mutate: addExpense, isLoading: createLoading} = useMutation( async (expense) => {
        return await api.post('/expenses', expense)
    }, {
        onSuccess: async () => {
            await client.invalidateQueries(["expenses"])
            toast.success('The transaction was created.')
        },
        onError: () => {
            toast.error('Something went bad :(')
        }
    })
    const  {mutate: deleteExpense, isLoading: deleteLoading} = useMutation( async (expense) => {
        return await api.delete('/expenses/'+expense)
    }, {
        onSuccess: async () => {
            await client.invalidateQueries(["expenses"])
            toast.success('The transaction was deleted.')
        },
        onError: () => {
            toast.error('Something went bad :(')
        }
    })

    const updateExpense = useMutation( async (expense) => {
        console.log(expense)
        return await api.patch('/expenses/'+expense._id, expense)
    }, {
        onSuccess: async () => {
            await client.invalidateQueries(["expenses"])
            toast.success('The transaction was updated.')
            setIsUpdating(false)
        },
        onError: () => {
            toast.error('Something went bad :(')
            setIsUpdating(false)
        }
    })


    function handleDialog(){
        setDialog(!dialog)
    }

    function handleInput(e, date) {
        if(date === 'date'){
            setExpense((prevState) => ({...prevState, [date]: e}))
        } else {
            setExpense((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }


    }

    function handleInputFilter(e, date) {
        if(date === 'date'){
            setFilter((prevState) => ({...prevState, [date]: e}))
        } else {
            setFilter((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }

    }

    function handleSelect(e, name) {
        setExpense((prevState) => ({...prevState, [name]: e}))
        console.log(e, name)
    }

    function handleSelectFilter(e, name) {
        setFilter((prevState) => ({...prevState, [name]: e}))
        console.log(e, name)
    }

    function createExpense(){
        console.log(expense)
if(validator.isCurrency(expense.value, {require_symbol: false, thousands_separator: '.', decimal_separator: ','})){
    if(expense.name.trim().length > 0 && expense.date && expense.type?.label ){
        if(expense.type.label === 'income'){
            isUpdating ? updateExpense.mutate(expense) :  addExpense(expense)
            setDialog(false)
            setExpense(initialState)
        } else if (expense.category?.label.length > 0)  {
            isUpdating ? updateExpense.mutate(expense) :  addExpense(expense)
            setDialog(false)
            setExpense(initialState)
        } else {
            toast.error('Please, fill all the inputs.', )
        }
    } else {
        toast.error('Please, fill all the inputs.')
    }
} else {
    toast.error('Please, only numeric values are allowed.')
}


    }

function getCategories(categories){
        return categories.map(el => el.label)
}
    const {data: allExpenses2, isLoading: allExpensesLoading} = useQuery(["expenses", filter], async () => {
        let uri = "/expenses?"
        let date = filter?.date ? `date=${filter.date}&` : ''
        let minV = filter?.minvalue > 0 ? 'minValue=' + filter.minvalue + '&' : ''
        let maxV = filter?.maxvalue > 0 ? 'maxValue=' + filter.maxvalue + '&' : ''
        let categories = filter?.category?.length > 0 ? 'category=' + getCategories(filter.category)+ '&' : ''
     uri = uri.concat(date, minV,maxV, categories)
        uri = uri.slice(0, uri.length -1)

        console.log(uri)
        const response = await api.get(uri)
        return  response.data.response
    })

function deleteThisExpense(id){
        deleteExpense(id)
}

    function addHours(date, hours) {
        date.setHours(date.getHours() + hours);

        return date;
    }

function updateTransaction(transaction){
        setDialog(true)
    const [day, month, year] = transaction.date.split('/')
    console.log(transaction.date)
    const date = new Date(`${year}-${month}-${day}`)
    const actualDate = addHours(date, 3)
    const expense = {
            _id: transaction._id,
            name: transaction.name,
            value: transaction.value.toString(),
        category: transaction.type === 'income' ? null : {label: transaction.category, value: transaction.category},
        date: actualDate ,
        type: {label: transaction.type, value: transaction.type},
        user: transaction.user
    }
    console.log(expense.date)
    setExpense(expense)
    setIsUpdating(true)

    }

    function updateTransactionChanges(){
        createExpense('update')
    }

function clearDialog(){
        setExpense(initialState)
    setDialog(false)
}
    return (
        <div className="transactions__view">
            <ToastContainer theme={"dark"} />
            {dialog && <div className="overlay"/>}
            <Dialog dialogState={{dialog, setDialog}} header={"Create expense"} confirmAction={createExpense} cancelAction={clearDialog} >
                <div className="dialog__container">
                    <img src={doll} alt="voodoo doll" className="dialog__image"/>
                <form className="expenses__form">
                    <div className="input-container">
                        <input type="text" maxLength={30} className="general-input form__input" value={expense.name} onChange={handleInput} placeholder="Name" name="name"/>
                    </div>
                    <div className="input-container">
                        <input type="text" className="general-input form__input" value={expense.value} onChange={handleInput} placeholder="Value" name="value"/>

                    </div>
                    <div className="input-container">
                        <Select options={typeOptions} styles={dropdownStyle} placeholder="Transaction Type" name="type" value={expense.type} onChange={(e) => handleSelect(e,'type')} />

                    </div>
                    <div className={(!expense.type?.label || expense.type?.label === 'income')  ? 'hide' : 'input-container'} >
                        <Select options={categoryOptions} styles={dropdownStyle} placeholder="Category" name="category" value={expense.category} onChange={(e) => handleSelect(e,'category')} />

                    </div>

                    <div className="input-container">
                        <DatePicker selected={expense?.date} dateFormat="dd/MM/yyyy"  locale="pt-BR" className="general-input form__input" onChange={(date) => handleInput(date, 'date')} placeholderText="dd/mm/yyyy"  />



                    </div>

                </form>

                </div>
            </Dialog>
        <section className="expenses__view">
            <div className="expenses__view--header">
                <h1>Hello! Wanna keep track of something? </h1>
                <a className="login__button" onClick={handleDialog}>Keep track</a>
            </div>


            <div className="filter__bar">
<h2>Filters</h2>
                <div className="filter__inputs">
                    <div className="input-container">
                        <Select options={categoryOptionsFilter} isMulti={true} styles={dropdownStyle} placeholder="Category" name="category" value={filter?.category} onChange={(e) => handleSelectFilter(e,'category')} />

                    </div>
                    <div className="input-container">

                        <DatePicker selected={filter?.date}  dateFormat="PP"  locale="pt-BR" className="general-input form__input" onChange={(date) => handleInputFilter(date, 'date')} placeholderText="dd/mm/yyyy"  />
                    </div>

                    <div className="input-container">
                        <input type="string" className="general-input form__input" value={filter?.minvalue} onChange={handleInputFilter} placeholder="Min Value" name="minvalue"/>

                    </div>
                    <div className="input-container">
                        <input type="string" className="general-input form__input" value={filter?.maxvalue} onChange={handleInputFilter} placeholder="Max Value" name="maxvalue"/>

                    </div>
                    <img src={filterIcon} title="Clear filters" className="filter__bar-icon" alt="filter" onClick={() => setFilter(initialStateFilter)} />
                </div>

            </div>
            { (allExpensesLoading || deleteLoading || createLoading || updateExpense.isLoading) ? <Loading/> : <div className="expenses__container">
                {allExpenses2?.length > 0 ? allExpenses2.map(expense => {
                    return <div className="expense__card" key={expense._id}>
                        <div>      {expense?.name}</div>

                        <p>{expense?.date}</p>
                        <p>{Number(expense?.value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                        {getCategoryImage(expense?.category)}
                        <MenuExpense deleteFunction={deleteThisExpense} editFunction={updateTransaction} expense={expense} expenseId={expense._id}/>
                    </div>


                }) : <NotFound/>}
            </div>}
        </section>
        </div>
    )
}