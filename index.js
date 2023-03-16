const {Configuration, OpenAIApi} = require("openai")
const write = require('./modules/setDataToExcel.js')
const {getDataList, getDataIcecat} = require('./modules/getDataToExcel.js')
const fs = require('fs')

const pathOutputData = './output_data/data.json'
const pathExcelData = './input_data/ASUS_AI_Team.xlsx'
const pathExcelDataIcecat = './input_data/Asus_ES_export.xlsx'
const configuration = new Configuration({
	apiKey: "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"
})
const openai = new OpenAIApi(configuration)

async function getAll(prompt) {
	const response = await openai.createCompletion({
		model: "curie:ft-personal:test-asus-002-2023-03-15-11-41-37",
		prompt: prompt,
		temperature: 0.7,
		max_tokens: 750,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		stop: ["END"]
	})
	return response.data.choices[0].text
}


function toCollect(pathCollectData, pathExportData) {

	const list = getDataList(pathCollectData)
	const arr = []
		list.map((prompt) => {
		getDataIcecat(pathExportData).map((elem, index) => {
			if (index < 900 && elem.completion.partNumber === prompt.prompt.partNumber) {
				// console.log(elem.completion)
				arr.push({
					prompt: prompt.prompt,
					completion: elem.completion
				})
			}
		})
	})
	return arr
}

// const dataJson = toCollect(pathExcelData, pathExcelDataIcecat)
// console.log(dataJson)
// write.writeDataToExcel(dataJson, './output_data/data.xlsx')
// fs.writeFile(pathOutputData, dataJson, (err) => {
// 	if (err) throw err
// 	console.log('Data written to file')
// })

async function responseAi(pathCollectData) {
	let getData = getDataList(pathCollectData)
	getData = getData.slice(650, 655)
	const results = []
	await Promise.all(
		getData.map(async (prompt) => {
		results.push({
				prompt: prompt.prompt,
				completion: await getAll(JSON.stringify(prompt.prompt))
			})

		})
	)
	await write.writeDataToExcel(results, './output_data/response1.xlsx')
}



responseAi(pathExcelData)
// console.log(description)
// write.writeDataToExcel(r                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            esponseAi(pathExcelData), './output_data/dataresponse.xlsx')

