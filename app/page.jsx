"use client"

import {useEffect, useState} from "react"

export default function Home() {
    const [total, setTotal] = useState(0.00)
    const [invoice_items, setInvoiceItems] = useState([])
    const [link, setLink] = useState('')
    const [done, setDone] = useState(false)

    const [item, setItem] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)

    function createItem() {
        let total = price * quantity
        let id = (Math.random() * 10).toFixed(1)
        let new_items = {item, price, quantity, total, id}
        setInvoiceItems([...invoice_items, new_items])

        setItem('')
        setPrice(0)
        setQuantity(0)
    }

    function removeItem(id) {
        let new_it = invoice_items.filter((item, index) => {
            return item.id != id
        })
        setInvoiceItems([...new_it])
    }

    function updateTotal() {
        let tot = 0

        for (let i = 0; i < invoice_items.length; i++) {
            tot = tot + invoice_items[i].total
        }
        setTotal(tot)
    }


    function createLink(bytes) {
        let url = 'data:application/pdf;base64,' + bytes
        setDone(true)
        setLink(url)
    }


    async function createInvoice(e) {
        e.preventDefault()
        console.log(e.target.invoice_number.value)
        let vals = e.target
        const data = {number: vals.invoice_number.value, date: vals.invoice_date.value, color: vals.invoice_color.value, currency: vals.invoice_currency.value}

        const dd = await fetch("/api/create", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
        if (dd.status == 200) {
            let rr = await dd.json()
            createLink(rr.file)
        }
    }

    useEffect(() => {
        updateTotal()
    }, [invoice_items])

    return (
        <div className=" p-5 flex flex-col items-center ">
            <form onSubmit={createInvoice} className="max-w-[850px] w-full flex gap-6">
                <main className=" w-[80%] bg-slate-900 p-7">
                    <div className="flex flex-col gap-[3rem] text-xs" >
                        <div className="w-full flex justify-between  gap-3">
                            <div className="flex flex-col gap-1  w-[40%]">
                                <label htmlFor="">Your Logo</label>
                                <input type="file" name="invoice_logo" className="border border-slate-200 p-2" />
                            </div>
                            <div className="flex flex-col gap-1  w-[40%]">
                                <label htmlFor="">Invoice Number</label>
                                <input type="number" name="invoice_number" className="border border-slate-200 p-2" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-3 ">
                            <div className="flex flex-col gap-1 w-[40%]">
                                <label htmlFor="">Date</label>
                                <input type="date" name="invoice_date" className="border border-slate-200 p-2" />
                            </div>
                            <div className="flex flex-col gap-1 w-[40%]">
                                <label htmlFor="">Currency</label>
                                <select name="invoice_currency" className="border border-slate-200 p-2">
                                    <option value="R">Rand</option>
                                    <option value="$">Dollar</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col gap-2  w-[40%]" >
                                <h3 className="text-2xl">Invoice To:</h3>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Client Name</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Client address</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2 " />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Client Contact</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-[40%]" >
                                <h3 className="text-2xl">Invoice From:</h3>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Your Name</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Your address</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Your Contact</label>
                                    <input type="text" name="invoice_date" className="border border-slate-200 p-2" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-5 gap-2 mb-2">
                                <p>Item</p>
                                <p>Quantity</p>
                                <p>Unit Price</p>
                                <p>Total</p>
                            </div>
                            <div className=" flex flex-col gap-2 mb-2">
                                {invoice_items.length > 0 && invoice_items.map((item, key) => {
                                    return (
                                        <div key={key} className="grid grid-cols-5 gap-2 bg-slate-800 p-3">
                                            <p>{item.item}</p>
                                            <p>{item.quantity}</p>
                                            <p>{item.price}</p>
                                            <p>{item.total}</p>
                                            <button type="button" onClick={() => removeItem(item.id)} className="bg-rose-400 p-1">Remove Item</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="flex flex-col gap-1">
                                    <input type="text" name="item_item" value={item} onChange={(e) => setItem(e.target.value)} className="border border-slate-200 p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input type="number" name="item_quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border border-slate-200 p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input type="number" name="item_price" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-slate-200 p-2 " />
                                </div>
                                <button type="button" onClick={createItem} className="bg-indigo-600 p-2 ">Save Item</button>
                            </div>
                        </div>
                        <div className="flex gap-3  items-end justify-between">
                            <div className="flex flex-col gap-1 w-[40%]">
                                <label htmlFor="">Signature</label>
                                <input type="file" name="invoice_signature" className="border border-slate-200 p-2" />
                            </div>
                            <div className="flex gap-3 text-2xl font-bold">
                                <h3>Total Amount</h3>
                                <h3>{total}</h3>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="w-[20%]">
                    <button className="bg-green-400 text-slate-800 p-2 w-full my-4" type="submit">Create Invoice</button>
                </div>
            </form>
            <div className="my-4">
                {
                    done &&
                    <a href={link} download="file" className="bg-indigo-400 rounded-md p-2" >Download file</a>
                }
            </div>
        </div>
    );
}
