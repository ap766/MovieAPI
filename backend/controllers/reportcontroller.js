const XLSX = require('xlsx');
const dataModel = require('../models/charactermodel');

const exportdata = async (req, res) => {
    try {
        const data = await dataModel.find(); // Find all characters from the database
        console.log(data)

        if (!data) {
            return res.status(500).send('No data found');
        }

        // Specify the columns to include in the Excel file
        const columnsToExport = [
            { label: 'Name', value: 'name' },
            { label: 'Age', value: 'age' },
            { label: 'Gender', value: 'gender' },
            { label: 'Occupation', value: 'occupation' },
            { label: 'Photos', value: 'photos' },
            { label: 'Relations', value: 'relations' }
        ];

        // Convert MongoDB ObjectIDs to strings and format dates as ISO strings
        const formattedData = data.map(item => ({
            ...item,
        }));

        var a = [];
        var b = [];
        var l = -1;
        var m = 0;

        for (let i = 0; i < formattedData.length; i++) {
            const firstDocument = formattedData[i];
            const name = firstDocument._doc.name;
            const age = firstDocument._doc.age;
            const gender = firstDocument._doc.gender;
            const occupation = firstDocument._doc.occupation;
            const photos = firstDocument._doc.photos;
            const relations = firstDocument._doc.relations;

            a.push(name)
            a.push(age)
            a.push(gender);
            a.push(occupation);
            a.push(photos[0]);
            a.push(relations);
            b.push(a);
            a = []
        }

        var relevantData = formattedData.map(item => {
            const newItem = {};

            l = l + 1;
            m = 0;

            columnsToExport.forEach(column => {
                newItem[column.label] = b[l][m];
                m = m + 1;
            });
            return newItem;
        });

        const ws = XLSX.utils.json_to_sheet(relevantData, {
            cellDates: true,
            defval: ''
        });

        const down = 'exportdata.xlsx';
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${down}`);

        XLSX.writeFile(wb, down, { type: 'buffer' });

        res.send(wb);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Error occurred while exporting data');
    }
}




const fs = require('fs');
const PDFDocument = require('pdfkit');

const exportdatapdf = async (req, res) => {
    // Load your Excel file (replace 'example.xlsx' with your file's path)
    const excelFilePath = 'C:/Users/lenovo/Desktop/project_/backend/exportdata.xlsx';

    console.log(excelFilePath);

    console.log("AISBS");

    try {
        // Read the Excel file
        const workbook = XLSX.readFile(excelFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Extract data from the Excel sheet
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log("345");

        // Create a PDF document
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream('exportdata.pdf'));

        console.log("1222");

        // Write Excel data to the PDF
        excelData.forEach((row) => {
    row.forEach((cell, index) => {

        pdfDoc.text(cell ? cell.toString() : ' ', { continued: true });
        pdfDoc.text('\t ', { continued: true });
    });
    pdfDoc.moveDown(); // Add space between rows
    pdfDoc.text(' '); // Add a blank line for separation
});

        console.log("1123");

        // Finalize the PDF document
        pdfDoc.end();

        console.log('PDF generated successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred while generating the PDF');
    }
}

const exportdatacsv = async (req, res) => {
    // Load your Excel file (replace 'example.xlsx' with your file's path)
    const excelFilePath = 'C:/Users/lenovo/Desktop/project_/backend/exportdata.xlsx';


try {
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert Excel data to JSON
    const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Create a CSV file and write the data
    const csvFilePath = 'output.csv';
    const csvData = excelData.map(row => row.join(',')).join('\n');
    fs.writeFileSync(csvFilePath, csvData);

    console.log('CSV file generated successfully:', csvFilePath);
} catch (error) {
    console.error('Error:', error);
}

}




module.exports = {
    exportdata,exportdatapdf,exportdatacsv
};
