const newBtn = document.querySelector(".new");
const open = document.querySelector(".open");
const save = document.querySelector(".save");
const inputBtn = document.querySelector(".inputBtn");

newBtn.addEventListener("click", () => {
	let sheets = document.querySelectorAll(".sheet");
	let idx;
	for (let i = 0; i < sheets.length; i++) {
		if (sheets[i].classList.contains("active")) {
			idx = sheets[i].getAttribute("idx");
			break;
		}
	}
	sheetArr[idx] = sheetDB;
	initUI(idx);
	setUI();
});

inputBtn.addEventListener("change", () => {
	let filesArray = inputBtn.files;
	let reqFileObj = filesArray[0];
	let fr = new FileReader(reqFileObj);

	fr.readAsText(reqFileObj);

	fr.onload = function () {
		let openedFileData = JSON.parse(fr.result);
		sheetDB = openedFileData;
		let sheets = document.querySelectorAll(".sheet");
		let idx;
		for (let i = 0; i < sheets.length; i++) {
			if (sheets[i].classList.contains("active")) {
				idx = sheets[i].getAttribute("idx");
				break;
			}
		}
		sheetArr[idx] = sheetDB;
		setUI();
	};
});

save.addEventListener("click", function () {
	const data = JSON.stringify(sheetDB);
	// blob
	// excel -> npm xlsx hw
	const blob = new Blob([data], { type: "application/json" }); // converts data to file of this type
	const url = window.URL.createObjectURL(blob); // creates file to url

	let a = document.createElement("a");
	// download
	a.download = "file.json"; // downloads in this file
	a.href = url; // url contains data
	a.click();
});

function initUI(idx) {
	let newDB = [];
	for (let i = 0; i < 100; i++) {
		let row = [];
		for (let j = 0; j < 26; j++) {
			cellObj = {
				bold: "normal",
				italic: "normal",
				underline: "none",
				font: "sans-serif",
				fontSize: "16",
				align: "left",
				textColor: "#000000",
				backgroundColor: "#ffffff",
				value: "",
				formula: "",
				children: [],
			};
			let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
			elem.style.fontWeight = "normal";
			elem.style.fontStyle = "normal";
			elem.style.textDecoration = "none";
			elem.style.fontFamily = "sans-serif";
			elem.style.fontSize = "16px";
			elem.style.textAlign = "left";
			elem.style.color = "black";
			elem.style.backgroundColor = "white";
			elem.innerText = "";
			row.push(cellObj);
		}
		newDB.push(row);
	}
	sheetArr[idx] = newDB;
	sheetDB = newDB;
}
