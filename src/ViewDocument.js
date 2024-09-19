import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";



const ViewDocument = () =>{
const docs = [
    { 
      uri: "http://localhost:5000/document/testfile.jpg",
      fileType:"jpg",
      fileName:"Sample-PPT-File-500kb.jpg"
    }, 
    {
        uri: require("./assets/TestUpload3.png"),
      fileType:"xlsx",
      fileName:"Equipments .xlsx"
    }
   
  ];

  return (
    <div>
    <h1>Doc Viewer</h1>

    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
     
     style={{height:5000}}

    />
    </div>
  );
};

export default ViewDocument;