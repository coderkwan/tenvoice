import {rgb, StandardFonts, PDFDocument} from 'pdf-lib'

export async function POST(req) {
    const data = await req.json()

    let doc = await PDFDocument.create()
    const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman)

    let page = doc.addPage()
    page.drawText(data.number, {x: 30, y: 30, size: 16, color: rgb(0, 0.4, 0.4), font: timesRomanFont})

    let file = await doc.saveAsBase64()

    return new Response(JSON.stringify({message: "Hello World", file}), {status: 200})
}
