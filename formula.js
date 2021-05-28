// Storing the cell data in sheetDB
for (let i = 0; i < gridCells.length; i++) {
	gridCells[i].addEventListener("blur", () => {
        // console.log(sheetDB);
		let cellData = gridCells[i].innerText;
        console.log("formula")
		let { rid, cid } = getRIDCIDfromAddress(addressField.value);
		let cellObj = sheetDB[rid][cid];

        if(cellObj.value == cellData){
            return ;
        }
        if(cellObj.formula){
            removeFormula(cellObj, addressField.value);
            formulaBar.value = "";
        }
        if(cellObj.value  && cellObj.formula == ""){
            updateChildren(cellObj);
        }

		sheetDB[rid][cid].value = cellData;
        console.log(cellObj.value);
        // console.log(sheetDB)
		updateChildren(cellObj);
        console.log(sheetDB);
	});
}

formulaBar.addEventListener("keydown", (e) => {
	if (e.key == "Enter" && formulaBar.value) {
		let currFormula = formulaBar.value;
        let { rid, cid } = getRIDCIDfromAddress(addressField.value);
        let cellObj = sheetDB[rid][cid];
        if(currFormula != cellObj.formula){
            removeFormula(cellObj, addressField.value);
        }

		let calcValue = evaluateFormula(currFormula);
		setCell(calcValue, currFormula);
		let address = addressField.value;
		storeChildren(address, currFormula);
        updateChildren(cellObj);
	}
});

function evaluateFormula(formula) {
	let formulaTokens = formula.split(" ");
	// '(' 'A1' '+' 'B2' ')'
	for (let i = 0; i < formulaTokens.length; i++) {
		// for every token
		let ascii = formulaTokens[i].charCodeAt(0);
		if (ascii >= 65 && ascii <= 90) {
			let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
			let value = sheetDB[rid][cid].value;
            if(value == ""){
                value = "0";
            }
			formulaTokens[i] = value; // put cell value in formula token
		}
	}
	let evaluatedFormula = formulaTokens.join(" ");
	return eval(evaluatedFormula); // calc the formula
}

function setCell(value, formula) {
	let uiCellElement = findUICellElement();
	uiCellElement.innerText = value;
	let { rid, cid } = getRIDCIDfromAddress(addressField.value);
	sheetDB[rid][cid].value = value;
	sheetDB[rid][cid].formula = formula;
}

function storeChildren(address, formula) {
	let formulaTokens = formula.split(" ");
	// '(' 'A1' '+' 'B2' ')'
	for (let i = 0; i < formulaTokens.length; i++) {
		// for every token
		let ascii = formulaTokens[i].charCodeAt(0);
		if (ascii >= 65 && ascii <= 90) {
			let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
			cellObj = sheetDB[rid][cid];
			cellObj.children.push(address);
		}
	}
}

function updateChildren(cellObj) {
	let children = cellObj.children;
	for (let i = 0; i < children.length; i++) {
        let chAddress = children[i];
        let {rid, cid} = getRIDCIDfromAddress(chAddress);
        let childObj = sheetDB[rid][cid];
        let formula = childObj.formula;
        let value = evaluateFormula(formula);
        setUpdatedCell(value, formula, rid, cid);
        updateChildren(childObj);
    }
}

function setUpdatedCell(value, formula, rid, cid) {
	let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText = value;
	sheetDB[rid][cid].value = value;
	sheetDB[rid][cid].formula = formula;
}

function removeFormula(cellObj, address){
    let formula = cellObj.formula;
    let formulaTokens = formula.split(" ");
	// '(' 'A1' '+' 'B2' ')'
	for (let i = 0; i < formulaTokens.length; i++) {
		// for every token
		let ascii = formulaTokens[i].charCodeAt(0);
		if (ascii >= 65 && ascii <= 90) {
			let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
			let parentObj = sheetDB[rid][cid];
			let idx = parentObj.children.indexOf(address);
            parentObj.children.splice(idx, 1);
		}
	}

    cellObj.formula = "";
}