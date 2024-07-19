import axios from 'axios';
import React  , {useState} from 'react';
import swal from 'sweetalert';
import { BASE_URL } from '../helpers/general';
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);


    
    try {
      await axios.post(`${BASE_URL.local}/import_accounts/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
      swal("Good job!", "File uploaded successfully!", "success");
      setUploading(false);

    } catch (error) {
      swal("Erro!", "Error uploading file!", "error");
      setUploading(false);

      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
    <div class ='fileupload'>
    <form onSubmit={handleSubmit}>
      <input  class= 'large-input' type="file" onChange={handleFileChange} />
      <button onClick={()=>{setUploading(true)}} class ="large-button" type="submit">Upload</button>
    </form>
    </div>
    <div>
    {uploading ? <h2 class ='fileupload'>  file uploading.....  </h2> :""}
    </div>
    </>
  );
};

export default FileUpload ; 