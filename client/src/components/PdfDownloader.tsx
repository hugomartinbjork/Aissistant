import jsPDF from 'jspdf'
import { StandardButton } from './StandardButton'
interface Props {
  text: string
  title: string
}

export default function PdfDownloader({ text, title }: Props) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20)
    doc.text(lines, 10, 10)
    doc.save(title + '.pdf')
  }

  return (
    <div>
      <StandardButton text={'Download PDF'} onClick={handleDownloadPDF} />
    </div>
  )
}
