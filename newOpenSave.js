const newBtn = document.querySelector(".new");
const open = document.querySelector(".open");
const save = document.querySelector(".save");
const inputBtn = document.querySelector(".inputBtn");

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

inputBtn.addEventListener("change", () => {
    let filesArray = inputBtn.files;
    let reqFileObj = filesArray[0];
    let fr = new FileReader(reqFileObj);

    fr.readAsText(reqFileObj);

    fr.onload = function(){
        console.log(fr.result);
    }
    console.log(filesArray)
})
