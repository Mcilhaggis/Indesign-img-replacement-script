main();

function main() {
	var doc = app.activeDocument; 
	// Change for all pages in a document
	for(var i =0; i < doc.pages.length; i++){
		replaceLogo(doc.pages[i])
	}

function replaceLogo(passedPage){
	// Removes whole group of LOGO
	var myLayers = doc.layers;
	var footerLayer = myLayers.itemByName("Footer");
	footerLayer.getElements();
	// Find the item to be removed
	var logoGroup = footerLayer.groups[0];
	logoGroup.remove();

	// Decipher the orientation of the file. Because spreads can sometimes not follow the document orientation we look to the spreads for actual orientation
	var myPageOrientation;
	for(var i =0; i < doc.pages.length; i++)
	{
		if(doc.pages.item(0).bounds[2] < doc.pages.item(0).bounds[3]){
			myPageOrientation = "Landscape";
			} else myPageOrientation = "Portait";
	}

	// Place new logo depending on orientation
	doc.activeLayer = footerLayer;

	var img = passedPage.place(new File("/c/success-test.svg"));
	switch(myPageOrientation){
	 case "Portait":
	  	imgFrame = img[0].parent;
	  	imgFrame.move([.5, 10.5]);
	  break;
	 case "Landscape":
	  	imgFrame = img[0].parent;
	 	imgFrame.move([.5, 8]);
	  break;
	 default:
		// unknown file orientation
	  	break;
	}

	// Embed the image
	var myLinks = doc.links
	var newLogo = myLinks.itemByName('success-test.svg');
	newLogo.unlink()
}

// If not using the bathc processer for InDesign - export single files using this 
// Does not allow for interactive pdf export
	// // Export to PDF to the same location as INDD
	// var pdfFilePath = doc.fullName.absoluteURI.replace(/indd$/, "pdf");
	// var pdfFile = new File(pdfFilePath);
	// var pdfPreset = app.pdfExportPresets.itemByName("[Press Quality]");
	// doc.exportFile(ExportFormat.PDF_TYPE, pdfFile, false, pdfPreset);
	
	// // // Save as a copy
	// var docFilePath = doc.filePath.absoluteURI;
	// var newDocPath = docFilePath + "/" + doc.name.replace(/\.indd$/, "") + "_customer.indd";
	// var newDoc = new File(newDocPath);
	// doc.saveACopy(newDoc);
}


















// main();

// function main() {
// 	var doc = app.activeDocument;

// 	// Relink to the customer logo located in the same folder
// 	var logo = doc.links.itemByName("logo.ai");
// 	if (logo.isValid) {
// 		var logoCustomerFilePath = File(logo.filePath).path + "/logo_customer.ai";
// 		var logoCustomerFile = new File(logoCustomerFilePath);
// 		if (logoCustomerFile.exists) {
// 			logo.relink(logoCustomerFile);
// 		}
// 	}
	
// 	// Edit a swatch
// 	var swatch = doc.swatches.itemByName("C=15 M=100 Y=100 K=0");
// 	if (swatch.isValid) {
// 		with (swatch) {
// 			colorValue = [30, 90, 90, 10];
// 		}
// 	}

// 	// Export to PDF to the same location as INDD
// 	var pdfFilePath = doc.fullName.absoluteURI.replace(/indd$/, "pdf");
// 	var pdfFile = new File(pdfFilePath);
// 	var pdfPreset = app.pdfExportPresets.itemByName("[Press Quality]");
// 	var pdfFileExported = doc.exportFile(ExportFormat.PDF_TYPE, pdfFile, false, pdfPreset);
	
// 	// Save as a copy
// 	var docFilePath = doc.filePath.absoluteURI;
// 	var newDocPath = docFilePath + "/" + doc.name.replace(/\.indd$/, "") + "_customer.indd";
// 	var newDoc = new File(newDocPath);
// 	doc.saveACopy(newDoc);
// }