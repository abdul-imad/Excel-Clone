let addSheetsBtn = document.querySelector(".add_sheets_btn-container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", sheetClick);
addSheetsBtn.addEventListener("click", () => {
	let allSheets = document.querySelectorAll(".sheet");
	let lastSheet = allSheets[allSheets.length - 1];
	let lastIdx = lastSheet.getAttribute("idx");
	lastIdx = Number(lastIdx);
	let newSheet = document.createElement("div");
	newSheet.setAttribute("class", "sheet");
	newSheet.setAttribute("idx", `${lastIdx + 1}`);
	newSheet.innerText = `Sheet ${lastIdx + 2}`;
	sheetList.appendChild(newSheet);
	for (let i = 0; i < allSheets.length; i++) {
		allSheets[i].classList.remove("active");
	}
	newSheet.classList.add("active");
	newSheet.addEventListener("click", sheetClick);
});

function sheetClick(e) {
	let sheet = e.currentTarget;
	allSheets = document.querySelectorAll(".sheet");
	for (let i = 0; i < allSheets.length; i++) {
		allSheets[i].classList.remove("active");
	}
	sheet.classList.add("active");
}


