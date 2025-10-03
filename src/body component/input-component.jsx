export default function Input({label,type,add,id,checked,style,styleInput,value,onChange,inputValue,pattern,inputMode,className}){



  let inputField;

if (checked) {
  inputField = (
    <div className={style}>
      <input
        type={type}
        id={id}
        className={styleInput}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center ">
        {label}
        <span className="ml-3 text-red-500 pt-1">{add}</span>
      </label>
    </div>
  );
} else if (type === "file") {
  inputField = (
    <>
      <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center ">
        {label}
        <span className="ml-3 text-red-500 pt-1">{add}</span>
      </label>
      <input
        type="file"
        id={id}
        onChange={onChange}
        className="border rounded border-gray-300 w-full focus:outline-none h-10 pl-2"
        multiple
      />
    </>
  );
} else {
  inputField = (
    <>
      <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center ">
        {label}
        <span className="ml-3 text-red-500 pt-1">{add}</span>
      </label>
      <input
        type={type}
        id={id}
        value={inputValue}
        onChange={onChange}
        className="border rounded border-gray-300 w-full focus:outline-none h-10 pl-2"
        pattern={pattern}
        inputMode={inputMode}
      />
    </>
  );
}

return <div className="text-left">{inputField}</div>;

}
