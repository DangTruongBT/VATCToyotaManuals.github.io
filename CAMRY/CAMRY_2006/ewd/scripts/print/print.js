


function call_runOnLoadProc()
{
	try{

		if( isPrintDialog() ) {
			switch( self.dialogArguments[1] ){
				case "parts":
					self.d_preview.window.navigate("../connector/partsref_print.html");
					break;
					
				case "loads_ps":
					self.d_preview.window.navigate("../loads/matrix_print.html");
					break;
					
				case "intro":
					self.d_preview.window.navigate("../../intro/print.html");
					break;
				
				case "outline":
					var path = "../system/outline/" + self.dialogArguments[2] + ".xml";
					self.d_preview.window.navigate(path);
					break;
				
				case "readme":
					self.d_preview.window.navigate("../../intro/readme.html");
					break;
			}
		}
	}
	catch(e){
		window.alert(e.description);
	}
}



function isPrintDialog()
{
	if( self.dialogArguments != null ) {
		if( self.dialogArguments[0] == "print" )
			return true;
		else
			return false;
	}
}
