"use client"

import {useState} from "react"

export default function Home() {
    const [link, setLink] = useState('')
    const [done, setDone] = useState(false)

    function createLink(bytes) {

        let url = 'data:application/pdf;base64,' + bytes
        setDone(true)
        setLink(url)
    }


    async function createInvoice(e) {
        e.preventDefault()
        console.log(e.target.invoice_number.value)
        const data = {number: e.target.invoice_number.value}

        const dd = await fetch("/api/create", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
        if (dd.status == 200) {
            let rr = await dd.json()
            createLink(rr.file)
        }


    }
    return (
        <div className=" p-5 ">
            <form onSubmit={createInvoice} className="max-w-[800px] flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Invoice number</label>
                    <input type="numer" name="invoice_number" className="border border-slate-200 p-3 rounded-md" />
                </div>
                <button className="bg-indigo-400 rounded-md p-2" type="submit">Next</button>
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
