'use client';

import { useRef, useState } from 'react';

export default function FileUpload() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    console.log('File has been added');
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e: any) {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      // write submit logic here
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = '';
    inputRef.current.click();
  }

  return (
    <div>
      <form
        className={`bg-[#041530] w-1/3 rounded-lg w-[502px] h-[502px] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder='fileInput'
          className='hidden'
          ref={inputRef}
          type='file'
          multiple={true}
          onChange={handleChange}
          accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'
        />

        <span
          className='font-bold text-blue-600 cursor-pointer'
          onClick={openFileExplorer}
        >
          <img src='/marketPlace/upload.png' />
        </span>
        <div className='text-[#B0C1FA] text-[20px]'>
          Drop a file or click tp upload
        </div>

        <div className='flex flex-col items-center p-3'>
          {files.map((file: any, idx: any) => (
            <div key={idx} className='flex flex-row text-white space-x-5'>
              <span>{file.name}</span>
              <span
                className='text-red-500 cursor-pointer'
                onClick={() => removeFile(file.name, idx)}
              >
                remove
              </span>
            </div>
          ))}
        </div>

        {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
      </form>
    </div>
  );
}
