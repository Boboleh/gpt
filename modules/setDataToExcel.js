const Excel = require('exceljs')

async function writeDataToExcel(data, filePath) {
	try {
		const workbook = new Excel.Workbook()
		const sheetName = 'Sheet1'
		await workbook.xlsx.readFile(filePath)
		const worksheet = workbook.getWorksheet(sheetName)
		worksheet.columns = [
			{header: 'prompt', key: 'prompt', width: 50},
			{header: 'completion', key: 'completion', width: 50}
		]
		data.map((values) => {
			if (values) {
				worksheet.addRow({
					prompt: values.prompt,
					completion: values.completion,

				})
			}
		})
		// await workbook.csv.writeFile(filePath)
		await workbook.xlsx.writeFile(filePath)
		console.log(`File recording is complete! ${data.length} products recorded`)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {writeDataToExcel}